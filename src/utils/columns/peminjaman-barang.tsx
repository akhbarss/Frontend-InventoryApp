import { Text } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import { formatFullDate } from "../format-date";
import { createColumnHelpers } from "./columns";
import { useAppDispatch } from "../../store/store";
import { setOpenDeleteModal, setOpenEditModal } from "../../store/features/ModalSlice";

export type TPeminjamanBarang = {
    id: number;
    name: string;
    classborrower: string;
    itemname: string;
    totalborrowed: number;
    borroweddate: string;
    indate: string;
    keterangan: string;
    nomor_telepon_peminjam: string;
}

export const columnsPeminjamanBarang = (): ColumnDef<TPeminjamanBarang, any>[] => {
    const dispatch = useAppDispatch()

    
    return [
        createColumnHelpers<TPeminjamanBarang>().accessor("id", {
            id: "id",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="ID"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 80,
            enablePinning: false
        }),
        createColumnHelpers<TPeminjamanBarang>().accessor("name", {
            id: "name",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Nama"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            cell: (cell) => <Text truncate>{cell.getValue()}</Text>,
            size: 250,
            enablePinning: false
        }),
        createColumnHelpers<TPeminjamanBarang>().accessor("classborrower", {
            id: "classborrower",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Kelas"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 80,
            enablePinning: false
        }),
        createColumnHelpers<TPeminjamanBarang>().accessor("itemname", {
            id: "itemname",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Barang"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TPeminjamanBarang>().accessor("totalborrowed", {
            id: "totalborrowed",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Total"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 80,
            enablePinning: false
        }),
        createColumnHelpers<TPeminjamanBarang>().accessor("indate", {
            id: "indate",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Tanggal Pinjam"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            cell: (col) => (
                <span>
                    {formatFullDate(col.getValue())}
                </span>
            ),
            size: 150,
            enablePinning: false
        }),
        createColumnHelpers<TPeminjamanBarang>().accessor("keterangan", {
            id: "keterangan",
            header: "Keterangan",
            enablePinning: false
        }),
        createColumnHelpers<TPeminjamanBarang>().accessor("nomor_telepon_peminjam", {
            id: "nomor_telepon_peminjam",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="No Telp"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TPeminjamanBarang>().display({
            header: "Action",
            id: "action",
            cell: () => {
                return (
                    <ActionButtonColTable
                        onClickDelete={() => { 
                            dispatch(setOpenDeleteModal(true))
                        }}
                        onClickSetting={() => { 
                            dispatch(setOpenEditModal(true))
                        }}
                        withAccept
                    />
                )
            },
            size: 130,
            enablePinning: true
        })
    ]
}

export const dataPeminjamanBarang: TPeminjamanBarang[] = [
    {
        borroweddate: new Date().toISOString(),
        classborrower: "TKJ 3",
        id: 1,
        indate: new Date().toISOString(),
        itemname: "Mikrotik",
        keterangan: "baru",
        name: "Muhammad Akhbar Firdaus Muhammad Akhbar Firdaus",
        nomor_telepon_peminjam: "082110977214",
        totalborrowed: 1
    },
    {
        borroweddate: new Date().toISOString(),
        classborrower: "TKJ 2",
        id: 2,
        indate: new Date().toISOString(),
        itemname: "Tp Link",
        keterangan: "Lama",
        name: "Zaki Fairus",
        nomor_telepon_peminjam: "082110977215",
        totalborrowed: 1
    },
]