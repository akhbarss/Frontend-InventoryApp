import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { ruanganLab } from "../../../../utils/constant";
import { useDataBarangFormContext } from "../../../../utils/context/form-context";

export const FormDataBarang = () => {
  const form = useDataBarangFormContext();
  const { errors } = form;
  return (
    <>
      <TextInput
        size="sm"
        label="Nama Barang"
        {...form.getInputProps("nama_barang")}
      />
      <Group>
        <Select
          size="sm"
          label="Lokasi"
          data={ruanganLab}
          {...form.getInputProps("lokasi")}
        />

        <NumberInput
          w={100}
          size="sm"
          style={{ flex: 1 }}
          required
          hideControls
          label="Jumlah"
          decimalSeparator=","
          allowDecimal={false}
          error={errors.jumlah}
          allowNegative={false}
          leftSectionWidth={50}
          thousandSeparator="."
          allowLeadingZeros={false}
          value={form.values.jumlah ?? 0}
          onValueChange={({ floatValue }) => {
            form.setFieldValue(
              "jumlah",
              floatValue as unknown as number | null
            );
          }}
        />
      </Group>

      <Box>
        <Text size="sm" mb={7}>
          Kode Barang
        </Text>
        <Group>
          <TextInput
            w={55}
            size="sm"
            maxLength={3}
            {...form.getInputProps("kode_barang")}
          />

          <TextInput
            size="sm"
            style={{ flex: 1 }}
            //   {...form.getInputProps("")}
          />
          <Button size="sm">Generate</Button>
        </Group>
      </Box>

      <Select
        label="Kategori Barang"
        data={["Habis Pakai", "Tidak Habis Pakai"]}
        {...form.getInputProps("kategori")}
      />

      <Select
        label="Kondisi Barang"
        data={["Baik", "Rusak Ringan", "Rusak Berat"]}
        {...form.getInputProps("kondisi")}
      />
    </>
  );
};
