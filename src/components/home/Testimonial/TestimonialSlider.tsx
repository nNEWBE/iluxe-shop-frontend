/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/navigation";
import "../../../styles/style.css";
import { PaginationOptions } from "swiper/types";
import { Rating } from "@fluentui/react-components";
import TestimonialBg from "./TestimonialBg";
import { testimonials } from "./TestimonialUtils";

const TestimonialSlider = () => {
  const pagination: PaginationOptions = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <div className="lg:mt-16 sm:mt-10 mt-3 relative lg:mr-10">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 5000,
        }}
        pagination={pagination}
        modules={[Autoplay, Pagination]}
        className="mySwiper sm:shadow-none shadow-xl w-[90vw] sm:w-[35rem] md:w-[40rem] h-full sm:h-[16rem] rounded-xl"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.key}>
            <div className="flex gap-4 border-[1px] border-secondary flex-col sm:flex-row h-full shadow-xl bg-white items-center px-5 sm:w-[82%] rounded-xl mx-auto border-t-8 border-t-primary sm:border-t-[1px] sm:border-t-secondary sm:border-x-8 sm:border-x-primary pb-16 pt-5 sm:pt-0 md:pb-5 sm:pb-5">
              <img
                className="sm:size-28 size-20 rounded-full"
                src={testimonial.userImage}
                alt={testimonial.username}
              />
              <div>
                <h1 className="sm:text-xl text-lg font-berkshire">
                  {testimonial.username}
                </h1>
                <Rating
                  size="large"
                  step={0.5}
                  color="marigold"
                  value={testimonial.rating}
                  className="pointer-events-none my-2"
                />
                <p className="sm:text-base text-sm font-madimi">
                  {testimonial.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <TestimonialBg />
    </div>
  );
};

export default TestimonialSlider;
