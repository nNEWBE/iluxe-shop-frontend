import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FiFacebook, FiLinkedin } from "react-icons/fi";
import { LuYoutube } from "react-icons/lu";

export const items_1 = [
  { label: "Track Order", key: "1" },
  { label: "Shipping Policy", key: "2" },
  { label: "Return & Refunds", key: "3" },
  { label: "Terms of Service", key: "4" },
  { label: "Privacy Policy", key: "5" },
];

export const items_2 = [
  { label: "New Arrivals", key: "1" },
  { label: "Best Sellers", key: "2" },
  { label: "Gift Cards", key: "3" },
  { label: "All Products", key: "4" },
];

export const socialIcons = [
  { icon: <FiFacebook />, key: "1", className:'hover:text-blue-500' },
  { icon: <FaInstagram />, key: "2", className:'hover:text-pink-500' },
  { icon: <LuYoutube />, key: "3", className:'hover:text-red-500' },
  { icon: <FaXTwitter />, key: "4", className:'hover:text-sky-400' },
  { icon: <FiLinkedin />, key: "5", className:'hover:text-blue-600' },
];
