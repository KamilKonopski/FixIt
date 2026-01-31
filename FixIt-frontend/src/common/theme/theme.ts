import { createTheme, type MantineColorsTuple } from "@mantine/core";

const fixitBlue: MantineColorsTuple = [
  "#eef3ff",
  "#dee2f2",
  "#bdc2de",
  "#98a0ca",
  "#7a84ba",
  "#6772b0",
  "#5d69ac",
  "#4c5997",
  "#424f88",
  "#364379",
];

const fixitSuccess: MantineColorsTuple = [
  "#ebfbee",
  "#d3f9d8",
  "#b2f2bb",
  "#8ce99a",
  "#69db7c",
  "#51cf66",
  "#40c057",
  "#37b24d",
  "#2f9e44",
  "#2b8a3e",
];

const fixitError: MantineColorsTuple = [
  "#fff5f5",
  "#ffe3e3",
  "#ffc9c9",
  "#ffa8a8",
  "#ff8787",
  "#ff6b6b",
  "#fa5252",
  "#f03e3e",
  "#e03131",
  "#c92a2a",
];

const fixitWarning: MantineColorsTuple = [
  "#fff9db",
  "#fff3bf",
  "#ffec99",
  "#ffe066",
  "#ffd43b",
  "#fcc419",
  "#fab005",
  "#f59f00",
  "#f08c00",
  "#e67700",
];

export const theme = createTheme({
  primaryColor: "fixit-blue",
  primaryShade: 7,

  colors: {
    "fixit-blue": fixitBlue,
    "fixit-success": fixitSuccess,
    "fixit-error": fixitError,
    "fixit-warning": fixitWarning,

    dark: [
      "#C1C2C5", // 0: tekst główny
      "#A6A7AB", // 1: tekst pomocniczy
      "#909296", // 2: ikony
      "#5C5F66", // 3: placeholder
      "#373A40", // 4: bordery (lekki)
      "#2C2E33", // 5: bordery (mocniejszy)
      "#25262B", // 6: tło inputów
      "#1A1B1E", // 7: tło Card / Paper
      "#141517", // 8: tło Sidebar / Header
      "#101113", // 9: tło Body
    ],
  },

  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
  },

  defaultRadius: "md",

  components: {
    AppShell: {
      styles: {
        main: {
          background: "#101113",
        },
        header: {
          background: "#141517",
          borderBottom: "1px solid #2C2E33",
        },
        navbar: {
          background: "#141517",
          borderRight: "1px solid #2C2E33",
        },
      },
    },
    Card: {
      defaultProps: {
        bg: "#1A1B1E",
        withBorder: true,
        shadow: "md",
      },
      styles: {
        root: { borderColor: "#2C2E33" },
      },
    },
    Paper: {
      defaultProps: { bg: "#1A1B1E" },
    },
    Button: {
      defaultProps: { loaderProps: { type: "bars" } },
      styles: { root: { fontWeight: 600 } },
    },
    Badge: {
      defaultProps: { variant: "light", size: "lg" },
    },
    TextInput: {
      styles: {
        input: {
          backgroundColor: "#25262B",
          borderColor: "#373A40",
          color: "#eee",
        },
      },
    },
  },
});
