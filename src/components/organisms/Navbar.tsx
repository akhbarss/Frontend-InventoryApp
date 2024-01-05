import * as Mantine from "@mantine/core";
import { MdLogout } from "react-icons/md";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGO_YATINDO } from "../../assets/image/Logo_Yatindo_IMAGE";
import { menus } from "../../navigationConfig";

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
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const handleNavLinkClick = (path: string | undefined) => {
        if (path) {
            navigate(path)
            toggle()
        }
    };

    const onLogout = () => {
        navigate("/auth/login", { replace: true })
    }

    return (
        <Mantine.AppShell.Navbar p={"lg"}>
            <Mantine.AppShell.Section>
                <Mantine.Burger
                    size="sm"
                    hiddenFrom="sm"
                    opened={opened}
                    onClick={toggle}
                />
                <Mantine.Flex gap={20} align={"center"} justify={"center"}>
                    <Mantine.Image src={LOGO_YATINDO} w={80} />
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

            <Mantine.AppShell.Section grow my={"lg"} offsetScrollbars component={Mantine.ScrollArea}>
                {menus.map((item, i) => (
                    <React.Fragment key={i}>
                        <Mantine.NavLink
                            mt={5}
                            variant="light"
                            label={item.label}
                            childrenOffset={30}
                            styles={styleNavlink}
                            leftSection={item.icon}
                            onClick={() => handleNavLinkClick(item.path)}
                            active={item?.path === pathname}
                            children={item.children?.map((child, index) => (
                                <Mantine.NavLink
                                    mt={5}
                                    key={index}
                                    variant="light"
                                    label={child.label}
                                    styles={styleNavlink}
                                    onClick={() => handleNavLinkClick(child.path)}
                                    active={child?.path === pathname}
                                />
                            ))}
                        />
                    </React.Fragment>
                ))}
            </Mantine.AppShell.Section>

            <Mantine.Button
                // pl={20}
                // pr={40}
                // fullWidth
                color="red"
                onClick={onLogout}
                // justify="space-between"
                rightSection={<span />}
                leftSection={<MdLogout size={20} />}
            >
                Logout
            </Mantine.Button>
        </Mantine.AppShell.Navbar>
    )
}

export default Navbar