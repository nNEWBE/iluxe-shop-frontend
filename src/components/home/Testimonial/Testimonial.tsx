import Description from "../../ui/Description";
import Title from "../../ui/Title";
import TestimonialSlider from "./TestimonialSlider";

const Testimonial = () => {
  return (
    <div className="my-10">
      <Title word_1={"user"} word_2={"reviews"} />
      <div className="flex lg:flex-row flex-col md:items-center">
        <div className="mt-10 ml-[6vw] mr-[2vw]">
          <Description
            title_1="What Our"
            title_2="Customers"
            title_3="Are Saying"
            description="Hear from our satisfied customers! Read authentic testimonials
              showcasing experiences, trust, and success stories with our
              products and services."
          />
        </div>
        <TestimonialSlider />
      </div>
    </div>
  );
};

export default Testimonial;
