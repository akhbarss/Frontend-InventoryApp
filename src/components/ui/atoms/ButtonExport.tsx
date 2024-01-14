import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { BsFiletypeXlsx } from "react-icons/bs";

interface ButtonExportProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ButtonExport = ({ onConfirm, onCancel }: ButtonExportProps) => {
    const onExport = () => modals.openConfirmModal({
        title: 'Export XLSX',
        children: (
            <Text size="sm">Anda yakin ingin melakukan export?</Text>
        ),
        labels: { confirm: 'Export', cancel: "cancel" },
        confirmProps: { color: 'var(--mantine-primary-color-9)' },
        onCancel,
        onConfirm
    });
    return (
        <>
            <Button
                color="teal"
                leftSection={
                    < BsFiletypeXlsx
                        style={{
                            stroke: 100,
                            fontWeight: 700,
                        }}
                        size={20} />
                }
                onClick={onExport}
            >
                Export XLSX
            </Button>
        </>
    )
}

export default ButtonExport