import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import {
  setOpenDeleteModal,
  setOpenEditModal,
} from "../../store/features/modal.slice";
import { useAppDispatch } from "../../store/store";
import { createColumnHelpers } from "./columns";

export type TPermintaanBarang = {
  id: number;
  nama_barang: string;
  jumlah_barang: number;
  lokasi: string;
  keterangan: string;
  status: string;
};

export const columnsPermintaanBarang = (): ColumnDef<
  TPermintaanBarang,
  any
>[] => {
  const dispatch = useAppDispatch();

  return [
    createColumnHelpers<TPermintaanBarang>().accessor("id", {
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
    createColumnHelpers<TPermintaanBarang>().accessor("nama_barang", {
      id: "nama_barang",
      header: () => <span>Nama Barang</span>,
    }),
    createColumnHelpers<TPermintaanBarang>().accessor("jumlah_barang", {
      id: "jumlah_barang",
      header: () => <span>Jumlah Barang</span>,
    }),
    createColumnHelpers<TPermintaanBarang>().accessor("lokasi", {
      id: "lokasi",
      header: () => <span>Lokasi</span>,
    }),
    createColumnHelpers<TPermintaanBarang>().accessor("status", {
      id: "status",
      header: () => <span>Status</span>,
    }),
    createColumnHelpers<TPermintaanBarang>().accessor("keterangan", {
      id: "keterangan",
      header: () => <span>Status</span>,
    }),
    createColumnHelpers<TPermintaanBarang>().display({
      id: "action",
      header: () => <span>Action</span>,
      cell: () => {
        return (
          <ActionButtonColTable
            onClickDelete={() => {
              dispatch(setOpenDeleteModal(true));
            }}
            onClickSetting={() => {
              dispatch(setOpenEditModal(true));
            }}
          />
        );
      },
    }),
  ];
};
