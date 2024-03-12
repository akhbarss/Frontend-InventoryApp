import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useIsMutating } from "@tanstack/react-query";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAppSelector } from "../../../../../store/store";
import classes from "./ModalDelete.module.css";

interface ModalDeleteProps<T> {
  onClose: () => void;
  opened: boolean;
  title?: string;
  message?: string;
  onAccept: () => void;
  resetForm: UseFormReturnType<T, (values: T) => T>;
}

export const ModalDelete = <T extends unknown>({
  onClose,
  opened,
  title = "Hapus Barang",
  message = "Anda yakin ingin menghapus barang?",
  onAccept,
  resetForm,
}: ModalDeleteProps<T>) => {
  const loading = useAppSelector((state) => state.loading.loading);
  const isMutate = useIsMutating();

  const isLoading = loading || isMutate > 0;

  const onCloseModal = () => {
    onClose();
    resetForm.reset();
  };

  return (
    <Modal
      centered
      title={title}
      opened={opened}
      onClose={onCloseModal}
      classNames={classes}
      withCloseButton={false}
      closeOnClickOutside={isLoading ? false : true}
      closeOnEscape={isLoading ? false : true}
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
        <Button color="red" onClick={onAccept} loading={isLoading}>
          Hapus
        </Button>
      </Group>
    </Modal>
  );
};
