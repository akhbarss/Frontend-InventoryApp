import PageLabel from "@components/ui/atoms/PageLabel";
import ContentPermintaanBarang from "../ContentPermintaanBarang.admin";
import { ItemType } from "@utils/types/items.type";

const PermintaanBarang_ATK = () => {
  return (
    <>
      <PageLabel label="Permintaan Barang - ATK" />
      <ContentPermintaanBarang itemType={ItemType.ATK} />
    </>
  );
};

export default PermintaanBarang_ATK;
