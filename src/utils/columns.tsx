import { Text } from "@mantine/core";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { Link } from "react-router-dom";
export type TDataBarang = {
    id: number;
    nama_barang: string;
    kode_barang: string;
    lokasi: string;
    jumlah: number;
    keterangan: string
}

const columnHelper = createColumnHelper<TDataBarang>()
export const columnsDataBarang: ColumnDef<TDataBarang, any>[] = [
    columnHelper.accessor("id", {
        id: 'Id',
        cell: (info) => info.getValue(),
        header: () => <span>Id</span>,
        size: 50,
        enableColumnFilter: false,
    }),
    columnHelper.accessor("nama_barang", {
        id: 'Nama Barang',
        cell: (info) => info.getValue(),
        // size: 10,
        enableColumnFilter: false,
    }),
    columnHelper.accessor("kode_barang", {
        id: 'Kode Barang',
        cell: (info) => info.getValue(),
        // size: 10,
        enableColumnFilter: false,
    }),
    columnHelper.accessor("lokasi", {
        id: 'Lokasi',
        cell: (info) => info.getValue(),
        // size: 10,
        enableColumnFilter: false,
    }),
    columnHelper.accessor("jumlah", {
        id: 'Jumlah',
        cell: (info) => info.getValue(),
        // size: 10,
        enableColumnFilter: false,
    }),
    columnHelper.accessor("keterangan", {
        id: 'Keterangan',
        cell: (info) => info.getValue(),
        // size: 10,
        enableColumnFilter: false,
    }),
    columnHelper.display({
        id: 'Detail',
        cell: (info) => {
            const id = info.row.original.id
            return <Text c={"blue"} component={Link} to={`${id}`}>Detail</Text>
        },
        header: () => <span>Detail</span>,
        // size: 50,
        enableColumnFilter: false,
    }),
]
