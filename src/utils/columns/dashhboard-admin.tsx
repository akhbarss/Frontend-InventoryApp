import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { createColumnHelpers } from "./columns";

export type TColDashboardAdmin = {
  id: number;
  nama_barang: string;
  kode_barang: string;
  jumlah: number;
  kondisi: string;
};

export const columnsDashboardAdmin = (): ColumnDef<
  TColDashboardAdmin,
  any
>[] => {
  return [
    createColumnHelpers<TColDashboardAdmin>().accessor("id", {
      id: "id",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="ID"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 80,
    }),
    createColumnHelpers<TColDashboardAdmin>().accessor("nama_barang", {
      id: "nama_barang",
      header: "Nama Barang",
    }),
    createColumnHelpers<TColDashboardAdmin>().accessor("kode_barang", {
      id: "kode_barang",
      header: "Kode Barang",
    }),

    createColumnHelpers<TColDashboardAdmin>().accessor("jumlah", {
      id: "jumlah",
      header: "Jumlah",
    }),
    createColumnHelpers<TColDashboardAdmin>().accessor("kondisi", {
      id: "kondisi",
      header: "Kondisi",
    }),
  ];
};
