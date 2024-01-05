import { Group } from "@mantine/core"
import { TDataBarang, columnsDataBarang } from "../../utils/columns"
import CustomTable from "../atoms/CustomTable"
import PageContent from "../atoms/PageContent"
import SelectButtonJurusan from "../atoms/SelectButton"
import ButtonExport from "../atoms/ButtonExport"
import Pagination from "../atoms/Pagination"

const ContentDataBarang = () => {
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
        <PageContent>
            <Group>
                <SelectButtonJurusan />
                <ButtonExport />
            </Group>

            <CustomTable
                loading={false}
                totalData={100}
                totalPage={10}
                totalRecords={10}
                columns={columnsDataBarang}
                data={data}

            />
            <Pagination />
        </PageContent>
    )
}

export default ContentDataBarang