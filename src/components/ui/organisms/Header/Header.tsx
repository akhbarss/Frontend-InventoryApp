import {
  AppShell,
  Box,
  Burger,
  Flex,
  Indicator,
  Loader,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useAppSelector } from "@store/store";
import { IoMdNotifications } from "react-icons/io";
import { useNavigation } from "react-router-dom";
import classes from "./Header.module.css";

interface THeader {
  opened: boolean;
  toggle: () => void;
}

const Header = ({ opened, toggle }: THeader) => {
  const { state } = useNavigation();
  const label = useAppSelector((state) => state.label.label);

  return (
    <AppShell.Header className={classes["header-wrapper"]}>
      <Box className={classes.header_inner}>
        <Flex justify={"space-between"} align={"center"} py={"7px"}>
          <Burger
            size="sm"
            color="white"
            opened={opened}
            onClick={toggle}
            className={classes.burger}
          />

          <Flex align="center" gap={"md"}>
            {state === "loading" && <Loader color="blue.3" size={24} />}
            <Indicator
              mt={"5px"}
              styles={{
                indicator: {
                  padding: "10px",
                  width: "10px",
                  height: "10px",
                },
              }}
              label={5}
              color="red.6"
              position="top-start"
            >
              <ThemeIcon variant="white">
                <IoMdNotifications size={20} />
              </ThemeIcon>
            </Indicator>
          </Flex>
        </Flex>
        <Box className={classes.label}>
          <Title c={"gray"}>{label}</Title>
        </Box>
      </Box>
    </AppShell.Header>
  );
};

export default Header;
