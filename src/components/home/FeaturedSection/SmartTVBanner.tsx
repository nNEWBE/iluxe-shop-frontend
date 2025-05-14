import { useNavigate } from "react-router-dom";
import tvImage from "../../../assets/smart-tv.png"; // Ensure this image exists locally

const SmartTVBanner = () => {
  const navigate = useNavigate();

  const handleSearchQuery = (key: string, value: string | number) => {
    const params = new URLSearchParams(location.search);
    params.set(key, value.toString());
    navigate(`products?${params.toString()}`);
  };

  return (
    <div className="flex font-madimi flex-col mb-20 mx-5 sm:mx-10 lg:flex-row items-center justify-between bg-primary text-white p-6 md:p-12 rounded-lg shadow-md relative overflow-hidden">
      {/* TV Image Section */}
      <div className="relative w-full lg:w-1/2 flex justify-center mb-6 lg:mb-0">
        <img
          src={tvImage}
          alt="Latest 4K Smart LED TV"
          className="w-[320px] md:w-[400px] lg:w-[450px] relative"
        />

        {/* Warranty Badge */}
        <div className="absolute top-[45%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 bg-white text-secondary rounded-full w-[120px] h-[120px] flex flex-col items-center justify-center text-center p-2 shadow-lg">
          <span className="text-xs">Special Offer</span>
          <span className="text-2xl font-bold">5 Yrs</span>
          <span className="text-xs">Warranty</span>
        </div>

        {/* Resolution Badge */}
        <div className="absolute top-4 left-4 bg-secondary bg-opacity-70 text-white px-3 py-1 rounded text-xs font-semibold shadow">
          4K Ultra HD
        </div>

        {/* Voice Control Label */}
        <div className="absolute bottom-4 left-4 bg-secondary bg-opacity-70 text-white px-3 py-1 rounded text-xs font-semibold shadow">
          Voice Control Enabled
        </div>

        {/* Streaming Support */}
        <div className="absolute bottom-4 right-4 flex gap-2 bg-white p-2 rounded shadow text-xs font-semibold text-black items-center">
          <span>🎬 Netflix</span>
          <span>▶️ YouTube</span>
        </div>
      </div>

      {/* Text & Button Section */}
      <div className="w-full lg:w-1/3 text-center lg:text-left space-y-4">
        <h2 className="text-2xl md:text-3xl text-secondary font-aladin font-bold uppercase">
          Best Smart LED TV
        </h2>
        <h3 className="text-lg md:text-xl font-medium">Collection 2018</h3>
        <p className="text-sm italic">
          *Terms and conditions may apply. Offer valid while stocks last.
        </p>
        <button
          onClick={() => handleSearchQuery("search", "tv")}
          className="mt-4 bg-white cursor-pointer text-secondary px-6 py-2 rounded shadow-md hover:shadow-lg active:scale-95 transition font-semibold"
        >
          Shop Now!
        </button>
      </div>
    </div>
  );
};

export default SmartTVBanner;
