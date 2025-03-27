import Marquee from "react-fast-marquee";
import { brandingData } from "./BrandingUtils";

const Branding = () => {
  return (
    <div className="sm:text-xl text-lg text-primary cursor-pointer font-madimi bg-secondary py-3 border-y-2 border-primary">
      <Marquee pauseOnHover>
        {brandingData.map((data,index) => {
          return (
            <div key={index} className=" mx-5">
              <div className="flex items-center gap-2">
                {data.icon}
                <p>{data.title}</p>
              </div>
              <p>{data.separator}</p>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Branding;
