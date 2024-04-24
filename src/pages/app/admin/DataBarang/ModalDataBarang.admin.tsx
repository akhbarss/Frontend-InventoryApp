import { BaseModal, FormDataBarang } from "@components/ui/atoms";
import { ModalDelete } from "@components/ui/atoms/Modal/ModalDelete/ModalDelete";
import { useActionBarang } from "@utils/actions/data-barang.action";
import { useDataBarangFormContext } from "@utils/context/data-barang-form.context";
import { useModal } from "@utils/hooks/useModal";
import { CategoryItem } from "@utils/types/items.type";
import React, { useMemo } from "react";

type ModalDataBarangProps = {
  categoryItem: CategoryItem;
};

export const ModalDataBarang = React.memo(
  ({ categoryItem }: ModalDataBarangProps) => {
    console.log("modal")
    const form = useDataBarangFormContext();
    const { deleteBarang, editBarang, tambahBarang } = useActionBarang();
    const {
      openedEdit,
      openedCreate,
      openedDelete,
      closeModalEdit,
      closeModalCreate,
      closeModalDelete,
    } = useModal();

    const formDataBarang = useMemo(() => <FormDataBarang categoryItem={categoryItem} />, []);

    return (
      <>
        {/* Modal Create */}
        <BaseModal
          size={"md"}
          resetForm={form}
          title="Tambah Barang"
          opened={openedCreate}
          onClose={closeModalCreate}
          onSubmit={form.onSubmit(() => tambahBarang(categoryItem))}
        >
          {formDataBarang}
        </BaseModal>

        {/* Modal Edit */}
        <BaseModal
          size={"md"}
          resetForm={form}
          title="Edit Barang"
          opened={openedEdit}
          onClose={closeModalEdit}
          onSubmit={form.onSubmit(() => editBarang(categoryItem))}
        >
          {formDataBarang}
        </BaseModal>

        {/* Modal Delete */}
        <ModalDelete
          resetForm={form}
          opened={openedDelete}
          onAccept={deleteBarang}
          onClose={closeModalDelete}
          message={`Anda yakin ingin menghapus barang ${form.values.name}`}
        />
      </>
    );
  }
);
