import { Stack } from "@mantine/core"

type TPageContent = {
    children: React.ReactNode
}

const PageContent = ({ children }: TPageContent) => (
    <Stack px={"xl"} gap={"md"} pb={"4rem"}>
        {children}
    </Stack>
)

export default PageContent