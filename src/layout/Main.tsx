import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar/NavBar";
import Footer from "../components/shared/Footer/Footer";
import { useEffect } from "react";
import Aos from "aos";
// import "aos/dist/aos.css";

const Main = () => {
  useEffect(() => {
      Aos.init();
    }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
