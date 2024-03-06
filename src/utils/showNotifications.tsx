import { notifications } from "@mantine/notifications";
import { IoMdCheckmark, IoMdClose, IoIosInformation } from "react-icons/io";
import classes from "./showNotifications.module.css";

interface ShowNotificationsProps {
  title: string;
  message?: string;
  type: "success" | "error" | "info";
}

export const showNotifications = ({
  message,
  title,
  type,
}: ShowNotificationsProps) => {
  let color = "";
  let icon = undefined;

  if (type == "success") {
    color = "#74E291";
    icon = <IoMdCheckmark size={20} />;
  }
  if (type == "error") {
    color = "red.7";
    icon = <IoMdClose size={20} />;
  }
  if (type == "info") {
    color = "gray.6";
    icon = <IoIosInformation size={30} />;
  }

  notifications.show({
    title,
    message,
    color,
    icon,
    classNames: classes,
  });
};
