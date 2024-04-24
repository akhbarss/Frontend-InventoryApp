import { Header, Navbar } from "@components/ui/organisms";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useClass } from "@utils/hooks/useClass";
import { useSession } from "@utils/hooks/useSession";
import { Outlet } from "react-router-dom";
import classes from "./DashboardLayout.module.css";
import { useCallback, useMemo } from "react";

const DashboardLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  useSession();
  useClass();

  const toggles = useCallback(toggle, [toggle]);
  const header = useMemo(() => <Header opened={opened} toggle={toggles} />,[opened, toggles]);
  const navbar = useMemo(() => <Navbar opened={opened} toggle={toggles} />,[opened, toggles]);

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
      {header}
      {navbar}
      <AppShell.Main pt={"11rem"} className={classes.main}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
