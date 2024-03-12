import { Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  TPermintaanBarang,
  columnsPermintaanBarang,
} from "../../../../utils/columns/permintaan-barang";
import { setOpenEditModal } from "../../../../store/features/modal.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { usePermintaanBarangFormContext } from "../../../../utils/context/form-context";

import {
  BaseModal,
  ButtonExport,
  ButtonPlus,
  FormPermintaanBarang,
  PageContent,
} from "../../atoms";
import CustomTable from "../../atoms/Table/CustomTable";

export const ContentAtk = () => {
  const [opened, { close, open }] = useDisclosure();
  const dispatch = useAppDispatch();
  const openedModalEdit = useAppSelector(
    (state) => state.modal.openedEditModal
  );

  const form = usePermintaanBarangFormContext();

  const data: TPermintaanBarang[] = [];
  for (let i = 1; i < 10; i++) {
    data.push({
      id: i,
      nama_barang: "buku" + i,
      jumlah_barang: i,
      lokasi: "string" + i,
      keterangan: "string" + i,
      status: "string" + i,
    });
  }

  return (
    <PageContent>
      <Group justify="space-between">
        <Group>
          <ButtonExport onCancel={() => {}} onConfirm={() => {}} />
        </Group>
        <ButtonPlus
          onClick={() => {
            open();
          }}
        >
          Ajukan Barang
        </ButtonPlus>
      </Group>
      <CustomTable
        loading={false}
        totalData={100}
        totalPage={10}
        totalRecords={10}
        columns={columnsPermintaanBarang()}
        data={data}
      />

      {/* MOdal Create */}
      <BaseModal
        onSubmit={() => {}}
        size={"md"}
        title="Tambah Permintaan"
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
      >
        <FormPermintaanBarang />
      </BaseModal>

      {/* MOdal Edit */}
      <BaseModal
        onSubmit={() => {}}
        size={"md"}
        title="Edit Permintaan"
        opened={openedModalEdit}
        onClose={() => {
          dispatch(setOpenEditModal(false));
          form.reset();
        }}
      >
        <FormPermintaanBarang />
      </BaseModal>
    </PageContent>
  );
};
