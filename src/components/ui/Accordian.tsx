import type { CSSProperties } from "react";
import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, ConfigProvider, theme } from "antd";
import { FaArrowCircleRight } from "react-icons/fa";

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle
) => [
  {
    key: 1,
    label: "Uncompromising Quality",
    children: (
      <p className="border-2 border-secondary p-3 text-white rounded-xl bg-primary">
        We source the finest paper, and materials to ensure a luxurious
        feel and long-lasting durability.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: 2,
    label: "Timeless Design",
    children:
      <p className="border-2 border-secondary p-3 text-white rounded-xl bg-primary">Our stationery is crafted with a balance of modern aesthetics and classic elegance.</p>,
    style: panelStyle,
  },
  {
    key: 3,
    label: "Sustainable Commitment",
    children:
      <p className="border-2 border-secondary p-3 text-white rounded-xl bg-primary">We support eco-friendly practices, offering sustainable paper and packaging options.</p>,
    style: panelStyle,
  },
  {
    key: 4,
    label: "Customer-Centric Approach",
    children:
      <p className="border-2 border-secondary p-3 text-white rounded-xl bg-primary">Your satisfaction is our priority, and we aim to provide an exceptional shopping experience.</p>,
    style: panelStyle,
  },
];

const Accordian: React.FC = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: "3px",
    background: "#fff",
    border: "2px solid #101828",
    borderRadius: token.borderRadiusLG,
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: "#101828",
          colorBorder: "#101828",
          colorPrimaryBorder: "#101828",
        },
      }}
    >
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <FaArrowCircleRight
            style={{
              fontSize:'15px',
              color: "#1677ff",
              border: "2px solid #101828",
              borderRadius: "50%",
              transform: `rotate(${isActive ? 90 : 0}deg)`,
            }}
          />
        )}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </ConfigProvider>
  );
};

export default Accordian;
