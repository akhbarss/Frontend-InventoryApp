import { Group } from "@mantine/core";
import { ButtonExport, PageContent } from "../../../../components/ui/atoms";
import PageLabel from "../../../../components/ui/atoms/PageLabel";
import Pagination from "../../../../components/ui/atoms/Pagination";
import SelectButton from "../../../../components/ui/atoms/SelectButton";
import CustomTable from "../../../../components/ui/atoms/Table/CustomTable";
import { columnsDataBarangSuperAdmin } from "../../../../utils/columns/data-barang";
import { jurusan } from "../../../../utils/constant";

const DataBarangSuperAdmin = () => {
  return (
    <>
      <PageLabel label="Data Barang" />
      <PageContent>
        <Group>
          <SelectButton onChange={() => {}} label="Jurusan" data={jurusan} />
          <ButtonExport onCancel={() => {}} onConfirm={() => {}} />
        </Group>

        <CustomTable
          loading={false}
          totalData={100}
          totalPage={10}
          totalRecords={10}
          columns={columnsDataBarangSuperAdmin()}
          data={[]}
        />

        <Pagination />
      </PageContent>
    </>
  );
};

export default DataBarangSuperAdmin;
