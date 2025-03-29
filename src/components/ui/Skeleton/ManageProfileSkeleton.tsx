import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageProfileSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <SkeletonTheme baseColor={"#101828"} highlightColor={"#42495e"}>
        <div className="flex justify-center">
          <Skeleton height={40} width={200} className="my-10" />
        </div>
        <div className="bg-white shadow-md border-2 border-secondary rounded-lg p-6">
          <div className="flex flex-col gap-5 sm:flex-row items-center justify-between">
            <div className="flex sm:text-start text-center flex-col sm:flex-row items-center gap-4 font-madimi text-gray-500">
              <Skeleton circle width={96} height={96} />
              <div>
                <Skeleton height={30} width={110} className="mb-2" />
                <Skeleton height={20} width={150} />
                <div className="flex items-center sm:justify-start justify-center mt-2 gap-2">
                  <Skeleton height={24} width={60} />
                  <Skeleton height={24} width={60} />
                </div>
              </div>
            </div>
            <Skeleton height={20} width={50} />
          </div>
        </div>
        <div className="bg-white shadow-md border-2 border-secondary rounded-lg font-madimi p-6 mt-6">
          <Skeleton height={25} width={200} className="mb-4" />
          <div className="grid sm:grid-cols-2 sm:gap-4 gap-1">
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
            <Skeleton height={20} width={150} />
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default ManageProfileSkeleton;
