import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { useManajemenAdminFormContext } from "../context/form-context";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import { setOpenDeleteModal, setOpenEditModal } from "../../store/features/ModalSlice";
import { useAppDispatch } from "../../store/store";
import { createColumnHelpers } from "./columns";

export type TManajemenAdmin = {
    id: number;
    nama_admin: string;
    jurusan: string;
    tanggal_pembuatan: string;
    username: string;
}

export const columnsManajemenAdmin = (): ColumnDef<TManajemenAdmin, any>[] => {
    const dispatch = useAppDispatch()
    const form = useManajemenAdminFormContext()

    return [
        createColumnHelpers<TManajemenAdmin>().accessor("id", {
            id: "id",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="ID"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 90,
            enablePinning: false
        }),
        createColumnHelpers<TManajemenAdmin>().accessor("nama_admin", {
            id: "name",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Nama"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 80,
            enablePinning: false
        }),
        createColumnHelpers<TManajemenAdmin>().accessor("jurusan", {
            id: "jurusan",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Jurusan"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 120,
            enablePinning: false
        }),
        createColumnHelpers<TManajemenAdmin>().accessor("tanggal_pembuatan", {
            id: "tanggal",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Tanggal Pembuatan"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 190,
            enablePinning: false
        }),
        createColumnHelpers<TManajemenAdmin>().accessor("username", {
            id: "username",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Username"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 120,
            enablePinning: false
        }),
        createColumnHelpers<TManajemenAdmin>().display({
            header: "Action",
            id: "action",
            cell: ({ row }) => {
                const { id, jurusan, nama_admin, username, } = row.original
                return (
                    <ActionButtonColTable
                        onClickDelete={() => {
                            dispatch(setOpenDeleteModal(true))
                            form.setValues({
                                id,
                                jurusan,
                                name: nama_admin,
                                username
                            })
                        }}
                        onClickSetting={() => {
                            dispatch(setOpenEditModal(true))
                            form.setValues({
                                id,
                                jurusan,
                                name: nama_admin,
                                username
                            })
                        }}
                        withDelete
                        withSetting
                    />
                )
            },
            size: 80,
            enablePinning: true
        })
    ]
}

export const dataManajemenTManajemenAdmin: TManajemenAdmin[] = [
    {
        id: 1,
        jurusan: "TKJ",
        nama_admin: "Akbar",
        tanggal_pembuatan: "2 januari",
        username: "akkbar"
    }
]