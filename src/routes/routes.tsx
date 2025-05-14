import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ScrollToTop from "../utils/ScrollToTop";
import DashBoard from "../layout/DashBoard";
import ProtectedRoute from "../security/ProtectedRoute";
import ViewDetails from "../pages/ViewDetails";
import About from "../pages/About";
// import AllProducts from "../pages/AllProducts";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ManageOrders from "../pages/ManageOrders";
import ManageUsers from "../pages/ManageUsers";
import ManageProducts from "../pages/ManageProducts";
import AddProduct from "../pages/AddProduct";
import ViewOrders from "../pages/ViewOrders";
import ManageProfile from "../pages/ManageProfile";
import DashboardProtectedRoute from "../security/DashboardProtectedRoute";
import VerifyOrder from "../pages/VerifyOrder";
import ProductsPage from "@/pages/All";

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
        element: <ProductsPage />,
      },
      {
        path: "/product/:id",
        element: <ViewDetails />,
      },
      {
        path: "/verify-order",
        element: (
          <ProtectedRoute>
            <VerifyOrder />
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
    path: "/admin/dashboard",
    element: (
      <>
        <ScrollToTop />
        <DashboardProtectedRoute role="admin">
          <DashBoard />
        </DashboardProtectedRoute>
      </>
    ),
    children: [
      {
        index: true,
        element: <ManageUsers />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
    ],
  },
  {
    path: "/user/dashboard",
    element: (
      <>
        <ScrollToTop />
        <DashboardProtectedRoute role="user">
          <DashBoard />
        </DashboardProtectedRoute>
      </>
    ),
    children: [
      {
        index: true,
        element: <ViewOrders />,
      },
      {
        path: "view-orders",
        element: <ViewOrders />,
      },
      {
        path: "manage-profile",
        element: <ManageProfile />,
      },
    ],
  },
]);

export default router;
