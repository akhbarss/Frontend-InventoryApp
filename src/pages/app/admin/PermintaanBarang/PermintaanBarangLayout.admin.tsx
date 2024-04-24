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
      jumlahBarang: 0,
      keterangan: "",
      lokasi: "",
    },
    validate: {
      jumlahBarang: isNotEmpty(""),
      keterangan: isNotEmpty(""),
      lokasi: isNotEmpty(""),
      namaBarang: isNotEmpty(""),
    },
  });

  return (
    <PermintaanBarangFormProvider form={form}>
      <Outlet />
    </PermintaanBarangFormProvider>
  );
};

export default PermintaanBarangLayout;
