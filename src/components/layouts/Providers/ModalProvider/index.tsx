import { ModalsProvider } from "@mantine/modals";
import { ConfirmModal } from "../../../ui/atoms/Modal/ConfirmModal";
import classes from "./ModalProvider.module.css"

interface ModalProviderProps {
  children: React.ReactNode;
}

const modals = {
  confirmModal: ConfirmModal,
};
declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  return (
    <ModalsProvider
      modals={modals}
      modalProps={{
        centered: true,
        withCloseButton: false,
        classNames: {
          title: classes.modal_title,
          header: classes.modal_header,
        },

        // groupProps: { className: classes.modal_action },
      }}

    >
      {children}
    </ModalsProvider>
  );
};
