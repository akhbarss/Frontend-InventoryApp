import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
// import { useTelahDiProsesFormContext } from "../../components/context/form-context";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { createColumnHelpers } from "./columns";
import { DataRequestItem } from "@utils/api/item-request/item-request.api";

// export type TColBarangTelahDiProses = {
//   id: number;
//   nama_barang: string;
//   jumlah: number | null;
//   jurusan: string;
//   lokasi: string;
//   tanggal: string;
//   keterangan: string;
// };

export const columnsBarangTelahDiProses = (): ColumnDef<DataRequestItem, any>[] => {
  // const dispatch = useAppDispatch()
  // const form = useTelahDiProsesFormContext()

  const col: ColumnDef<DataRequestItem, any>[] = [
    createColumnHelpers<DataRequestItem>().accessor("id", {
      id: "Id",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="ID"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 80,
      enablePinning: false,
    }),
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
    createColumnHelpers<DataRequestItem>().accessor("total_request", {
      id: "Ruang",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Jumlah"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 200,
      enablePinning: false,
    }),
    // createColumnHelpers<DataRequestItem>().accessor("major", {
    //   id: "jumlah_barang",
    //   header: ({ column }) => (
    //     <ButtonHeaderColumn
    //       label="Jurusam"
    //       column={column}
    //       Icon={<ChevronsUpDown size={15} />}
    //     />
    //   ),
    //   enablePinning: false,
    // }),
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
  ];
  return col;
};
