import React, { useEffect, useState } from "react";
import { ConfigProvider, Slider } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectIsReset,
  setParams,
} from "../../redux/features/filter/filterSlice";

interface RangeProps {
  min: number;
  max: number;
  setIsFiltering: (isFiltering: boolean) => void;
}

const Range: React.FC<RangeProps> = ({ min, max, setIsFiltering }) => {
  const dispatch = useAppDispatch();
  const isReset = useAppSelector(selectIsReset);
  const [rangeValues, setRangeValues] = useState<number[]>([min, max]);

  useEffect(() => {
    if (isReset) {
      setRangeValues([min, max]);
    }
  }, [isReset, min, max]);

  const handleRange = (values: number[]) => {
    setIsFiltering(true);
    setRangeValues(values);
    dispatch(setParams([{ key: "price", value: `${values[0]}-${values[1]}` }]));
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            controlSize: 1,
            railSize: 3,
            trackBg: "#101828",
            trackHoverBg: "#101828",
            handleColor: "#101828",
            handleActiveColor: "#101828",
            handleSize: 7,
          },
        },
      }}
    >
      <Slider
        onChange={handleRange}
        max={max}
        min={min}
        style={{ margin: "0px" }}
        range
        value={rangeValues}
      />
    </ConfigProvider>
  );
};

export default Range;
