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

export type Order = {
  _id: string;
  product:Product;
  quantity: number;
  status: "Pending" | "Shipping";
  totalPrice: number;
  updatedAt: Date;
  createdAt: Date;
  email: string;
};