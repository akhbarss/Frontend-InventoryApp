import { ActionIcon, Box, Group } from "@mantine/core"
import { Check, Settings, Trash2 } from "lucide-react"

interface ActionButtonColTableProps {
    withAccept?: boolean;
    onClickSetting: () => void;
    onClickDelete: () => void;
    onClickAccept?: () => void;
}

export const ActionButtonColTable = ({
    onClickDelete,
    onClickSetting,
    onClickAccept,
    withAccept
}: ActionButtonColTableProps) => {
    return (
        <Box >
            <Group>
                <Group gap={5}>
                    <ActionIcon color="blue" variant="outline" onClick={onClickSetting}>
                        <Settings size={20} />
                    </ActionIcon>
                    <ActionIcon variant="outline" color="red" onClick={onClickDelete}>
                        <Trash2 size={20} />
                    </ActionIcon>
                    {
                        withAccept && withAccept && (
                            <ActionIcon variant="outline" color="green" onClick={onClickAccept}>
                                <Check size={20} />
                            </ActionIcon>
                        )
                    }
                </Group>
            </Group>
        </Box>
    )
}
