import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ViewDetailsSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e5e5e5" highlightColor="#f5f5f5">
      <div className="mt-10 flex flex-col md:flex-row gap-10 bg-white p-3 sm:p-6 rounded-lg border-2 border-[#e5e5e5]">
        {/* Left: Image and thumbnails */}
        <div className="w-full md:w-1/2">
          <Skeleton height="300px" borderRadius="12px" />

          <div className="flex gap-3 mt-3">
            <Skeleton height="80px" width="80px" borderRadius="12px" />
            <Skeleton height="80px" width="80px" borderRadius="12px" />
            <Skeleton height="80px" width="80px" borderRadius="12px" />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2 font-madimi flex flex-col justify-between">
          <div className="space-y-2">
            <Skeleton width="50%" height="16px" />
            <Skeleton width="90%" height="16px" />
            <Skeleton width="30%" height="16px" />
            <Skeleton width="27%" height="16px" />
            <Skeleton width="45%" height="16px" />
          </div>

          <div className="border-2 border-[#e5e5e5] p-3 my-4 rounded-xl">
            <Skeleton count={4} height="14px" />
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
