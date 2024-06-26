import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { columnsBarangHabisPakai } from "../../../utils/columns/barang-habis-pakai";
import { useBarangKeluarHabisPakaiFormContext } from "../../../utils/context/form-context";

import {
  setOpenDeleteModal,
  setOpenEditModal,
} from "../../../store/features/modal.slice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { BaseModal } from "../atoms/BaseModal/BaseModal";
import ActionButtonBarangKeluar from "../atoms/ButtonBarangKeluar/ButtonBarangKeluar";
import { ButtonExport } from "../atoms/ButtonExport/ButtonExport";
import { FormTambahBarangKeluarHabisPakai } from "../atoms/Form/FormTambahBarangKeluarHabisPakai/FormTambahBarangKeluarHabisPakai";
import { ModalDelete } from "../atoms/Modal/ModalDelete/ModalDelete";
import { PageContent } from "../atoms/PageContent";
import CustomTable from "../atoms/Table/CustomTable";

const ContentBarangHabisPakai = () => {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure();
  const openedEditModal = useAppSelector(
    (state) => state.modal.openedEditModal
  );
  const openedDeleteModal = useAppSelector(
    (state) => state.modal.openedDeleteModal
  );

  const form = useBarangKeluarHabisPakaiFormContext();

  const onSubmitTambahBarangKeluar = (e: typeof form.values) => {
    console.log(e);
  };
  const onSubmitEditBarangKeluar = (e: typeof form.values.barangKeluar) => {
    console.log(e);
  };

  return (
    <PageContent>
      <Group justify="space-between">
        <ButtonExport onCancel={() => {}} onConfirm={() => {}} />
        <ActionButtonBarangKeluar onClick={open} />
      </Group>

      <CustomTable
        data={[
          {
            id: 1,
            nama_barang: "rgg45",
            jumlah_barang: 100,
            jumlah_keluar: 10,
            ruang_peminjaman: "Lab 1",
            sisa_barang: 10,
            tanggal_keluar: "12910923",
          },
        ]}
        totalData={100}
        totalPage={100}
        totalRecords={100}
        loading={false}
        columns={columnsBarangHabisPakai()}
      />

      {/* <Pagination /> */}

      <BaseModal
        resetForm={form}
        size={"lg"}
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title="Tambah Barang Keluar"
        onSubmit={form.onSubmit(onSubmitTambahBarangKeluar)}
      >
        <FormTambahBarangKeluarHabisPakai />
      </BaseModal>

      <BaseModal
        resetForm={form}
        size={"lg"}
        opened={openedEditModal}
        onClose={() => {
          dispatch(setOpenEditModal(false));
          form.reset();
        }}
        title="Edit Barang Keluar"
        onSubmit={form.onSubmit((e) =>
          onSubmitEditBarangKeluar(e.barangKeluar)
        )}
      >
        <></>
        {/* <FormEditBarangKeluarHabisPakai /> */}
      </BaseModal>

      <ModalDelete
        resetForm={form}
        opened={openedDeleteModal}
        onAccept={() => {
          console.log("accept");
          dispatch(setOpenDeleteModal(false));
        }}
        onClose={() => {
          dispatch(setOpenDeleteModal(false));
          form.reset();
        }}
      />
    </PageContent>
  );
};

export default ContentBarangHabisPakai;
