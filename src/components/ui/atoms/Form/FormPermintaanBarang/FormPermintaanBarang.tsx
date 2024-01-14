import { NumberInput, TextInput } from "@mantine/core"
import { usePermintaanBarangFormContext } from "../../../../context/form-context"

export const FormPermintaanBarang = () => {
    const form = usePermintaanBarangFormContext()

    return (
        <>
            <TextInput
                label="Nama Barang"
                {...form.getInputProps("namaBarang")}
            />
            <TextInput
                label="Lokasi"
                {...form.getInputProps("lokasi")}
            />
            <NumberInput
                label="Jumlah Barang"
                {...form.getInputProps("jumlahBarang")}
            />
            <TextInput
                label="Keterangan"
                {...form.getInputProps("keterangan")}
            />
        </>
    )
}
