import { Button, Group, MantineSpacing, Modal, ScrollArea, Stack, Title } from "@mantine/core";
import { useAppSelector } from "../../../../store/store";
import classes from "./BaseModal.module.css";

interface BaseModalProps {
  size: MantineSpacing;
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
}

export const BaseModal = ({
  onClose,
  opened,
  onSubmit,
  children,
  title,
  size
}: BaseModalProps) => {

  const loading = useAppSelector(state => state.loading.loading)

  return (
    <Modal.Root
      centered
      size={size}
      opened={opened}
      onClose={onClose}
      component={ScrollArea.Autosize}
      closeOnClickOutside={loading ? false : true}
      closeOnEscape={loading ? false : true}
      transitionProps={{
        transition: "scale-y"
      }}
    >
      <Modal.Overlay
        transitionProps={{
          transition: "pop-bottom-left"
        }}
        backgroundOpacity={0.8}
        blur={2}
      />
      <Modal.Content className={classes.modal_content}>
        <Modal.Header className={classes.modal_header}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100000000
          }}
        >
          <Title c={"gray"}>{title}</Title>
        </Modal.Header>
        <Modal.Body p={0} pos={"relative"} >
          <form onSubmit={e => onSubmit(e)}>
            <Stack pt={"lg"} pb={"3rem"} mih={"10rem"} px={"md"}>
              {children}
            </Stack>
            <Group component={"footer"} className={classes.modal_footer}>
              <Button
                variant="default"
                onClick={onClose}
                type="button"
                disabled={loading}
              >
                Batal
              </Button>
              <Button type="submit" loading={loading}>Simpan</Button>
            </Group>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}