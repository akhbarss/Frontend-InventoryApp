import { PageContent } from "@components/ui/atoms";
import { BackButton } from "@components/ui/atoms/BackButton/BackButton";
import Paginations from "@components/ui/atoms/Pagination";
import { SelectButtonQuery } from "@components/ui/atoms/SelectButtonQuery";
import CustomTable from "@components/ui/atoms/Table/CustomTable";
import {
  Button,
  Flex,
  Group,
  Modal,
  SimpleGrid,
  Stepper,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDetailPermintaanBarang } from "@store/useDetailPermintaanBarang";
import { useFormStore } from "@store/useFormStore";
import { useModalStore } from "@store/useModalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ResponseError } from "@utils/ResponseError";
import {
  LabelStatusRequestItem,
  StatusRequestItem,
  acceptItemRequest,
  arriveItemRequest,
  getAllItemRequest,
  rejectItemRequest,
  toOnTheWayItemRequest,
} from "@utils/api/item-request/item-request.api";
import { columnsPermintaanBarangSuperadmin } from "@utils/columns/permintaan-barang.superadmin.columns";
import { formatDate } from "@utils/format-date";
import usePagination from "@utils/hooks/usePagination";
import { closeModalProps } from "@utils/modalProps";
import { showNotifications } from "@utils/showNotifications";
import { Major } from "@utils/types/major.enum";
import { useEffect, useState } from "react";
import { StringParam, useQueryParam } from "use-query-params";

type ContentPermintaanBarangSuperadminProps = {};

type BaseModalPermintaanBarangProps = {
  onAccept: () => void;
  onClose: () => void;
  opened: boolean;
  title: string;
  description: string;
  isLoading: boolean;
  labelOnAccept: string;
};

const styleModal = {
  title: {
    fontSize: "20px",
    marginInline: "auto",
    fontWeight: "bold",
  },
};

function BaseModalPermintaanBarang({
  onAccept,
  onClose,
  opened,
  title,
  description,
  isLoading,
  labelOnAccept,
}: BaseModalPermintaanBarangProps) {
  return (
    <Modal
      {...closeModalProps}
      title={title}
      opened={opened}
      onClose={onClose}
      styles={styleModal}
    >
      <Text ta={"center"}>{description}</Text>
      <Group justify="space-between" mt={20}>
        <BackButton isLoading={isLoading} onClick={onClose} />
        <Button loading={isLoading} onClick={onAccept}>
          {labelOnAccept}
        </Button>
      </Group>
    </Modal>
  );
}

type ModalStatusPermintaanBarangProps = {
  opened: boolean;
  onClose: () => void;
  title: string;
  onAccept: () => void;
  description: string;
};

function ModalStatusPermintaanBarang({
  onClose,
  opened,
  title,
  onAccept,
  description,
}: ModalStatusPermintaanBarangProps) {
  return (
    <Modal {...closeModalProps} opened={opened} onClose={onClose} title={title}>
      <Text ta={"center"}>{description}</Text>
      <Group justify="space-between" mt={"md"}>
        <BackButton onClick={onClose} />
        <Button onClick={onAccept}>Ubah</Button>
      </Group>
    </Modal>
  );
}

function showNotificationSuccess() {
  showNotifications({ title: "Success", type: "success" });
}

const ContentPermintaanBarangSuperadmin =
  ({}: ContentPermintaanBarangSuperadminProps) => {
    console.log("content");
    const {
      openedModalAccept,
      openedModalEdit,
      openedModalReject,
      setOpenedModalEdit,
      setOpenedModalReject,
      setOpenedModalAccept,
    } = useModalStore();
    const queryClient = useQueryClient();
    const queryName = { major: "major", status: "status" };
    const [major] = useQueryParam(queryName.major, StringParam);
    const [status] = useQueryParam(queryName.status, StringParam);
    const { page, take, setActivePage, setItemPerPage } = usePagination();

    const { form, setForm } = useFormStore();
    const { name, id, indexStatusPermintaanBarang } = form;
    const [active, setActive] = useState(indexStatusPermintaanBarang || 0);
    const [
      openedModalStatusPengirimanToOtw,
      {
        close: closeModalStatusPengirimanToOtw,
        open: openModalStatusPengirimanToOtw,
      },
    ] = useDisclosure();
    const [
      openedModalStatusPengirimanToArrive,
      {
        close: closeModalStatusPengirimanToArrive,
        open: openModalStatusPengirimanToArrive,
      },
    ] = useDisclosure();

    useEffect(() => {
      if (openedModalEdit == true && indexStatusPermintaanBarang) {
        setActive(indexStatusPermintaanBarang);
      } else {
        setOpenedModalEdit(false);
        setActive(0);
        resetForm();
      }
    }, [openedModalEdit, indexStatusPermintaanBarang]);

    const resetForm = () =>
      setForm({ id: null, name: "", indexStatusPermintaanBarang: null });
    const refetch = () =>
      queryClient.invalidateQueries({ queryKey: ["get_all_item_request"] });

    const { data, isLoading } = useQuery({
      queryKey: [
        "get_all_item_request",
        { itemType: null, page, take, major, status },
      ],
      queryFn: () =>
        getAllItemRequest({
          itemType: null!,
          status: status as StatusRequestItem,
          major: major as Major,
          orderBy: "DESC",
          page,
          take,
        }),
    });

    const acceptItemRequestMutation = useMutation({
      mutationFn: acceptItemRequest,
    });
    const rejectItemRequestMutation = useMutation({
      mutationFn: rejectItemRequest,
    });
    const toArriveItemRequestMutation = useMutation({
      mutationFn: arriveItemRequest,
    });
    const toOnTheWayItemRequestMutation = useMutation({
      mutationFn: toOnTheWayItemRequest,
    });

    const onAccept = () => {
      acceptItemRequestMutation.mutate(id!, {
        onSuccess: () => {
          setOpenedModalAccept(false);
          showNotificationSuccess();
          resetForm();
          refetch();
        },
        onError: (error: any) => ResponseError(error),
      });
    };
    const onReject = () => {
      rejectItemRequestMutation.mutate(id!, {
        onSuccess: () => {
          setOpenedModalReject(false);
          showNotificationSuccess();
          resetForm();
          refetch();
        },
        onError: (error: any) => ResponseError(error),
      });
    };
    const onToArrive = () => {
      toArriveItemRequestMutation.mutate(id!, {
        onSuccess: () => {
          setOpenedModalEdit(false);
          showNotificationSuccess();
          resetForm();
          refetch();
          closeModalStatusPengirimanToArrive();
        },
        onError: (error: any) => ResponseError(error),
      });
    };
    const onToOntheway = () => {
      toOnTheWayItemRequestMutation.mutate(id!, {
        onSuccess: () => {
          setOpenedModalEdit(false);
          showNotificationSuccess();
          resetForm();
          refetch();
          closeModalStatusPengirimanToOtw();
        },
        onError: (error: any) => ResponseError(error),
      });
    };

    const dataLabel: { label: string; value: string }[] = Object.entries(
      LabelStatusRequestItem
    ).map((item) => {
      return {
        label: item[1],
        value: item[0],
      };
    });

    const { acceptedDate, arriveDate, updateDate, reset } =
      useDetailPermintaanBarang();
    console.log({ acceptedDate });
    return (
      <PageContent>
        <Group>
          <SelectButtonQuery
            queryName={queryName.status}
            placeholder="Status"
            dataLabel={dataLabel}
          />

          <SelectButtonQuery
            width="150px"
            queryName={queryName.major}
            placeholder="Jurusan"
            data={Object.values(Major)}
          />
        </Group>

        <CustomTable
          loading={isLoading}
          data={data?.payload.data!}
          columns={columnsPermintaanBarangSuperadmin()}
          totalPage={data?.payload?.meta.pageCount!}
        />

        <Paginations
          activePage={page}
          loading={isLoading}
          onPageChange={setActivePage}
          onItemPerPageChange={setItemPerPage}
          totalPage={data?.payload?.meta.pageCount!}
        />

        <BaseModalPermintaanBarang
          onAccept={onAccept}
          labelOnAccept="Terima"
          title="Terima Permintaan"
          opened={openedModalAccept}
          onClose={() => setOpenedModalAccept(false)}
          isLoading={acceptItemRequestMutation.status == "pending"}
          description={`Anda yakin ingin menerima permintaan ${name} ?`}
        />

        <BaseModalPermintaanBarang
          onAccept={onReject}
          labelOnAccept="Tolak"
          title="Tolak Permintaan"
          opened={openedModalReject}
          onClose={() => setOpenedModalReject(false)}
          isLoading={rejectItemRequestMutation.status == "pending"}
          description={`Anda yakin ingin menolak permintaan ${name} ?`}
        />

        <Modal
          {...closeModalProps}
          title="Ubah Status Permintaan"
          styles={styleModal}
          opened={openedModalEdit}
          onClose={() => {
            reset();
            setOpenedModalEdit(false);
          }}
        >
          <Stepper
            mx={"auto"}
            active={active}
            w={"fit-content"}
            orientation="vertical"
            onStepClick={(indexActive) => {
              if (indexActive == 1) {
                openModalStatusPengirimanToOtw();
              } else if (indexActive == 2) {
                openModalStatusPengirimanToArrive();
              }
            }}
          >
            <Stepper.Step
              label="Status Permintaan Barang"
              description={acceptedDate ? formatDate(acceptedDate) : "-"}
              disabled
            />
            <Stepper.Step
              disabled={indexStatusPermintaanBarang !== 1}
              label="Dalam Perjalanan"
              description={updateDate ? formatDate(updateDate) : "-"}
            />
            <Stepper.Step
              disabled={indexStatusPermintaanBarang !== 2}
              label="Telah Tiba"
              description={arriveDate ? formatDate(arriveDate) : "-"}
            />
          </Stepper>
          <BackButton
            isLoading={
              toArriveItemRequestMutation.isPending ||
              toOnTheWayItemRequestMutation.isPending
            }
            onClick={() => setOpenedModalEdit(false)}
          />
        </Modal>

        <ModalStatusPermintaanBarang
          opened={openedModalStatusPengirimanToOtw}
          title="Ubah ke Dalam Perjalanan"
          onClose={closeModalStatusPengirimanToOtw}
          description="Anda yakin ihgin mengubah status menjadi Dalam Perjalanan ?"
          onAccept={onToOntheway}
        />

        <ModalStatusPermintaanBarang
          opened={openedModalStatusPengirimanToArrive}
          title="Ubah ke Telah Sampai"
          onClose={closeModalStatusPengirimanToArrive}
          description="Anda yakin ihgin mengubah status menjadi Telah ?"
          onAccept={onToArrive}
        />
      </PageContent>
    );
  };

export default ContentPermintaanBarangSuperadmin;
