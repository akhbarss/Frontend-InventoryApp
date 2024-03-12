import { Group } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  setOpenCreateModal,
  setOpenDeleteModal,
  setOpenEditModal,
} from "../../../../store/features/modal.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  PayloadCreateUser,
  PayloadUpdateUser,
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../../../utils/api/user";
import { columnsManajemenAdmin } from "../../../../utils/columns/manajemen-admin";
import { useManajemenAdminFormContext } from "../../../../utils/context/form-context";
import { showNotifications } from "../../../../utils/showNotifications";
import { BaseModal } from "../../atoms/BaseModal/BaseModal";
import { ButtonPlus } from "../../atoms/ButtonPlus/ButtonPlus";
import { FormManajemenAdmin } from "../../atoms/Form/FormManajemenAdmin/FormManajemenAdmin";
import { ModalDelete } from "../../atoms/Modal/ModalDelete/ModalDelete";
import { PageContent } from "../../atoms/PageContent";
import Pagination from "../../atoms/Pagination";
import CustomTable from "../../atoms/Table/CustomTable";

export const ContentManajemenAdmin = () => {
  const openedCreate = useAppSelector((state) => state.modal.openedCreateModal);
  const openedEdit = useAppSelector((state) => state.modal.openedEditModal);
  const openedDelete = useAppSelector((state) => state.modal.openedDeleteModal);

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const form = useManajemenAdminFormContext();
  type PayloadAdmin = typeof form.values;

  const { data } = useQuery({
    queryKey: ["get_users"],
    queryFn: () => getUsers({ page: 1, take: 50 }),
  });

  const createAdminMutation = useMutation({ mutationFn: createUser });
  const deleteAdminMutation = useMutation({ mutationFn: deleteUser });
  const updateAdminMutation = useMutation({ mutationFn: updateUser });

  const onSubmitCreateUser = (payload: PayloadAdmin) => {
    const { jurusan, name, password, username } = payload;
    const data: PayloadCreateUser = {
      name,
      password,
      role_id: +jurusan,
      username,
    };
    createAdminMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get_users"] });
        showNotifications({
          type: "success",
          title: "Create User Successfull!",
        });
        dispatch(setOpenCreateModal(false));
        form.reset();
      },
      onError: (err: any) => {
        const errMsg = err?.response?.data?.message;
        showNotifications({ title: errMsg, type: "error" });
      },
    });
  };

  const onSubmitUpdateUser = (payload: PayloadAdmin) => {
    const { jurusan, name, password, username, id } = payload;
    const data: PayloadUpdateUser = {
      userId: id!,
      name,
      password,
      role_id: +jurusan,
      username,
    };

    updateAdminMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get_users"] });
        showNotifications({
          type: "success",
          title: "Update User Successfull!",
        });
        dispatch(setOpenEditModal(false));
        form.reset();
      },
      onError: (err: any) => {
        const errMsg = err?.response?.data?.message;
        showNotifications({ title: errMsg, type: "error" });
      },
    });
  };

  const onSubmitDeleteUser = async () => {
    const { id } = form.values;
    deleteAdminMutation.mutate(id!, {
      onSuccess: () => {
        showNotifications({
          type: "success",
          title: "Delete User Successfull!",
        });
        queryClient.invalidateQueries({ queryKey: ["get_users"] });
        dispatch(setOpenDeleteModal(false));
        form.reset();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <PageContent>
      <Group justify="end">
        <ButtonPlus onClick={() => dispatch(setOpenCreateModal(true))}>
          Tambah User
        </ButtonPlus>
      </Group>

      <CustomTable
        loading={false}
        totalData={100}
        totalPage={10}
        totalRecords={10}
        columns={columnsManajemenAdmin()}
        data={data?.data!}
      />

      <Pagination />

      <BaseModal
        onClose={() => {
          dispatch(setOpenCreateModal(false));
          form.reset();
        }}
        opened={openedCreate}
        onSubmit={(e) => {
          e.preventDefault();
          form.validate();
          if (form.values.password.trim().length < 1) {
            form.setFieldError("password", "Harap isi password.");
            return;
          }
          if (form.isValid()) {
            onSubmitCreateUser(form.values);
          }
        }}
        size={"md"}
        title="Tambah Admin"
      >
        <FormManajemenAdmin />
      </BaseModal>

      <BaseModal
        onClose={() => {
          dispatch(setOpenEditModal(false));
          form.reset();
        }}
        opened={openedEdit}
        onSubmit={form.onSubmit(onSubmitUpdateUser)}
        size={"md"}
        title="Ubah User"
      >
        <FormManajemenAdmin />
      </BaseModal>

      <ModalDelete
        onAccept={onSubmitDeleteUser}
        onClose={() => {
          dispatch(setOpenDeleteModal(false));
        }}
        opened={openedDelete}
        message={`Anda yakin ingin menghapus admin ${form.values.name}?`}
        title="Hapus User"
      />
    </PageContent>
  );
};
