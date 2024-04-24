import PageLabel from "@components/ui/atoms/PageLabel";
import { CategoryItem } from "@utils/types/items.type";
import { ContentManajemenBarang } from "../ContentManajemenBarang";

const ManajemenBarang_HabisPakai = () => {
  console.log("page habis pakai");
  return (
    <>
      <PageLabel label="Manajemen Barang - Habis Pakai" />
      <ContentManajemenBarang categoryItem={CategoryItem.BARANG_HABIS_PAKAI} />
    </>
  );
};

export default ManajemenBarang_HabisPakai;
