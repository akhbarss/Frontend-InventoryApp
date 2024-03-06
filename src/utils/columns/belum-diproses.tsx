import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
// import { useBelumDiProsesFormContext } from "../../components/context/form-context";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import { useAppDispatch } from "../../store/store";
import { createColumnHelpers } from "./columns";

export type TColBarangBelumDiProses = {
    id: number;
    nama_barang: string;
    jumlah: number | null;
    jurusan: string;
    lokasi: string;
    tanggal: string;
    keterangan: string;
}

export const columnsBarangBelumDiProses = () => {
    const dispatch = useAppDispatch()
    // const form = useBelumDiProsesFormContext()

    const col: ColumnDef<TColBarangBelumDiProses, any>[] = [
        createColumnHelpers<TColBarangBelumDiProses>().accessor("id", {
            id: "Id",
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
        createColumnHelpers<TColBarangBelumDiProses>().accessor("nama_barang", {
            id: "NamaBarang",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Nama Barang"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TColBarangBelumDiProses>().accessor("jumlah", {
            id: "Ruang",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Jumlah"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 200,
            enablePinning: false
        }),
        createColumnHelpers<TColBarangBelumDiProses>().accessor("jurusan", {
            id: "jumlah_barang",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Jurusam"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TColBarangBelumDiProses>().accessor("lokasi", {
            id: "lokasi",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Lokasi"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TColBarangBelumDiProses>().accessor("tanggal", {
            id: "tanggal",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Tanggal"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TColBarangBelumDiProses>().accessor("keterangan", {
            id: "keterangan",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Keterangan"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TColBarangBelumDiProses>().display({
            header: "Action",
            id: "action",
            cell: ({ row }) => {
                
                return (
                    <ActionButtonColTable
                        withAccept
                        withReject
                    />
                )
            },
            size: 140,
            enablePinning: true
        })
    ]
    return col
}