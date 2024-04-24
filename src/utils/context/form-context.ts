import { createFormContext } from "@mantine/form";

interface BarangKeluarHabisPakaiFormValues {
  barangKeluar: {
    key: string;
    id: number | null;
    namaBarang: string;
    ruanganLab: string;
    jumlah: number;
  }[];
}
export const [
  BarangKeluarHabisPakaiFormProvider,
  useBarangKeluarHabisPakaiFormContext,
  useBarangKeluarHabisPakaiForm,
] = createFormContext<BarangKeluarHabisPakaiFormValues>();

interface BarangKeluarTidakHabisPakaiFormValues {
  barangKeluar: {
    key: string;
    id: number | null;
    siswa: string;
    namaBarang: string;
    ruanganLab: string;
    jumlah: number;
  }[];
}
export const [
  BarangKeluarTidakHabisPakaiFormProvider,
  useBarangKeluarTidakHabisPakaiFormContext,
  useBarangKeluarTidakHabisPakaiForm,
] = createFormContext<BarangKeluarTidakHabisPakaiFormValues>();

interface PermintaanBarangFormValues {
  id: number | null;
  namaBarang: string;
  lokasi: string;
  jumlahBarang: number | null;
  keterangan: string;
}
export const [
  PermintaanBarangFormProvider,
  usePermintaanBarangFormContext,
  usePermintaanBarangForm,
] = createFormContext<PermintaanBarangFormValues>();

interface PeminjamanBarangFormValues {
  id: number | null;
  nama_peminjam: string;
  nama_barang: string;
  jumlah_barang: number | null;
  kelas: string;
  notelp: string;
  keterangan: string;
}
export const [
  PeminjamanBarangFormProvider,
  usePeminjamanBarangFormContext,
  usePeminjamanBarangForm,
] = createFormContext<PeminjamanBarangFormValues>();

// interface BelumDiProsesFormValues {
//   id: number | null;
//   nama_barang: string;
//   jumlah: number | null;
//   lokasi: string;
//   keterangan: string;
// }
// export const [
//   BelumDiProsesFormProvider,
//   useBelumDiProsesFormContext,
//   useBelumDiProsesForm,
// ] = createFormContext<BelumDiProsesFormValues>();

interface ManajemenAdminFormValues {
  id: number | null;
  name: string;
  jurusan: string;
  username: string;
  password: string;
}
export const [
  ManajemenAdminFormProvider,
  useManajemenAdminFormContext,
  useManajemenAdminForm,
] = createFormContext<ManajemenAdminFormValues>();
