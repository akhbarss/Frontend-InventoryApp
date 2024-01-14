import { createFormContext } from "@mantine/form";

interface DataBarangFormValues {
  id: number | null;
  barang: string;
  kodeBarang: string;
  lokasi: string;
  jumlah: number | null;
  keterangan: string;
}
export const [
  DataBarangFormProvider,
  useDataBarangFormContext,
  useDataBarangForm,
] = createFormContext<DataBarangFormValues>();

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
