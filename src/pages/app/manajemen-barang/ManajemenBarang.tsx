import { Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  ButtonExport,
  PageContent
} from "../../../components/ui/atoms";
import PageLabel from "../../../components/ui/atoms/PageLabel";
import SelectButton from "../../../components/ui/atoms/SelectButton";
import { ruanganLab } from "../../../utils/constant";

const ManajemenBarang = () => {
  return (
    <>
      <PageLabel label="Manajemen Barang" />

      <PageContent>
        <Group justify="space-between" component={"section"}>
          <Group>
            <SelectButton label="Ruangan" data={ruanganLab} />
            <ButtonExport
              onCancel={() => {}}
              onConfirm={() => {
                notifications.show({
                  title: "Export Data to Excel",
                  message: "Export data berhasil terbuat!",
                  color: "green.5",
                });
              }}
            />
          </Group>
          {/* <ButtonPlus onClick={onClickTambahBarang}>Tambah Barang</ButtonPlus> */}
        </Group>
      </PageContent>
    </>
  );
};

export default ManajemenBarang;
