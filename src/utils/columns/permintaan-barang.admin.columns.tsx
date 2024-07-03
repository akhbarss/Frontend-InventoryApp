import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import { createColumnHelpers } from "./columns";
import { ItemRequest } from "@utils/types/item-request.type";
import { usePermintaanBarangFormContext } from "@utils/context/form-context";
import { useModalStore } from "@store/useModalStore";
import { useAppSelector } from "@store/store";
import { Badge, Text, Tooltip } from "@mantine/core";
import { StatusRequestItem } from "@utils/api/item-request/item-request.api";
import { setOpenDetailImageModal } from "@store/features/modal.slice";

export const columnsPermintaanBarang = (): ColumnDef<ItemRequest, any>[] => {
  const form = usePermintaanBarangFormContext();
  const {
    setOpenedModalDelete,
    setOpenedModalEdit,
    setOpenedModalDetailImage,
  } = useModalStore();
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
      enablePinning: true,
    },
    createColumnHelpers<ItemRequest>().accessor("item_name", {
      id: "item_name",
      header: () => <span>Nama Barang</span>,
    }),
    createColumnHelpers<ItemRequest>().accessor("total_request", {
      id: "total_request",
      header: () => <span>Jumlah Barang</span>,
    }),
    createColumnHelpers<ItemRequest>().accessor("class_id", {
      id: "lokasi",
      header: () => <span>Lokasi</span>,
      cell: (data) => {
        const id = data.getValue();
        const room =
          classRoom.length > 0
            ? classRoom.find((clas) => clas.id == id)?.class_name
            : null;
        return room;
      },
    }),
    createColumnHelpers<ItemRequest>().accessor("status", {
      id: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue() as StatusRequestItem;
        const listStatus = {
          [StatusRequestItem.PENDING]: {
            color: "yellow",
            value: "BELUM DI PROSES",
          },
          [StatusRequestItem.ACCEPTED]: {
            color: "green",
            value: "DI TERIMA",
          },
          [StatusRequestItem.REJECTED]: {
            color: "red",
            value: "DI TOLAK",
          },
          [StatusRequestItem.ARRIVED]: {
            color: "blue",
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
    }),
    createColumnHelpers<ItemRequest>().accessor("description", {
      id: "keterangan",
      header: "Keterangan",
      cell: ({ getValue }) => (
        <Tooltip label={getValue()}>
          <Text truncate="end">{getValue()}</Text>
        </Tooltip>
      ),
    }),
    createColumnHelpers<ItemRequest>().display({
      id: "detail",
      header: "Detail",
      cell: ({ row: { original } }) => {
        const { request_image } = original;
        return (
          <ActionButtonColTable
            withDetailimage
            onClickDetailImage={() => {
              form.setValues({ request_image: request_image });
              setOpenedModalDetailImage(true);
            }}
          />
        );
      },
      enableColumnFilter: false,
      enablePinning: true,
      size: 70,
    }),
    createColumnHelpers<ItemRequest>().display({
      id: "action",
      header: () => <span>Action</span>,
      cell: ({ row }) => {
        const {
          class_id,
          description,
          id,
          item_name,
          total_request,
          request_image,
        } = row.original;
        return (
          <ActionButtonColTable
            withDelete
            withSetting
            onClickDelete={() => {
              form.setValues({ id, namaBarang: item_name });
              setOpenedModalDelete(true);
            }}
            onClickSetting={() => {
              form.setValues({
                id,
                jumlahBarang: total_request,
                keterangan: description,
                lokasi: class_id + "",
                namaBarang: item_name,
                request_image: request_image,
              });
              setOpenedModalEdit(true);
            }}
          />
        );
      },
    }),
  ];
};
