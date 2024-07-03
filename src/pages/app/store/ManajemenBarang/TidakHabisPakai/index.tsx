import PageLabel from "@components/ui/atoms/PageLabel";
import { CategoryItem } from "@utils/types/items.type";
import { ContentManajemenBarang } from "../ContentManajemenBarang";

const ManajemenBarang_TidakHabisPakai = () => {
  return (
    <>
      <PageLabel label="Barang Tidak Habis Pakai" />
      <ContentManajemenBarang
        categoryItem={CategoryItem.BARANG_TIDAK_HABIS_PAKAI}
      />
    </>
  );
};

export default ManajemenBarang_TidakHabisPakai;
