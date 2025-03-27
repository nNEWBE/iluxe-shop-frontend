import React, { useEffect, useState } from "react";
import { Select } from "antd";
import "../../../styles/style.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectIsReset,
  setParams,
} from "../../../redux/features/filter/filterSlice";

interface InputSelectProps {
  options?: { label: unknown; value: unknown }[];
  placeholder?: string;
  setIsFiltering: (isFiltering: boolean) => void;
}

const InputSelect: React.FC<InputSelectProps> = ({ options, placeholder,setIsFiltering }) => {
  const dispatch = useAppDispatch();
  const isReset = useAppSelector(selectIsReset);
  const [selectedValue, setSelectedValue] = useState<string | undefined>("");

  useEffect(() => {
    if (isReset) {
      setSelectedValue("");
    }
  }, [isReset]);

  const handleChange = (value: string) => {
    setIsFiltering(true);
    setSelectedValue(value);
    if (placeholder === "Stock") {
      dispatch(
        setParams([{
          key: "inStock",
          value: value === "In Stock" ? "true" : "false",
        }])
      );
    } else {
      dispatch(
        setParams([{ key: placeholder?.toLocaleLowerCase() as string, value }])
      );
    }
  };

  return (
    <Select
      showSearch
      style={{ fontFamily: "Madimi One" }}
      className="rounded-lg border-2 border-secondary w-full"
      variant="borderless"
      placeholder={placeholder}
      options={options}
      onChange={handleChange}
      onClear={() => handleChange("")}
      value={selectedValue === "" ? undefined : selectedValue}
      allowClear
    />
  );
};

export default InputSelect;
