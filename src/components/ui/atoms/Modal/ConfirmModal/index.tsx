import { Box, Button, Group, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { IoIosArrowRoundBack } from "react-icons/io";

type ConfirmModalProps = {
  modalBody?: string;
  labels?: { cancel?: string; accept: string };
  description?: string;
  onAccept: () => void;
  type?: "danger" | "info" | "warning";
};

export const ConfirmModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<ConfirmModalProps>) => {
  const { type, labels, description = "", onAccept } = innerProps;
  const { accept = "Lanjutkan", cancel = "Kembali" } = labels || {};
  const closeModal = () => context.closeModal(id);
  const onClickAccept = () => {
    closeModal();
    onAccept();
  };
  return (
    <>
      <Box mb={"lg"} p={"lg"}>
        <Text ta={"center"} size="sm">
          {description}
        </Text>
      </Box>
      <Group justify="space-between">
        <Button
          variant="default"
          leftSection={<IoIosArrowRoundBack size={30} />}
          style={{ border: "none" }}
          onClick={closeModal}
        >
          {cancel}
        </Button>
        <Button
          w={150}
          variant="filled"
          onClick={onClickAccept}
          color={
            type == "danger" ? "red" : type == "warning" ? "yellow" : "myColor"
          }
        >
          {accept}
        </Button>
      </Group>
    </>
  );
};
