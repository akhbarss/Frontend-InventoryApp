import { Box, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { BsFiletypeXlsx } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import classes from "./ButtonExport.module.css";

interface ButtonExportProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function exportExcel({ onCancel, onConfirm }: ButtonExportProps) {
  modals.openConfirmModal({
    title: "Export Data to Excel",
    children: (
      <Box p={"lg"}>
        <Text ta={"center"} size="sm">
          Rekap semua data barang menjadi excel? format file adalah .xlsx
        </Text>
      </Box>
    ),
    labels: { confirm: "Export", cancel: "Kembali" },
    confirmProps: {
      w: 150,
      color: "var(--mantine-primary-color-9)",
    },
    cancelProps: {
      variant: "default",
      leftSection: <IoIosArrowRoundBack size={30} />,
      style: { border: "none" },
    },
    onCancel,
    onConfirm,
    withCloseButton: false,
    classNames: {
      title: classes.modal_title,
      header: classes.modal_header,
    },
    groupProps: { className: classes.modal_action },
  });
}

export const ButtonExport = ({ onConfirm, onCancel }: ButtonExportProps) => {
  const onExport = () => exportExcel({ onCancel, onConfirm });
  return (
    <Button
      color="teal"
      leftSection={<BsFiletypeXlsx size={20} />}
      onClick={onExport}
    >
      Export XLSX
    </Button>
  );
};
