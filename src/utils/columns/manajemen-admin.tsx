import { ColumnDef } from "@tanstack/react-table";
import { ROLE } from "@utils/types/user,type";
import { ChevronsUpDown } from "lucide-react";
import { ButtonHeaderColumn } from "../../components/ui/atoms/ButtonHeaderColumn/ButtonHeaderColumn";
import { ActionButtonColTable } from "../../components/ui/atoms/Table/ActionButtonColTable/ActionButtonColTable";
import {
  setOpenDeleteModal,
  setOpenEditModal,
} from "../../store/features/modal.slice";
import { useAppDispatch } from "../../store/store";
import { useManajemenAdminFormContext } from "../context/form-context";
import { createColumnHelpers } from "./columns";

export type TManajemenAdmin = {
  id: number;
  name: string;
  username: string;
  role_id: number;
};

export const columnsManajemenAdmin = (): ColumnDef<TManajemenAdmin, any>[] => {
  const dispatch = useAppDispatch();
  const form = useManajemenAdminFormContext();

  function roleIdToRoleName(roleId: number) {
    switch (roleId) {
      case 1:
        return ROLE.ADMIN_TJKT;
      case 2:
        return ROLE.ADMIN_AK;
      case 3:
        return ROLE.ADMIN_TO;
      case 4:
        return ROLE.ADMIN_TE;
      case 5:
        return ROLE.STORE;
      default:
        return "SUPER ADMIN";
    }
  }

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
    createColumnHelpers<TManajemenAdmin>().accessor("name", {
      id: "name",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Nama"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 80,
      enablePinning: false,
    }),
    // createColumnHelpers<TManajemenAdmin>().accessor("jurusan", {
    //     id: "jurusan",
    //     header: ({ column }) => (
    //         <ButtonHeaderColumn
    //             label="Jurusan"
    //             column={column}
    //             Icon={<ChevronsUpDown size={15} />}
    //         />
    //     ),
    //     size: 120,
    //     enablePinning: false
    // }),
    // createColumnHelpers<TManajemenAdmin>().accessor("tanggal_pembuatan", {
    //     id: "tanggal",
    //     header: ({ column }) => (
    //         <ButtonHeaderColumn
    //             label="Tanggal Pembuatan"
    //             column={column}
    //             Icon={<ChevronsUpDown size={15} />}
    //         />
    //     ),
    //     size: 190,
    //     enablePinning: false
    // }),
    createColumnHelpers<TManajemenAdmin>().accessor("username", {
      id: "username",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Username"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      size: 120,
      enablePinning: false,
    }),
    createColumnHelpers<TManajemenAdmin>().accessor("role_id", {
      id: "role_id",
      header: ({ column }) => (
        <ButtonHeaderColumn
          label="Role"
          column={column}
          Icon={<ChevronsUpDown size={15} />}
        />
      ),
      cell: ({ cell }) => {
        const roleId = cell.getValue() as number;
        const roleName = roleIdToRoleName(roleId);
        return roleName;
      },
      size: 120,
      enablePinning: false,
    }),
    createColumnHelpers<TManajemenAdmin>().display({
      header: "Action",
      id: "action",
      cell: ({ row }) => {
        const { id, name, username, role_id } = row.original;
        return (
          <ActionButtonColTable
            onClickDelete={() => {
              dispatch(setOpenDeleteModal(true));
              form.setValues({
                id,
                jurusan: role_id + "",
                name,
                username,
              });
            }}
            onClickSetting={() => {
              dispatch(setOpenEditModal(true));
              form.setValues({
                id,
                jurusan: role_id + "",
                name,
                username,
              });
            }}
            withDelete
            withSetting
          />
        );
      },
      size: 80,
      enablePinning: true,
    }),
  ];
};
