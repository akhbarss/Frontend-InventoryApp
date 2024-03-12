import { ActionButtonColTable } from "@components/ui/atoms";
import { ButtonHeaderColumn } from "@components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import {
  setOpenDeleteModal,
  setOpenEditModal,
} from "../../store/features/modal.slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Item } from "../api/items";
import { useDataBarangHabisPakaiFormContext } from "../context/data-barang-form.context";
import { createColumnHelpers } from "./columns";

export const columnsDataBarangAdmin = (): ColumnDef<Item, any>[] => {
  const dispatch = useAppDispatch();
  const form = useDataBarangHabisPakaiFormContext();
  const classRoom = useAppSelector((state) => state.class.classes);

  return [
    {
      id: "manual_id",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Id"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      accessorFn: (_, index) => index + 1,
      size: 90,
      enablePinning: false,
    },
    createColumnHelpers<Item>().accessor("id", {
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
    createColumnHelpers<Item>().accessor("name", {
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
    createColumnHelpers<Item>().accessor("item_code", {
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
    createColumnHelpers<Item>().accessor("class_id", {
      id: "Lokasi",
      cell: (info) => {
        const id = info.getValue();
        const room =
          classRoom.length > 0
            ? classRoom.find((clas) => clas.id == id)?.class_name
            : null;
        return room;
      },
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
    createColumnHelpers<Item>().accessor("total_unit", {
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
    // createColumnHelpers<Item>().accessor("kondisi", {
    //   id: "kondisi",
    //   cell: (info) => info.getValue(),
    //   header: "kondisi",
    //   enableColumnFilter: false,
    //   enablePinning: false,
    // }),
    createColumnHelpers<Item>().display({
      id: "action",
      cell: ({ row }) => {
        const {
          id,
          name,
          class_id,
          item_code,
          item_type,
          source_fund,
          status_item,
          total_unit,
          unit_price,
        } = row.original;
        const prefix_code = item_code.split("-")[0];
        const value_code = item_code.split("-")[1];

        return (
          <ActionButtonColTable
            withSetting
            withDelete
            onClickDelete={() => {
              dispatch(setOpenDeleteModal(true));
              form.setValues({ id, name });
            }}
            onClickSetting={() => {
              dispatch(setOpenEditModal(true));
              form.setValues({
                id,
                name,
                class_id: class_id + "",
                item_code: {
                  prefix_code,
                  value_code,
                },
                item_type,
                source_fund,
                status_item,
                total_unit,
                unit_price,
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

export const columnsDataBarangSuperAdmin = (): ColumnDef<any, any>[] => {
  return [
    createColumnHelpers<any>().accessor("id", {
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
    createColumnHelpers<any>().accessor("nama_barang", {
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
    createColumnHelpers<any>().accessor("kode_barang", {
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
    createColumnHelpers<any>().accessor("lokasi", {
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
    createColumnHelpers<any>().accessor("jumlah", {
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
    createColumnHelpers<any>().accessor("kondisi", {
      id: "kondisi",
      cell: (info) => info.getValue(),
      header: "kondisi",
      enableColumnFilter: false,
      enablePinning: false,
    }),
  ];
};
