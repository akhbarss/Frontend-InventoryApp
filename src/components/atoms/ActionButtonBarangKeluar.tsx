import { Button } from "@mantine/core";
import { BsBoxArrowUp } from "react-icons/bs";

const ActionButtonBarangKeluar = () => {
    return (
        <Button color="red" leftSection={<BsBoxArrowUp stroke={30} style={{ fontWeight: "bold" }} />}>
            Barang Keluar
        </Button>
    )
}

export default ActionButtonBarangKeluar