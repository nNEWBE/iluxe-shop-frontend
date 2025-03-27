import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  type: string;
  img: string;
}

const Account: React.FC<Props> = ({ children, type, img }) => {
  return (
    <div className="mb-20 mt-12 flex items-center justify-center">
      <div
        data-aos="fade-left"
        className="grid shadow-xl mx-5 overflow-hidden border-2 border-gray-300 grid-cols-1 lg:grid-cols-2 w-full max-w-screen-lg rounded-lg"
      >
        <div className="relative p-5">
          <img
            src={img}
            alt="Register"
            className="w-full lg:max-h-full md:max-h-[25rem] h-full object-cover rounded-lg border-2 border-gray-300"
          />
        </div>

        <div className="bg-white p-5 sm:p-8 lg:p-12 flex flex-col justify-center items-center space-y-6">
          <h1 className="tracking-wider text-center text-3xl sm:text-4xl font-bold font-berkshire text-primary-text">
            <span
              style={{ textShadow: "2px 2px #101828" }}
              className="font-protest text-primary"
            >
              {type.charAt(0).toUpperCase()}
            </span>
            {type.slice(1)}
          </h1>

          {children}

          {type === "Register" ? (
            <p className="text-sm font-madimi font-bold text-secondary">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          ) : (
            <p className="text-sm font-madimi font-bold text-secondary">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
