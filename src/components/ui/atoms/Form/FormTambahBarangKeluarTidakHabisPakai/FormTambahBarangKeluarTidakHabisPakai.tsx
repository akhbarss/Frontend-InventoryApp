import {
  ActionIcon,
  Box,
  Button,
  ComboboxData,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useModalStore } from "@store/useModalStore";
import { useQuery } from "@tanstack/react-query";
import { getBasicInfoItems } from "@utils/api/items/index.api";
import { useManajemenBarangFormContext } from "@utils/context/manajermen-barang.context";
import { StatusExit } from "@utils/types/exit-logs.type";
import { CategoryItem } from "@utils/types/items.type";
import { Plus, Trash2, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import classes from "./FormTambahBarangKeluarTidakHabisPakai.module.css";
import { useGetClassRoom } from "@utils/hooks/useGetClassRoom";
import { useAuth } from "@utils/hooks/useAuth";

type FormTambahBarangKeluarTidakHabisPakaiProps = {
  categoryItem: CategoryItem.BARANG_TIDAK_HABIS_PAKAI;
};

export const FormTambahBarangKeluarTidakHabisPakai = React.memo(
  ({ categoryItem }: FormTambahBarangKeluarTidakHabisPakaiProps) => {
    console.log("form");
    const { user } = useAuth();
    const major = user?.role?.major;
    const form = useManajemenBarangFormContext();
    const {
      errors,
      values: { item_details },
    } = form;

    const classRooms = useGetClassRoom();
    const { openedModalCreate } = useModalStore();
    const { data, isFetching: isFetchingItem } = useQuery({
      queryKey: ["get_basic_info_items", { categoryItem, major }],
      queryFn: () => getBasicInfoItems(categoryItem, major!),
      enabled: (openedModalCreate === true) || (major !== null),
    });
    
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const datas = data?.payload?.findManyItemsWithNoPagination || [];
    console.log({ datas });
    const dataItems: ComboboxData = useMemo(
      () =>
        datas.map((item) => ({
          label: `${item.name} ${item.item_code}`,
          value: item.id + "",
          disabled: selectedItems.includes(item.id + ""),
        })),
      [datas, selectedItems]
    );

    const fields = useMemo(() => {
      return form.values.item_details.map((item, index) => {
        const value = item_details[index].item_id;
        return (
          <Group key={item.key} mt={"xs"} w={"100%"}>
            <Select
              flex={4}
              clearable
              searchable
              data={dataItems}
              rightSectionPointerEvents="all"
              rightSection={
                <X
                  style={{ cursor: "pointer", opacity: value == null ? 0 : 1 }}
                  onClick={() => {
                    form.setFieldValue(`item_details.${index}.item_id`, null);
                    setSelectedItems((prevItems) =>
                      prevItems.filter((item) => item !== value + "")
                    );
                  }}
                />
              }
              disabled={isFetchingItem || value !== null}
              value={value ? value + "" : null}
              onClear={() =>
                setSelectedItems((prevItems) =>
                  prevItems.filter((item) => item !== value + "")
                )
              }
              onChange={(_, data) => {
                if (data?.value) {
                  form.setFieldValue(
                    `item_details.${index}.item_id`,
                    data.value
                  );
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
              disabled={form.values.item_details.length == 1}
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

    return (
      <>
        <Box>
          {fields.length > 0 ? (
            <Group className={classes.label}>
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

          <Group mt="md">
            <Button
              disabled={dataItems?.length == fields?.length}
              leftSection={<Plus />}
              radius={"xl"}
              variant="outline"
              onClick={() =>
                form.insertListItem("item_details", {
                  key: randomId(),
                  item_id: null,
                  jumlah: "",
                })
              }
            >
              Tambah Barang
            </Button>
          </Group>

          <Stack mt={"lg"}>
            <TextInput label="Nama Peminjam" {...form.getInputProps("name")} />
            <TextInput
              label="Kelas"
              placeholder="X TKJ 1"
              {...form.getInputProps("exit_class")}
            />
            <Select
              label="Ruangan"
              data={classRooms}
              {...form.getInputProps("major_class")}
            />
            <TextInput label="No Telepon" {...form.getInputProps("phone")} />
            <Select
              label="Status Keluar"
              data={Object.values(StatusExit)}
              {...form.getInputProps("status_exit")}
            />
          </Stack>
        </Box>
      </>
    );
  }
);
