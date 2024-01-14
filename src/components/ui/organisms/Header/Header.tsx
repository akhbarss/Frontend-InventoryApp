import { AppShell, Avatar, Box, Burger, Group, Text, Title } from "@mantine/core";
import { useAppSelector } from "../../../../store/store";
import classes from "./Header.module.css";

interface THeader {
    opened: boolean;
    close: () => void
}

const Header = ({ opened, close }: THeader) => {
    const label = useAppSelector(state => state.label.label)

    return (
        <AppShell.Header className={classes["header-wrapper"]}>
            <Group className={classes.header_inner}>
                <Burger
                    size="sm"
                    color="white"
                    hiddenFrom="sm"
                    opened={opened}
                    onClick={close}
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