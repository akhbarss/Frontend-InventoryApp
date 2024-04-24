import { NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { useGetClassRoom } from "@utils/hooks/useGetClassRoom";
import React from "react";
import { usePermintaanBarangFormContext } from "../../../../../utils/context/form-context";

export const FormPermintaanBarang = React.memo(() => {
  console.log("form");
  const classRoom = useGetClassRoom();
  const form = usePermintaanBarangFormContext();

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
    </>
  );
});
