import Slider from "../components/home/Banner/Slider";
import Branding from "../components/home/Branding/Branding";
import Testimonial from "../components/home/Testimonial/Testimonial";

const Home = () => {
  return (
    <div className="h-[200vh] bg-blue-50">
      <Slider />
      <Branding/>
      <Testimonial />
    </div>
  )
};

export default Home;