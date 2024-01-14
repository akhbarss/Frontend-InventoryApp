import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { useDataBarangFormContext } from "../../components/context/form-context";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import { setOpenDeleteModal, setOpenEditModal } from "../../store/features/ModalSlice";
import { useAppDispatch } from "../../store/store";
import { createColumnHelpers } from "./columns";

export type TDataBarang = {
    id: number;
    nama_barang: string;
    kode_barang: string;
    lokasi: string;
    jumlah: number;
    keterangan: string
}

export const columnsDataBarangAdmin = () => {
    const dispatch = useAppDispatch()
    const form = useDataBarangFormContext()

    const col: ColumnDef<TDataBarang, any>[] = [
        createColumnHelpers<TDataBarang>().accessor("id", {
            id: 'Id',
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="ID"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 80,
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().accessor("nama_barang", {
            id: 'Nama Barang',
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Barang"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().accessor("kode_barang", {
            id: 'Kode Barang',
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Kode"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().accessor("lokasi", {
            id: 'Lokasi',
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Lokasi"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().accessor("jumlah", {
            id: 'Jumlah',
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Jumlah"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().accessor("keterangan", {
            id: 'Keterangan',
            cell: (info) => info.getValue(),
            header: "Keterangan",
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().display({
            id: 'action',
            cell: ({ row }) => {
                const {
                    id,
                    jumlah,
                    keterangan,
                    kode_barang,
                    lokasi,
                    nama_barang
                } = row.original
                return (
                    <ActionButtonColTable
                        onClickDelete={() => {
                            dispatch(
                                setOpenDeleteModal(true)
                            )
                            form.setValues({ id })
                        }}
                        onClickSetting={() => {
                            dispatch(
                                setOpenEditModal(true)
                            )
                            form.setValues({
                                id: id,
                                barang: nama_barang,
                                jumlah,
                                keterangan,
                                kodeBarang: kode_barang,
                                lokasi
                            })
                        }}
                    />
                )
            },
            header: "Action",
            enableColumnFilter: false,
            enablePinning: true,
            size: 100,
        }),
    ]

    return col
}
export const columnsDataBarangSuperAdmin = () => {

    const col: ColumnDef<TDataBarang, any>[] = [
        createColumnHelpers<TDataBarang>().accessor("id", {
            id: 'Id',
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="ID"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            size: 80,
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().accessor("nama_barang", {
            id: 'Nama Barang',
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Barang"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().accessor("kode_barang", {
            id: 'Kode Barang',
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Kode"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().accessor("lokasi", {
            id: 'Lokasi',
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Lokasi"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().accessor("jumlah", {
            id: 'Jumlah',
            cell: (info) => info.getValue(),
            header: ({ column }) => (
                <ButtonHeaderColumn
                    label="Jumlah"
                    column={column}
                    Icon={<ChevronsUpDown size={15} />}
                />
            ),
            enableColumnFilter: false,
            enablePinning: false,
        }),
        createColumnHelpers<TDataBarang>().accessor("keterangan", {
            id: 'Keterangan',
            cell: (info) => info.getValue(),
            header: "Keterangan",
            enableColumnFilter: false,
            enablePinning: false,
        }),
    ]

    return col
}