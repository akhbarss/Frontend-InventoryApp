import { BaseModal, ButtonPlus, PageContent } from "@components/ui/atoms";
import { FormManajemenAdmin } from "@components/ui/atoms/Form/FormManajemenAdmin/FormManajemenAdmin";
import { ModalDelete } from "@components/ui/atoms/Modal/ModalDelete/ModalDelete";
import Paginations from "@components/ui/atoms/Pagination";
import CustomTable from "@components/ui/atoms/Table/CustomTable";
import { Group } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ResponseError } from "@utils/ResponseError";
import {
  PayloadCreateUser,
  PayloadUpdateUser,
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "@utils/api/user";
import { columnsManajemenAdmin } from "@utils/columns/manajemen-admin";
import { useManajemenAdminFormContext } from "@utils/context/form-context";
import { useModal } from "@utils/hooks/useModal";
import usePagination from "@utils/hooks/usePagination";
import { showNotifications } from "@utils/showNotifications";

export const ContentManajemenAdmin = () => {
  const {
    openedCreate,
    openedDelete,
    openedEdit,
    openModalCreate,
    closeModalCreate,
    closeModalDelete,
    closeModalEdit,
  } = useModal();
  const { page, setActivePage, setItemPerPage, take } = usePagination();

  const queryClient = useQueryClient();
  const form = useManajemenAdminFormContext();
  type PayloadAdmin = typeof form.values;

  const { data, isLoading } = useQuery({
    queryKey: ["get_users", { pagination: { page, take } }],
    queryFn: () => getUsers({ page, take }),
  });

  const createAdminMutation = useMutation({ mutationFn: createUser });
  const deleteAdminMutation = useMutation({ mutationFn: deleteUser });
  const updateAdminMutation = useMutation({ mutationFn: updateUser });

  const onSubmitCreateUser = (payload: PayloadAdmin) => {
    const { jurusan, ...datas } = payload;
    const data: PayloadCreateUser = { ...datas, role_id: +jurusan };
    createAdminMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get_users"] });
        showNotifications({
          type: "success",
          title: "Create User Successfull!",
        });
        closeModalCreate();
        form.reset();
      },
      onError: (err: any) => {
        const errMsg = err?.response?.data?.message;
        showNotifications({ title: errMsg, type: "error" });
      },
    });
  };

  const onSubmitUpdateUser = (payload: PayloadAdmin) => {
    const { id, jurusan, ...datas } = payload;
    const data: PayloadUpdateUser = {
      ...datas,
      userId: id!,
      role_id: +jurusan,
    };
    updateAdminMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get_users"] });
        showNotifications({
          type: "success",
          title: "Update User Successfull!",
        });
        closeModalEdit();
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
        closeModalDelete();
        form.reset();
      },
      onError: (err: any) => ResponseError(err),
    });
  };

  return (
    <PageContent>
      <Group justify="end">
        <ButtonPlus onClick={openModalCreate}>Tambah User</ButtonPlus>
      </Group>

      <CustomTable
        loading={isLoading}
        data={data?.payload.data!}
        columns={columnsManajemenAdmin()}
        totalPage={data?.payload?.meta.pageCount!}
      />

      <Paginations
        activePage={page}
        loading={isLoading}
        onPageChange={setActivePage}
        onItemPerPageChange={setItemPerPage}
        totalPage={data?.payload?.meta.pageCount!}
      />

      <BaseModal
        resetForm={form}
        onClose={closeModalCreate}
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
        resetForm={form}
        onClose={closeModalEdit}
        opened={openedEdit}
        onSubmit={form.onSubmit(onSubmitUpdateUser)}
        size={"md"}
        title="Ubah User"
      >
        <FormManajemenAdmin />
      </BaseModal>

      <ModalDelete
        resetForm={form}
        onAccept={onSubmitDeleteUser}
        onClose={closeModalDelete}
        opened={openedDelete}
        message={`Anda yakin ingin menghapus admin ${form.values.name}?`}
        title="Hapus User"
      />
    </PageContent>
  );
};
