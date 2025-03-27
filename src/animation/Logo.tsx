import LottieFiles from "./LottiesFiles";
import iLuxe from "../assets/iLuxe.json";
import { Link } from "react-router-dom";
interface LogoProps {
  textColor: string;
}

const Logo = ({ textColor }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center gap-1 cursor-pointer">
      <LottieFiles animation={iLuxe} className="sm:w-11 w-10" />
      <h1
        className={`font-berkshire select-none font-normal ${textColor} text-2xl sm:text-4xl`}
      >
        uxe
      </h1>
    </Link>
  );
};

export default Logo;
