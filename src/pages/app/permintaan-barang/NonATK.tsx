import { isNotEmpty } from "@mantine/form"
import { PermintaanBarangFormProvider, usePermintaanBarangForm } from "../../../components/context/form-context"
import PageLabel from "../../../components/ui/atoms/PageLabel"
import { ContentNonATK } from "../../../components/ui/moleculs/NonATK/ContentNonATK"

const NonATK = () => {
  const form = usePermintaanBarangForm({
    initialValues: {
      namaBarang: "",
      jumlahBarang: 0,
      keterangan: "",
      lokasi: "",
    },
    validate: {
      jumlahBarang: isNotEmpty(""),
      keterangan: isNotEmpty(""),
      lokasi: isNotEmpty(""),
      namaBarang: isNotEmpty(""),
    }
  })

  return (
    <>
      <PageLabel label="Permintaan Barang - Non ATK" />
      <PermintaanBarangFormProvider form={form}>
        <ContentNonATK />
      </PermintaanBarangFormProvider>
    </>
  )
}

export default NonATK