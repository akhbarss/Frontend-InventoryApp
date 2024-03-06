import { Group } from "@mantine/core"
import { ButtonExport }from "../../../components/ui/atoms/ButtonExport/ButtonExport"
import { PageContent } from "../../../components/ui/atoms/PageContent"
import PageLabel from "../../../components/ui/atoms/PageLabel"
import Pagination from "../../../components/ui/atoms/Pagination"
import SelectButton from "../../../components/ui/atoms/SelectButton"
import CustomTable from "../../../components/ui/atoms/Table/CustomTable"
import { TDataBarang, columnsDataBarangSuperAdmin } from "../../../utils/columns/data-barang"
import { jurusan } from "../../../utils/constant"

const DataBarangSuperAdmin = () => {
    const data: TDataBarang[] = []
    for (let index = 1; index < 20; index++) {
        data.push({
            id: index,
            jumlah: index + 100,
            keterangan: "bagus",
            kode_barang: "039jd20dehdibi",
            lokasi: "LAB 1",
            nama_barang: "ROuter"
        })
    }

    return (
        <>
            <PageLabel label="Data Barang" />
            <PageContent>
                <Group >
                        <SelectButton label="Jurusan" data={jurusan} />
                    <ButtonExport onCancel={() => { }} onConfirm={() => { }} />
                </Group>

                <CustomTable
                    loading={false}
                    totalData={100}
                    totalPage={10}
                    totalRecords={10}
                    columns={columnsDataBarangSuperAdmin()}
                    data={data}

                />

                <Pagination />
            </PageContent>
        </>
    )
}

export default DataBarangSuperAdmin