import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import MainLayout from "./components/Layout/MainLayout";

import { theme } from "./common/theme/theme";

const App = () => {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      forceColorScheme="dark"
    >
      <MainLayout />
    </MantineProvider>
  );
};

export default App;
