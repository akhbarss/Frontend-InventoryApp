import {
  CSSVariablesResolver,
  MantineColorsTuple,
  createTheme,
} from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#f1eefc",
  "#ded8f2",
  "#baade8",
  "#947fdd",
  "#7559d6",
  "#6141d1",
  "#5735cf",
  "#4828b7",
  "#3f23a4",
  "#351d91",
];

export const theme = createTheme({
  colors: {
    myColor,
  },
  fontFamily: "Ubuntu, sans-serif",
  primaryColor: "myColor",
  primaryShade: 9,
  defaultRadius: "md",
  other: {
    color: {
      textColorDark: "var(--mantine-color-dark-9)",
      textColorLight: "var(--mantine-color-gray-1)",
    },
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    "--mantine-color-text": theme.other.textColorDark,
  },
  dark: {
    "--mantine-color-text": theme.other.textColorLight,
  },
});
