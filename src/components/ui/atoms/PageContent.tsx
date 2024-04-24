import { Stack } from "@mantine/core";

type TPageContent = {
  children: React.ReactNode;
};

export const PageContent = ({ children }: TPageContent) => (
  <Stack px={{ base: "xs" }} gap={"md"} pb={"4rem"}>
    {children}
  </Stack>
);
