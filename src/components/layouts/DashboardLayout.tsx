import { Header, Navbar } from "@components/ui/organisms";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useClass } from "@utils/hooks/useClass";
import { useSession } from "@utils/hooks/useSession";
import { Outlet } from "react-router-dom";
import classes from "./DashboardLayout.module.css";

const DashboardLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  useSession();
  useClass();

  return (
    <AppShell
      layout="alt"
      padding="md"
      header={{ height: { base: 130 } }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <Header opened={opened} toggle={toggle} />
      <Navbar opened={opened} toggle={toggle} />
      <AppShell.Main pt={"11rem"} className={classes.main}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
