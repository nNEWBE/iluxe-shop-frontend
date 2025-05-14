/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Swiper, SwiperSlide } from "swiper/react";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

const ISCarousel = ({ images }: { images: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
      <div className="w-full max-w-3xl mx-auto">
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 "
        >
          {images?.map((img, idx: number) => (
            <SwiperSlide
              key={idx}
              className="relative w-full h-56 mx-auto flex items-center justify-center"
            >
              <img
                src={img}
                alt={`Product Image ${idx + 1}`}
                height={500}
                width={500}
                className=" object-contain h-[20rem] object-center rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper mt-5"
        >
          {images?.map((img, idx: number) => (
            <SwiperSlide key={idx} className="">
              <img
                src={img}
                alt={`Product Image ${idx + 1}`}
                height={100}
                width={100}
                className="object-contain h-20 border rounded-lg border-neutral-300 cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ISCarousel;
