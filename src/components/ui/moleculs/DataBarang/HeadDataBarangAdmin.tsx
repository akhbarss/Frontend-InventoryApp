import { ButtonExport, ButtonPlus } from "@components/ui/atoms";
import SelectButton from "@components/ui/atoms/SelectButton";
import { Group } from "@mantine/core";
import { setClass } from "@store/features/class.slice";
import { setOpenCreateModal } from "@store/features/modal.slice";
import { useAppDispatch } from "@store/store";
import { useGetClassRoom } from "@utils/hooks/useGetClassRoom";
import { showNotifications } from "@utils/showNotifications";

export const HeadDataBarang = () => {
  const dispatch = useAppDispatch();
  const classRooms = useGetClassRoom();
  const onClickTambahBarang = () => dispatch(setOpenCreateModal(true));

  return (
    <Group justify="space-between" component={"section"}>
      <Group>
        <SelectButton
          width={150}
          label="Ruangan"
          data={classRooms}
          onChange={(ruangan) => {
            dispatch(setClass(ruangan as unknown as number));
          }}
        />
        {/* <SelectButton
          label="Habis Pakai"
          data={[
            CategoryItem.BARANG_HABIS_PAKAI,
            CategoryItem.BARANG_TIDAK_HABIS_PAKAI,
          ]}
          onChange={(category) => {
            dispatch(setItemCategory(category!));
          }}
        /> */}
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
