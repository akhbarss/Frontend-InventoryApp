import { Button } from "@mantine/core";
import { IoIosArrowRoundBack } from "react-icons/io";

interface BackButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export const BackButton = ({ onClick, isLoading }: BackButtonProps) => {
  return (
    <Button
      variant="default"
      onClick={onClick}
      disabled={isLoading}
      style={{ border: "none" }}
      leftSection={<IoIosArrowRoundBack size={30} />}
    >
      Kembali
    </Button>
  );
};
