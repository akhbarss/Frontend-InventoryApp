import { BaseModal, FormDataBarang } from "@components/ui/atoms";
import { ModalDetailImage } from "@components/ui/atoms/Modal/DetailImageModal/ModalDetailImage";
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
    console.log("modal");
    const form = useDataBarangFormContext();
    const { deleteBarang, editBarang, tambahBarang } = useActionBarang();
    const {
      openedDetailImage,
      openedEdit,
      openedCreate,
      openedDelete,
      closeModalEdit,
      closeModalCreate,
      closeModalDelete,
      closeModalDetailImage,
    } = useModal();

    const formDataBarang = useMemo(
      () => <FormDataBarang categoryItem={categoryItem} />,
      [categoryItem]
    );

    const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/images/${
      form.values.item_image
    }`;

    console.log(form.values)

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

        {/* Modal Detail Image */}
        <ModalDetailImage
          opened={openedDetailImage}
          onClose={closeModalDetailImage}
          imageUrl={imageUrl}
        />

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
