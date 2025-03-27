import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ScrollToTop from "../utils/ScrollToTop";
import DashBoard from "../layout/DashBoard";
import ProtectedRoute from "../security/ProtectedRoute";
import ViewDetails from "../pages/ViewDetails";
import About from "../pages/About";
import AllProducts from "../pages/AllProducts";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ManageOrders from "../pages/ManageOrders";
import ManageUsers from "../pages/ManageUsers";
import ManageProducts from "../pages/ManageProducts";
import AddProduct from "../pages/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Main />
      </>
    ),
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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute>
            <AllProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <ProtectedRoute>
            <ViewDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <>
        <ScrollToTop />
        <DashBoard />
      </>
    ),
    children:[
      {
        path:"manage-users",
        element:<ManageUsers/>
      },
      {
        path:"manage-products",
        element:<ManageProducts/>
      },
      {
        path:"manage-orders",
        element:<ManageOrders/>
      },
      {
        path:"add-product",
        element:<AddProduct/>
      }
    ]
  },
]);

export default router;
