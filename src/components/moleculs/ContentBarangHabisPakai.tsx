import { Group } from "@mantine/core"
import PageContent from "../atoms/PageContent"
import ActionButtonBarangKeluar from "../atoms/ActionButtonBarangKeluar"
import ButtonExport from "../atoms/ButtonExport"
import CustomTable from "../atoms/CustomTable"
import { columnsDataBarang } from "../../utils/columns"
import Pagination from "../atoms/Pagination"

const ContentBarangHabisPakai = () => {
    return (
        <PageContent>
            <Group justify="space-between">
                <ActionButtonBarangKeluar />

                <ButtonExport />
            </Group>
            <CustomTable
                data={[]}
                totalData={100}
                totalPage={100}
                totalRecords={100}
                loading={false}
                columns={columnsDataBarang}
            />

            <Pagination />
        </PageContent>
    )
}

export default ContentBarangHabisPakai