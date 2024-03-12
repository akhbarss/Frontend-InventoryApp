import * as Mantine from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight, Circle, LogOut } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGO_YATINDO } from "../../../../assets/image/Logo_Yatindo_IMAGE";
import { menusAdmin, menusSuperAdmin } from "../../../../navigationConfig";
import { nullifyObject } from "../../../../utils/actions/nullifyObject";
import { logout } from "../../../../utils/api/auth";
import { useAuth } from "../../../../utils/hooks/useAuth";
import { showNotifications } from "../../../../utils/showNotifications";
import Profile from "../Profile/Profile";
import classes from "./Navbar.module.css";

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
  const { user, setUser } = useAuth();
  const role = user?.role?.name;
  const menus =
    role === "ADMIN_TJKT"
      ? menusAdmin
      : role === "SUPERADMIN"
      ? menusSuperAdmin
      : [];

  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const isDark = Mantine.useComputedColorScheme("light") == "dark";

  const handleNavLinkClick = (path: string | undefined) => {
    if (path) {
      navigate(path);
      toggle();
    }
  };

  const logoutMutation = useMutation({ mutationFn: logout });

  const clickHandlerAvatar = () => openDrawer();
  const onClickLogout = () => {
    modals.openContextModal({
      modal: "confirmModal",
      title: "Anda yakin ingin logout?",
      innerProps: {
        type: "danger",
        description: "Anda yakin ingin logout?",
        onAccept: () => {
          setUser((prev) => nullifyObject(prev));
          logoutMutation.mutate(undefined, {
            onSuccess: () => {
              navigate("/");
              showNotifications({
                title: "Logout Succesfull!",
                type: "success",
              });
            },
            onError: () => {
              navigate("/");
              showNotifications({
                title: "Logout Succesfull!",
                type: "success",
              });
            },
          });
        },
        labels: { accept: "Logout" },
      },
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
            <Mantine.Image w={60} src={LOGO_YATINDO} />
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
              className={classes.card_profile}
              onClick={clickHandlerAvatar}
            >
              <Mantine.Group>
                <Mantine.Avatar />
                <Mantine.Text>{user?.name}</Mantine.Text>
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
