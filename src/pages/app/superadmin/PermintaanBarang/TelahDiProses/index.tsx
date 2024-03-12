import { Group } from "@mantine/core";
import { ButtonExport, PageContent } from "../../../../../components/ui/atoms";
import PageLabel from "../../../../../components/ui/atoms/PageLabel";
import CustomTable from "../../../../../components/ui/atoms/Table/CustomTable";
import { columnsBarangTelahDiProses } from "../../../../../utils/columns/telah-diproses";

const TelahDiProsesPage = () => {
  return (
    <>
      <PageLabel label="Telah di Proses" />
      <PageContent>
        <Group justify="space-between">
          <ButtonExport onCancel={() => {}} onConfirm={() => {}} />
        </Group>
        <CustomTable
          loading={false}
          totalData={100}
          totalPage={10}
          totalRecords={10}
          columns={columnsBarangTelahDiProses()}
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
    </>
  );
};

export default TelahDiProsesPage;
