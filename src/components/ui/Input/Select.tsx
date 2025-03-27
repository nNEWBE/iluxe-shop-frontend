import { Control, Controller, FieldValues } from "react-hook-form";
import { MdError } from "react-icons/md";
import { ConfigProvider, Select } from "antd";

interface SelectInputProps {
  label: string;
  name: string;
  control: Control<FieldValues>;
  options: { label: string; value: string }[];
  errors?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  control,
  options,
  errors,
}) => {
  const selectStyle = {
    marginTop: "8px",
    width: "100%",
    border: "2px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "1rem",
    outline: "none",
    fontFamily: "Madimi One",
    transition: "border 0.2s ease-in-out",
  };
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-600">
        <span className="text-red-500 font-righteous">*</span>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: `Select any ${label}` }}
        render={({ field }) => (
          <ConfigProvider
            theme={{
              components: {
                Select: {
                  activeBorderColor: "#ffff",
                  hoverBorderColor: "#ffff",
                  colorBorder: "#ffff",
                },
              },
            }}
          >
            {" "}
            <Select
              style={selectStyle}
              {...field}
              showSearch
              placeholder={`Select ${label}`}
              options={options}
              allowClear
            />
          </ConfigProvider>
        )}
      />
      {errors && (
        <div
          role="alert"
          className="flex items-center gap-1 text-sm text-red-500 mt-1"
        >
          <MdError />
          <span>{errors}</span>
        </div>
      )}
    </div>
  );
};

export default SelectInput;
