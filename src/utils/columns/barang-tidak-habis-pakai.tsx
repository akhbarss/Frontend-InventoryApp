import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { useBarangKeluarTidakHabisPakaiFormContext } from "../../components/context/form-context";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import { setOpenDeleteModal, setOpenEditModal } from "../../store/features/ModalSlice";
import { useAppDispatch } from "../../store/store";
import { createColumnHelpers } from "./columns";

export type TBarangTidakHabisPakai = {
    id: number;
    nama_peminjam: string;
    nama_barang: string;
    ruang_peminjaman: string;
    jumlah_barang: number;
    jumlah_keluar: number;
    sisa_barang: number;
    tanggal_keluar: string;
    tanggal_masuk: string;
}


export const columnsBarangTidakHabisPakai = () => {

    const dispatch = useAppDispatch()
    const form = useBarangKeluarTidakHabisPakaiFormContext()

    const col: ColumnDef<TBarangTidakHabisPakai, any>[] = [
        createColumnHelpers<TBarangTidakHabisPakai>().accessor("id", {
            id: "Id",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="ID"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false,
            size: 80
        }),
        createColumnHelpers<TBarangTidakHabisPakai>().accessor("nama_peminjam", {
            id: "nama_peminjam",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Nama Peminjam"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false,
        }),
        createColumnHelpers<TBarangTidakHabisPakai>().accessor("nama_barang", {
            id: "NamaBarang",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Nama Barang"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false,
        }),
        createColumnHelpers<TBarangTidakHabisPakai>().accessor("ruang_peminjaman", {
            id: "Ruang",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Ruang Peminjaman"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false,
        }),
        createColumnHelpers<TBarangTidakHabisPakai>().accessor("jumlah_barang", {
            id: "jumlah_barang",
            header: "Jumlah Barang",
            enablePinning: false,
        }),
        createColumnHelpers<TBarangTidakHabisPakai>().accessor("jumlah_keluar", {
            id: "jumlah_keluar",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Jumlah Keluar"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false,
        }),
        createColumnHelpers<TBarangTidakHabisPakai>().accessor("sisa_barang", {
            id: "sisa_barang",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Sisa Barang"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false,
        }),
        createColumnHelpers<TBarangTidakHabisPakai>().accessor("tanggal_keluar", {
            id: "tanggal_keluar",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Tanggal Keluar"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false,
        }),
        createColumnHelpers<TBarangTidakHabisPakai>().accessor("tanggal_masuk", {
            id: "tanggal_masuk",
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Tanggal Masuk"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enablePinning: false,
        }),
        createColumnHelpers<TBarangTidakHabisPakai>().display({
            header: "Action",
            id: "action",
            cell: ({ row }) => {
                const {
                    id,
                    jumlah_barang,
                    jumlah_keluar,
                    nama_barang,
                    nama_peminjam,
                    ruang_peminjaman,
                    sisa_barang,
                    tanggal_keluar,
                    tanggal_masuk,
                } = row.original
                return (
                    <ActionButtonColTable
                        withAccept
                        onClickSetting={() => { 
                            dispatch(
                                setOpenEditModal(true)
                            )
                            form.setValues({
                                barangKeluar: [
                                    {
                                        id: id,
                                        jumlah: jumlah_barang,
                                        namaBarang: nama_barang,
                                        ruanganLab: ruang_peminjaman,
                                        key: "",
                                        siswa: nama_peminjam
                                    }
                                ]
                            })
                            
                        }}
                        onClickDelete={() => {
                            dispatch(
                                setOpenDeleteModal(true)
                            )
                            form.setValues({
                                barangKeluar: [
                                    {
                                        id: id,
                                        jumlah: jumlah_barang,
                                        namaBarang: nama_barang,
                                        ruanganLab: ruang_peminjaman,
                                        key: "",
                                        siswa: nama_peminjam
                                    }
                                ]
                            })

                        }}
                        onClickAccept={() => { }}
                    />
                )
            },
            size: 120,
            enablePinning: true
        })
    ]

    return col
}