import { notifications } from "@mantine/notifications";
import { useDataBarangFormContext } from "../context/form-context";
import { setLoading } from "../../store/features/LoadingSlice";
import {
  setOpenCreateModal,
  setOpenEditModal,
} from "../../store/features/ModalSlice";
import { useAppDispatch } from "../../store/store";
import { TDataBarang } from "../columns/data-barang";

export const dataBarangAdmin: TDataBarang[] = [
  {
    id: 1,
    nama_barang: "RJ 45",
    lokasi: "Lab 1",
    jumlah: 1,
    kode_barang: "MSK",
    kondisi: "Baik",
    kategori: "Habis Pakai",
  },
];

export const useActionBarang = () => {
  const dispatch = useAppDispatch();
  const form = useDataBarangFormContext();

  const tambahBarang = (
    // setData: React.Dispatch<React.SetStateAction<TDataBarang[]>>
  ) => {
    // dispatch(setLoading(true));
    console.log("tasmbah barang")
    // setTimeout(() => {
    //   const { jumlah, kategori, kode_barang, kondisi, lokasi, nama_barang } =
    //     form.values;
    //   // setData((value) => [
    //   //   ...value,
    //   //   {
    //   //     id: value[value.length - 1].id + 1,
    //   //     jumlah,
    //   //     kategori,
    //   //     kode_barang,
    //   //     kondisi,
    //   //     lokasi,
    //   //     nama_barang,
    //   //   },
    //   // ]);
    //   dispatch(setLoading(false));
    //   dispatch(setOpenCreateModal(false));
    //   form.reset();
    //   notifications.show({
    //     message: "success",
    //     color: "green",
    //   });
    // }, 1000);
  };

  const editBarang = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(setOpenEditModal(false));
      form.reset();
      notifications.show({
        message: "success",
        color: "green",
      });
    }, 5000);
  };

  return {
    tambahBarang,
    editBarang,
  };
};
