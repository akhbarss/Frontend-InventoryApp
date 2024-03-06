import {
  PeminjamanBarangFormProvider,
  usePeminjamanBarangForm,
} from "../../utils/context/form-context";
import PageLabel from "../../components/ui/atoms/PageLabel";
import { ContentPeminjamanBarang } from "../../components/ui/moleculs/PeminjamanBarang/ContentPeminjamanBarang";

const PeminjamanBarang = () => {
  const form = usePeminjamanBarangForm({
    initialValues: {
      id: null,
      jumlah_barang: 0,
      kelas: "",
      keterangan: "",
      nama_barang: "",
      nama_peminjam: "",
      notelp: "",
    },
  });

  return (
    <>
      <PageLabel label="Peminjaman Barang" />

      <PeminjamanBarangFormProvider form={form}>
        <ContentPeminjamanBarang />
      </PeminjamanBarangFormProvider>
    </>
  );
};

export default PeminjamanBarang;
