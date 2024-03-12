import { createFormContext } from "@mantine/form";
import { ItemSource, ItemType } from "../types/items.type";

type DataBarang_HabisPakai_FormValues = {
  id: number | null;
  name: string;
  item_code: {
    prefix_code: string;
    value_code: string;
  };
  status_item: string;
  source_fund: ItemSource;
  unit_price: number;
  class_id: string | null;
  item_type: ItemType;
  total_unit: string;
};

type DataBarang_TidakHabisPakai_FormValues = {} & Omit<
  DataBarang_HabisPakai_FormValues,
  "total_unit"
>;

export const [
  DataBarangHabisPakaiFormProvider,
  useDataBarangHabisPakaiFormContext,
  useDataBarangHabisPakaiForm,
] = createFormContext<DataBarang_HabisPakai_FormValues>();

export const [
  DataBarangTidakHabisPakaiFormProvider,
  useDataBarangTidakHabisPakaiFormContext,
  useDataBarangTidakHabisPakaiForm,
] = createFormContext<DataBarang_TidakHabisPakai_FormValues>();
