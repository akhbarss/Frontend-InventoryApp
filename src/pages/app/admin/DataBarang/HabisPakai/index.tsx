import PageLabel from "@components/ui/atoms/PageLabel";
import { isNotEmpty } from "@mantine/form";
import {
  DataBarangHabisPakaiFormProvider,
  useDataBarangHabisPakaiForm,
} from "@utils/context/data-barang-form.context";
import { CategoryItem, ItemSource, ItemType } from "@utils/types/items.type";
import Content_DataBarang_HabisPakai from "./Content";
import { queryClient } from "@utils/queryClient";
import { getItems } from "@utils/api/items";
import { ITEM_PER_PAGE } from "@utils/constant";

function DataBarang_HabisPakai() {
  const form = useDataBarangHabisPakaiForm({
    initialValues: {
      id: null,
      name: "",
      class_id: null,
      item_code: {
        prefix_code: "",
        value_code: "",
      },
      item_type: ItemType.NON_ATK,
      source_fund: ItemSource.BOSDA,
      status_item: "TERSEDIA",
      unit_price: 0,
      total_unit: "",
    },
    validate: {
      name: isNotEmpty("Harap isi nama barang."),
      class_id: isNotEmpty("Harap isi lokasi barang."),
      item_code: {
        prefix_code: isNotEmpty(),
        value_code: isNotEmpty(),
      },
      source_fund: isNotEmpty("source_fund"),
      unit_price: isNotEmpty("Harap isi harga per barang."),
      item_type: isNotEmpty("item_type"),
      status_item: isNotEmpty("status_item"),
      total_unit: isNotEmpty("Harap isi total barang."),
    },
  });
  return (
    <>
      <PageLabel label="Data Barang - Habis Pakai" />
      <DataBarangHabisPakaiFormProvider form={form}>
        <Content_DataBarang_HabisPakai />
      </DataBarangHabisPakaiFormProvider>
    </>
  );
}

export async function loader() {
  return queryClient.fetchQuery({
    queryKey: [
      "get_items",
      {
        category: CategoryItem.BARANG_HABIS_PAKAI,
        classId: null,
        page: 1,
        take: 10,
      },
    ],
    queryFn: () =>
      getItems({
        category: CategoryItem.BARANG_HABIS_PAKAI,
        orderBy: "ASC",
        page: 1,
        take: ITEM_PER_PAGE,
        classId: null,
      }),
  });
}

export default DataBarang_HabisPakai;
