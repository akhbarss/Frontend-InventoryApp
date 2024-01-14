import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"

import { setLoading } from "../../../../store/features/LoadingSlice"
import { setOpenDeleteModal, setOpenEditModal } from "../../../../store/features/ModalSlice"
import { useAppDispatch, useAppSelector } from "../../../../store/store"

import { TDataBarang, columnsDataBarangAdmin } from "../../../../utils/columns/data-barang"
import { useDataBarangFormContext } from "../../../context/form-context"

import { BaseModal } from "../../atoms/BaseModal/BaseModal"
import { FormDataBarang } from "../../atoms/Form/FormDataBarang"
import { ModalDeleteBarang } from "../../atoms/Modal/ModalDeleteBarang/ModalDeleteBaranng"
import PageContent from "../../atoms/PageContent"
import Pagination from "../../atoms/Pagination"
import CustomTable from "../../atoms/Table/CustomTable"
import { HeadDataBarang } from "./HeadDataBarangAdmin"

const ContentDataBarang = () => {
    const [openedCreateModal, { close, open }] = useDisclosure()

    const form = useDataBarangFormContext();

    const dispatch = useAppDispatch()
    const openedEditModal = useAppSelector(state => state.modal.openedEditModal)
    const openedDeleteModal = useAppSelector(state => state.modal.openedDeleteModal)

    const data: TDataBarang[] = []
    for (let index = 1; index < 20; index++) {
        data.push({
            id: index,
            jumlah: index + 100,
            keterangan: "bagus",
            kode_barang: "039jd20dehdibi" + index,
            lokasi: "LAB " + index,
            nama_barang: "ROuter" + index
        })
    }

    const onClickTambahBarang = () => open()

    const onSubmitTambahBarang = () => {
        dispatch(setLoading(true))
        setTimeout(() => {
            dispatch(setLoading(false))
            close()
            notifications.show({
                message: "success", color: "green"
            })
        }, 5000);
    }

    const onSubmitEditBarang = () => {
        dispatch(setLoading(true))
        setTimeout(() => {
            dispatch(setLoading(false))
            dispatch(setOpenEditModal(false))
            notifications.show({
                message: "success", color: "green"
            })
        }, 5000);

    }

    return (
        <PageContent>
            <HeadDataBarang onClickTambahBarang={onClickTambahBarang} />
            <CustomTable
                loading={false}
                totalData={100}
                totalPage={10}
                totalRecords={10}
                columns={columnsDataBarangAdmin()}
                data={data}
            />
            <Pagination />

            {/* Modal Create */}
            <BaseModal
                size={"md"}
                opened={openedCreateModal}
                onClose={() => {
                    close()
                    form.reset()
                }}
                title="Tambah Barang"
                onSubmit={form.onSubmit(onSubmitTambahBarang)}
            >
                <FormDataBarang />
            </BaseModal>

            {/* Modal Edit */}
            <BaseModal
                size={"md"}
                opened={openedEditModal}
                onClose={() => {
                    dispatch(setOpenEditModal(false))
                    form.reset()
                }}
                title="Edit Barang"
                onSubmit={form.onSubmit(onSubmitEditBarang)}
            >
                <FormDataBarang />
            </BaseModal>

            <ModalDeleteBarang
                opened={openedDeleteModal}
                onAccept={() => {
                    console.log("accept")
                    dispatch(setOpenDeleteModal(false))
                }}
                onClose={() => {
                    dispatch(setOpenDeleteModal(false))
                    form.reset()
                }}
            />
        </PageContent>
    )
}

export default ContentDataBarang