import { useState } from "react";
import NavBottom from "./NavBottom";
import NavTop from "./NavTop";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const handleNav = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavTop />
      <NavBottom handleNav={handleNav} open={open} />
    </>
  );
};

export default NavBar;
