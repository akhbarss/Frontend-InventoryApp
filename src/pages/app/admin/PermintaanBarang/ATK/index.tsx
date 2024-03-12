import { isNotEmpty } from "@mantine/form"
import { PermintaanBarangFormProvider, usePermintaanBarangForm } from "../../../../../utils/context/form-context"
import PageLabel from "../../../../../components/ui/atoms/PageLabel"
import { ContentAtk } from "../../../../../components/ui/moleculs/ATK/ContentAtk"


const ATK = () => {
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
      <PageLabel label="Permintaan Barang - ATK" />
      <PermintaanBarangFormProvider form={form}>
        <ContentAtk />
      </PermintaanBarangFormProvider>
    </>
  )
}

export default ATK