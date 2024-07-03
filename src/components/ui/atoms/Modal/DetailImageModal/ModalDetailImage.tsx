import { Box, Button, Group, Image, Modal } from "@mantine/core";
import { useIsMutating } from "@tanstack/react-query";
import { IoIosArrowRoundBack } from "react-icons/io";
import React from "react";
import { useAppSelector } from "../../../../../store/store";

interface ModalDetailImageProps {
  onClose: () => void;
  opened: boolean;
  imageUrl: string;
}

export const ModalDetailImage: React.FC<ModalDetailImageProps> = ({
  onClose,
  opened,
  imageUrl,
}) => {
  const loading = useAppSelector((state) => state.loading.loading);
  const isMutate = useIsMutating();
  const isLoading = loading || isMutate > 0;

  const onCloseModal = () => {
    onClose();
  };

  console.log(imageUrl);

  return (
    <Modal
      centered
      title={"Detail Gambar"}
      opened={opened}
      onClose={onCloseModal}
      withCloseButton={false}
      closeOnClickOutside={isLoading ? false : true}
      closeOnEscape={isLoading ? false : true}
    >
      <Box p={"lg"}>
        <Image src={imageUrl} alt="Detail Gambar" crossOrigin="anonymous" />
      </Box>
      <Group mt={20} justify="space-between">
        <Button
          leftSection={<IoIosArrowRoundBack size={30} />}
          variant="default"
          onClick={onClose}
        >
          Kembali
        </Button>
      </Group>
    </Modal>
  );
};
