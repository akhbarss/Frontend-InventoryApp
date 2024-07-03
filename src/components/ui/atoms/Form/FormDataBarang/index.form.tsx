import {
  Box,
  Group,
  Image,
  NumberInput,
  Select,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { useDataBarangFormContext } from "@utils/context/data-barang-form.context";
import { useGetClassRoom } from "@utils/hooks/useGetClassRoom";
import {
  CategoryItem,
  ItemCondition,
  StatusItem,
} from "@utils/types/items.type";
import classes from "./FormDataBarang.module.css";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@store/store";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

type FormDataBarangProps = {
  readOnly?: boolean;
  categoryItem: CategoryItem;
};

export const FormDataBarang = React.memo(
  ({ categoryItem, readOnly }: FormDataBarangProps) => {
    const classRoom = useGetClassRoom();
    const allClassRoom = useAppSelector((state) => state.class.classes);
    const form = useDataBarangFormContext();
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const [initialImage, setInitialImage] = useState<string | null>(
      form.values.item_image || null
    );

    useEffect(() => {
      if (files.length > 0) {
        form.setFieldValue("item_image", files[0]);
        setInitialImage(null);
      }
    }, [files]);

    console.log(form.getInputProps("item_image"));

    const previews = files.map((file, index) => {
      const imageUrl = URL.createObjectURL(file);
      return (
        <Image
          key={index}
          src={imageUrl}
          onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
      );
    });

    const imageSrc = initialImage
      ? `${import.meta.env.VITE_BACKEND_URL}/uploads/images/${initialImage}`
      : null;

    console.log(imageSrc);

    const formattedAllClassRoom = allClassRoom.map((clas) => ({
      value: clas.id + "",
      label: clas.class_name,
    }));

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
          readOnly={readOnly}
          {...form.getInputProps("name")}
          onFocus={undefined}
        />

        {/* Lokasi Barang */}
        <Select
          w={200}
          size="sm"
          label="Lokasi Barang"
          data={readOnly ? formattedAllClassRoom : classRoom}
          readOnly={readOnly}
          {...form.getInputProps("class_id")}
          onFocus={undefined}
        />

        {/* Kode barang */}

        {categoryItem == CategoryItem.BARANG_TIDAK_HABIS_PAKAI ? (
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
                minLength={3}
                placeholder="ABC"
                classNames={{ input: classes.input }}
                readOnly={readOnly}
                {...form.getInputProps("item_code.prefix_code")}
              />

              {/* Value Code */}
              <NumberInput
                size="sm"
                hideControls
                minLength={6}
                maxLength={6}
                placeholder="123456"
                allowDecimal={false}
                error={errValueCode}
                allowNegative={false}
                leftSectionWidth={50}
                allowLeadingZeros={true}
                value={form.values.item_code.value_code}
                readOnly={readOnly}
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
        ) : (
          ""
        )}

        {/* Asal Barang */}
        {/* <Select
          label="Asal Barang"
          data={Object.values(ItemSource)}
          readOnly={readOnly}
          {...form.getInputProps("source_fund")}
          onChange={(val) => {
            return val;
          }}
        /> */}

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
          readOnly={readOnly}
          onValueChange={({ floatValue }) => {
            form.setFieldValue("unit_price", floatValue as number);
          }}
        />

        {/* Total Barang */}
        {categoryItem == CategoryItem.BARANG_HABIS_PAKAI ? (
          <>
            <TextInput
              size="sm"
              label="Total Barang"
              readOnly={readOnly}
              {...form.getInputProps("total_unit")}
            />
            {/* <NumberInput
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
            /> */}
          </>
        ) : (
          ""
        )}

        {/* Kondisi Barang */}
        <Select
          label="Kondisi Barang"
          data={Object.values(ItemCondition)}
          readOnly={readOnly}
          {...form.getInputProps("item_condition")}
        />
        <Select
          label="Status Barang"
          data={Object.values(StatusItem)}
          readOnly={readOnly}
          {...form.getInputProps("status_item")}
        />

        {/* Gambar Barang */}
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={setFiles}
          disabled={readOnly}
          {...form.getInputProps("item_image")}
        >
          <Text ta="center">Gambar Barang</Text>
        </Dropzone>

        <SimpleGrid
          cols={files.length > 0 || imageSrc ? 1 : 0}
          mt={previews.length > 0 || imageSrc ? "xl" : 0}
        >
          {imageSrc && (
            <Image
              crossOrigin="anonymous"
              src={imageSrc}
              alt="Initial preview"
            />
          )}
          {previews}
        </SimpleGrid>
      </>
    );
  }
);
