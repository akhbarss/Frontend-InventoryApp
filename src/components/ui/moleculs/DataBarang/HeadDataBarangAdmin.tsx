import { Group } from "@mantine/core";
import { setOpenCreateModal } from "../../../../store/features/ModalSlice";
import { useAppDispatch } from "../../../../store/store";
import { ruanganLab } from "../../../../utils/constant";
import { showNotifications } from "../../../../utils/showNotifications";
import { ButtonExport, ButtonPlus } from "../../atoms";
import SelectButton from "../../atoms/SelectButton";

export const HeadDataBarang = () => {
  const dispatch = useAppDispatch();
  const onClickTambahBarang = () => dispatch(setOpenCreateModal(true));

  return (
    <Group justify="space-between" component={"section"}>
      <Group>
        <SelectButton label="Ruangan" data={ruanganLab} />
        <ButtonExport
          onCancel={() => {}}
          onConfirm={() => {
            showNotifications({
              message: "Export data berhasil terbuat!",
              title: "Export Data to Excel",
              type: "success",
            });
          }}
        />
      </Group>
      <ButtonPlus onClick={onClickTambahBarang}>Tambah Barang</ButtonPlus>
    </Group>
  );
};
