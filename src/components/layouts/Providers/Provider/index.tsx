import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../../store/store";
import { theme } from "../../../../theme";
import { AuthProvider } from "../../../../utils/context/auth-provider.context";
import { queryClient } from "../../../../utils/queryClient";
import { HotKeysHandller } from "../../../ui/atoms/HotKeysHandller/HotKeysHandller";
import { ModalProvider } from "../ModalProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") navigate("/auth/login");
  }, [pathname, navigate]);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MantineProvider
            theme={theme}
            withCssVariables
            defaultColorScheme="light"
          >
            <HotKeysHandller />
            <Notifications position="top-right" autoClose={2000} />
            <ReactQueryDevtools />
            <ModalProvider>{children}</ModalProvider>
          </MantineProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default Providers;
