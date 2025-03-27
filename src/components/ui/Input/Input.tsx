import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdError } from "react-icons/md";

interface InputProps {
  label: string;
  type: string;
  register?: object;
  errors?: string;
}

const Input: React.FC<InputProps> = ({ label, type, register, errors }) => {
  const [see, setSee] = useState(false);
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-600">
        <span className="text-red-500 font-righteous">*</span>
        {label}
      </label>
      <input
        type={type === "password" ? (see ? "text" : "password") : type}
        placeholder={label}
        {...register}
        className={`mt-2 placeholder-[#c2c2c2] w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
      />
      {type === "password" && (
        <div
          onClick={() => setSee(!see)}
          className="absolute right-4 top-9.5 cursor-pointer text-lg text-gray-400"
        >
          {see ? <FiEyeOff /> : <FiEye />}
        </div>
      )}
      {errors?.length ? (
        <div
          role="alert"
          className="flex items-center gap-1 text-sm text-red-500"
        >
          <MdError />
          <span>{errors}</span>
        </div>
      ) : (
        <div className="h-[1.25rem]" />
      )}
    </div>
  );
};

export default Input;
