interface NavButtonProps {
  handleNav: () => void;
  open: boolean;
}
const NavButton: React.FC<NavButtonProps> = ({ handleNav, open }) => {
  return (
    <button className="sm:hidden" onClick={handleNav}>
      <div className="flex flex-col gap-[3px] cursor-pointer">
        <span
          className={`w-5 h-[2.9px] rounded-lg inline-block bg-secondary ${
            open ? " rotate-45 translate-y-1" : ""
          } duration-300`}
        ></span>

        <span
          className={`w-5 h-[2.9px] rounded-lg inline-block bg-secondary ${
            open ? "scale-0" : ""
          } duration-300`}
        ></span>

        <span
          className={`w-5 h-[2.9px] rounded-lg inline-block bg-secondary ${
            open ? "-rotate-45 -translate-y-2" : ""
          } duration-300`}
        ></span>
      </div>
    </button>
  );
};

export default NavButton;
