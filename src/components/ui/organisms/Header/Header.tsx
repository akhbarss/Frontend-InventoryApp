import { AppShell, Avatar, Box, Burger, Group, Text, Title } from "@mantine/core";
import { useAppSelector } from "../../../../store/store";
import classes from "./Header.module.css";

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
            <Box className={classes.label}>
                <Title c={"gray"}>
                    {label}
                </Title>
            </Box>
        </AppShell.Header>
    )
}

export default Header