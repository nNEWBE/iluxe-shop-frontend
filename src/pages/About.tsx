import Accordian from "../components/ui/Accordian";
import Description from "../components/ui/Description";
import Title from "../components/ui/Title";
import team from "../assets/team.svg";
import qna from "../assets/accordian.svg";

const About = () => {
  return (
    <div className="my-10 overflow-hidden">
      <div className="mb-20">
        <Title word_1="about" word_2="us"></Title>
        <div className="flex lg:flex-row flex-col sm:gap-5 my-8 items-center mx-[10vw]">
          <Description
            title_1="Who"
            title_2="We"
            title_3="Are"
            description="At iLuxe, we believe that stationery is more than just paper and expression of creativity, organization, and personal
                style. We are a premium stationery brand dedicated to providing
                high-quality, stylish, and functional stationery products for stationery lovers alike."
          />
          <img
            data-aos="zoom-out-left"
            src={team}
            alt="team"
            className="lg:w-[30vw] w-[20rem]"
          />
        </div>
      </div>
      <div>
        <Title word_1="Q & A"></Title>
        <div className="mt-14 mx-[10vw] gap-10 justify-between items-center flex lg:flex-row flex-col-reverse">
          <img
            data-aos="zoom-out-right"
            src={qna}
            alt="team"
            className="lg:w-[20rem] sm:w-[18rem] w-[15rem]"
          />
          <div
            data-aos-anchor-placement="top-center"
            data-aos="zoom-out-left"
            className="lg:w-[30rem] w-full"
          >
            <Accordian />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
