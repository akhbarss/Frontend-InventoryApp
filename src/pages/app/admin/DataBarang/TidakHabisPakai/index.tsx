import { useQuery } from "@tanstack/react-query";
import { BaseModal, PageContent } from "../../../../../components/ui/atoms";
import { FormDataBarang_HabisPakai } from "../../../../../components/ui/atoms/Form/FormDataBarang_HabisPakai";
import { ModalDelete } from "../../../../../components/ui/atoms/Modal/ModalDelete/ModalDelete";
import Pagination from "../../../../../components/ui/atoms/Pagination";
import CustomTable from "../../../../../components/ui/atoms/Table/CustomTable";
import { HeadDataBarang } from "../../../../../components/ui/moleculs/DataBarang/HeadDataBarangAdmin";
import {
  setOpenCreateModal,
  setOpenDeleteModal,
  setOpenEditModal,
} from "../../../../../store/features/modal.slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { useActionBarang } from "../../../../../utils/actions/actionsDataBarang";
import { getItems } from "../../../../../utils/api/items";
import { columnsDataBarangAdmin } from "../../../../../utils/columns/data-barang";
import {
  DataBarangHabisPakaiFormProvider,
  useDataBarangHabisPakaiFormContext,
  useDataBarangTidakHabisPakaiForm,
} from "../../../../../utils/context/data-barang-form.context";
import { CategoryItem } from "../../../../../utils/types/items.type";
import PageLabel from "../../../../../components/ui/atoms/PageLabel";

const Modal = () => {
  const dispatch = useAppDispatch();
  const { deleteBarang, editBarang, tambahBarang } = useActionBarang();
  const form = useDataBarangHabisPakaiFormContext();
  const rooms = useAppSelector((state) => state.class.classes);
  const { openedCreateModal, openedDeleteModal, openedEditModal } =
    useAppSelector((state) => state.modal);

  return (
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
        onSubmit={form.onSubmit(tambahBarang)}
      >
        <FormDataBarang_HabisPakai />
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
        <FormDataBarang_HabisPakai />
      </BaseModal>

      {/* Modal Delete */}
      <ModalDelete
        opened={openedDeleteModal}
        message={`Anda yakin ingin menghapus barang ${form.values.name}`}
        onAccept={() => {
          useActionBarang().deleteBarang;
        }}
        onClose={() => {
          dispatch(setOpenDeleteModal(false));
          form.reset();
        }}
      />
    </>
  );
};

const Content = () => {
  const { data } = useQuery({
    queryKey: [
      "get_items",
      {
        category: CategoryItem.BARANG_TIDAK_HABIS_PAKAI,
      },
    ],
    queryFn: () =>
      getItems({
        category: CategoryItem.BARANG_TIDAK_HABIS_PAKAI,
        orderBy: "ASC",
        page: 1,
        take: 50,
      }),
  });
  console.log({data})

  return (
    <>
      <PageContent>
        <HeadDataBarang />

        <CustomTable
          loading={false}
          totalData={100}
          totalPage={10}
          totalRecords={10}
          columns={columnsDataBarangAdmin()}
          data={data?.data!}
        />

        <Pagination />
      </PageContent>

      <Modal />
    </>
  );
};

const DataBarang_TidakHabisPakai = () => {
  console.log("DataBarang_TidakHabisPakai");

  const form = useDataBarangTidakHabisPakaiForm();
  return (
    <>
      <PageLabel label="Data Barang - Habis Pakai" />
      <DataBarangHabisPakaiFormProvider form={form}>
        <Content />
      </DataBarangHabisPakaiFormProvider>
    </>
  );
};

export default DataBarang_TidakHabisPakai;
