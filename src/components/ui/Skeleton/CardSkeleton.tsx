import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CardSkeletonProps {
  cards: number;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ cards }) => {
  return Array.from({ length: cards }).map((_, index) => (
    <SkeletonTheme key={index} baseColor={"#101828"} highlightColor={"#42495e"}>
      <div className="sm:h-[26rem] bg-secondary overflow-hidden w-[20rem] rounded-xl border-2 border-secondary">
        <div className="pt-4 bg-white rounded-t-2xl sm:h-[25rem] w-full mt-[1rem] flex flex-col">
          <div className="px-5 h-full bg-white flex flex-col justify-between">
            <Skeleton height={30} width="60%" />

            <div className="mt-2">
              <Skeleton height={160} borderRadius={"12px"} className="w-full" />
            </div>

            <div className="flex flex-wrap gap-5 items-center justify-between mt-5">
              <div>
                <Skeleton height={20} width={100} />
                <Skeleton height={20} width={80} />
              </div>

              <div className="flex gap-2 items-center">
                <Skeleton height={30} width={30} />
                <Skeleton height={30} width={40} />
                <Skeleton height={30} width={30} />
              </div>
            </div>

            <div className="flex sm:mt-0 mt-10 flex-wrap gap-5 justify-between mb-4">
              <Skeleton height={30} width={120} />
              <Skeleton height={30} width={80} />
            </div>
          </div>

          <div>
            <Skeleton borderRadius={0} width="100%" className="lg:h-10 h-8" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  ));
};

export default CardSkeleton;
