import {
  Image,
  NumberInput,
  Select,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useGetClassRoom } from "@utils/hooks/useGetClassRoom";
import React, { useEffect, useState } from "react";
import { usePermintaanBarangFormContext } from "../../../../../utils/context/form-context";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export const FormPermintaanBarang = React.memo(() => {
  const classRoom = useGetClassRoom();
  const form = usePermintaanBarangFormContext();

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [initialImage, setInitialImage] = useState<string | null>(
    form.values.request_image || null
  );

  useEffect(() => {
    if (files.length > 0) {
      form.setFieldValue("request_image", files[0]);
      setInitialImage(null);
    }
  }, [files]);

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

  return (
    <>
      <TextInput label="Nama Barang" {...form.getInputProps("namaBarang")} />
      <Select
        label="Lokasi"
        data={classRoom}
        {...form.getInputProps("lokasi")}
      />
      <NumberInput
        decimalSeparator=","
        thousandSeparator="."
        hideControls
        label="Jumlah Barang"
        {...form.getInputProps("jumlahBarang")}
      />
      <Textarea
        autosize
        minRows={2}
        label="Keterangan"
        {...form.getInputProps("keterangan")}
      />

      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={setFiles}
        {...form.getInputProps("request_image")}
      >
        <Text ta="center">Gambar Barang</Text>
      </Dropzone>

      <SimpleGrid
        cols={files.length > 0 || imageSrc ? 1 : 0}
        mt={previews.length > 0 || imageSrc ? "xl" : 0}
      >
        {imageSrc && (
          <Image crossOrigin="anonymous" src={imageSrc} alt="Initial preview" />
        )}
        {previews}
      </SimpleGrid>
    </>
  );
});
