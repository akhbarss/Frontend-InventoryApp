import { ManajemenAdminFormProvider, useManajemenAdminForm } from "../../utils/context/form-context"
import PageLabel from "../../components/ui/atoms/PageLabel"
import { ContentManajemenAdmin } from "../../components/ui/moleculs/ManajemenAdmin/ContentManajemenAdmin"

const ManajemenAdminPage = () => {
  const form = useManajemenAdminForm({
    initialValues: {
      id: null,
      jurusan: "",
      name: "",
      password: "",
      username: ""
    }
  })

  return (
    <>
      <PageLabel label="Manajemen Admin" />
      <ManajemenAdminFormProvider form={form}>
        <ContentManajemenAdmin />
      </ManajemenAdminFormProvider>
    </>
  )
}

export default ManajemenAdminPage