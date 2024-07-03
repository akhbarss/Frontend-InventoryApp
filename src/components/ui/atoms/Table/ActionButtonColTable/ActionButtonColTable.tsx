import { ActionIcon, Box, Group } from "@mantine/core";
import { Check, Image, Info, Settings, Trash2, X } from "lucide-react";

interface ActionButtonColTableProps {
  withSetting?: boolean;
  withDelete?: boolean;
  withReject?: boolean;
  withAccept?: boolean;
  withDetail?: boolean;
  withDetailimage?: boolean;
  disabledSetting?: boolean;
  disabledDetailImage?: boolean;
  disabledDelete?: boolean;
  disabledReject?: boolean;
  disabledAccept?: boolean;
  disabledDetail?: boolean;
  onClickSetting?: () => void;
  onClickDetailImage?: () => void;
  onClickDelete?: () => void;
  onClickReject?: () => void;
  onClickAccept?: () => void;
  onClickDetail?: () => void;
}

export const ActionButtonColTable = ({
  withSetting,
  withDelete,
  withReject,
  withAccept,
  withDetail,
  withDetailimage,
  disabledDetailImage,
  disabledReject,
  disabledAccept,
  disabledSetting,
  disabledDelete,
  disabledDetail,
  onClickDetail,
  onClickDetailImage,
  onClickSetting,
  onClickDelete,
  onClickReject,
  onClickAccept,
}: ActionButtonColTableProps) => {
  return (
    <Box>
      <Group>
        <Group gap={5}>
          {withReject && (
            <ActionIcon
              disabled={disabledReject}
              variant="outline"
              color="red"
              onClick={onClickReject}
            >
              <X size={20} />
            </ActionIcon>
          )}
          {withDetailimage && (
            <ActionIcon
              disabled={disabledDetailImage}
              variant="outline"
              color="green"
              onClick={onClickDetailImage}
            >
              <Image size={20} />
            </ActionIcon>
          )}
          {withAccept && (
            <ActionIcon
              disabled={disabledAccept}
              variant="outline"
              color="green"
              onClick={onClickAccept}
            >
              <Check size={20} />
            </ActionIcon>
          )}
          {withSetting && (
            <ActionIcon
              disabled={disabledSetting}
              color="blue"
              variant="outline"
              onClick={onClickSetting}
            >
              <Settings size={20} />
            </ActionIcon>
          )}
          {withDelete && (
            <ActionIcon
              disabled={disabledDelete}
              variant="outline"
              color="red"
              onClick={onClickDelete}
            >
              <Trash2 size={20} />
            </ActionIcon>
          )}
          {withDetail && (
            <ActionIcon
              disabled={disabledDetail}
              variant="outline"
              color="blue"
              onClick={onClickDetail}
            >
              <Info size={20} />
            </ActionIcon>
          )}
        </Group>
      </Group>
    </Box>
  );
};
