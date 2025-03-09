import NavDropDown from "./NavDropDown";
import NavSideBar from "./NavSideBar";
import "../../../styles/style.css";
import NavButton from "./NavButton";
import { navItems } from "./NavUtils";
import Logo from "../../../animation/Logo";
import { NavLink } from "react-router-dom";

interface NavBottomProps {
  handleNav: () => void;
  open: boolean;
}

const NavBottom: React.FC<NavBottomProps> = ({ handleNav, open }) => {
  return (
    <div className="border-b-2 shadow-xl z-10 border-primary flex items-center justify-between sm:px-12 px-4 bg-white h-20 sticky top-0">
      <div className="text-secondary">
        <Logo />
      </div>
      <div className="flex gap-5 items-center">
        <div className="sm:flex hidden gap-5 items-center">
          {navItems.map((item) => (
            <div key={item.id} className="cursor-pointer  relative">
              <NavLink
                to={item.to}
                className="font-madimi navItem hover:text-secondary transition-colors duration-200 select-none font-normal text-xl text-primary"
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>
        <NavSideBar />
        <NavDropDown />
        <NavButton handleNav={handleNav} open={open} />
      </div>
    </div>
  );
};

export default NavBottom;
