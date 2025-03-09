import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { FluentProvider, webLightTheme} from "@fluentui/react-components";

createRoot(document.getElementById("root")!).render(
  <FluentProvider theme={webLightTheme}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </FluentProvider>
);
