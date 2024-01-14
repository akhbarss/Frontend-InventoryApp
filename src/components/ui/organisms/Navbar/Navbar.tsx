import * as Mantine from "@mantine/core";
import { ChevronRight, Circle, LogOut, Settings } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGO_YATINDO } from "../../../../assets/image/Logo_Yatindo_IMAGE";
import { menusAdmin, menusSuperAdmin } from "../../../../navigationConfig";
import classes from "./Navbar.module.css";

interface TNavbar {
    opened: boolean;
    toggle: () => void;
}

const styleNavlink = {
    root: {
        borderRadius: "6px",
        transition: "all 0.3s ease-in-out",
    }
}

const Navbar = ({ toggle, opened }: TNavbar) => {
    const [value, setValue] = useState('ADMIN');

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const computedColorScheme = Mantine.useComputedColorScheme("light")
    const isDark = computedColorScheme == "dark"

    const handleNavLinkClick = (path: string | undefined) => {
        if (path) {
            navigate(path)
            toggle()
        }
    };

    // const onLogout = () => {
    //     navigate("/auth/login", { replace: true })
    // }

    const menus = value === "ADMIN" ? menusAdmin : menusSuperAdmin

    return (
        <Mantine.AppShell.Navbar
            p={"lg"}
            classNames={{
                navbar: classes.navbar
            }}
        >
            <Mantine.AppShell.Section
                style={{
                    borderBottom: "1px solid var(--mantine-color-gray-5)",
                    paddingBottom: "25px"
                }}
            >
                <Mantine.Burger
                    size="sm"
                    hiddenFrom="sm"
                    opened={opened}
                    onClick={toggle}
                />
                <Mantine.Flex gap={20} align={"center"} justify={"center"}>
                    <Mantine.Image src={LOGO_YATINDO} w={80} onClick={() => setValue(value == "ADMIN" ? "SUPERADMIN" : "ADMIN")} />
                    <Mantine.Divider
                        size={"md"}
                        color="gray"
                        orientation="vertical"
                    />
                    <Mantine.Box >
                        <Mantine.Text fw={"bold"} c={"gray"}>
                            Aplikasi <br /> Inventaris <br />Barang Sekolah
                        </Mantine.Text>
                    </Mantine.Box>
                </Mantine.Flex>
            </Mantine.AppShell.Section>

            <Mantine.AppShell.Section grow my={"2rem"} offsetScrollbars component={Mantine.ScrollArea}>
                {menus.map((item, i) => (
                    <React.Fragment key={i}>
                        <Mantine.NavLink
                            mt={5}
                            variant="light"
                            label={item.label}
                            childrenOffset={30}
                            styles={styleNavlink}
                            color={isDark ? "blue.3" : "blue"}
                            defaultOpened={item.children?.some(child => child.path == pathname)}
                            leftSection={(
                                <Mantine.ThemeIcon color="cyan" variant="light">
                                    {item.icon}
                                </Mantine.ThemeIcon>
                            )}
                            onClick={() => handleNavLinkClick(item.path)}
                            active={item?.path === pathname}
                            children={item.children?.map((child, index) => (
                                <Mantine.NavLink
                                    mt={5}
                                    key={index}
                                    variant="light"
                                    label={child.label}
                                    styles={styleNavlink}
                                    active={child?.path === pathname}
                                    leftSection={<Circle size={8} />}
                                    color={isDark ? "blue.3" : "blue"}
                                    onClick={() => handleNavLinkClick(child.path)}
                                />
                            ))}
                        />
                    </React.Fragment>
                ))}
            </Mantine.AppShell.Section>

            <Mantine.AppShell.Section
                style={{
                    paddingTop: "10px",
                    borderTop: "1px solid var(--mantine-color-gray-5)"
                }}
            >
                <Mantine.Menu position="right-end" trigger="click-hover" >
                    <Mantine.Menu.Target >
                        <Mantine.Group justify="space-between">
                            <Mantine.Group>
                                <Mantine.Avatar />
                                <Mantine.Text>ADMIN</Mantine.Text>
                            </Mantine.Group>
                            <ChevronRight />
                        </Mantine.Group>
                    </Mantine.Menu.Target>
                    <Mantine.Menu.Dropdown >
                        <Mantine.Menu.Item leftSection={<LogOut size={20} />} c={"red"} onClick={() => navigate("/auth/login")}>
                            Logout
                        </Mantine.Menu.Item>
                        <Mantine.Menu.Item leftSection={<Settings size={20} />} >
                            Settings
                        </Mantine.Menu.Item>

                    </Mantine.Menu.Dropdown>
                </Mantine.Menu>
            </Mantine.AppShell.Section>
        </Mantine.AppShell.Navbar>
    )
}

export default Navbar