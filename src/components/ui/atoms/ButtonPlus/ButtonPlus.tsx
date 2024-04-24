import { Button, ButtonProps } from "@mantine/core";
import { Plus } from "lucide-react";

interface ButtonPlusProps extends ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const ButtonPlus = ({ children, onClick, ...rest }: ButtonPlusProps) => {
  return (
    <Button onClick={onClick} leftSection={<Plus />} {...rest}>
      {children}
    </Button>
  );
};
