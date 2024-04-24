import { BaseModal } from "@components/ui/atoms";
import {
  ActionIcon,
  Box,
  ComboboxData,
  Group,
  Loader,
  Select,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { BasicInfoItem } from "@store/features/basic-info-items.slice";
import { useModalStore } from "@store/useModalStore";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ResponseError } from "@utils/ResponseError";
import { getBasicInfoItems } from "@utils/api/items/index.api";
import {
  PayloadUpdateRedeemCode,
  updateRedeemCode,
} from "@utils/api/reedem_code/index.api";
import { useGetClassRoom } from "@utils/hooks/useGetClassRoom";
import { showNotifications } from "@utils/showNotifications";
import { StatusExit } from "@utils/types/exit-logs.type";
import { CategoryItem, StatusItem } from "@utils/types/items.type";
import { ResponseGetAllReedemCode } from "@utils/types/redeem-code.type";
import { Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormValuesManajemenRedeemCode } from ".";

type ModalManajemenKodeProps = {
  form: UseFormReturnType<
    FormValuesManajemenRedeemCode,
    (values: FormValuesManajemenRedeemCode) => FormValuesManajemenRedeemCode
  >;
  data: UseQueryResult<ResponseGetAllReedemCode, Error>;
};
type FormManajemenKodeProps = {
  form: UseFormReturnType<
    FormValuesManajemenRedeemCode,
    (values: FormValuesManajemenRedeemCode) => FormValuesManajemenRedeemCode
  >;
  data: UseQueryResult<ResponseGetAllReedemCode, Error>;
};

const ModalManajemenKode = ({ form, data }: ModalManajemenKodeProps) => {
  const queryClient = useQueryClient();
  const { openedModalEdit, setOpenedModalEdit } = useModalStore();
  const updateRedeemCodeMutation = useMutation({
    mutationFn: updateRedeemCode,
  });
  const onUpdateRedeemCode = (data: typeof form.values) => {
    console.log(data);
    const datas: PayloadUpdateRedeemCode = {
      exit_class: data.exit_class,
      major_class: data.major_class,
      name: data.name,
      phone: data.phone,
      status_exit: data.status_exit,
      item_category: CategoryItem.BARANG_TIDAK_HABIS_PAKAI,
      item_details: data.item_details,
      redeemCode: data.redeeem_code,
      total: data.item_details.length,
    };

    updateRedeemCodeMutation.mutate(datas, {
      onSuccess: (res) => {
        console.log({ res });
        showNotifications({ title: "Succes", type: "success" });
        queryClient.invalidateQueries({ queryKey: ["get_all_reedem_code"] });
        setOpenedModalEdit(false);
      },
      onError: (error: any) => ResponseError(error),
    });
  };

  return (
    <>
      <BaseModal
        size={"md"}
        resetForm={form}
        title="Info Redeem Code"
        opened={openedModalEdit}
        onClose={() => setOpenedModalEdit(false)}
        onSubmit={form.onSubmit(() => setOpenedModalEdit(false))}
      >
        <FormManajemenKode data={data} form={form} />
      </BaseModal>
    </>
  );
};

const FormManajemenKode = ({
  form,
  data: queryRedeemCode,
}: FormManajemenKodeProps) => {
  const {
    errors,
    values: { item_details },
  } = form;
  const { data: redeemCodeData, isFetching: isFetchingRedeemCode } =
    queryRedeemCode;

  const classRooms = useGetClassRoom();
  const { openedModalEdit } = useModalStore();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const {
    data,
    isFetching: isFetchingItem,
    isLoading,
  } = useQuery({
    queryKey: [
      "get_basic_info_items",
      { categoryItem: CategoryItem.BARANG_TIDAK_HABIS_PAKAI },
    ],
    queryFn: () => getBasicInfoItems(CategoryItem.BARANG_TIDAK_HABIS_PAKAI),
    enabled: openedModalEdit === true,
  });

  const [datas, setDatas] = useState(
    data?.payload.findManyItemsWithNoPagination || []
  );
  const findRedeemCode = redeemCodeData?.payload.data.find(
    (redemcode) => redemcode.id == form.values.id
  );

  function setValue() {
    if (findRedeemCode !== undefined) {
      const itemDetailsSelect: BasicInfoItem[] =
        findRedeemCode?.exitLog.item_details.map((item) => ({
          id: item.item_id,
          item_code: item.item_code,
          name: item.item_name,
          status_item: StatusItem.TERSEDIA,
        })) || [];

      setSelectedItems((prev) => {
        const id: string[] = itemDetailsSelect.map((item) => item.id + "");
        return [...prev, ...id];
      });

      setDatas((prev) => {
        return [...prev, ...itemDetailsSelect];
      });
    }
  }

  useEffect(() => {
    if (dataLoaded) {
      setValue();
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (data !== undefined && !isFetchingItem && !isLoading) {
      setDatas(data?.payload.findManyItemsWithNoPagination);
      setDataLoaded(true);
    }
  }, [data, isFetchingItem, isLoading]);

  useEffect(() => {
    if (redeemCodeData && !isFetchingRedeemCode && openedModalEdit) {
      const itemDetails: typeof form.values.item_details =
        findRedeemCode?.exitLog.item_details?.map((item) => ({
          key: randomId(),
          item_id: item.item_id,
          jumlah: item.total_exit_item,
        }))!;
      form.setValues({
        exit_class: findRedeemCode?.exitLog?.exit_class,
        major_class: classRooms.find(
          (classes) => classes.label == findRedeemCode?.exitLog?.major_class
        )?.value,
        name: findRedeemCode?.exitLog?.name,
        phone: findRedeemCode?.exitLog?.phone,
        status_exit: findRedeemCode?.exitLog?.status_exit,
        redeeem_code: findRedeemCode?.redeem_code,
        item_details: itemDetails,
      });
    }
  }, [redeemCodeData, isFetchingRedeemCode, openedModalEdit]);

  const dataItems: ComboboxData = useMemo(
    () =>
      datas
        ?.sort((item) => item.id)
        .map((item) => ({
          label: `${item?.name} ${item?.item_code}`,
          value: item?.id + "",
          disabled: selectedItems.includes(item?.id + ""),
        })),
    [datas, selectedItems]
  );

  const fields = useMemo(() => {
    return form.values.item_details?.map((item, index) => {
      const value = item_details[index].item_id;
      return (
        <Group key={item.key} mt={"xs"} w={"100%"}>
          <Select
            flex={4}
            // disabled
            readOnly
            clearable
            searchable
            data={dataItems}
            value={value ? value + "" : null}
            onClear={() =>
              setSelectedItems((prevItems) =>
                prevItems.filter((item) => item !== value + "")
              )
            }
            onChange={(_, data) => {
              if (data?.value) {
                form.setFieldValue(`item_details.${index}.item_id`, data.value);
                setSelectedItems((prevItems) => [...prevItems, data.value]);
                return;
              }
              form.setFieldValue(`item_details.${index}.item_id`, null);
            }}
            error={errors[`item_details.${index}.item_id`]}
          />

          <ActionIcon
            color="red"
            size={"lg"}
            disabled
            onClick={() => {
              form.removeListItem("item_details", index);
              setSelectedItems((prevItems) =>
                prevItems.filter((item) => item !== value + "")
              );
            }}
          >
            <Trash2 size={20} />
          </ActionIcon>
        </Group>
      );
    });
  }, [form.values.item_details, item_details, dataItems, isFetchingItem]);

  const errorItemDetails = Object.keys(errors).some((key) =>
    key.startsWith("item_details")
  );
  if (isFetchingRedeemCode || isFetchingItem) {
    return <Loader />;
  }

  return (
    <>
      <Box>
        {fields?.length > 0 ? (
          <Group
          //   className={classes.label}
          >
            <Text fw={"bold"} size="sm" style={{ flex: 1 }}>
              Nama Barang
            </Text>
          </Group>
        ) : (
          <Text c="dimmed" ta="center">
            No one here...
          </Text>
        )}

        {fields}
        <Text c={"red.6"} size="xs" mt={"md"}>
          {errorItemDetails ? "Harap isi semua field data barang." : ""}
        </Text>

        <Stack mt={"lg"}>
          <TextInput
            readOnly
            label="Nama Peminjam"
            {...form.getInputProps("name")}
          />
          <TextInput
            readOnly
            label="Kelas"
            placeholder="X TKJ 1"
            {...form.getInputProps("exit_class")}
          />
          <Select
            readOnly
            label="Ruangan"
            data={classRooms}
            {...form.getInputProps("major_class")}
          />
          <TextInput
            readOnly
            label="No Telepon"
            {...form.getInputProps("phone")}
          />
          <Select
            readOnly
            label="Status Keluar"
            data={Object.values(StatusExit)}
            {...form.getInputProps("status_exit")}
          />
        </Stack>
      </Box>
    </>
  );
};

export default ModalManajemenKode;
