import { isNotEmpty } from "@mantine/form";
import {
  DataBarangFormProvider,
  useDataBarangForm,
} from "@utils/context/data-barang-form.context";
import { ItemCondition, ItemSource, ItemType } from "@utils/types/items.type";
import { Outlet } from "react-router-dom";

export const DataBarangLayout = () => {
  const formDataBarang = useDataBarangForm({
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
      item_condition: ItemCondition.BAIK,
    },
    validate: {
      name: isNotEmpty("Harap isi nama barang."),
      class_id: isNotEmpty("Harap isi lokasi barang."),
      // item_code: {
      //   prefix_code: isNotEmpty(),
      //   value_code: isNotEmpty(),
      // },
      source_fund: isNotEmpty("Harap isi asal barang."),
      unit_price: isNotEmpty("Harap isi harga per barang."),
      item_type: isNotEmpty("Harap isi tipe barang."),
      status_item: isNotEmpty("status_item"),
      // total_unit: isNotEmpty("Harap isi total barang."),
      item_condition: isNotEmpty("Harap isi kondisi barang."),
    },
  });

  return (
    <DataBarangFormProvider form={formDataBarang}>
      <Outlet />
    </DataBarangFormProvider>
  );
};
