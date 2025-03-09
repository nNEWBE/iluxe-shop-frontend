import comma from "../../../assets/commas.svg";

const TestimonialBg = () => {
  return (
    <div className="sm:flex justify-center z-1 sm:z-0 w-full absolute -top-6 ">
      <div className="relative h-[19rem] w-full opacity-85">
        <img
          className="w-32 absolute top-0 sm:left-0 -left-5 rotate-180 fill-amber-300"
          src={comma}
          alt="comma"
        />
        <img
          className="w-32 absolute bottom-0 right-0 hidden sm:block"
          src={comma}
          alt="comma"
        />
      </div>
    </div>
  );
};

export default TestimonialBg;
