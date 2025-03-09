import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import "../../../styles/style.css";

const items: MenuProps["items"] = [
  {
    label: (
      <div className="flex items-center gap-2">
        <RiDashboardFill className="text-xl text-secondary" />
        <span className="font-madimi text-secondary">Dashboard</span>
      </div>
    ),
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <IoLogOut className="text-xl text-secondary" />
        <span className="font-madimi text-secondary">Logout</span>
      </div>
    ),
    key: "1",
  },
];

const NavDropDown: React.FC = () => (
  <Dropdown menu={{ items }} trigger={["click"]}>
    <a onClick={(e) => e.preventDefault()}>
      <FaCircleUser className="text-secondary text-2xl cursor-pointer" />
    </a>
  </Dropdown>
);

export default NavDropDown;
