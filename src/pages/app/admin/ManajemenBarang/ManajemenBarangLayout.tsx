import { isNotEmpty } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import {
  ManajemenBarangFormProvider,
  useManajemenBarangForm,
} from "@utils/context/manajermen-barang.context";
import { StatusExit } from "@utils/types/exit-logs.type";
import { Outlet } from "react-router-dom";

const ManajemenBarangLayout = () => {
  const formManajemenBarang = useManajemenBarangForm({
    initialValues: {
      id: null,
      item_details: [{ item_id: null, jumlah: "", key: randomId() }],
      major_class: "",
      exit_class: "",
      name: "",
      phone: "",
      status_exit: StatusExit.PEMINJAMAN,
    },
    validate: {
      item_details: {
        item_id: isNotEmpty(),
      },
      major_class: isNotEmpty(),
      name: isNotEmpty(),
      phone: isNotEmpty(),
      status_exit: isNotEmpty(),
      exit_class: isNotEmpty(),
    },
  });
  
  return (
    <ManajemenBarangFormProvider form={formManajemenBarang}>
      <Outlet />
    </ManajemenBarangFormProvider>
  );
};

export default ManajemenBarangLayout;
