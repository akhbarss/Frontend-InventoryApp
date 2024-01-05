import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "./store/store";
import { theme } from "./theme";
import { ModalsProvider } from "@mantine/modals";

interface TProvider { children: React.ReactNode }

const Provider = ({ children }: TProvider) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            },
        },
    });

    const { pathname } = useLocation()
    const navigate = useNavigate()
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
                    <Notifications
                        position="bottom-right"
                        zIndex={100000}
                        autoClose={2000}
                    />
                    <ModalsProvider>
                        {children}
                    </ModalsProvider>
                </MantineProvider>
            </QueryClientProvider>
        </ReduxProvider>
    )
}

export default Provider