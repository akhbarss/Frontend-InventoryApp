import * as Mantine from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronRight, Circle, LogOut } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGO_YATINDO } from "../../../../assets/image/Logo_Yatindo_IMAGE";
import { menusAdmin, menusSuperAdmin } from "../../../../navigationConfig";
import Profile from "../Profile/Profile";
import classes from "./Navbar.module.css";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../../utils/api/auth";
import { showNotifications } from "../../../../utils/showNotifications";

interface TNavbar {
  opened: boolean;
  toggle: () => void;
}

const styleNavlink = {
  root: {
    borderRadius: "6px",
    transition: "all 0.3s ease-in-out",
  },
};

const Navbar = ({ toggle, opened }: TNavbar) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [value, setValue] = useState("ADMIN");
  const menus = value === "ADMIN" ? menusAdmin : menusSuperAdmin;

  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const isDark = Mantine.useComputedColorScheme("light") == "dark";

  const handleNavLinkClick = (path: string | undefined) => {
    if (path) {
      navigate(path);
      toggle();
    }
  };

  const clickHandlerAvatar = () => openDrawer();

  const logoutMutation = useMutation({
    mutationFn: logout,
  });
  const onClickLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: (res) => {
        navigate("/");
        showNotifications({
          title: "Logout Succesfull!",
          type: "success",
        });
      },
      onError: (err) => console.log(err),
    });
  };

  return (
    <>
      <Profile onClose={closeDrawer} opened={openedDrawer} />

      <Mantine.AppShell.Navbar p={"lg"} classNames={{ navbar: classes.navbar }}>
        <Mantine.AppShell.Section
          pt={20}
          pb={30}
          style={{
            borderBottom: "1px solid var(--mantine-color-gray-5)",
          }}
        >
          <Mantine.Burger
            size="sm"
            hiddenFrom="sm"
            opened={opened}
            onClick={toggle}
          />
          <Mantine.Flex gap={20} align={"center"} justify={"center"}>
            <Mantine.Image
              w={60}
              src={LOGO_YATINDO}
              onClick={() =>
                setValue(value == "ADMIN" ? "SUPERADMIN" : "ADMIN")
              }
            />
            <Mantine.Text fz={18} c={"gray"}>
              SMK TINTA EMAS INDONESIA
            </Mantine.Text>
          </Mantine.Flex>
        </Mantine.AppShell.Section>

        <Mantine.AppShell.Section
          grow
          my={"2rem"}
          offsetScrollbars
          component={Mantine.ScrollArea}
        >
          {menus.map((item, i) => {
            const active = item?.path == pathname;
            return (
              <React.Fragment key={i}>
                <Mantine.NavLink
                  mt={5}
                  variant="filled"
                  label={item.label}
                  childrenOffset={30}
                  styles={styleNavlink}
                  color={isDark ? "black" : "#29166F"}
                  defaultOpened={item.children?.some(
                    (child) => child.path == pathname
                  )}
                  leftSection={
                    <Mantine.ThemeIcon
                      color="#29166F"
                      variant={isDark ? "gradient" : "white"}
                    >
                      {item.icon}
                    </Mantine.ThemeIcon>
                  }
                  onClick={() => handleNavLinkClick(item.path)}
                  active={active}
                  children={item.children?.map((child, index) => {
                    const activeChild = child?.path == pathname;
                    return (
                      <Mantine.NavLink
                        mt={5}
                        key={index}
                        variant="filled"
                        label={child.label}
                        styles={styleNavlink}
                        active={activeChild}
                        leftSection={<Circle size={8} />}
                        color={isDark ? "black" : "#29166F"}
                        onClick={() => handleNavLinkClick(child.path)}
                      />
                    );
                  })}
                />
              </React.Fragment>
            );
          })}
        </Mantine.AppShell.Section>

        <Mantine.AppShell.Section
          style={{
            paddingTop: "10px",
            borderTop: "1px solid var(--mantine-color-gray-5)",
          }}
        >
          <Mantine.Stack>
            <Mantine.Group
              p={"xs"}
              justify="space-between"
              // style={{
              className={classes.card_profile}
              //   borderRadius: "6px",
              //   cursor: "pointer",
              // }}
              onClick={clickHandlerAvatar}
            >
              <Mantine.Group>
                <Mantine.Avatar />
                <Mantine.Text>ADMIN</Mantine.Text>
              </Mantine.Group>
              <ChevronRight />
            </Mantine.Group>
            <Mantine.Button
              onClick={onClickLogout}
              color="red"
              leftSection={<LogOut />}
            >
              Logout
            </Mantine.Button>
          </Mantine.Stack>
        </Mantine.AppShell.Section>
      </Mantine.AppShell.Navbar>
    </>
  );
};

export default Navbar;
