import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { BsFiletypeXlsx } from "react-icons/bs";
import { useShowModal } from "../../utils/useShowModal";

const ButtonExport = () => {
    const onExport = () => modals.openConfirmModal({
        title: 'Delete your profile',
        centered: true,
        children: (
            <Text size="sm">
                Are you sure you want to delete your profile? This action is destructive and you will have
                to contact support to restore your data.
            </Text>
        ),
        labels: { confirm: 'Export', cancel: "cancel" },
        confirmProps: { color: 'var(--mantine-primary-color-9)' },
        onCancel: () => useShowModal(true, "Export excel wa canceled", "Canceled"),
        onConfirm: () => useShowModal(false, "Export excel success", "Confirmed"),
    });
    return (
        <>
            <Button
            style={{ 
            }}
            color="teal" leftSection={< BsFiletypeXlsx 
                style={{ 
                    stroke: 100,
                    fontWeight: 700,
                    
                    // color:"black"
                
             }}
            size={20}/>} onClick={onExport}>
                Export XLSX
            </Button>
        </>
    )
}

export default ButtonExport