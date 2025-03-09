import React, { useState } from "react";
import { Drawer } from "antd";
import { FaCartShopping } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";
import "../../../styles/style.css";

const NavSideBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={showDrawer}>
        <div className="relative ">
          <FaCartShopping className="text-secondary ml-5 text-2xl cursor-pointer" />
          <p className="absolute font-lobster text-sm -top-3 left-7 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
            5
          </p>
        </div>
      </div>
      <Drawer
        className="border-l-2 border-primary font-madimi"
        title="Products Added"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <div className="flex text-secondary flex-col gap-3 items-center h-[calc(90%-100px)] w-full justify-center">
          <MdRemoveShoppingCart className="text-6xl " />
          <p className="font-lobster text-2xl ">Your Cart Is Empty</p>
        </div>
      </Drawer>
    </>
  );
};

export default NavSideBar;
