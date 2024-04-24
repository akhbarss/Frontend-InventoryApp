import PageLabel from "@components/ui/atoms/PageLabel";
import ContentPermintaanBarangSuperadmin from "../ContentPermintaanBarangSuperadmin";

const PermintaanBarang_TelahDiProses = () => {
  return (
    <>
      <PageLabel label="Telah di Proses" />
      <ContentPermintaanBarangSuperadmin statusRequestItem="TELAH DI PROSES"/>
    </>
  );
};

export default PermintaanBarang_TelahDiProses;
