interface DescriptionProps {
  title_1: string;
  title_2?: string;
  title_3: string;
  description: string;
  className?: string;
}
const Description: React.FC<DescriptionProps> = ({
  title_1,
  title_2,
  title_3,
  description,
  className,
}) => {
  return (
    <div data-aos="zoom-out-right" className={className}>
      <h1 className="sm:text-3xl text-xl font-berkshire">
        {title_1}{" "}
        <span
          style={{ textShadow: "1px 1px #101828" }}
          className="text-primary"
        >
          {title_2}
        </span>{" "}
        {title_3}
      </h1>
      <p className="font-madimi w-[90%] sm:mt-6 mt-3 text-sm sm:text-base ">
        {description}
      </p>
    </div>
  );
};

export default Description;
