import Notification from "@components/ui/atoms/Notification";
import {
  Accordion,
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Button,
  Flex,
  Group,
  Indicator,
  Loader,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAppSelector } from "@store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ResponseError } from "@utils/ResponseError";
import {
  deleteNotifById,
  findNotifById,
  getAllNotifications,
  readAllNotif,
} from "@utils/api/notifications/index.api";
import { useAuth } from "@utils/hooks/useAuth";
import { useIsFetchingSession } from "@utils/hooks/useIsFetchingSession";
import { showNotifications } from "@utils/showNotifications";
import { formatDistanceToNow } from "date-fns";
import { Check, Mail, MailCheck, Trash2 } from "lucide-react";
import React, { useMemo } from "react";
import { IoMdNotifications } from "react-icons/io";
import { useNavigation } from "react-router-dom";
import classes from "./Header.module.css";

interface THeader {
  opened: boolean;
  toggle: () => void;
}

const Header = React.memo(({ opened, toggle }: THeader) => {
  const { user } = useAuth();
  const { state } = useNavigation();
  const queryClient = useQueryClient();
  const isFetchingSession = useIsFetchingSession();
  const [openedModalNotif, { open, close: onClose }] = useDisclosure();
  const label = useAppSelector((state) => state.label.label);

  const readAllNotifMutation = useMutation({ mutationFn: readAllNotif });
  const findNotifByIdMutation = useMutation({ mutationFn: findNotifById });
  const deleteNotifByIdMutation = useMutation({ mutationFn: deleteNotifById });

  const { data, isFetching } = useQuery({
    queryKey: ["get_all_notification", { userId: user.id }],
    queryFn: () => getAllNotifications(user.id!),
    enabled: user.id !== null,
  });
  const notifications = data?.payload.getNotifications;

  const onHasReadNotification = (id: number) => {
    findNotifByIdMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get_all_notification"] });
      },
      onError: (error: any) => ResponseError(error),
    });
  };
  const onDeleteNotification = (id: number) => {
    deleteNotifByIdMutation.mutate(id, {
      onSuccess: () => {
        showNotifications({ title: "Success", type: "success" });
        queryClient.invalidateQueries({ queryKey: ["get_all_notification"] });
      },
      onError: (error: any) => ResponseError(error),
    });
  };
  const onReadAll = () => {
    const userID = user.id;
    readAllNotifMutation.mutate(userID!, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get_all_notification"] });
        showNotifications({ title: "success", type: "success" });
      },
      onError: (error: any) => ResponseError(error),
    });
  };

  const notificationItem = useMemo(
    () =>
      notifications?.map((notification) => {
        const formatedDate = formatDistanceToNow(notification.created_at, {
          addSuffix: true,
        });
        const hasRead = notification.hasRead;
        return (
          <Accordion.Item
            key={notification.id}
            value={notification.id.toString()}
          >
            <Accordion.Control
              icon={
                !hasRead ? <Mail color="red" /> : <MailCheck color="blue" />
              }
            >
              <Text fw={"bold"} c={"gray.7"}>
                {notification.title}
              </Text>
              <Text fw={"bold"} size="xs" c={"gray.6"}>
                {formatedDate}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Box>
                <Text size="sm">{notification.content}</Text>
              </Box>
              <Group justify="end" mt={10}>
                {!hasRead && (
                  <Button
                    color="green"
                    size="xs"
                    leftSection={<Check size={20} />}
                    onClick={() => {
                      if (!hasRead) {
                        onHasReadNotification(notification.id);
                      }
                    }}
                  >
                    Tandai telah dibaca
                  </Button>
                )}
                <ActionIcon
                  size={30}
                  color="red"
                  onClick={() => {
                    onDeleteNotification(notification.id);
                  }}
                >
                  <Trash2 size={20} />
                </ActionIcon>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        );
      }),
    [notifications, data?.payload.getNotifications]
  );

  const notificationLength = notifications?.filter(
    (notif) => notif.hasRead == false
  ).length;

  return (
    <AppShell.Header className={classes["header-wrapper"]}>
      <Notification
        onClose={onClose}
        onReadAll={onReadAll}
        openedModalNotif={openedModalNotif}
        notificationItem={notificationItem}
      />
      <Box className={classes.header_inner}>
        <Flex justify={"space-between"} align={"center"} py={"7px"}>
          <Burger
            size="sm"
            color="white"
            opened={opened}
            onClick={toggle}
            className={classes.burger}
          />

          <Flex align="center" gap={"md"}>
            {state === "loading" && <Loader color="blue.3" size={24} />}
            <Indicator
              mt={"5px"}
              styles={{
                indicator: {
                  padding: "10px",
                  width: "10px",
                  height: "10px",
                  display: isFetching ? "none" : "flex",
                  opacity: notificationLength! > 0 ? "1" : "0",
                },
              }}
              label={notificationLength}
              color="red.6"
              position="top-start"
            >
              <ActionIcon onClick={open} variant="white">
                <IoMdNotifications size={20} />
              </ActionIcon>
            </Indicator>
          </Flex>
        </Flex>
        <Box className={classes.label}>
          <Skeleton visible={isFetchingSession}>
            <Title order={4} c={"gray"}>
              {label}
            </Title>
          </Skeleton>
        </Box>
      </Box>
    </AppShell.Header>
  );
});

export default Header;
