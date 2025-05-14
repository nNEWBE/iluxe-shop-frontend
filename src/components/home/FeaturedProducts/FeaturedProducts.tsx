import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../redux/api/product/productApi";
import Title from "../../ui/Title";
import Button from "../../ui/UiButton";
import FeaturedProductsCard from "./FeaturedProductsCard";
import { LuExternalLink } from "react-icons/lu";

const FeaturedProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery({
    page: "1",
    limit: "10",
  });
  const cardData = data?.data?.result;
  const skeletonCount = data?.data?.result?.length || 10;

  return (
    <div className="my-10">
      <Title word_1="Featured" word_2="Products" />

      <FeaturedProductsCard
        gap="gap-5"
        data={cardData}
        isLoading={isLoading}
        skeletonCount={skeletonCount}
        cardShowCount={cardData?.length}
      />

      <div className="relative mt-10 md:h-[9rem] h-[7rem]">
        <div className="absolute z-[2] top-16 flex w-full justify-center">
          <div className="flex justify-center mt-2 w-[10rem]">
            <Link to="/products">
              <Button icon={<LuExternalLink />} text={"View All"} />
            </Link>
          </div>
        </div>

        <div className="absolute top-0 md:h-[9rem] h-[7rem] w-full overflow-y-hidden opacity-30">
          <FeaturedProductsCard
            gap="gap-5"
            data={cardData}
            isLoading={isLoading}
            skeletonCount={5}
            cardShowCount={5}
          />
        </div>
        <div className="absolute top-0 z-[1] md:h-[9rem] h-[7rem] w-full bg-[linear-gradient(180deg,_rgba(255,255,255,0)_0%,_rgba(255,255,255,.7)_50%,_rgba(255,255,255,1))] transition-colors duration-0 "></div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
