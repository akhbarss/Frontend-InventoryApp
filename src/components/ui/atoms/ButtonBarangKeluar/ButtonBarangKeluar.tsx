import { Button, ButtonProps } from "@mantine/core";
import { FolderOutput } from "lucide-react";

interface ButtonBarangKeluarProps extends ButtonProps {
    onClick: () => void;
}

const ButtonBarangKeluar = ({ onClick, ...rest }: ButtonBarangKeluarProps) => {
    
    return (
        <Button
            color="red"
            onClick={onClick}
            leftSection={
                <FolderOutput />
            }
            {...rest}
        >
            Barang Keluar
        </Button>
    )
}

export default ButtonBarangKeluar