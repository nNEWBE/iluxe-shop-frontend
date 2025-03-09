import LottieFiles from "./LottiesFiles";
import iLuxe from "../assets/iLuxe.json";

const Logo = () => {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <LottieFiles animation={iLuxe} className="sm:w-11 w-10" />
      <h1 className="font-berkshire select-none font-normal text-2xl sm:text-4xl">
        uxe
      </h1>
    </div>
  );
};

export default Logo;
