import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { useDataBarangFormContext } from "../context/form-context";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import {
  setOpenDeleteModal,
  setOpenEditModal,
} from "../../store/features/ModalSlice";
import { useAppDispatch } from "../../store/store";
import { createColumnHelpers } from "./columns";

export type TDataBarang = {
  id: number;
  nama_barang: string;
  lokasi: string;
  jumlah: number | null;
  kode_barang: string;
  kategori: string;
  kondisi: string;
};

export const columnsDataBarangAdmin = (): ColumnDef<TDataBarang, any>[] => {
  const dispatch = useAppDispatch();
  const form = useDataBarangFormContext();

  return [
    createColumnHelpers<TDataBarang>().accessor("id", {
      id: "Id",
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
      id: "Nama Barang",
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
      id: "Kode Barang",
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
      id: "Lokasi",
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
      id: "Jumlah",
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
    createColumnHelpers<TDataBarang>().accessor("kondisi", {
      id: "kondisi",
      cell: (info) => info.getValue(),
      header: "kondisi",
      enableColumnFilter: false,
      enablePinning: false,
    }),
    createColumnHelpers<TDataBarang>().display({
      id: "action",
      cell: ({ row }) => {
        const {
          id,
          jumlah,
          kondisi,
          kode_barang,
          lokasi,
          kategori,
          nama_barang,
        } = row.original;
        return (
          <ActionButtonColTable
            withSetting
            withDelete
            onClickDelete={() => {
              dispatch(setOpenDeleteModal(true));
              form.setValues({ id,nama_barang });
            }}
            onClickSetting={() => {
              dispatch(setOpenEditModal(true));
              form.setValues({
                id: id,
                nama_barang: nama_barang,
                jumlah,
                kondisi,
                kode_barang,
                lokasi,
                kategori,
              });
            }}
          />
        );
      },
      header: "Action",
      enableColumnFilter: false,
      enablePinning: true,
      size: 100,
    }),
  ];
};

export const columnsDataBarangSuperAdmin = (): ColumnDef<
  TDataBarang,
  any
>[] => {
  return [
    createColumnHelpers<TDataBarang>().accessor("id", {
      id: "Id",
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
      id: "Nama Barang",
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
      id: "Kode Barang",
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
      id: "Lokasi",
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
      id: "Jumlah",
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
    createColumnHelpers<TDataBarang>().accessor("kondisi", {
      id: "kondisi",
      cell: (info) => info.getValue(),
      header: "kondisi",
      enableColumnFilter: false,
      enablePinning: false,
    }),
  ];
};
