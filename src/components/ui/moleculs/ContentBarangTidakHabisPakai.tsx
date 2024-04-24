import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "../../../store/store";
import { columnsBarangTidakHabisPakai } from "../../../utils/columns/barang-tidak-habis-pakai";
import { useBarangKeluarTidakHabisPakaiFormContext } from "../../../utils/context/form-context";

import {
    setOpenDeleteModal,
    setOpenEditModal,
} from "../../../store/features/modal.slice";
import { BaseModal } from "../atoms/BaseModal/BaseModal";
import ActionButtonBarangKeluar from "../atoms/ButtonBarangKeluar/ButtonBarangKeluar";
import { ButtonExport } from "../atoms/ButtonExport/ButtonExport";
import { FormTambahBarangKeluarTidakHabisPakai } from "../atoms/Form/FormTambahBarangKeluarTidakHabisPakai/FormTambahBarangKeluarTidakHabisPakai";
import { ModalDelete } from "../atoms/Modal/ModalDelete/ModalDelete";
import { PageContent } from "../atoms/PageContent";
import CustomTable from "../atoms/Table/CustomTable";

const ContentBarangTidakHabisPakai = () => {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure();
  const openedEditModal = useAppSelector(
    (state) => state.modal.openedEditModal
  );
  const openedDeleteModal = useAppSelector(
    (state) => state.modal.openedDeleteModal
  );

  const form = useBarangKeluarTidakHabisPakaiFormContext();

  const onSubmitTambahBarangKeluar = (e: typeof form.values) => {
    console.log(e);
  };
  const onSubmitEditBarangKeluar = (e: typeof form.values) => {
    console.log(e);
  };

  return (
    <PageContent>
      <Group justify="space-between">
        <ButtonExport onCancel={() => {}} onConfirm={() => {}} />

        <ActionButtonBarangKeluar onClick={() => open()} />
      </Group>
      <CustomTable
        data={[
          {
            id: 1,
            nama_barang: "rgg45",
            jumlah_barang: 100,
            jumlah_keluar: 10,
            ruang_peminjaman: "",
            sisa_barang: 10,
            tanggal_keluar: "",
            nama_peminjam: "",
            tanggal_masuk: "",
          },
        ]}
        totalData={100}
        totalPage={100}
        totalRecords={100}
        loading={false}
        columns={columnsBarangTidakHabisPakai()}
      />

      {/* <Pagination /> */}

      {/* Modal Create */}
      <BaseModal
        resetForm={form}
        size={"60rem"}
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title="Tambah Barang Keluar"
        onSubmit={form.onSubmit(onSubmitTambahBarangKeluar)}
      >
        <FormTambahBarangKeluarTidakHabisPakai />
      </BaseModal>

      {/* Modal Edit */}
      <BaseModal
        resetForm={form}
        size={"60rem"}
        opened={openedEditModal}
        onClose={() => {
          dispatch(setOpenEditModal(false));
          form.reset();
        }}
        title="Edit Barang Keluar"
        onSubmit={form.onSubmit(onSubmitEditBarangKeluar)}
      >
        <FormTambahBarangKeluarTidakHabisPakai />
      </BaseModal>

      <ModalDelete
        opened={openedDeleteModal}
        resetForm={form}
        onAccept={() => {}}
        onClose={() => {
          dispatch(setOpenDeleteModal(false));
          form.reset();
        }}
      />
    </PageContent>
  );
};

export default ContentBarangTidakHabisPakai;
