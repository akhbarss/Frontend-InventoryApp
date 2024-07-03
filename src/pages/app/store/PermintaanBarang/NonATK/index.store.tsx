import PageLabel from "@components/ui/atoms/PageLabel";
import ContentPermintaanBarang from "../ContentPermintaanBarang.store";
import { ItemType } from "@utils/types/items.type";

const PermintaanBarang_NonATK = () => {
  return (
    <>
      <PageLabel label="Permintaan Barang - Non ATK" />
      <ContentPermintaanBarang itemType={ItemType.NON_ATK} />
    </>
  );
};

export default PermintaanBarang_NonATK;
