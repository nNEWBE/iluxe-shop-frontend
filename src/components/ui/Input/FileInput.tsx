import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { MdError } from "react-icons/md";

interface FileInputProps {
  label: string;
  register?: object;
  errors?: string;
  control: Control<FieldValues>;
  name: string;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  errors,
  control,
  name,
}) => {

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-600">
        <span className="text-red-500 font-righteous">*</span>
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{ required: "Choose product image" }}
        render={({ field: { onChange, value, ...field } }) => (
          <div>
            <input
              type="file"
              value={value?.fileName}
              {...field}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(file);
                }
              }}
              className="mt-2 block w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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