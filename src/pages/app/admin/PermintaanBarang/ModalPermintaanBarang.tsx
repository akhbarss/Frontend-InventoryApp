import {
  BaseModal,
  FormPermintaanBarang,
  MemoizedBaseModal,
} from "@components/ui/atoms";
import { ModalDelete } from "@components/ui/atoms/Modal/ModalDelete/ModalDelete";
import { useModalStore } from "@store/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResponseError } from "@utils/ResponseError";
import {
  PayloadCreateItemRequest,
  PayloadUpdateItemRequest,
  createItemRequest,
  deleteItemRequest,
  updateItemRequest,
} from "@utils/api/item-request/item-request.api";
import { usePermintaanBarangFormContext } from "@utils/context/form-context";
import { showNotifications } from "@utils/showNotifications";
import { ItemType } from "@utils/types/items.type";
import React, { useCallback, useMemo } from "react";

type ModalPermintaanBarangProps = {
  itemType: ItemType;
};

const ModalPermintaanBarang = React.memo(
  ({ itemType }: ModalPermintaanBarangProps) => {
    console.log("modal");
    const {
      openedModalCreate,
      openedModalEdit,
      openedModalDelete,
      setOpenedModalDelete,
      setOpenedModalCreate,
      setOpenedModalEdit,
    } = useModalStore();
    const closeModalCreate = useCallback(() => setOpenedModalCreate(false), []);
    const closeModalEdit = useCallback(() => setOpenedModalEdit(false), []);
    const closeModalDelete = useCallback(() => setOpenedModalDelete(false), []);

    const form = usePermintaanBarangFormContext();
    const resetForm = () => form.reset();
    const createItemRequestMutation = useMutation({
      mutationFn: createItemRequest,
    });
    const updateItemRequestMutation = useMutation({
      mutationFn: updateItemRequest,
    });
    const deleteItemRequestMutation = useMutation({
      mutationFn: deleteItemRequest,
    });

    const querClient = useQueryClient();
    const refetch = useCallback(() => {
      querClient.invalidateQueries({ queryKey: ["get_all_item_request"] });
    }, []);

    const onCreateItemRequest = () => {
      const { jumlahBarang, keterangan, lokasi, namaBarang } = form.values;
      const payload: PayloadCreateItemRequest = {
        class_id: +lokasi,
        description: keterangan,
        item_name: namaBarang,
        item_type: itemType,
        total_request: jumlahBarang!,
      };
      createItemRequestMutation.mutate(payload, {
        onSuccess: (res) => {
          console.log(res);
          refetch();
          resetForm();
          closeModalCreate();
          showNotifications({
            title: "Success!",
            type: "success",
          });
        },
        onError: (error: any) => ResponseError(error),
      });
    };

    const onUpdateItemRequest = () => {
      const { jumlahBarang, keterangan, lokasi, namaBarang, id } = form.values;
      const payload: PayloadUpdateItemRequest = {
        id: id!,
        class_id: +lokasi,
        description: keterangan,
        item_name: namaBarang,
        item_type: itemType,
        total_request: jumlahBarang!,
      };
      updateItemRequestMutation.mutate(payload, {
        onSuccess: (res) => {
          console.log(res);
          refetch();
          resetForm();
          closeModalEdit();
          showNotifications({
            title: "Success!",
            type: "success",
          });
        },
        onError: (error: any) => ResponseError(error),
      });
    };

    const onDeleteItemRequest = () => {
      const { id } = form.values;
      deleteItemRequestMutation.mutate(id!, {
        onSuccess: (res) => {
          console.log(res);
          refetch();
          resetForm();
          closeModalDelete();
          showNotifications({
            title: "Success!",
            type: "success",
          });
        },
        onError: (error: any) => ResponseError(error),
      });
    };

    const modalCreate = useMemo(
      () => (
        <MemoizedBaseModal
          size={"md"}
          resetForm={form}
          opened={openedModalCreate}
          onClose={closeModalCreate}
          title="Tambah Permintaan Barang"
          onSubmit={form.onSubmit(onCreateItemRequest)}
        >
          <FormPermintaanBarang />
        </MemoizedBaseModal>
      ),
      [openedModalCreate, form]
    );

    const modalEdit = useMemo(
      () => (
        <MemoizedBaseModal
          size={"md"}
          resetForm={form}
          opened={openedModalEdit}
          onClose={closeModalEdit}
          title="Ubah Permintaan Barang"
          onSubmit={form.onSubmit(onUpdateItemRequest)}
        >
          <FormPermintaanBarang />
        </MemoizedBaseModal>
      ),
      [openedModalEdit, form]
    );

    return (
      <>
        {modalCreate}
        {modalEdit}

        <ModalDelete
          resetForm={form}
          onAccept={onDeleteItemRequest}
          opened={openedModalDelete}
          onClose={closeModalDelete}
          message={`Anda yakin ingin menghapus permintaan barang ${form.values.namaBarang}`}
        />
      </>
    );
  }
);

export default ModalPermintaanBarang;
