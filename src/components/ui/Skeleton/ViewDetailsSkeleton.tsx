import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ViewDetailsSkeleton = () => {
  return (
    <SkeletonTheme baseColor={"#101828"} highlightColor={"#42495e"}>
      <div className="mt-10 flex flex-col md:flex-row gap-10 bg-white shadow-lg p-3 sm:p-6 rounded-lg border-2 border-secondary">
        <div className="w-full relative md:w-1/2">
          <Skeleton
            className="sm:h-[30vw] h-[10rem] md:h-full"
            borderRadius={"12px"}
            width="100%"
          />
        </div>

        <div className="w-full font-madimi md:w-1/2 flex flex-col justify-between">
          <Skeleton width="50%" height="1rem" className="mb-1.5" />
          <Skeleton width="90%" height="1rem" className="mb-1.5" />
          <Skeleton width="30%" height="1rem" className="mb-1.5" />
          <Skeleton width="27%" height="1rem" className="mb-1.5" />
          <Skeleton width="45%" height="1rem" />
          <div className="border-2 border-secondary p-3 my-4 rounded-xl">
            <Skeleton count={4} height="1rem" />
          </div>
          <div className="flex flex-wrap gap-4">
            <Skeleton width="100px" height="30px" />
            <Skeleton width="100px" height="30px" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ViewDetailsSkeleton;
