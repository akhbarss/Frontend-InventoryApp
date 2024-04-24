import { createFormContext } from "@mantine/form";
import { ItemCondition, ItemSource, ItemType } from "@utils/types/items.type";


export type DataBarangFormValues = {
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
  item_condition: ItemCondition
};

export const [
  DataBarangFormProvider,
  useDataBarangFormContext,
  useDataBarangForm,
] = createFormContext<DataBarangFormValues>();
