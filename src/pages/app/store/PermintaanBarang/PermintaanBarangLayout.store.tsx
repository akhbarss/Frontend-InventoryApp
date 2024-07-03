import { isNotEmpty } from "@mantine/form";
import {
  PermintaanBarangFormProvider,
  usePermintaanBarangForm,
} from "@utils/context/form-context";
import { Outlet } from "react-router-dom";

const PermintaanBarangLayout = () => {
  const form = usePermintaanBarangForm({
    initialValues: {
      id: null,
      namaBarang: "",
      request_image: null,
      jumlahBarang: 0,
      keterangan: "",
      lokasi: "",
    },
    validate: {
      jumlahBarang: isNotEmpty(""),
      keterangan: isNotEmpty(""),
      lokasi: isNotEmpty(""),
      namaBarang: isNotEmpty(""),
      request_image: isNotEmpty(""),
    },
  });

  return (
    <PermintaanBarangFormProvider form={form}>
      <Outlet />
    </PermintaanBarangFormProvider>
  );
};

export default PermintaanBarangLayout;
