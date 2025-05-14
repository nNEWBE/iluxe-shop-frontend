import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductsSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e5e5e5" highlightColor="#f5f5f5">
      <div className="w-full border border-gray-300 rounded-lg overflow-hidden font-madimi">
        <div className="flex flex-col md:flex-row gap-5 p-4">
          <div className="w-full md:w-1/3">
            <Skeleton height={208} className="rounded-lg w-full h-full" />
          </div>

          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div className="space-y-3">
              <Skeleton height={24} width="80%" />
              <Skeleton count={2} height={16} />
              <Skeleton height={20} width="30%" />
            </div>

            <div className="flex mt-4 flex-wrap gap-4 items-center justify-between">
              <Skeleton height={36} width={120} />
              <div className="flex items-center gap-2">
                <Skeleton circle height={18} width={18} />
                <Skeleton height={14} width={60} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ProductsSkeleton;
