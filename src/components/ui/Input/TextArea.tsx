import { FC } from "react";
import { MdError } from "react-icons/md";

interface TextareaProps {
  label: string;
  register?: object;
  errors?: string;
}

const TextArea: FC<TextareaProps> = ({ label, register, errors }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-600">
        <span className="text-red-500 font-righteous">*</span>
        {label}
      </label>
      <textarea
        {...register}
        placeholder={label}
        className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        rows={2}
      />
      {errors?.length && (
        <div
          role="alert"
          className="flex items-center gap-1 text-sm text-red-500"
        >
          <MdError />
          <span>{errors}</span>
        </div>
      )}
    </div>
  );
};

export default TextArea;
