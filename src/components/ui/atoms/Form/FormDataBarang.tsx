import { NumberInput, TextInput } from "@mantine/core";
import { useDataBarangFormContext } from "../../../context/form-context";

export const FormDataBarang = () => {
    const form = useDataBarangFormContext();
    const {errors} = form
    return (
        <>
            <h1>{form.values.id}</h1>
            <TextInput
                label="barang"
                placeholder="barang"
                {...form.getInputProps("barang")}
            />
            <TextInput
                label="kodeBarang"
                placeholder="kodeBarang"
                {...form.getInputProps("kodeBarang")}
            />
            <TextInput
                label="lokasi"
                placeholder="lokasi"
                {...form.getInputProps("lokasi")}
            />
            <NumberInput
                  required
                  hideControls
                  label="Jumlah"
                //   disabled={loading}
                  decimalSeparator=","
                  allowDecimal={false}
                  error={errors.jumlah}
                  allowNegative={false}
                  leftSectionWidth={50}
                  thousandSeparator="."
                  allowLeadingZeros={false}
                  value={form.values.jumlah ?? 0}
                  onValueChange={({ floatValue }) => {
                      form.setFieldValue("jumlah", floatValue as unknown as number | null)
                  }}
                // {...form.getInputProps("jumlah")}
            />
            <TextInput
                label="keterangan"
                placeholder="keterangan"
                {...form.getInputProps("keterangan")}
            />
        </>
    )
}
