import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    setOpenDeleteModal,
    setOpenEditModal,
} from "../../../../store/features/ModalSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
    columnsPeminjamanBarang,
    dataPeminjamanBarang,
} from "../../../../utils/columns/peminjaman-barang";
import { ruanganLab } from "../../../../utils/constant";
import { usePeminjamanBarangFormContext } from "../../../../utils/context/form-context";
import { BaseModal } from "../../atoms/BaseModal/BaseModal";
import { ButtonPlus } from "../../atoms/ButtonPlus/ButtonPlus";
import { FormPeminjamanBarang } from "../../atoms/Form/FormPeminjamanBarang/FormPeminjamanBarang";
import { ModalDelete } from "../../atoms/Modal/ModalDelete/ModalDelete";
import { PageContent } from "../../atoms/PageContent";
import SelectButton from "../../atoms/SelectButton";
import CustomTable from "../../atoms/Table/CustomTable";

export const ContentPeminjamanBarang = () => {
  const [openedCreateModal, { close, open }] = useDisclosure();
  const openedEditModal = useAppSelector(
    (state) => state.modal.openedEditModal
  );
  const openedDeleteModal = useAppSelector(
    (state) => state.modal.openedDeleteModal
  );

  const dispatch = useAppDispatch();
  const form = usePeminjamanBarangFormContext();

  const data = dataPeminjamanBarang;
  // for (let i = 1; i < 10; i++) {
  //     data.push({
  //         borroweddate: new Date().toISOString(),
  //         classborrower: "TKJ 2",
  //         id: 100 + i,
  //         indate: new Date().toISOString(),
  //         itemname: "Tp Link" + i,
  //         keterangan: "Lama",
  //         name: "Zaki Fairus" + i,
  //         nomor_telepon_peminjam: "082110977215" + i,
  //         totalborrowed: 100 + i
  //     })
  // }

  return (
    <>
      <PageContent>
        <Group justify="space-between">
          <SelectButton label="Ruangan" data={ruanganLab} />
          <ButtonPlus onClick={() => open()}>Tambah Peminjaman</ButtonPlus>
        </Group>
        <CustomTable
          totalPage={10}
          loading={false}
          totalData={100}
          totalRecords={10}
          columns={columnsPeminjamanBarang()}
          data={data}
        />
      </PageContent>

      <BaseModal
        opened={openedCreateModal}
        onClose={() => {
          close();
          form.reset();
        }}
        onSubmit={() => {}}
        size={"md"}
        title="Tambah Peminjaman"
      >
        <FormPeminjamanBarang />
      </BaseModal>

      <BaseModal
        opened={openedEditModal}
        onClose={() => {
          dispatch(setOpenEditModal(false));
          form.reset();
        }}
        onSubmit={() => {}}
        size={"md"}
        title="Edit Peminjaman"
      >
        <FormPeminjamanBarang />
      </BaseModal>

      <ModalDelete
        onAccept={() => {}}
        onClose={() => {
          dispatch(setOpenDeleteModal(false));
          form.reset();
        }}
        opened={openedDeleteModal}
        message="Anda yakin ingin menghapus peminjaman"
        title="Hapus Peminjaman"
      />
    </>
  );
};
