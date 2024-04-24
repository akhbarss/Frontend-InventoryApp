import { ActionButtonColTable } from "@components/ui/atoms";
import { ButtonHeaderColumn } from "@components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { useModalStore } from "@store/useModalStore";
import { ColumnDef } from "@tanstack/react-table";
import { ExitLog } from "@utils/types/exit-logs.type";
import { ChevronsUpDown } from "lucide-react";
import { createColumnHelpers } from "../columns";
import { useManajemenBarangFormContext } from "@utils/context/manajermen-barang.context";
import { Text } from "@mantine/core";
import { CategoryItem } from "@utils/types/items.type";

export const columnManajemenenBarang_HabisPakai = (categoryItem: CategoryItem): ColumnDef<
  ExitLog,
  any
>[] => {
  const form = useManajemenBarangFormContext();
  const { setOpenedModalEdit } = useModalStore();
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
    createColumnHelpers<ExitLog>().accessor("name", {
      id: "name",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Nama Peminjam"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 100,
      enableColumnFilter: false,
      enablePinning: false,
      cell: (info) => {
        const fullname = info.getValue()
        return (
            <Text truncate="end">{fullname}</Text>
        )
    },
    }),
    createColumnHelpers<ExitLog>().accessor("exit_class", {
      id: "exit_class",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Kelas"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 100,
      enableColumnFilter: false,
      enablePinning: false,
    }),
    createColumnHelpers<ExitLog>().accessor("major_class", {
      id: "major_class",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Ruang"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 90,
      enableColumnFilter: false,
      enablePinning: false,
    }),
    createColumnHelpers<ExitLog>().accessor("status_exit", {
      id: "status_exit",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Status"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 90,
      enableColumnFilter: false,
      enablePinning: false,
    }),
    createColumnHelpers<ExitLog>().accessor("phone", {
      id: "phone",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="No Telepon"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 120,
      enableColumnFilter: false,
      enablePinning: false,
    }),
    createColumnHelpers<ExitLog>().display({
      id: "action",
      header: "Action",
      cell: ({ row: { original } }) => {
        const data = original;
        return (
          <ActionButtonColTable
            withSetting
            onClickSetting={() => {
              form.setValues(data);
              console.log({ data });

              setOpenedModalEdit(true);
            }}
          />
        );
      },
      enableColumnFilter: false,
      enablePinning: true,
      size: 70,
    }),
  ];
};
