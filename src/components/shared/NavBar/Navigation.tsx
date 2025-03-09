import { NavLink } from "react-router-dom";
import { navItems } from "./NavUtils";

interface NavigationProps {
  open: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ open }) => {

  
  return (
    <div
      className={`w-full ${
        open ? "h-[280px]" : "h-0"
      } transition-all duration-500 absolute z-10 sm:hidden bg-white border-2 border-primary rounded-b-2xl`}
    >
      <div
        className={`${
          open ? "w-full" : "w-0"
        } h-[70px] mb-5 delay-75 transition-all duration-500 bg-primary `}
      ></div>
      {navItems.map((item) => (
        <div
          key={item.id}
          style={{transitionDelay: `${item.delay}`}}
          className={`${open ? "w-full" : "w-0"} mb-[1.5px] h-14 transition-all flex text-white font-madimi text-lg items-center duration-500 bg-primary `}
        >
          <NavLink
            className={`${
              open ? "w-full" : "w-0 hidden"
            } ml-5 ransition-all duration-500 flex items-center gap-3 `}
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
