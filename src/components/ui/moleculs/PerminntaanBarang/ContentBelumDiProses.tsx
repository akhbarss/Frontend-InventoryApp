import { Group } from "@mantine/core";
import { columnsBarangBelumDiProses } from "../../../../utils/columns/permintaan-barang.superadmin.columns";
import { ButtonExport } from "../../atoms/ButtonExport/ButtonExport";
import { PageContent } from "../../atoms/PageContent";
import CustomTable from "../../atoms/Table/CustomTable";

export const ContentBelumDiProses = () => {
  return (
    <PageContent>
      <Group>
        {/* <SelectButton  data={[]} label="Jurusan" /> */}
        <ButtonExport onCancel={() => {}} onConfirm={() => {}} />
      </Group>

      <CustomTable
        loading={false}
        totalData={100}
        totalPage={10}
        totalRecords={10}
        columns={columnsBarangBelumDiProses()}
        data={[
          {
            id: 1,
            jumlah: 1,
            jurusan: "tkj",
            keterangan: "bagus",
            lokasi: "lab2",
            nama_barang: "monitro",
            tanggal: "25 november",
          },
        ]}
      />
    </PageContent>
  );
};
