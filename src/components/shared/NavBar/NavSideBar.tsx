import React from "react";
import { Drawer } from "antd";
import { FaCartShopping } from "react-icons/fa6";
import "../../../styles/style.css";
import NavSidebarCard from "../../ui/Card/NavSidebarCard";
import Title from "../../ui/Title";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  IcartItem,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
} from "../../../redux/features/cart/cartSlice";
import TotalAmountCard from "../../ui/Card/TotalAmountCard";
import {
  closeDrawer,
  openDrawer,
} from "../../../redux/features/drawer/drawerSlice";

const NavSideBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.drawer.open);
  const orderData = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  return (
    <>
      <div onClick={() => dispatch(openDrawer())}>
        <div className="relative ">
          <FaCartShopping className="text-secondary ml-5 text-2xl cursor-pointer" />
          <p className="absolute font-lobster cursor-pointer text-sm -top-3 left-7 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
            {orderData?.length || 0}
          </p>
        </div>
      </div>
      <Drawer
        className="border-l-2 border-primary font-madimi"
        title="Products Added"
        onClose={() => dispatch(closeDrawer())}
        open={open}
        size="large"
        style={{ background: "oklch(0.932 0.032 255.585)" }}
      >
        <Title word_1="Your" word_2="Orders" />

        <div className="grid md:grid-cols-3 md:gap-5 ">
          <div className="md:col-span-2">
            {orderData?.map((order: IcartItem, index: number) => (
              <NavSidebarCard key={index} orderData={order} />
            ))}
          </div>
          <div className="md:col-span-1">
            {orderData?.length > 0 && (
              <TotalAmountCard
                totalPrice={totalPrice}
                totalQuantity={totalQuantity}
                orderData={orderData}
              />
            )}
          </div>
        </div>

        {orderData?.length === 0 && (
          <div className="flex text-secondary flex-col gap-3 items-center h-[calc(80%-100px)] w-full justify-center">
            <MdRemoveShoppingCart className="text-6xl " />
            <p className="font-lobster text-2xl ">Your Cart Is Empty</p>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default NavSideBar;
