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
    <div>
      <h4 className="text-base font-semibold">{name}</h4>
      <div className="mt-4 space-y-3 text-gray-400 text-sm sm:text-lg">
        {items.map((item) => (
          <p
            key={item.key}
            className="hover:text-blue-500 transition cursor-pointer hover:underline"
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FooterItems;
