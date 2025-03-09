import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../layout/Main";
import Home from "../pages/Home";
import About from "../pages/About";
import AllProducts from "../pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default router;
