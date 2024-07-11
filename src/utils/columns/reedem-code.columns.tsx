import { ActionButtonColTable } from "@components/ui/atoms";
import { ButtonHeaderColumn } from "@components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { UseFormReturnType } from "@mantine/form";
import { FormValuesManajemenRedeemCode } from "@pages/app/admin/ManajemenKode";
import { useModalStore } from "@store/useModalStore";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@utils/format-date";
import { ReedemCode } from "@utils/types/redeem-code.type";
import { ChevronsUpDown } from "lucide-react";
import { createColumnHelpers } from "./columns";

type columnReedemCodeProps = {
  form: UseFormReturnType<
    FormValuesManajemenRedeemCode,
    (values: FormValuesManajemenRedeemCode) => FormValuesManajemenRedeemCode
  >;
};

export const columnReedemCode = ({
  form,
}: columnReedemCodeProps): ColumnDef<ReedemCode, any>[] => {
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
      enablePinning: true,
    },
    createColumnHelpers<ReedemCode>().accessor("redeem_code", {
      id: "redeem_code",
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
    createColumnHelpers<ReedemCode>().accessor("generated_date", {
      id: "generated_date",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Waktu Dibuat"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      enableColumnFilter: false,
      enablePinning: false,
      cell: ({ getValue }) => {
        return getValue() !== null ? formatDate(getValue()) : "-";
      },
    }),
    createColumnHelpers<ReedemCode>().accessor("is_valid", {
      id: "is_valid",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Aktif"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      enableColumnFilter: false,
      enablePinning: false,
      cell: (data) => {
        const value = data.getValue();
        return value ? "AKTIF" : "TIDAK AKTIF";
      },
    }),
    createColumnHelpers<ReedemCode>().accessor("destroyed_date", {
      id: "destroyed_date",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Dikembalikan"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      cell: ({ getValue }) => {
        return getValue() !== null ? formatDate(getValue()) : "-";
      },
      enableColumnFilter: false,
      enablePinning: false,
    }),
    createColumnHelpers<ReedemCode>().display({
      id: "action",
      cell: ({ row }) => {
        const {  id } = row.original;

        return (
          <ActionButtonColTable
            withDetail
            onClickDetail={() => {
              form.setFieldValue("id", id);
              setOpenedModalEdit(true);
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
