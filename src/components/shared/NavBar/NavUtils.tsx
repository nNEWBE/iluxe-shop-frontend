import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";

export const navItems = [
  {
    id: 1,
    name: "Home",
    to: "/",
    delay: "100ms",
    icon: <FaHome className="text-secondary text-2xl" />,
  },
  {
    id: 2,
    name: "Products",
    to: "/products",
    delay: "150ms",
    icon: <FaWallet className="text-secondary " />,
  },
  {
    id: 3,
    name: "About",
    to: "/about",
    delay: "200ms",
    icon: <BsFillInfoSquareFill className="text-secondary " />,
  },
];

export type Product = {
  _id: string;
  author: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  inStock: boolean;
  quantity: number;
  rating: number;
  productImage: string;
  createdAt: string;
  updatedAt: string;
};

export interface ITransaction {
  id: string;
  transactionStatus: string | null;
  bank_status: "Success" | "Cancel" | "Failed";
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
}

export interface IOrderProduct {
  product: IProduct;
  quantity: number;
  _id: string;
}

export interface IOrder {
  _id: string;
  user: IUser;
  products: IOrderProduct[];
  totalPrice: number;
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  transaction: ITransaction;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
