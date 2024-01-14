import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import { useAppDispatch } from "../../store/store";
import { createColumnHelpers } from "./columns";
import { useBarangKeluarHabisPakaiFormContext } from "../../components/context/form-context";
import { setOpenDeleteModal, setOpenEditModal } from "../../store/features/ModalSlice";

export type TBarangHabisPakai = {
    id: number;
    nama_barang: string;
    ruang_peminjaman: string;
    jumlah_barang: number;
    jumlah_keluar: number;
    sisa_barang: number;
    tanggal_keluar: string;
}

export const columnsBarangHabisPakai = () => {
    const dispatch = useAppDispatch()
    const form = useBarangKeluarHabisPakaiFormContext()

    const col: ColumnDef<TBarangHabisPakai, any>[] = [
        createColumnHelpers<TBarangHabisPakai>().accessor("id", {
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
        createColumnHelpers<TBarangHabisPakai>().accessor("nama_barang", {
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
        createColumnHelpers<TBarangHabisPakai>().accessor("ruang_peminjaman", {
            id: "Ruang",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Ruang Peminjaman"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 200,
            enablePinning: false
        }),
        createColumnHelpers<TBarangHabisPakai>().accessor("jumlah_barang", {
            id: "jumlah_barang",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Jumlah Barang"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TBarangHabisPakai>().accessor("jumlah_keluar", {
            id: "jumlah_keluar",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Jumlah Keluar"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TBarangHabisPakai>().accessor("sisa_barang", {
            id: "sisa_barang",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Sisa Barang"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TBarangHabisPakai>().accessor("tanggal_keluar", {
            id: "tanggal_keluar",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Tanggal Keluar"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false
        }),
        createColumnHelpers<TBarangHabisPakai>().display({
            header: "Action",
            id: "action",
            cell: ({ row }) => {
                const { id, jumlah_barang, nama_barang, ruang_peminjaman } = row.original
                return (
                    <ActionButtonColTable
                        onClickDelete={() => {
                            dispatch(
                                setOpenDeleteModal(true)
                            )
                            form.setValues({
                                barangKeluar: [
                                    {
                                        id: id,
                                        jumlah: 1,
                                        namaBarang: "",
                                        ruanganLab: "",
                                        key: ""
                                    }
                                ]
                            })
                        }}
                        onClickSetting={() => {
                            dispatch(setOpenEditModal(true))
                            form.setValues({
                                barangKeluar: [
                                    {
                                        id,
                                        jumlah: jumlah_barang,
                                        namaBarang: nama_barang,
                                        ruanganLab: ruang_peminjaman,
                                        key: ""
                                    }
                                ]
                            })
                        }}
                    />
                )
            },
            size: 100,
            enablePinning: true
        })
    ]
    return col
}