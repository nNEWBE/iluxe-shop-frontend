import { Cursor, useTypewriter } from "react-simple-typewriter";

const NavTop = () => {
  const [text] = useTypewriter({
    words: [
      "GET YOUR INVITATION SAMPLE FREE TODAY",
      "ORDER YOUR CUSTOM STATIONERY SAMPLE FREE",
      "DESIGN YOUR BUSINESS CARD SAMPLE FREE",
      "TRY YOUR PERSONALIZED NOTE SAMPLE FREE",
      "GET YOUR GREETING CARD SAMPLE FREE",
    ],
    loop: true,
    typeSpeed: 120,
    delaySpeed: 80,
  });
  return (
    <div className="bg-primary sm:text-base text-[12px] sm:h-9 h-7 text-center pt-1 text-white font-madimi">
      <span className="sm:text-xl">
        <Cursor cursorStyle="≪" cursorBlinking={false}></Cursor>
      </span>{" "}
      {text}
      <span className="sm:text-xl">
        <Cursor cursorStyle="⨠" cursorBlinking={false}></Cursor>
      </span>
    </div>
  );
};

export default NavTop;
