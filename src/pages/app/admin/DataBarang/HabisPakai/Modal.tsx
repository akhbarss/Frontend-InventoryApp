import { BaseModal } from "@components/ui/atoms";
import { FormDataBarang_HabisPakai } from "@components/ui/atoms/Form/FormDataBarang_HabisPakai";
import { ModalDelete } from "@components/ui/atoms/Modal/ModalDelete/ModalDelete";
import { setOpenCreateModal, setOpenDeleteModal, setOpenEditModal } from "@store/features/modal.slice";
import { useAppDispatch, useAppSelector } from "@store/store";
import { useActionBarang } from "@utils/actions/actionsDataBarang";
import { useDataBarangHabisPakaiFormContext } from "@utils/context/data-barang-form.context";

const Modal_DataBarangHabisPakai = () => {
  const dispatch = useAppDispatch();
  const form = useDataBarangHabisPakaiFormContext();
  const { openedCreateModal, openedDeleteModal, openedEditModal } =
    useAppSelector((state) => state.modal);
  const { deleteBarang, editBarang, tambahBarang } = useActionBarang();

  const onCloseModalCreate = () => dispatch(setOpenCreateModal(false));
  const onCloseModalEdit = () => dispatch(setOpenEditModal(false));
  const onCloseModalDelete = () => dispatch(setOpenDeleteModal(false));

  return (
    <>
      {/* Modal Create */}
      <BaseModal
        size={"md"}
        resetForm={form}
        title="Tambah Barang"
        opened={openedCreateModal}
        onClose={onCloseModalCreate}
        onSubmit={form.onSubmit(tambahBarang)}
      >
        <FormDataBarang_HabisPakai />
      </BaseModal>

      {/* Modal Edit */}
      <BaseModal
        size={"md"}
        resetForm={form}
        title="Edit Barang"
        opened={openedEditModal}
        onClose={onCloseModalEdit}
        onSubmit={form.onSubmit(editBarang)}
      >
        <FormDataBarang_HabisPakai />
      </BaseModal>

      {/* Modal Delete */}
      <ModalDelete
        resetForm={form}
        onAccept={deleteBarang}
        opened={openedDeleteModal}
        onClose={onCloseModalDelete}
        message={`Anda yakin ingin menghapus barang ${form.values.name}`}
      />
    </>
  );
};
export default Modal_DataBarangHabisPakai;
