import { ActionIcon, Box, Group } from "@mantine/core"
import { Check, Settings, Trash2, X } from "lucide-react"

interface ActionButtonColTableProps {
    withSetting?: boolean;
    withDelete?: boolean;
    withReject?: boolean;
    withAccept?: boolean;
    onClickSetting?: () => void;
    onClickDelete?: () => void;
    onClickReject?: () => void;
    onClickAccept?: () => void;
}

export const ActionButtonColTable = ({
    withSetting,
    withDelete,
    withReject,
    withAccept,
    onClickSetting,
    onClickDelete,
    onClickReject,
    onClickAccept,
}: ActionButtonColTableProps) => {
    return (
        <Box >
            <Group>
                <Group gap={5}>
                    {withSetting && (
                        <ActionIcon
                            color="blue"
                            variant="outline"
                            onClick={onClickSetting}
                        >
                            <Settings size={20} />
                        </ActionIcon>
                    )}
                    {withDelete && (
                        <ActionIcon
                            variant="outline"
                            color="red"
                            onClick={onClickDelete}
                        >
                            <Trash2 size={20} />
                        </ActionIcon>
                    )}
                    {withReject && (
                        <ActionIcon
                            variant="outline"
                            color="red"
                            onClick={onClickReject}
                        >
                            <X size={20} />
                        </ActionIcon>
                    )}
                    {withAccept && (
                        <ActionIcon
                            variant="outline"
                            color="green"
                            onClick={onClickAccept}
                        >
                            <Check size={20} />
                        </ActionIcon>
                    )}
                </Group>
            </Group>
        </Box>
    )
}
