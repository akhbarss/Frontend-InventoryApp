import { Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { TPermintaanBarang, columnsPermintaanBarang } from "../../../../utils/columns/permintaan-barang"
import ButtonExport from "../../atoms/ButtonExport"
import { ButtonPlus } from "../../atoms/ButtonPlus/ButtonPlus"
import PageContent from "../../atoms/PageContent"
import CustomTable from "../../atoms/Table/CustomTable"
import { BaseModal } from "../../atoms/BaseModal/BaseModal"
import { FormPermintaanBarang } from "../../atoms/Form/FormPermintaanBarang/FormPermintaanBarang"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { usePermintaanBarangFormContext } from "../../../context/form-context"
import { setOpenEditModal } from "../../../../store/features/ModalSlice"



export const ContentNonATK = () => {
    const [opened, { close, open }] = useDisclosure()
    const dispatch = useAppDispatch()
    const openedModalEdit = useAppSelector(state => state.modal.openedEditModal)
    const openedModalDelete = useAppSelector(state => state.modal.openedDeleteModal)

    const form = usePermintaanBarangFormContext()

    const data: TPermintaanBarang[] = []
    for (let i = 1; i < 10; i++) {
        data.push({
            id: i,
            nama_barang: "buku" + i,
            jumlah_barang: i,
            lokasi: "string" + i,
            keterangan: "string" + i,
            status: "string" + i,
        })
    }

    return (
        <PageContent>
            <Group justify="space-between">
                <Group>
                    <ButtonExport onCancel={() => { }} onConfirm={() => { }} />
                </Group>
                <ButtonPlus
                    onClick={() => {
                        open()
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

            <BaseModal
                onSubmit={() => { }}
                size={"lg"}
                title="Tambah Permintaan"
                opened={opened}
                onClose={() => {
                    close()
                    form.reset()
                }}
            >
                <FormPermintaanBarang />
            </BaseModal>

            {/* MOdal Edit */}
            <BaseModal
                onSubmit={() => { }}
                size={"lg"}
                title="Edit Permintaan"
                opened={openedModalEdit}
                onClose={() => {
                    dispatch(setOpenEditModal(false))
                    form.reset()
                }}
            >
                <FormPermintaanBarang />
            </BaseModal>
        </PageContent>
    )
}
