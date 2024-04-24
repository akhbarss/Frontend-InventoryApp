import PageLabel from "@components/ui/atoms/PageLabel";
import { CategoryItem } from "@utils/types/items.type";
import ContentDataBarangSuperAdmin from "./ContentDataBarangSuperAdmin";

const DataBarangHabisPakaiSuperAdmin = () => {
  return (
    <>
      <PageLabel label="Data Barang - Habis Pakai" />
      <ContentDataBarangSuperAdmin categoryItem={CategoryItem.BARANG_HABIS_PAKAI} />
    </>
  );
};

export default DataBarangHabisPakaiSuperAdmin;
