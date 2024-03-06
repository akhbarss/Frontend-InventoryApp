import { NumberInput, Select, TextInput } from '@mantine/core'
import { useBarangKeluarHabisPakaiFormContext } from '../../../../../utils/context/form-context'

export const FormEditBarangKeluarHabisPakai = () => {
    const form = useBarangKeluarHabisPakaiFormContext()

    return (
        <>
            <h1>{form.values.barangKeluar[0].id}</h1>
            <TextInput
                withAsterisk
                label="Nama Barang"
                placeholder="RJ45"
                {...form.getInputProps(`barangKeluar.0.namaBarang`)}
            />
            <Select
                label="Ruang"
                data={[
                    {
                        label: "Lab 1",
                        value: "Lab 1",
                    },
                    {
                        label: "Lab 2",
                        value: "Lab 2",
                    },
                    {
                        label: "Lab 3",
                        value: "Lab 3",
                    },
                ]}
                {...form.getInputProps('barangKeluar.0.ruanganLab')}
            />
            <NumberInput hideControls
                label="Jumlah Barang"
                {...form.getInputProps('barangKeluar.0.jumlah')}
            />
        </>
    )
}
