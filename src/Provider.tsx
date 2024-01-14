import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { HotKeysHandller } from "./components/ui/atoms/HotKeysHandller/HotKeysHandller";
import { store } from "./store/store";
import { theme } from "./theme";

interface TProvider { children: React.ReactNode }

const Provider = ({ children }: TProvider) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            },
        },
    });

    useEffect(() => {
        if (pathname === "/") navigate("/auth/login")
    }, [pathname, navigate])

    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <MantineProvider
                    theme={theme}
                    withCssVariables
                    defaultColorScheme="light"
                >
                    <HotKeysHandller />
                    <Notifications
                        position="bottom-right"
                        zIndex={100000}
                        autoClose={2000}
                    />
                    <ModalsProvider
                        modalProps={{
                            centered: true,
                            styles: {
                                title: {
                                    fontWeight: "bold",
                                    fontSize: 18
                                }
                            }
                        }}
                    >
                        {children}
                    </ModalsProvider>
                </MantineProvider>
            </QueryClientProvider>
        </ReduxProvider>
    )
}

export default Provider