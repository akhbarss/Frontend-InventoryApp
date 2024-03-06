import { Button } from "@mantine/core";
import { IoIosArrowRoundBack } from "react-icons/io";

interface BackButtonProps {
  onClick?: () => void;
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Button
      variant="default"
      onClick={onClick}
      style={{ border: "none" }}
      leftSection={<IoIosArrowRoundBack size={30} />}
    >
      Kembali 
    </Button>
  );
};
