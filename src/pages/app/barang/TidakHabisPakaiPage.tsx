import { isNotEmpty } from "@mantine/form"
import { BarangKeluarTidakHabisPakaiFormProvider, useBarangKeluarTidakHabisPakaiForm } from "../../../utils/context/form-context"
import PageLabel from "../../../components/ui/atoms/PageLabel"
import ContentBarangTidakHabisPakai from "../../../components/ui/moleculs/ContentBarangTidakHabisPakai"
import { randomId } from "@mantine/hooks"

const TidakHabisPakaiPage = () => {
  const form = useBarangKeluarTidakHabisPakaiForm({
    initialValues: {
      barangKeluar: [
          {
              id: null,
              siswa: "",
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
      <PageLabel label="Barang Tidak Habis Pakai" />
      <BarangKeluarTidakHabisPakaiFormProvider form={form}>
        <ContentBarangTidakHabisPakai />
      </BarangKeluarTidakHabisPakaiFormProvider>
    </>
  )
}

export default TidakHabisPakaiPage