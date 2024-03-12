import {
  Button,
  Group,
  MantineSpacing,
  Modal,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useIsMutating } from "@tanstack/react-query";
import { useAppSelector } from "../../../../store/store";
import { BackButton } from "../BackButton/BackButton";
import classes from "./BaseModal.module.css";

interface BaseModalProps<T> {
  size: MantineSpacing;
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  resetForm: UseFormReturnType<T, (values: T) => T>;
}

export const BaseModal = <T extends unknown>({
  onClose,
  opened,
  onSubmit,
  children,
  title,
  size,
  resetForm,
}: BaseModalProps<T>) => {
  const loadingRdx = useAppSelector((state) => state.loading.loading);
  const isMutate = useIsMutating();
  const isLoading = loadingRdx || isMutate > 0;

  const onCloseModal = () => {
    onClose();
    resetForm.reset();
  };

  return (
    <Modal.Root
      centered
      size={size}
      opened={opened}
      onClose={onCloseModal}
      component={ScrollArea.Autosize}
      closeOnClickOutside={isLoading ? false : true}
      closeOnEscape={isLoading ? false : true}
      transitionProps={{
        transition: "pop",
      }}
    >
      <Modal.Overlay
        transitionProps={{
          transition: "pop-bottom-left",
        }}
        backgroundOpacity={0.8}
        blur={2}
      />
      <Modal.Content className={classes.modal_content}>
        <Modal.Header
          className={classes.modal_header}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100000000,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Title order={3} c={"gray"}>
            {title}
          </Title>
        </Modal.Header>
        <Modal.Body p={0} pos={"relative"}>
          <form onSubmit={(e) => onSubmit(e)}>
            <Stack pt={"lg"} pb={"3rem"} mih={"10rem"} px={"md"}>
              {children}
            </Stack>
            <Group component={"footer"} className={classes.modal_footer}>
              <BackButton onClick={onClose} />
              <Button type="submit" loading={isLoading}>
                Simpan
              </Button>
            </Group>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};
