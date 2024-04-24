import { isNotEmpty } from "@mantine/form";
import PageLabel from "../../../../components/ui/atoms/PageLabel";
import { ContentManajemenAdmin } from "../../../../components/ui/moleculs/ManajemenAdmin/ContentManajemenAdmin";
import {
  ManajemenAdminFormProvider,
  useManajemenAdminForm,
} from "../../../../utils/context/form-context";

const ManajemenUser = () => {
  const form = useManajemenAdminForm({
    initialValues: {
      id: null,
      jurusan: "",
      name: "",
      password: "",
      username: "",
    },
    validate: {
      jurusan: isNotEmpty("Harap isi jurusan."),
      name: isNotEmpty("Harap isi name."),
      // password: isNotEmpty("Harap isi //."),
      username: isNotEmpty("Harap isi username."),
    },
  });

  return (
    <>
      <PageLabel label="Manajemen User" />
      <ManajemenAdminFormProvider form={form}>
        <ContentManajemenAdmin />
      </ManajemenAdminFormProvider>
    </>
  );
};

export default ManajemenUser;
