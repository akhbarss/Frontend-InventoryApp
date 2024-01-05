import { AppShell, Avatar, Box, Burger, Group, Text, Title } from "@mantine/core";
import classes from "./Header.module.css";
import { useAppSelector } from "../../store/store";

interface THeader {
    opened: boolean;
    toggle: () => void
}

const Header = ({ opened, toggle }: THeader) => {
    const label = useAppSelector(state => state.label.label)

    return (
        <AppShell.Header className={classes["header-wrapper"]}>
            <Group className={classes.header_inner}>
                <Burger
                    size="sm"
                    color="white"
                    hiddenFrom="sm"
                    opened={opened}
                    onClick={toggle}
                />
                <Group>
                    <Text>Halo, Admin!</Text>
                    <Avatar variant="default" />
                </Group>
            </Group>
            <Box
                style={{
                    backgroundColor: "white",
                    position: "absolute",
                    bottom: "-20px",
                    left: "50px",
                    right: "50px",
                    borderRadius: "10px",
                    padding: "12px",
                    boxShadow: "2px 2px 30px -20px black",
                    paddingInline: "2rem",
                }}
            >
                <Title c={"gray"}> 
                    {label}
                </Title>
            </Box>
        </AppShell.Header>
    )
}

export default Header