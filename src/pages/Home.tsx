import FeaturesSection from "@/components/home/FeaturedSection/FeaturedSection";
import Slider from "../components/home/Banner/Slider";
import Branding from "../components/home/Branding/Branding";
import FeaturedProducts from "../components/home/FeaturedProducts/FeaturedProducts";
import Testimonial from "../components/home/Testimonial/Testimonial";
import SmartTVBanner from "@/components/home/FeaturedSection/SmartTVBanner";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Slider />
      <Branding/>
      <FeaturedProducts />
      <SmartTVBanner />
      <FeaturesSection />
      <Testimonial />
    </div>
  )
};

export default Home;