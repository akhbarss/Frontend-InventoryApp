import { Group } from "@mantine/core"
import { ruanganLab } from "../../../../utils/constant"
import ButtonExport from "../../atoms/ButtonExport"
import { ButtonPlus } from "../../atoms/ButtonPlus/ButtonPlus"
import SelectButton from "../../atoms/SelectButton"

interface HeadDataBarangProps {
    onClickTambahBarang: () => void;
}

export const HeadDataBarang = ({ onClickTambahBarang }: HeadDataBarangProps) => {
  
    return (
        <Group justify="space-between" component={"section"}>
            <Group >
                <SelectButton label="Ruangan" data={ruanganLab} />
                <ButtonExport
                    onCancel={() => { }}
                    onConfirm={() => { }}
                />
            </Group>
            <ButtonPlus onClick={onClickTambahBarang} >
                Tambah Barang
            </ButtonPlus>
        </Group>
    )
}
