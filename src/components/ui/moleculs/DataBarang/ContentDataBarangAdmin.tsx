// import { useQuery } from "@tanstack/react-query";
// import {
//   setOpenCreateModal,
//   setOpenDeleteModal,
//   setOpenEditModal,
// } from "../../../../store/features/modal.slice";
// import { useAppDispatch, useAppSelector } from "../../../../store/store";
// import {
//   useActionBarang
// } from "../../../../utils/actions/actionsDataBarang";
// import { getItems } from "../../../../utils/api/items";
// import { columnsDataBarangAdmin } from "../../../../utils/columns/data-barang";
// import { useDataBarangFormContext } from "../../../../utils/context/form-context";
// import { CategoryItem } from "../../../../utils/types/items.type";
// import { PageContent } from "../../atoms";
// import { BaseModal } from "../../atoms/BaseModal/BaseModal";
// import { FormDataBarang } from "../../atoms/Form/FormDataBarang";
// import { ModalDelete } from "../../atoms/Modal/ModalDelete/ModalDelete";
// import Pagination from "../../atoms/Pagination";
// import CustomTable from "../../atoms/Table/CustomTable";
// import { HeadDataBarang } from "./HeadDataBarangAdmin";

// const ContentDataBarang = () => {
//   const dispatch = useAppDispatch();
//   const form = useDataBarangFormContext();
//   const {deleteBarang,editBarang,tambahBarang} = useActionBarang()

//   const { data } = useQuery({
//     queryKey: ["get_items"],
//     queryFn: () =>
//       getItems({
//         category: CategoryItem.BARANG_HABIS_PAKAI,
//         orderBy: "ASC",
//         page: 1,
//         take: 50,
//       }),
//   });

//   const isLoadingClsRoom = useAppSelector((state) => state.class.loading);
//   const rooms = useAppSelector((state) => state.class.classes);
//   const { openedCreateModal, openedDeleteModal, openedEditModal } =
//     useAppSelector((state) => state.modal);

//   const modals = (
//     <>
//       {/* Modal Create */}
//       <BaseModal
//         size={"md"}
//         opened={openedCreateModal}
//         onClose={() => {
//           dispatch(setOpenCreateModal(false));
//           form.reset();
//         }}
//         title="Tambah Barang"
//         onSubmit={form.onSubmit(tambahBarang)}
//       >
//         <FormDataBarang />
//       </BaseModal>

//       {/* Modal Edit */}
//       <BaseModal
//         size={"md"}
//         opened={openedEditModal}
//         onClose={() => {
//           dispatch(setOpenEditModal(false));
//           form.reset();
//         }}
//         title="Edit Barang"
//         onSubmit={form.onSubmit(useActionBarang().editBarang)}
//       >
//         <FormDataBarang />
//       </BaseModal>

//       {/* Modal Delete */}
//       <ModalDelete
//         opened={openedDeleteModal}
//         message={`Anda yakin ingin menghapus barang ${form.values.name}`}
//         onAccept={() => {
//           useActionBarang().deleteBarang
//         }}
//         onClose={() => {
//           dispatch(setOpenDeleteModal(false));
//           form.reset();
//         }}
//       />
//     </>
//   );

//   return (
//     <PageContent>
//       <HeadDataBarang />

//       <CustomTable
//         loading={false}
//         totalData={100}
//         totalPage={10}
//         totalRecords={10}
//         columns={columnsDataBarangAdmin()}
//         data={data?.data!}
//       />

//       <Pagination />

//       {modals}
//     </PageContent>
//   );
// };

// export default ContentDataBarang;
