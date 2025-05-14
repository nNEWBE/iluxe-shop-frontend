import { Send } from "lucide-react";
import Logo from "../../../animation/Logo";
import { items_1, items_2, socialIcons } from "./FooterUtils";
import FooterItems from "./FooterItems";

const Footer = () => {
  return (
    <footer className="bg-secondary overflow-hidden font-madimi text-white pt-10 border-t-2 border-primary rounded-t-xl ">
      <div className="md:px-12 sm:px-10 px-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-10 lg:gap-20">
          <div data-aos="zoom-out-right" className="text-center sm:text-left">
            <div className="flex sm:justify-start justify-center">
              <Logo textColor="text-white" />
            </div>
            <p className="mt-4 text-gray-400 text-sm sm:text-lg sm:max-w-lg lg:max-w-md ">
              Explore premium stationery that fuels creativity and enhances your
              workflow. Stay ahead with innovative tools and stylish designs.
            </p>
          </div>

          <div data-aos="zoom-out-left" className="w-full lg:w-1/2">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm sm:text-lg mt-1">
              Join our newsletter for exclusive deals and creative inspiration!
            </p>
            <div className="relative mt-4 max-w-md z-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-10 sm:h-12 text-[12px] sm:text-base p-3 pl-3 sm:pl-4 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none"
              />
              <button className="sm:text-base text-sm absolute top-1 right-1 bg-primary hover:bg-blue-600 px-4 sm:h-10 h-8 rounded-full text-white flex items-center gap-2 transition duration-300">
                Subscribe <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <FooterItems name="Help" items={items_1} />
          <FooterItems name="Shop" items={items_2} />

          <div data-aos="zoom-in-up">
            <h4 className="text-base font-semibold">Follow Us</h4>
            <div className="mt-4 flex flex-wrap space-x-4">
              {socialIcons.map((item) => (
                <a
                  key={item.key}
                  className={`${item.className} transition transform hover:scale-110 cursor-pointer text-xl sm:text-3xl text-gray-400`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div data-aos="zoom-in-up">
            <h4 className="text-base font-semibold">Contact</h4>
            <p className="text-gray-400 text-sm sm:text-lg mt-3">
              Email: support@iluxe.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>
      <hr className="border-[1px] mt-7 border-gray-700" />
      <div className="text-center py-5 bg-dark">
        <p className="text-gray-400 text-sm sm:text-lg">
          &copy; {new Date().getFullYear()} The iLuxe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
