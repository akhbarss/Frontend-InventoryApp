import { Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { columnsManajemenAdmin, dataManajemenTManajemenAdmin } from "../../../../utils/columns/manajemen-admin"
import { useManajemenAdminFormContext } from "../../../../utils/context/form-context"
import { BaseModal } from "../../atoms/BaseModal/BaseModal"
import { ButtonPlus } from "../../atoms/ButtonPlus/ButtonPlus"
import { FormManajemenAdmin } from "../../atoms/Form/FormManajemenAdmin/FormManajemenAdmin"
import { PageContent } from "../../atoms/PageContent"
import CustomTable from "../../atoms/Table/CustomTable"
import { setOpenDeleteModal, setOpenEditModal } from "../../../../store/features/ModalSlice"
import { ModalDelete } from "../../atoms/Modal/ModalDelete/ModalDelete"

export const ContentManajemenAdmin = () => {
    const [openedCreate, { close, open }] = useDisclosure()
    const openedEdit = useAppSelector(state => state.modal.openedEditModal)
    const openedDelete = useAppSelector(state => state.modal.openedDeleteModal)

    const dispatch = useAppDispatch()
    const form = useManajemenAdminFormContext()

    return (
        <PageContent >
            <Group justify="end">
                <ButtonPlus onClick={() => open()}>
                    Tambah Admin
                </ButtonPlus>
            </Group>

            <CustomTable
                loading={false}
                totalData={100}
                totalPage={10}
                totalRecords={10}
                columns={columnsManajemenAdmin()}
                data={dataManajemenTManajemenAdmin}
            />

            <BaseModal
                onClose={() => {
                    close()
                    form.reset()
                }}
                opened={openedCreate}
                onSubmit={() => { }}
                size={"md"}
                title="Tambah Admin"
            >
                <FormManajemenAdmin />
            </BaseModal>
            <BaseModal
                onClose={() => {
                    dispatch(setOpenEditModal(false))
                    form.reset()
                }}
                opened={openedEdit}
                onSubmit={() => { }}
                size={"md"}
                title="Edit Admin"
            >
                <FormManajemenAdmin />
            </BaseModal>

            <ModalDelete
                onAccept={() => { }}
                onClose={() => { 
                    dispatch(setOpenDeleteModal(false))
                }}
                opened={openedDelete}
                message={`Anda yakin ingin menghapus admin ${form.values.name}?`}
                title="Hapus Admin"
            />
        </PageContent >
    )
}
