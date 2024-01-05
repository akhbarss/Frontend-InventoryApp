import { notifications } from "@mantine/notifications";

export const useShowModal = (
    error: boolean,
    title: string,
    message: string,
) => {
    let color = error ? "red" : "green"

    notifications.show({
        title,
        message,
        color
    })
}
