import React from "react";
import { Carousel } from "antd";
import SliderContent from "./SliderContent";
import { images } from "./SliderUtils";


const Slider: React.FC = () => {
  return (
    <div className="relative">
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
        {images.map((image) => (
          <div key={image.key}>
            <div
              className={`w-full h-[400px] brightness-70 md:h-[500px] lg:h-[600px] bg-cover md:bg-contain  bg-center bg-transparent `}
              style={{
                height: "82vh",
                color: "#fff",
                lineHeight: "160px",
                textAlign: "center",
                backgroundImage: `url(${image.img})`,
              }}
            />
          </div>
        ))}
      </Carousel>

      <SliderContent />
    </div>
  );
};

export default Slider;
