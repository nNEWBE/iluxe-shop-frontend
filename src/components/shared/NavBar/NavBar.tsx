import { useState } from "react";
import NavBottom from "./NavBottom";
import NavTop from "./NavTop";
import Navigation from "./Navigation";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const handleNav = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavTop />
      <Navigation open={open} />
      <NavBottom handleNav={handleNav} open={open} />
    </>
  );
};

export default NavBar;
