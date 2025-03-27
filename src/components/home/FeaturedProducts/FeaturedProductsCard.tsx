import Card from "../../ui/Card/Card";
import CardSkeleton from "../../ui/Skeleton/CardSkeleton";
import { Product } from "./FeaturedProducts.types";

interface FeaturedProductsCardProps {
  data: Product[];
  isLoading: boolean;
  skeletonCount: number;
  cardShowCount: number;
  gap: string;
}

const FeaturedProductsCard: React.FC<FeaturedProductsCardProps> = ({
  data,
  isLoading,
  skeletonCount,
  cardShowCount,
  gap,
}) => {
  return (
    <div className={`mx-5 flex flex-wrap justify-center ${gap}`}>
      {isLoading ? (
        <CardSkeleton cards={skeletonCount} />
      ) : (
        data
          ?.slice(0, cardShowCount)
          .map((product: Product) => (
            <Card key={product._id} product={product} />
          ))
      )}
    </div>
  );
};

export default FeaturedProductsCard;
