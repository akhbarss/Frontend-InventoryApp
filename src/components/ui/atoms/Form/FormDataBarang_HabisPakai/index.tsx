import {
  Box,
  Group,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useDataBarangHabisPakaiFormContext } from "@utils/context/data-barang-form.context";
import { useGetClassRoom } from "@utils/hooks/useGetClassRoom";
import { ItemSource } from "@utils/types/items.type";
import classes from "./FormDataBarang.module.css";

export const FormDataBarang_HabisPakai = () => {
  const classRoom = useGetClassRoom();
  const form = useDataBarangHabisPakaiFormContext();

  const error = form.errors as unknown as typeof form.values;
  const errPrefixCode = (error as any)["item_code.prefix_code"];
  const errValueCode = (error as any)["item_code.value_code"];
  const errorItemCode =
    errPrefixCode || errValueCode ? "Harap isi kode barang" : undefined;

  return (
    <>
      {/* Nama Barang */}
      <TextInput
        size="sm"
        label="Nama Barang"
        {...form.getInputProps("name")}
      />

      {/* Lokasi Barang */}
      <Select
        w={200}
        size="sm"
        label="Lokasi Barang"
        data={classRoom}
        {...form.getInputProps("class_id")}
      />

      {/* Kode barang */}
      <Box>
        <Text size="sm" mb={7}>
          Kode Barang
        </Text>

        <Group>
          {/* Prefix Code */}
          <TextInput
            w={60}
            size="sm"
            type="text"
            maxLength={3}
            placeholder="ABC"
            classNames={{ input: classes.input }}
            {...form.getInputProps("item_code.prefix_code")}
          />

          {/* Value Code */}
          <NumberInput
            size="sm"
            maxLength={6}
            hideControls
            placeholder="123456"
            allowDecimal={false}
            error={errValueCode}
            allowNegative={false}
            leftSectionWidth={50}
            allowLeadingZeros={true}
            value={form.values.item_code.value_code}
            onValueChange={({ formattedValue }) => {
              form.setFieldValue("item_code.value_code", formattedValue);
            }}
          />
        </Group>

        {/* Error Kode Barang */}
        <Text mt={5} size="xs" c={"red.7"}>
          {errorItemCode}
        </Text>
      </Box>

      {/* Kategori Barang */}
      {/* <Select
        label="Kategori Barang"
        data={Object.values(CategoryItem)}
        {...form.getInputProps("category_item")}
      /> */}

      {/* Asal Barang */}
      <Select
        label="Asal Barang"
        data={Object.values(ItemSource)}
        {...form.getInputProps("source_fund")}
      />

      {/* Harga Per Barang */}
      <NumberInput
        prefix="Rp. "
        size="sm"
        hideControls
        label="Harga Per Barang"
        decimalSeparator=","
        allowDecimal={false}
        error={error.unit_price}
        allowNegative={false}
        leftSectionWidth={50}
        thousandSeparator="."
        allowLeadingZeros={false}
        value={form.values.unit_price}
        onValueChange={({ floatValue }) => {
          form.setFieldValue("unit_price", floatValue as number);
        }}
      />

      {/* Total Barang */}
      <NumberInput
        size="sm"
        hideControls
        label="Total Barang"
        decimalSeparator=","
        allowDecimal={false}
        error={error?.total_unit}
        allowNegative={false}
        leftSectionWidth={50}
        thousandSeparator="."
        allowLeadingZeros={false}
        value={form.values.total_unit}
        onValueChange={({ floatValue }) => {
          form.setFieldValue("total_unit", floatValue + "");
        }}
      />
    </>
  );
};
