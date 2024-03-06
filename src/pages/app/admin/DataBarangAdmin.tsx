import { isNotEmpty } from "@mantine/form";
import {
  DataBarangFormProvider,
  useDataBarangForm,
} from "../../../utils/context/form-context";
import PageLabel from "../../../components/ui/atoms/PageLabel";
import ContentDataBarang from "../../../components/ui/moleculs/DataBarang/ContentDataBarangAdmin";

const DataBarangAdmin = () => {
  const form = useDataBarangForm({
    initialValues: {
      id: null,
      nama_barang: "",
      lokasi: "",
      jumlah: null,
      kategori: "",
      kode_barang: "",
      kondisi: "",
    },
    validate: {
      nama_barang: isNotEmpty(""),
      lokasi: isNotEmpty(""),
      jumlah: isNotEmpty(""),
      kategori: isNotEmpty(""),
      kode_barang: isNotEmpty(""),
      kondisi: isNotEmpty(""),
    },
  });
  return (
    <>
      <PageLabel label="Data Barang" />
      <DataBarangFormProvider form={form}>
        <ContentDataBarang />
      </DataBarangFormProvider>
    </>
  );
};

export default DataBarangAdmin;
