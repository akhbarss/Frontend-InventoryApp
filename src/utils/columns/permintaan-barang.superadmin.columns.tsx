import { ColumnDef } from "@tanstack/react-table";
import {
  DataRequestItem,
  StatusRequestItem,
} from "@utils/api/item-request/item-request.api";
import { ChevronsUpDown } from "lucide-react";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import { createColumnHelpers } from "./columns";
import { formatDate } from "@utils/format-date";
import { useModalStore } from "@store/useModalStore";
import { useFormStore } from "@store/useFormStore";
import { Badge } from "@mantine/core";
import { useDetailPermintaanBarang } from "@store/useDetailPermintaanBarang";

export const columnsPermintaanBarangSuperadmin = (): ColumnDef<
  DataRequestItem,
  any
>[] => {
  const { setOpenedModalAccept, setOpenedModalReject, setOpenedModalEdit } =
    useModalStore();
  const { setAcceptedDate, setArriveDate, setUpdateDate } =
    useDetailPermintaanBarang();
  const { setForm } = useFormStore();
  const col: ColumnDef<DataRequestItem, any>[] = [
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
      enablePinning: true,
    },
    // createColumnHelpers<DataRequestItem>().accessor("id", {
    //   id: "Id",
    //   header: ({ column }) => (
    //     <ButtonHeaderColumn
    //       label="ID"
    //       column={column}
    //       Icon={<ChevronsUpDown size={15} />}
    //     />
    //   ),
    //   size: 80,
    //   enablePinning: false,
    // }),
    createColumnHelpers<DataRequestItem>().accessor("item_name", {
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
    createColumnHelpers<DataRequestItem>().accessor("status", {
      id: "status",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Status"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      cell: ({ getValue }) => {
        const value = getValue() as StatusRequestItem;
        const listStatus = {
          [StatusRequestItem.PENDING]: {
            color: "yellow",
            value: "BELUM DI PROSES",
          },
          [StatusRequestItem.ACCEPTED]: {
            color: "blue.9",
            value: "DI TERIMA",
          },
          [StatusRequestItem.REJECTED]: {
            color: "red",
            value: "DI TOLAK",
          },
          [StatusRequestItem.ARRIVED]: {
            color: "green",
            value: "TELAH TIBA",
          },
          [StatusRequestItem.ON_THE_WAY]: {
            color: "orange",
            value: "DALAM PERJALANAN",
          },
        };
        const selectedStatus = listStatus[value];
        return (
          <Badge variant="light" color={selectedStatus.color}>
            {selectedStatus.value}
          </Badge>
        );
      },
      enablePinning: false,
    }),
    createColumnHelpers<DataRequestItem>().accessor("total_request", {
      id: "Ruang",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Jumlah"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 100,
      enablePinning: false,
    }),
    createColumnHelpers<DataRequestItem>().accessor("from_major", {
      id: "from_major",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Jurusan"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      enablePinning: false,
    }),
    createColumnHelpers<DataRequestItem>().accessor("class_id", {
      id: "lokasi",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Lokasi"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      enablePinning: false,
    }),
    createColumnHelpers<DataRequestItem>().accessor("created_at", {
      id: "tanggal",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Tanggal"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      enablePinning: false,
      cell: ({ getValue }) => {
        return getValue() !== null ? formatDate(getValue()) : "-";
      },
    }),
    createColumnHelpers<DataRequestItem>().accessor("description", {
      id: "keterangan",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Keterangan"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      enablePinning: false,
    }),
    createColumnHelpers<DataRequestItem>().display({
      header: "Action",
      id: "action",
      cell: ({ row }) => {
        const {
          status,
          id,
          item_name,
          accepted_date,
          arrive_date,
          updated_at,
          on_the_way_date
        } = row.original;

        const disabledReject = status !== StatusRequestItem.PENDING;
        const disabledAccept = status !== StatusRequestItem.PENDING;
        const disabledSetting =
          status == StatusRequestItem.PENDING ||
          status == StatusRequestItem.REJECTED;

        const isAccept = status == StatusRequestItem.ACCEPTED;
        const isOTW = status == StatusRequestItem.ON_THE_WAY;
        const isArrived = status == StatusRequestItem.ARRIVED;

        return (
          <ActionButtonColTable
            withSetting
            withAccept
            withReject
            disabledReject={disabledReject}
            disabledAccept={disabledAccept}
            disabledSetting={disabledSetting}
            onClickAccept={() => {
              setForm({
                name: item_name,
                id,
                indexStatusPermintaanBarang: null,
              });
              setOpenedModalAccept(true);
            }}
            onClickReject={() => {
              setForm({
                name: item_name,
                id,
                indexStatusPermintaanBarang: null,
              });
              setOpenedModalReject(true);
            }}
            onClickSetting={() => {
              let indexStatus = 0;
              if (isOTW) {
                indexStatus = 2;
              }
              if (isArrived) {
                indexStatus = 3;
              }
              if (isAccept) {
                indexStatus = 1;
              }
              setForm({
                name: item_name,
                id,
                indexStatusPermintaanBarang: indexStatus,
              });
              setOpenedModalEdit(true);
              
              setAcceptedDate(accepted_date);
              setArriveDate(arrive_date);
              setUpdateDate(on_the_way_date);      
            }}
          />
        );
      },
      size: 140,
      enablePinning: true,
    }),
  ];
  return col;
};
