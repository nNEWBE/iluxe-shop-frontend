import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../redux/api/product/productApi";
import Title from "../../ui/Title";
import Button from "../../ui/Button";
import FeaturedProductsCard from "./FeaturedProductsCard";
import { LuExternalLink } from "react-icons/lu";

const FeaturedProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery(undefined);
  const cardData = data?.data?.result;
  const skeletonCount = data?.data?.result?.length || 6;

  return (
    <div className="my-10">
      <Title word_1="Featured" word_2="Products" />

      <FeaturedProductsCard
        gap="gap-10"
        data={cardData}
        isLoading={isLoading}
        skeletonCount={skeletonCount}
        cardShowCount={cardData?.length}
      />

      <div className="relative mt-5 md:mt-10 h-[15rem]">
        <div className="absolute z-[2] top-16 flex w-full justify-center">
          <div className="flex justify-center mt-2 w-[10rem]">
            <Link to="/products">
              <Button icon={<LuExternalLink />} text={"View All"} />
            </Link>
          </div>
        </div>

        <div className="absolute top-0 h-[15rem] w-full overflow-y-hidden opacity-30">
          <FeaturedProductsCard
            gap="gap-10"
            data={cardData}
            isLoading={isLoading}
            skeletonCount={3}
            cardShowCount={3}
          />
        </div>
        <div className="absolute top-0 z-[1] h-[15rem] w-full bg-[linear-gradient(180deg,_rgba(255,255,255,0)_0%,_rgba(255,255,255,.7)_50%,_rgba(255,255,255,1))] transition-colors duration-0 "></div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
