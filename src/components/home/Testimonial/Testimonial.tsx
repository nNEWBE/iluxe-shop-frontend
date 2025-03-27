import Title from "../../ui/Title";
import TestimonialContent from "./TestimonialContent";
import TestimonialSlider from "./TestimonialSlider";

const Testimonial = () => {
  return (
    <div className="my-10">
      <Title word_1={"user"} word_2={"reviews"} />
      <div className="flex lg:flex-row flex-col md:items-center">
        <TestimonialContent />
        <TestimonialSlider />
      </div>
    </div>
  );
};

export default Testimonial;
