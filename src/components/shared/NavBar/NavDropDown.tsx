import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import {  Dropdown } from "antd";
import type { MenuProps } from "antd";
import "../../../styles/style.css";
import { Link } from "react-router-dom";
import {
  logoutUser,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toast } from "sonner";
import { useLogoutMutation } from "../../../redux/api/auth/authApi";
import { ApiError } from "../../../error/error";
import { BiSolidUserAccount } from "react-icons/bi";

const NavDropDown: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out");
    try {
      await logout({});
      dispatch(logoutUser());
      toast.success("Logged out successfully", { id: toastId, duration: 2000 });
        } catch (error: unknown) {
          if (typeof error === "object" && error !== null && "data" in error) {
            const apiError = error as ApiError;
            toast.error(
              apiError?.data?.error?.details?.[0]?.message ||
                "Something went wrong",
              {
                id: toastId,
                duration: 2000,
              }
            );
          } else {
            toast.error("Something went wrong", { id: toastId, duration: 2000 });
          }
        }
  };

  const items: MenuProps["items"] = [
    user && {
      label: (
        <Link to="/user-profile" className="flex items-center gap-2">
          <BiSolidUserAccount className="text-xl text-secondary" />
          <span className="font-madimi text-secondary">Profile</span>
        </Link>
      ),
      key: "0",
    },
    user && {
      type: "divider",
    },
    user && {
      label: (
        <Link to="/dashboard/manage-users" className="flex items-center gap-2">
          <RiDashboardFill className="text-xl text-secondary" />
          <span className="font-madimi text-secondary">Dashboard</span>
        </Link>
      ),
      key: "1",
    },
    user && {
      type: "divider",
    },
    {
      label: user ? (
        <div onClick={handleLogout} className="flex items-center gap-2">
          <IoLogOut className="text-xl text-secondary" />
          <span className="font-madimi text-secondary">Logout</span>
        </div>
      ) : (
        <Link to="/login" className="flex items-center gap-2">
          <IoLogIn className="text-xl text-secondary" />
          <span className="font-madimi text-secondary">Login</span>
        </Link>
      ),
      key: user ? "2" : "0",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div>
        {/* <ConfigProvider
          theme={{
            token: {
              colorBgSpotlight: "#ffff",
              colorText: "#101828",
              colorTextLightSolid: "#101828",
              fontFamily: "Madimi One",
            },
          }}
        > */}
          {/* <Tooltip title={user?.userId} fresh> */}
            <FaCircleUser className="text-secondary text-2xl cursor-pointer" />
          {/* </Tooltip> */}
        {/* </ConfigProvider> */}
      </div>
    </Dropdown>
  );
};
export default NavDropDown;
