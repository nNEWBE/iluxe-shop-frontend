import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { MdError } from "react-icons/md";

interface FileInputProps {
  label: string;
  register?: object;
  errors?: string;
  control: Control<FieldValues>;
  name: string;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
}

const FileInput: React.FC<FileInputProps> = ({
  errors,
  control,
  name,
  label,
  setImageFiles,
  setImagePreview,
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };
  return (
    <div className="relative">
      <label className="block mb-1 text-sm font-semibold text-gray-600">
        <span className="text-red-500 font-righteous">*</span>
        {label}
      </label>
      <label
        htmlFor="image-upload"
        className="size-20 sm:size-36 flex items-center justify-center border-2 border-gray-300 rounded-md cursor-pointer text-center text-sm text-[#c2c2c2] hover:bg-gray-50 transition"
      >
        Upload +
      </label>

      <Controller
        name={name}
        control={control}
        rules={{ required: "Choose product image" }}
        render={({ field: { onChange, value, ...field } }) => (
          <div>
            <input
              id="image-upload"
              accept="image/*"
              multiple
              type="file"
              value={value?.fileName}
              {...field}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file);
                }
                handleImageChange(e);
              }}
              className="mt-2 hidden w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      />

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

export default FileInput;
