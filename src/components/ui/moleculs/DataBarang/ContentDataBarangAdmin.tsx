import {
  setOpenCreateModal,
  setOpenDeleteModal,
  setOpenEditModal,
} from "../../../../store/features/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { TDataBarang, columnsDataBarangAdmin } from "../../../../utils/columns/data-barang";
import { useDataBarangFormContext } from "../../../../utils/context/form-context";
import {
  useActionBarang,
  dataBarangAdmin,
} from "../../../../utils/actions/actionsDataBarang";
import { PageContent } from "../../atoms";
import { BaseModal } from "../../atoms/BaseModal/BaseModal";
import { FormDataBarang } from "../../atoms/Form/FormDataBarang";
import { ModalDelete } from "../../atoms/Modal/ModalDelete/ModalDelete";
import Pagination from "../../atoms/Pagination";
import CustomTable from "../../atoms/Table/CustomTable";
import { HeadDataBarang } from "./HeadDataBarangAdmin";
import { useState } from "react";

const ContentDataBarang = () => {
  const dispatch = useAppDispatch();
  const form = useDataBarangFormContext();
  const [data, setData] = useState<TDataBarang[]>(dataBarangAdmin)

  const openedCreateModal = useAppSelector(
    (state) => state.modal.openedCreateModal
  );
  const openedEditModal = useAppSelector(
    (state) => state.modal.openedEditModal
  );
  const openedDeleteModal = useAppSelector(
    (state) => state.modal.openedDeleteModal
  );

  const modals = (
    <>
      {/* Modal Create */}
      <BaseModal
        size={"md"}
        opened={openedCreateModal}
        onClose={() => {
          dispatch(setOpenCreateModal(false));
          form.reset();
        }}
        title="Tambah Barang"
        onSubmit={form.onSubmit(() => {
          useActionBarang().tambahBarang
        })}
      >
        <FormDataBarang />
      </BaseModal>

      {/* Modal Edit */}
      <BaseModal
        size={"md"}
        opened={openedEditModal}
        onClose={() => {
          dispatch(setOpenEditModal(false));
          form.reset();
        }}
        title="Edit Barang"
        onSubmit={form.onSubmit(useActionBarang().editBarang)}
      >
        <FormDataBarang />
      </BaseModal>

      {/* Modal Delete */}
      <ModalDelete
        opened={openedDeleteModal}
        message={`Anda yakin ingin menghapus barang ${form.values.nama_barang}`}
        onAccept={() => {
          dataBarangAdmin.map((item) => {
            return item.id !== form.values.id;
          });
          dispatch(setOpenDeleteModal(false));
        }}
        onClose={() => {
          dispatch(setOpenDeleteModal(false));
          form.reset();
        }}
      />
    </>
  );

  return (
    <PageContent>
      <HeadDataBarang />

      <CustomTable
        loading={false}
        totalData={100}
        totalPage={10}
        totalRecords={10}
        columns={columnsDataBarangAdmin()}
        data={dataBarangAdmin}
      />

      <Pagination />

      {modals}
    </PageContent>
  );
};

export default ContentDataBarang;
