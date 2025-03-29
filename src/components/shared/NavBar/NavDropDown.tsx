import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { Dropdown, MenuProps } from "antd";
import "../../../styles/style.css";
import { Link } from "react-router-dom";
import {
  logoutUser,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toast } from "sonner";
import { ApiError } from "../../../error/error";
import { BiSolidUserAccount } from "react-icons/bi";

const NavDropDown: React.FC = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      dispatch(logoutUser());
      toast.success("Logged out successfully", { id: toastId, duration: 2000 });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as ApiError;
        toast.error(
          apiError?.data?.error?.details?.[0]?.message ||
            "Something went wrong",
          { id: toastId, duration: 2000 }
        );
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    }
  };

  const items: MenuProps["items"] = [
    user?.role === "user"
      ? {
          label: (
            <Link
              to="/user/dashboard/manage-profile"
              className="flex items-center gap-2"
            >
              <BiSolidUserAccount className="text-xl text-secondary" />
              <span className="font-madimi text-secondary">Profile</span>
            </Link>
          ),
          key: "0",
        }
      : null,

    user?.role === "user"
      ? {
          type: "divider" as const, // Fixes type error
        }
      : null,

    user
      ? {
          label: (
            <Link
              to={
                user?.role === "admin"
                  ? "/admin/dashboard/manage-users"
                  : "/user/dashboard/view-orders"
              }
              className="flex items-center gap-2"
            >
              <RiDashboardFill className="text-xl text-secondary" />
              <span className="font-madimi text-secondary">Dashboard</span>
            </Link>
          ),
          key: "1",
        }
      : null,

    user
      ? {
          type: "divider" as const, // Fixes type error
        }
      : null,

    {
      label: user ? (
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer"
        >
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
  ].filter(Boolean) as MenuProps["items"]; 

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div className="cursor-pointer">
        {user ? (
          <p className="w-6 h-6 rounded-full border-2 border-secondary text-secondary bg-primary font-berkshire text-sm flex items-center justify-center">
            {user?.userName?.charAt(0)}
          </p>
        ) : (
          <FaCircleUser className="text-secondary text-2xl cursor-pointer" />
        )}
      </div>
    </Dropdown>
  );
};

export default NavDropDown;
