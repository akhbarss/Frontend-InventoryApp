import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core"
import { useHotkeys } from "@mantine/hooks"

export const HotKeysHandller = () => {
    const { setColorScheme } = useMantineColorScheme()
    const computedColorScheme = useComputedColorScheme("light")

    useHotkeys(
        [
            ["mod + J", () => setColorScheme(computedColorScheme == "light" ? "dark" : "light")]
        ],
        []
    );

    return <>{null}</>;
}
