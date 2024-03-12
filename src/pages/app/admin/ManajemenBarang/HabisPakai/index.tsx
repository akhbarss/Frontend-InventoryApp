import { isNotEmpty } from "@mantine/form"
import { randomId } from "@mantine/hooks"
import PageLabel from "../../../../../components/ui/atoms/PageLabel"
import ContentBarangHabisPakai from "../../../../../components/ui/moleculs/ContentBarangHabisPakai"
import { BarangKeluarHabisPakaiFormProvider, useBarangKeluarHabisPakaiForm } from "../../../../../utils/context/form-context"


const HabisPakaiPage = () => {
    const form = useBarangKeluarHabisPakaiForm({
        initialValues: {
            barangKeluar: [
                {
                    id: null,
                    jumlah: 0,
                    namaBarang: "",
                    ruanganLab: "",
                    key: randomId()
                }
            ]
        },
        validate: {
            barangKeluar: {
                namaBarang: isNotEmpty(""),
                jumlah: isNotEmpty(""),
                ruanganLab: isNotEmpty("")
            }
        }
    })


    return (
        <>
            <PageLabel label="Barang Habis Pakai" />
            <BarangKeluarHabisPakaiFormProvider form={form}>
                <ContentBarangHabisPakai />
            </BarangKeluarHabisPakaiFormProvider>
        </>
    )
}

export default HabisPakaiPage