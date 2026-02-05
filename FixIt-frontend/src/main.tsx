import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";

import App from "./App";

import { store } from "./store/store";
import { theme } from "./common/theme/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      forceColorScheme="dark"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </StrictMode>,
);
