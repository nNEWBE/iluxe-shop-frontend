import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { ConfigProvider, Layout, Menu } from "antd";
import iLuxe from "../assets/iLuxe.json";
import LottieFiles from "../animation/LottiesFiles";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import { LuFolders, LuUserRoundPen } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { CgFolderAdd } from "react-icons/cg";
import NavDropDown from "../components/shared/NavBar/NavDropDown";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode
): MenuItem {
  return { key, icon, label } as MenuItem;
}

export interface userType {
  exp: number;
  iat: number;
  role: "admin" | "user";
  userId: string;
}

const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 640);
  const location = useLocation();
  const token = useAppSelector(useCurrentToken);
  const user = verifyToken(token as string);
  const [selectedKey, setSelectedKey] = useState<string>(() => {
    return localStorage.getItem("selectedKey") || "1"; // Retrieve from localStorage
  });

  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let key = "1";

    if (user?.role === "admin") {
      if (location.pathname.includes("manage-users")) key = "1";
      else if (location.pathname.includes("manage-products")) key = "2";
      else if (location.pathname.includes("manage-orders")) key = "3";
      else if (location.pathname.includes("add-product")) key = "4";
    } else if (user?.role === "user") {
      if (location.pathname.includes("view-orders")) key = "1";
      else if (location.pathname.includes("manage-profile")) key = "2";
    }

    setSelectedKey(key);
    localStorage.setItem("selectedKey", key);
  }, [location.pathname, user?.role]);

  const items: MenuItem[] =
    user?.role === "admin"
      ? [
          getItem(
            <Link to="manage-users">Manage Users</Link>,
            "1",
            <LuUserRoundPen className="size-5" />
          ),
          getItem(
            <Link to="manage-products">Manage Products</Link>,
            "2",
            <LuFolders className="size-5" />
          ),
          getItem(
            <Link to="manage-orders">Manage Orders</Link>,
            "3",
            <HiOutlineDocumentReport className="size-5.5" />
          ),
          getItem(
            <Link to="add-product">Add Product</Link>,
            "4",
            <CgFolderAdd className="size-4.5" />
          ),
        ]
      : [
          getItem(
            <Link to="view-orders">View Orders</Link>,
            "1",
            <HiOutlineDocumentReport className="size-5" />
          ),
          getItem(
            <Link to="manage-profile">Manage Profile</Link>,
            "2",
            <LuUserRoundPen className="size-5" />
          ),
        ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            footerBg: "#000c17",
            footerPadding: "14px 0px",
            triggerBg: "#000c17",
          },
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsedWidth={60}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) =>
            setCollapsed(window.innerWidth <= 640 ? true : value)
          }
        >
          <div
            className={`text-white bg-dark flex ${
              collapsed ? "justify-center" : ""
            } py-5 p-3 border-b-2 border-b-gray-700 sticky top-0 rounded-b-xl`}
          >
            <Link to="/" className="flex items-center gap-1 cursor-pointer">
              <LottieFiles animation={iLuxe} className="sm:w-11 w-10" />
              {!collapsed && (
                <h1 className="font-berkshire select-none font-normal text-white text-2xl sm:text-4xl">
                  uxe
                </h1>
              )}
            </Link>
          </div>

          <Menu
            style={{
              fontFamily: "Madimi One",
              margin: "10px auto 0px",
              width: "95%",
              display: "flex",
              flexDirection: "column",
              position: "sticky",
              top: "95px",
            }}
            theme="dark"
            selectedKeys={[selectedKey]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <div className="flex border-b-2 border-b-secondary shadow-xl justify-between items-center bg-gray-300 py-5 sm:px-5 px-3">
            <h1 className="font-berkshire text-lg sm:text-2xl">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
            </h1>
            <NavDropDown />
          </div>
          <Content style={{ margin: "0 10px" }}>
            <Outlet />
          </Content>
          <div className="hidden sm:block">
            <Footer
              style={{
                textAlign: "center",
                color: "#99a1af",
                fontFamily: "Madimi One",
              }}
            >
              &copy; {new Date().getFullYear()} The iLuxe. All rights reserved.
            </Footer>
          </div>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashBoard;
