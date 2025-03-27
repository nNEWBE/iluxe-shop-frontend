import React from "react";

interface FooterItem {
  key: string;
  label: string;
}

interface FooterItemsProps {
  name: string;
  items: FooterItem[];
}

const FooterItems: React.FC<FooterItemsProps> = ({ name, items }) => {
  return (
    <div data-aos="zoom-in-up">
      <h4 className="text-base font-semibold">{name}</h4>
      <ul className="mt-4 space-y-3 text-gray-400 text-sm sm:text-lg">
        {items.map((item) => (
          <li
            className="hover:text-blue-500 w-fit transition cursor-pointer hover:underline"
            key={item.key}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterItems;
