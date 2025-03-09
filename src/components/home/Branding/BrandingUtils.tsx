import { GiElectric } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa6";
import { BsFillRocketFill } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";

export const brandingData = [
  {
    key: 1,
    title: "Free Returns and Exchanges",
    icon: <GiElectric />,
  },
  {
    separator: "/",
  },
  {
    key: 2,
    title: "Discount on weekends",
    icon: <FaDollarSign />,
  },
  {
    separator: "/",
  },
  {
    key: 3,
    title: "Free Delivery on Orders Over $100",
    icon: <BsFillRocketFill />,
  },
  {
    separator: "/",
  },
  {
    key: 4,
    title: "Services are available 24/7",
    icon: <RiCustomerService2Fill />,
  },
  {
    separator: "/",
  },
];
