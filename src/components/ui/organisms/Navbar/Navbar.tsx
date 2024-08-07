import * as Mantine from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllRole } from "@utils/api/role/index.api";
import { useIsFetchingSession } from "@utils/hooks/useIsFetchingSession";
import { ChevronRight, Circle, LogOut } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGO_YATINDO } from "../../../../assets/image/Logo_Yatindo_IMAGE";
import {
  menusAdmin,
  menusStore,
  menusSuperAdmin,
} from "../../../../navigationConfig";
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

const Navbar = React.memo(({ toggle, opened }: TNavbar) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser } = useAuth();
  const isFetchingSession = useIsFetchingSession();

  const { data } = useQuery({
    queryKey: ["get_all_role"],
    queryFn: getAllRole,
  });
  const roles = data?.payload.findAllRoles.map((role) => role.name);
  const role = user?.role?.name;

  console.log(role);

  const menus =
    role === "SUPERADMIN"
      ? menusSuperAdmin
      : role === "STORE"
      ? menusStore
      : roles?.includes(role!)
      ? menusAdmin
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

      <Mantine.AppShell.Navbar p={"xs"} classNames={{ navbar: classes.navbar }}>
        <Mantine.AppShell.Section
          pt={10}
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
          <Mantine.Skeleton visible={isFetchingSession}>
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
          </Mantine.Skeleton>
        </Mantine.AppShell.Section>

        <Mantine.AppShell.Section
          style={{
            paddingTop: "10px",
            borderTop: "1px solid var(--mantine-color-gray-5)",
          }}
        >
          <Mantine.Stack>
            <Mantine.Skeleton visible={isFetchingSession}>
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
            </Mantine.Skeleton>
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
});

export default Navbar;
