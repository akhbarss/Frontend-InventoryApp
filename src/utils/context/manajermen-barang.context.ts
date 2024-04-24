import { createFormContext } from "@mantine/form";
import { StatusExit } from "@utils/types/exit-logs.type";

export type ItemDetail = {
  key: string;
  item_id: number | null;
  jumlah: string;
};

export interface ManajemenBarangFormValues {
  id: number | null;
  name: string;
  phone: string;
  major_class: string;
  exit_class: string;
  status_exit: StatusExit;
  item_details: ItemDetail[];
}
export const [
  ManajemenBarangFormProvider,
  useManajemenBarangFormContext,
  useManajemenBarangForm,
] = createFormContext<ManajemenBarangFormValues>();
