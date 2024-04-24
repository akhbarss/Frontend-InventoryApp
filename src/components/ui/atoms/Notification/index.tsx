import { Accordion, ActionIcon, Drawer, Group, Text } from "@mantine/core";
import { CheckCheck } from "lucide-react";
import { useMemo } from "react";

type NotificationProps = {
  openedModalNotif: boolean;
  notificationItem: JSX.Element[] | undefined;
  onReadAll: () => void;
  onClose: () => void;
};

const Notification = ({
  notificationItem,
  openedModalNotif,
  onReadAll,
  onClose
}: NotificationProps) => {
  const drawer = useMemo(
    () => (
      <Drawer
        onClose={onClose}
        position="right"
        title={
          <Group justify="space-between" style={{ flex: 1 }}>
            <Text size="lg" fw={"bold"}>
              Notification
            </Text>
            <ActionIcon
              size={"md"}
              color="green"
              variant="subtle"
              onClick={onReadAll}
            >
              <CheckCheck size={20} />
            </ActionIcon>
          </Group>
        }
        opened={openedModalNotif}
        styles={{
          title: { fontWeight: "bold", flex: 1, display: "flex" },
          close: {
            marginInlineStart: 0,
          },
          header: {
            justifyContent: "initial",
          },
        }}
      >
        <Accordion variant="separated">{notificationItem}</Accordion>
      </Drawer>
    ),
    [openedModalNotif, notificationItem]
  );
  return drawer;
};

export default Notification;
