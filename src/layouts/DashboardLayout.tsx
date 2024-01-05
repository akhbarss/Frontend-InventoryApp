import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../components/organisms";

const DashboardLayout = () => {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            layout="alt"
            padding="md"
            header={{ height: 120 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
        >
            <Header opened={opened} toggle={toggle} />
            <Navbar opened={opened} toggle={toggle} />
            <AppShell.Main
                bg={"#F2F4FF"}
                pt={"11rem"}
                // pl={"350px"}
                // pr={"50px"}
            >
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}

export default DashboardLayout