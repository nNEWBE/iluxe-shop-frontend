import underline from "../../assets/Underline.svg";
interface TitleProps {
  word_1: string;
  word_2?: string;
}
const Title: React.FC<TitleProps> = ({ word_1, word_2 }) => {
  return (
    <div>
      <div className="font-berkshire relative flex items-center flex-col text-3xl sm:text-4xl text-secondary">
        <h1 className="tracking-wider text-center">
          <span
            style={{ textShadow: "2px 2px #101828" }}
            className="font-protest text-primary"
          >
            {word_1.charAt(0).toUpperCase()}
          </span>
          {word_1.slice(1)}{" "}
          <span
            style={{ textShadow: "2px 2px #101828" }}
            className="font-protest text-primary"
          >
            {word_2?.charAt(0).toUpperCase()}
          </span>
          {word_2?.slice(1)}
        </h1>
        <img src={underline} alt="underline" className="w-60 absolute top-6" />
      </div>
    </div>
  );
};

export default Title;
