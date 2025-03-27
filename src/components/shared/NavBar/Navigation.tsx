import { NavLink } from "react-router-dom";
import { navItems } from "./NavUtils";
import { useEffect, useState } from "react";

interface NavigationProps {
  handleNav: () => void;
  open: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ handleNav, open }) => {
  const [isFullyHidden, setIsFullyHidden] = useState(true);

  useEffect(() => {
    if (open) {
      setTimeout(() => setIsFullyHidden(false), 300);
    } else {
      const timer = setTimeout(() => setIsFullyHidden(true), 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <div
      className={`w-full ${
        open ? "h-[260px]" : "h-0"
      } transition-all duration-500 shadow-2xl absolute left-0 top-0 -z-[10] sm:hidden bg-white border-b-2 border-b-secondary rounded-b-2xl`}
    >
      <div
        className={`${
          open ? "w-full" : "w-0"
        } h-[55px] mb-5 delay-75 transition-all duration-500  `}
      ></div>
      {navItems.map((item) => (
        <div
          key={item.id}
          style={{ transitionDelay: `${item.delay}` }}
          className={`${
            open ? "w-full" : "w-0"
          } mb-[1.5px] h-14 transition-all flex text-white font-madimi text-lg items-center duration-500 bg-primary rounded-lg`}
        >
          <NavLink
            onClick={handleNav}
            className={`
              ${open ? "w-full" : "w-0"}
              ${isFullyHidden ? "hidden" : ""}
               ml-5 ransition-all duration-500 flex items-center gap-3 `}
            to={item.to}
          >
            {item.icon}
            {item.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
