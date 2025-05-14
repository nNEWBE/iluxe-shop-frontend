import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { icons } from "./utils/icons.tsx";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster icons={icons}/>
    </Provider>
);
