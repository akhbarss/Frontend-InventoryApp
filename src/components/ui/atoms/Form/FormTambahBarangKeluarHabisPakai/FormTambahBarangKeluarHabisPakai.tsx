import {
    ActionIcon,
    Box,
    Button,
    Group,
    NumberInput,
    Select,
    Text,
    TextInput
} from "@mantine/core"
import { randomId } from "@mantine/hooks"
import { Trash2 } from "lucide-react"
import { useBarangKeluarHabisPakaiFormContext } from "../../../../context/form-context"
import classes from "./FormTambahBarangKeluarHabisPakai.module.css"

export const FormTambahBarangKeluarHabisPakai = () => {
    const form = useBarangKeluarHabisPakaiFormContext()

    const fields = form.values.barangKeluar.map((item, index) => {
        return (
            <Group key={item.key} mt={"xs"} w={"100%"} >
                <TextInput
                    style={{ flex: 4 }}
                    withAsterisk
                    placeholder="RJ45"
                    {...form.getInputProps(`barangKeluar.${index}.namaBarang`)}
                />
                <Select style={{ flex: 2 }} />
                <NumberInput hideControls style={{ flex: 1 }} />
                <ActionIcon
                    color="red"
                    size={"lg"}
                    onClick={() => form.removeListItem('barangKeluar', index)}
                >
                    <Trash2 size={20} />
                </ActionIcon>
            </Group>
        )
    })

    return (
        <>
            <Box >
                {fields.length > 0 ? (
                    <Group className={classes.label}>
                        <Text fw={"bold"} size="sm" style={{ flex: 1 }}>
                            Name
                        </Text>
                        <Text fw={"bold"} size="sm" pr={80} >
                            Ruangan
                        </Text>
                        <Text fw={"bold"} size="sm" pr={80} >
                            Jumlah
                        </Text>
                    </Group>
                ) : (
                    <Text c="dimmed" ta="center">
                        No one here...
                    </Text>
                )}

                {fields}

                <Group justify="center" mt="md">
                    <Button
                        onClick={() =>
                            form.insertListItem('barangKeluar', {
                                key: randomId(),
                                jumlah: 0,
                                namaBarang: "",
                                ruanganLab: ""
                            })
                        }
                    >
                        Tambah Barang
                    </Button>
                </Group>
            </Box>
        </>
    )
}
