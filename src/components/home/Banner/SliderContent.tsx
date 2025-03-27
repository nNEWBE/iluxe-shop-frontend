import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SliderContent = () => {
  const [placeholder, setPlaceholder] = useState("Search for products");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setPlaceholder("Search");
      } else {
        setPlaceholder("Search for products");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div
      data-aos="zoom-in-up"
      className="rounded-xl bg-gray-500/30 shadow-xl bg-clip-padding backdrop-filter backdrop-blur-md backdrop-saturate-100 backdrop-contrast-100 border-2 border-secondary px-5 sm:px-10 py-10 absolute top-1/2 left-1/2 -translate-x-1/2 w-[85%] sm:w-[30rem] md:w-[40rem] lg:w-[45rem] -translate-y-1/2"
    >
      <div className="text-center">
        <h1
          style={{ textShadow: "3px 3px #101828" }}
          className="text-3xl md:text-4xl tracking-wider font-berkshire text-gray-100 lg:text-5xl"
        >
          Welcome to <span className="text-primary">iLuxe</span> Shop
        </h1>
        <p className="sm:text-xl text-base mt-4 mb-7 text-secondary font-lobster md:text-2xl lg:text-3xl">
          Discover a world of creativity and inspiration
        </p>
      </div>
      <div>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-row sm:gap-[3px] justify-center items-center text-base"
        >
          <input
            className="border sm:block border-secondary w-[70%] sm:w-1/2 placeholder:text-secondary px-4 sm:py-1 py-1 bg-gray-300 font-madimi rounded-l-2xl sm:rounded-r-[4px] focus:outline-none sm:text-base text-sm"
            type="text"
            placeholder={placeholder}
          />
          <div className="flex text-white items-center relative">
            <div className="bg-primary rounded-r-2xl flex items-center justify-center h-[29.5px] border border-secondary sm:border-0 sm:w-0 w-10">
              <IoSearchSharp className="text-lg cursor-pointer sm:absolute left-3" />
            </div>
            <button
              className="border sm:block hidden border-secondary sm:text-base text-sm cursor-pointer sm:py-1 pl-9 pr-4 py-1 bg-primary font-madimi rounded-r-2xl sm:rounded-l-[4px]"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SliderContent;
