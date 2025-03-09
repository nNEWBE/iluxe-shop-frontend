import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";

export const navItems = [
  {
    id: 1,
    name: "Home",
    to: "/",
    delay: '100ms',
    icon: <FaHome className="text-secondary text-2xl" />,
  },
  {
    id: 2,
    name: "Products",
    to: "/products",
    delay: '150ms',
    icon: <FaWallet className="text-secondary " />,
  },
  {
    id: 3,
    name: "About",
    to: "/about",
    delay: '200ms',
    icon: <BsFillInfoSquareFill className="text-secondary " />,
  },
];
