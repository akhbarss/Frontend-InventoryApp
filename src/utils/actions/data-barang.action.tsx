import {
  setOpenCreateModal,
  setOpenDeleteModal,
  setOpenEditModal,
} from "@store/features/modal.slice";
import { useAppDispatch } from "@store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CategoryItem,
  PayloadCreateItem,
  PayloadUpdateItem,
} from "@utils/types/items.type";
import { ResponseError } from "../ResponseError";
import { createItem, deleteItem, updateItem } from "../api/items/index.api";
import { useDataBarangFormContext } from "../context/data-barang-form.context";
import { showNotifications } from "../showNotifications";

export const useActionBarang = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const form = useDataBarangFormContext();

  const createItemMutation = useMutation({ mutationFn: createItem });
  const updateItemMutation = useMutation({ mutationFn: updateItem });
  const deleteItemMutation = useMutation({ mutationFn: deleteItem });

  const createItemhandler = (categoryItem: CategoryItem) => {
    const {
      class_id,
      item_code: { prefix_code, value_code },
      total_unit,
      ...data
    } = form.values;

    if (
      categoryItem == CategoryItem.BARANG_HABIS_PAKAI &&
      total_unit.length == 0
    ) {
      form.setFieldError("total_unit", "");
      return;
    }
    if (
      categoryItem == CategoryItem.BARANG_TIDAK_HABIS_PAKAI &&
      prefix_code.length == 0
    ) {
      form.setFieldError("item_code.prefix_code", "");
    }
    if (
      categoryItem == CategoryItem.BARANG_TIDAK_HABIS_PAKAI &&
      value_code.length == 0
    ) {
      form.setFieldError("item_code.value_code", "");
    }

    const payload: PayloadCreateItem = {
      ...data,
      total_unit,
      category_item: categoryItem,
      class_id: +class_id!,
      item_code:
        categoryItem == CategoryItem.BARANG_HABIS_PAKAI
          ? null!
          : `${prefix_code.toUpperCase()}-${value_code}`,
    };

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

  const editBarang = (categoryItem: CategoryItem) => {
    const {
      id,
      class_id,
      item_code: { prefix_code, value_code },
      total_unit,
      ...data
    } = form.values;

    if (
      categoryItem == CategoryItem.BARANG_HABIS_PAKAI &&
      total_unit.length == 0
    ) {
      form.setFieldError("total_unit", "");
      return;
    }
    if (
      categoryItem == CategoryItem.BARANG_TIDAK_HABIS_PAKAI &&
      prefix_code.length == 0
    ) {
      form.setFieldError("item_code.prefix_code", "");
    }
    if (
      categoryItem == CategoryItem.BARANG_TIDAK_HABIS_PAKAI &&
      value_code.length == 0
    ) {
      form.setFieldError("item_code.value_code", "");
    }

    const payload: PayloadUpdateItem = {
      ...data,
      id: id!,
      total_unit,
      category_item: categoryItem,
      class_id: +class_id!,
      item_code:
        categoryItem == CategoryItem.BARANG_HABIS_PAKAI
          ? null!
          : `${prefix_code.toUpperCase()}-${value_code}`,
    };

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
