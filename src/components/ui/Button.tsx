const Button: React.FC<{
  text: string;
  icon?: React.ReactNode;
  type?: "primary" | "secondary";
  varient?: "button" | "tag";
  onClick?: () => void;
}> = ({ text, icon, type = "primary", varient = "button",onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative border-2 border-secondary cursor-pointer overflow-hidden rounded-lg px-3 py-1.5 group ${
        type === "primary" ? "bg-primary text-white" : "bg-white text-secondary"
      } transition-all ease-out duration-500 ${
        varient === "button" && "active:scale-95"
      }`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-primary to-blue-900 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

      <span
        style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}
        className={`absolute right-0 w-10 h-12 -bottom-2 transition-all duration-1000 transform translate-x-28 bg-white opacity-20 ${
          icon ? "group-hover:-translate-x-30" : "group-hover:-translate-x-28"
        } ease`}
      />

      <p className="flex relative select-none font-madimi z-10 items-center gap-2">
        <span>{text}</span>
        {icon && icon}
      </p>
    </button>
  );
};

export default Button;
