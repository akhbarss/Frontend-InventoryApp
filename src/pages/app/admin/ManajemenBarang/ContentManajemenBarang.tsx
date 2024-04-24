import { BaseModal, ButtonExport, PageContent } from "@components/ui/atoms";
import ButtonBarangKeluar from "@components/ui/atoms/ButtonBarangKeluar/ButtonBarangKeluar";
import Paginations from "@components/ui/atoms/Pagination";
import CustomTable from "@components/ui/atoms/Table/CustomTable";
import { Button, Group, NumberInput } from "@mantine/core";
import { isNotEmpty, useForm, hasLength } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useModalStore } from "@store/useModalStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getExitLogs } from "@utils/api/exit_log/index.api";
import { columnManajemenenBarang_HabisPakai } from "@utils/columns/manajemen-barang/manajemen-barang-habis-pakai.column";
import usePagination from "@utils/hooks/usePagination";
import { CategoryItem } from "@utils/types/items.type";
import { PackagePlus } from "lucide-react";
import React, { useCallback, useMemo } from "react";
import { ModalManajemenBarang } from "./ModalManajemenBarang";
import { storeReedemCode } from "@utils/api/reedem_code/index.api";
import { ResponseError } from "@utils/ResponseError";
import { showNotifications } from "@utils/showNotifications";
import { useAuth } from "@utils/hooks/useAuth";

type ContentManajemenBarangProps = {
  categoryItem: CategoryItem;
};

const BarangMasuk = () => {
  console.log("Barang Masuk");
  const [opened, { close, open }] = useDisclosure();
  const form = useForm({
    initialValues: {
      reedemCode: "",
    },
    validate: {
      reedemCode: isNotEmpty(),
    },
  });

  const storeReedemCodeMutation = useMutation({
    mutationFn: storeReedemCode,
  });

  const onStoreReedemCode = (data: typeof form.values) => {
    if (data.reedemCode.length !== 5) {
      form.setFieldError("reedemCode", "Reedem Code harus 5 angka");
      return;
    }
    storeReedemCodeMutation.mutate(data.reedemCode, {
      onSuccess: () => {
        showNotifications({
          title: "Success",
          type: "success",
        });
        close();
        form.reset();
      },
      onError: (error: any) => ResponseError(error),
    });
  };

  return (
    <>
      <Button onClick={open} leftSection={<PackagePlus size={25} />}>
        Barang Masuk
      </Button>
      <BaseModal
        onClose={close}
        onSubmit={form.onSubmit(onStoreReedemCode)}
        opened={opened}
        resetForm={form}
        size={"lg"}
        title="Barang Masuk"
      >
        <NumberInput
          maw={300}
          size="lg"
          mx={"auto"}
          hideControls
          minLength={5}
          maxLength={5}
          label="Kode Reedem"
          {...form.getInputProps("reedemCode")}
          onChange={(value) => {
            form.setFieldValue("reedemCode", value.toString());
          }}
          description="Masukkan kode reedem anda"
          styles={{
            input: {
              textAlign: "center",
              letterSpacing: "20px",
              caretColor: "transparent",
            },
          }}
        />
      </BaseModal>
    </>
  );
};

function Tables({ categoryItem }: { categoryItem: CategoryItem }) {
  console.log("tablesss");
  const { user } = useAuth();
  const major = user.role?.major;
  const { page, take, setActivePage, setItemPerPage } = usePagination();
  const { data, isLoading } = useQuery({
    queryKey: ["get_exit_logs", { categoryItem, page, take }],
    queryFn: () =>
      getExitLogs({
        category: categoryItem,
        orderBy: "ASC",
        page,
        take,
        major: major!,
      }),
    enabled: major !== null,
  });
  const columns = useCallback(
    () => columnManajemenenBarang_HabisPakai(categoryItem),
    [categoryItem]
  );

  const paginations = useMemo(
    () => (
      <Paginations
        activePage={page}
        loading={false}
        onPageChange={setActivePage}
        totalPage={data?.payload?.meta.pageCount!}
        onItemPerPageChange={setItemPerPage}
      />
    ),
    [page, isLoading, data?.payload.meta.pageCount]
  );
  return (
    <>
      <CustomTable
        columns={columns()}
        loading={isLoading}
        data={data?.payload.data!}
        totalPage={data?.payload?.meta.pageCount!}
      />
      {paginations}
    </>
  );
}

export const ContentManajemenBarang = React.memo(
  ({ categoryItem }: ContentManajemenBarangProps) => {
    console.log("content");
    const { setOpenedModalCreate } = useModalStore();
    const modal = useMemo(
      () => <ModalManajemenBarang categoryItem={categoryItem} />,
      [categoryItem]
    );
    const tables = <Tables categoryItem={categoryItem} />;

    return (
      <PageContent>
        <Group justify="end">
          <Group>
            {categoryItem == CategoryItem.BARANG_TIDAK_HABIS_PAKAI ? (
              <BarangMasuk />
            ) : (
              ""
            )}
            <ButtonBarangKeluar onClick={() => setOpenedModalCreate(true)} />
          </Group>
        </Group>
        {tables}
        <React.Fragment>{modal}</React.Fragment>
      </PageContent>
    );
  }
);
