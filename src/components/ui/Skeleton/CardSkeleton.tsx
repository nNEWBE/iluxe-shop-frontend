import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CardSkeletonProps {
  cards: number;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ cards }) => {
  return Array.from({ length: cards }).map((_, index) => (
    <SkeletonTheme key={index} baseColor={"#e5e5e5"} highlightColor={"#f5f5f5"}>
      <div className=" bg-[#e5e5e5] overflow-hidden w-full rounded-xl border-2 border-[#e5e5e5]">
        <div className="pt-4 bg-white rounded-t-2xl mt-[1rem] flex flex-col">
          <div className="px-5  bg-white flex flex-col justify-between">
            <Skeleton className="mb-2" height={25} width="60%" />
            <div className="mt-2">
              <Skeleton height={120} borderRadius={"12px"} className="w-full" />
            </div>
          </div>

          <div className="mt-4">
            <Skeleton borderRadius={0} className="h-7" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  ));
};

export default CardSkeleton;
