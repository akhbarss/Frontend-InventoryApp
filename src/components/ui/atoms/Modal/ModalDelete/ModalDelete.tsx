import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAppSelector } from "../../../../../store/store";
import classes from "./ModalDelete.module.css";

interface ModalDeleteProps {
  onClose: () => void;
  opened: boolean;
  title?: string;
  message?: string;
  onAccept: () => void;
}

export const ModalDelete = ({
  onClose,
  opened,
  title = "Hapus Barang",
  message = "Anda yakin ingin menghapus barang?",
  onAccept,
}: ModalDeleteProps) => {
  const loading = useAppSelector((state) => state.loading.loading);

  return (
    <Modal
      centered
      title={title}
      opened={opened}
      onClose={onClose}
      classNames={classes}
      withCloseButton={false}
      closeOnClickOutside={loading ? false : true}
      closeOnEscape={loading ? false : true}
    >
      <Box p={"lg"}>
        <Text ta={"center"} size="sm">
          {message}
        </Text>
      </Box>
      <Group mt={20} justify="space-between">
        <Button
          leftSection={<IoIosArrowRoundBack size={30} />}
          variant="default"
          onClick={onClose}
        >
          Kembali
        </Button>
        <Button color="red" onClick={onAccept}>
          Hapus
        </Button>
      </Group>
    </Modal>
  );
};
