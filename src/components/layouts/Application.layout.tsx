import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { useEffect } from "react";
import { useNavigation } from "react-router-dom";

type ApplicationLayoutProps = {
  children: React.ReactNode;
};

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  const { state } = useNavigation();

  useEffect(() => {
    if (state === "loading") {
      nprogress.start();
    }
    if (state == "idle") {
        nprogress.complete()
    }
  }, [state]);

  return (
    <>
      <NavigationProgress color="yellow.7" />
      {children}
    </>
  );
};

export default ApplicationLayout;
