import { TextInput } from "@mantine/core"
import { usePeminjamanBarangFormContext } from "../../../../../utils/context/form-context"

export const FormPeminjamanBarang = () => {
    const form = usePeminjamanBarangFormContext()

    return (
        <>
            <h1>{form.values.id}</h1>

            <TextInput
                label="Nama Barang"
                placeholder="Nama Barang"
                {...form.getInputProps("nama_barang")}
            />

            <TextInput
                label="Jumlah Barang"
                placeholder="Jumlah Barang"
                {...form.getInputProps("jumlah_barang")}
            />

            <TextInput
                label="Nama Peminjam"
                placeholder="Nama Peminjam"
                {...form.getInputProps("nama_peminjam")}
            />

            <TextInput
                label="Kelas"
                placeholder="Kelas"
                {...form.getInputProps("kelas")}
            />

            <TextInput
                label="No Telp"
                placeholder="No Telp"
                {...form.getInputProps("notelp")}
            />

            <TextInput
                label="Keterangan"
                placeholder="Keterangan"
                {...form.getInputProps("keterangan")}
            />
        </>
    )
}
