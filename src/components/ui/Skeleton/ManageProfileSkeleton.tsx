import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageProfileSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e5e5e5" highlightColor="#f5f5f5">
      <div className="w-full overflow-x-auto">
          <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
            <div className="flex gap-5 items-center justify-between">
              <div className="flex text-start items-center gap-4 font-madimi text-gray-500">
                <Skeleton circle width={96} height={96} />
                <div>
                  <h2 className="text-2xl text-secondary font-berkshire font-semibold mb-1">
                    <Skeleton width={150} />
                  </h2>
                  <p>
                    <Skeleton width={120} />
                  </p>
                  <div className="flex items-center justify-start mt-1 gap-2">
                    <Skeleton width={60} height={24} />
                    <Skeleton width={60} height={24} />
                  </div>
                </div>
              </div>
              <Skeleton width={40} height={40} />
            </div>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg font-madimi p-6">
            <h3 className="text-lg font-semibold mb-4 font-berkshire">
              <Skeleton width={180} />
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="flex gap-2">
                  <Skeleton width={60} />
                  <Skeleton width={120} />
                </div>
              ))}
            </div>
          </div>
        </div>
    </SkeletonTheme>
  );
};

export default ManageProfileSkeleton;
