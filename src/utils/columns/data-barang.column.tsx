import { ActionButtonColTable } from "@components/ui/atoms";
import { ButtonHeaderColumn } from "@components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { NumberFormatter } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import {
  setOpenDeleteModal,
  setOpenDetailImageModal,
  setOpenEditModal,
} from "../../store/features/modal.slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Item } from "../api/items/index.api";
import { useDataBarangFormContext } from "../context/data-barang-form.context";
import { createColumnHelpers } from "./columns";
import { CategoryItem } from "@utils/types/items.type";
import { useModalStore } from "@store/useModalStore";

export const columnsDataBarangAdmin = (
  categoryItem: CategoryItem
): ColumnDef<Item, any>[] => {
  const dispatch = useAppDispatch();
  const form = useDataBarangFormContext();
  const classRoom = useAppSelector((state) => state.class.classes);

  return [
    // {
    //   id: "manual_id",
    //   header: ({ column }) => (
    //     <ButtonHeaderColumn
    //       label="Id"
    //       column={column}
    //       Icon={<ChevronsUpDown size={15} />}
    //     />
    //   ),
    //   accessorFn: (_, index) => index + 1,
    //   size: 90,
    //   enablePinning: false,
    // },
    createColumnHelpers<Item>().display({
      id: "manual_id",
      cell: ({ row: { index } }) => index + 1,
      header: "Id",
    }),
    // createColumnHelpers<Item>().accessor("id", {
    //   id: "Id",
    //   header: ({ column }) => (
    //     <ButtonHeaderColumn
    //       label="ID"
    //       column={column}
    //       Icon={<ChevronsUpDown size={15} />}
    //     />
    //   ),
    //   size: 80,
    //   enableColumnFilter: false,
    //   enablePinning: false,
    // }),
    createColumnHelpers<Item>().accessor("name", {
      id: "Nama Barang",
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
    categoryItem == CategoryItem.BARANG_TIDAK_HABIS_PAKAI
      ? createColumnHelpers<Item>().accessor("item_code", {
          id: "Kode Barang",
          header: ({ column }) => (
            <ButtonHeaderColumn
              label="Kode"
              column={column}
              Icon={<ChevronsUpDown size={15} />}
            />
          ),
          enableColumnFilter: false,
          enablePinning: false,
          cell: ({ getValue }) => {
            return getValue() ? getValue() : "-";
          },
        })
      : undefined!,
    createColumnHelpers<Item>().accessor("status_item", {
      id: "status_item",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Status"
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
    categoryItem == CategoryItem.BARANG_HABIS_PAKAI
      ? createColumnHelpers<Item>().accessor("total_unit", {
          id: "Jumlah",
          header: ({ column }) => (
            <ButtonHeaderColumn
              label="Jumlah"
              column={column}
              Icon={<ChevronsUpDown size={15} />}
            />
          ),
          enableColumnFilter: false,
          enablePinning: false,
        })
      : undefined!,
    createColumnHelpers<Item>().accessor("unit_price", {
      id: "Harga/itm",
      cell: (info) => (
        <NumberFormatter
          value={info.getValue()}
          prefix="Rp. "
          thousandSeparator="."
          decimalSeparator=","
        />
      ),
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Harga"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      enableColumnFilter: false,
      enablePinning: false,
    }),
    createColumnHelpers<Item>().accessor("item_condition", {
      id: "item_condition",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Kondisi"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      enableColumnFilter: false,
      enablePinning: false,
    }),
    createColumnHelpers<Item>().display({
      id: "detail",
      header: "Detail",
      cell: ({ row: { original } }) => {
        const { item_image } = original;
        return (
          <ActionButtonColTable
            withDetailimage
            onClickDetailImage={() => {
              dispatch(setOpenDetailImageModal(true));
              form.setValues({ item_image: item_image });
            }}
          />
        );
      },
      enableColumnFilter: false,
      enablePinning: true,
      size: 70,
    }),
    createColumnHelpers<Item>().display({
      id: "action",
      cell: ({ row }) => {
        const { id, name, class_id, item_code, ...data } = row.original;
        const prefix_code = item_code ? item_code.split("-")[0] : null;
        const value_code = item_code ? item_code.split("-")[1] : null;

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
                ...data,
                id,
                name,
                class_id: class_id + "",
                item_code: {
                  prefix_code: prefix_code!,
                  value_code: value_code!,
                },
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
  ].filter(Boolean);
};

export const columnsDataBarangSuperAdmin = (
  categoryItem: CategoryItem
): ColumnDef<any, any>[] => {
  const { setOpenedModalEdit, setOpenedModalDetailImage } = useModalStore();
  const form = useDataBarangFormContext();
  const classRoom = useAppSelector((state) => state.class.classes);
  return [
    createColumnHelpers<Item>().display({
      id: "manual_id",
      cell: ({ row: { index } }) => index + 1,
      header: "Id",
    }),
    createColumnHelpers<Item>().accessor("name", {
      id: "Nama Barang",
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
    categoryItem == CategoryItem.BARANG_TIDAK_HABIS_PAKAI
      ? createColumnHelpers<Item>().accessor("item_code", {
          id: "Kode Barang",
          header: ({ column }) => (
            <ButtonHeaderColumn
              label="Kode"
              column={column}
              Icon={<ChevronsUpDown size={15} />}
            />
          ),
          enableColumnFilter: false,
          enablePinning: false,
          cell: ({ getValue }) => {
            return getValue() ? getValue() : "-";
          },
        })
      : undefined!,
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
    categoryItem == CategoryItem.BARANG_HABIS_PAKAI
      ? createColumnHelpers<Item>().accessor("total_unit", {
          id: "Jumlah",
          header: ({ column }) => (
            <ButtonHeaderColumn
              label="Jumlah"
              column={column}
              Icon={<ChevronsUpDown size={15} />}
            />
          ),
          enableColumnFilter: false,
          enablePinning: false,
        })
      : undefined!,
    createColumnHelpers<Item>().accessor("unit_price", {
      id: "Harga/itm",
      cell: (info) => (
        <NumberFormatter
          value={info.getValue()}
          prefix="Rp. "
          thousandSeparator="."
          decimalSeparator=","
        />
      ),
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Harga"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      enableColumnFilter: false,
      enablePinning: false,
    }),
    createColumnHelpers<Item>().accessor("item_condition", {
      id: "item_condition",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Kondisi"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      enableColumnFilter: false,
      enablePinning: false,
    }),
    createColumnHelpers<Item>().display({
      id: "detail",
      header: "Detail",
      cell: ({ row: { original } }) => {
        const { item_image } = original;
        return (
          <ActionButtonColTable
            withDetailimage
            onClickDetailImage={() => {
              setOpenedModalDetailImage(true);
              form.setValues({ item_image: item_image });
            }}
          />
        );
      },
      enableColumnFilter: false,
      enablePinning: true,
      size: 70,
    }),
    createColumnHelpers<Item>().display({
      id: "action",
      cell: ({ row }) => {
        const { id, name, class_id, item_code, ...data } = row.original;
        const prefix_code = item_code ? item_code.split("-")[0] : null;
        const value_code = item_code ? item_code.split("-")[1] : null;

        return (
          <ActionButtonColTable
            withDetail
            onClickDetail={() => {
              setOpenedModalEdit(true);
              form.setValues({
                ...data,
                id,
                name,
                class_id: class_id + "",
                item_code: {
                  prefix_code: prefix_code!,
                  value_code: value_code!,
                },
              });
            }}
          />
        );
      },
      header: "Action",
      enableColumnFilter: false,
      enablePinning: true,
      size: 80,
    }),
  ].filter(Boolean);
};
