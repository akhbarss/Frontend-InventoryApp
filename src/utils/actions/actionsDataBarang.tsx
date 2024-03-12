import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  setOpenCreateModal,
  setOpenDeleteModal,
  setOpenEditModal,
} from "../../store/features/modal.slice";
import { useAppDispatch } from "../../store/store";
import { ResponseError } from "../ResponseError";
import { createItem, deleteItem, updateItem } from "../api/items";
import { useDataBarangHabisPakaiFormContext } from "../context/data-barang-form.context";
import { showNotifications } from "../showNotifications";
import {
  CategoryItem,
  PayloadCreateItem,
  PayloadUpdateItem,
} from "../types/items.type";

export const useActionBarang = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const form = useDataBarangHabisPakaiFormContext();

  const createItemMutation = useMutation({ mutationFn: createItem });
  const updateItemMutation = useMutation({ mutationFn: updateItem });
  const deleteItemMutation = useMutation({ mutationFn: deleteItem });

  const createItemhandler = () => {
    const {
      class_id,
      item_code: { prefix_code, value_code },
      item_type,
      name,
      source_fund,
      status_item,
      total_unit,
      unit_price,
    } = form.values;

    const payload: PayloadCreateItem = {
      total_unit,
      category_item: CategoryItem.BARANG_HABIS_PAKAI,
      class_id: +class_id!,
      item_code: `${prefix_code.toUpperCase()}-${value_code}`,
      item_type,
      name,
      source_fund,
      status_item,
      unit_price,
    };
    console.log({ payload });
    createItemMutation.mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get_items"] });
        showNotifications({
          type: "success",
          title: "Create Item Succesfull!",
        });
        dispatch(setOpenCreateModal(false));
        form.reset();
      },
      onError: (err: any) => ResponseError(err),
    });
  };

  const editBarang = () => {
    const {
      id,
      class_id,
      item_code: { prefix_code, value_code },
      item_type,
      name,
      source_fund,
      status_item,
      total_unit,
      unit_price,
    } = form.values;

    const payload: PayloadUpdateItem = {
      id: id!,
      total_unit,
      category_item: CategoryItem.BARANG_HABIS_PAKAI,
      class_id: +class_id!,
      item_code: `${prefix_code.toUpperCase()}-${value_code}`,
      item_type,
      name,
      source_fund,
      status_item,
      unit_price,
    };
    console.log({ payload });

    updateItemMutation.mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get_items"] });
        showNotifications({
          type: "success",
          title: "Update Item Succesfull!",
        });
        dispatch(setOpenEditModal(false));
        form.reset();
      },
      onError: (err: any) => ResponseError(err),
    });
  };

  const deleteItemHandler = () => {
    const itemId = form.values.id;
    deleteItemMutation.mutate(itemId!, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get_items"] });
        dispatch(setOpenDeleteModal(false));
        showNotifications({
          type: "success",
          title: "Delete Item Succesfull!",
        });
        form.reset();
      },
      onError: (err: any) => ResponseError(err),
    });
  };

  return {
    tambahBarang: createItemhandler,
    editBarang,
    deleteBarang: deleteItemHandler,
  };
};
