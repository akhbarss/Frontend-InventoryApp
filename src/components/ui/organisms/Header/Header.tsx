import { AppShell, Box, Burger, Flex, Loader, Title } from "@mantine/core";
import { useAppSelector } from "../../../../store/store";
import classes from "./Header.module.css";
import useAuth from "../../../../utils/hooks/useAuth";

interface THeader {
  opened: boolean;
  toggle: () => void;
}

const Header = ({ opened, toggle }: THeader) => {
  const label = useAppSelector((state) => state.label.label);

  return (
    <AppShell.Header className={classes["header-wrapper"]}>
      <Box className={classes.header_inner}>
        <Flex justify={"space-between"} align={"center"}>
          <Burger
            size="sm"
            color="white"
            opened={opened}
            onClick={toggle}
            className={classes.burger}
          />
          <Loader color="blue.3" size={20} />
        </Flex>
        <Box className={classes.label}>
          <Title c={"gray"}>{label}</Title>
        </Box>
      </Box>
    </AppShell.Header>
  );
};

export default Header;
