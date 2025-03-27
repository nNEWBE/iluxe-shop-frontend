import Slider from "../components/home/Banner/Slider";
import Branding from "../components/home/Branding/Branding";
import FeaturedProducts from "../components/home/FeaturedProducts/FeaturedProducts";
import Testimonial from "../components/home/Testimonial/Testimonial";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Slider />
      <Branding/>
      <FeaturedProducts />
      <Testimonial />
    </div>
  )
};

export default Home;