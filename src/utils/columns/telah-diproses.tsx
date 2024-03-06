import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
// import { useTelahDiProsesFormContext } from "../../components/context/form-context";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { useAppDispatch } from "../../store/store";
import { createColumnHelpers } from "./columns";

export type TColBarangTelahDiProses = {
    id: number;
    nama_barang: string;
    jumlah: number | null;
    jurusan: string;
    lokasi: string;
    tanggal: string;
    keterangan: string;
}

export const columnsBarangTelahDiProses = () => {
    const dispatch = useAppDispatch()
    // const form = useTelahDiProsesFormContext()

    const col: ColumnDef<TColBarangTelahDiProses, any>[] = [
        createColumnHelpers<TColBarangTelahDiProses>().accessor("id", {
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
        createColumnHelpers<TColBarangTelahDiProses>().accessor("nama_barang", {
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
        createColumnHelpers<TColBarangTelahDiProses>().accessor("jumlah", {
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
        createColumnHelpers<TColBarangTelahDiProses>().accessor("jurusan", {
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
        createColumnHelpers<TColBarangTelahDiProses>().accessor("lokasi", {
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
        createColumnHelpers<TColBarangTelahDiProses>().accessor("tanggal", {
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
        createColumnHelpers<TColBarangTelahDiProses>().accessor("keterangan", {
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
    ]
    return col
}