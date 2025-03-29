import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function VerifyOrderSkeleton() {
  return (
    <div className="container font-madimi mx-auto my-10 px-6 max-w-4xl">
      <div className="mb-10 flex justify-center">
        <SkeletonTheme baseColor={"#101828"} highlightColor={"#42495e"}>
          <Skeleton height={40} width={250} />
        </SkeletonTheme>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <SkeletonTheme
              key={index}
              baseColor={"#101828"}
              highlightColor={"#42495e"}
            >
              <div className="border-2 border-secondary rounded-lg shadow-md p-4 bg-white">
                <Skeleton height={24} width={150} className="mb-3" />
                <div className="flex flex-col gap-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex justify-between gap-2">
                        <Skeleton height={20} width={100} />
                        <Skeleton height={20} width={150} />
                      </div>
                    ))}
                </div>
              </div>
            </SkeletonTheme>
          ))}
        <div className="border-2 border-secondary rounded-lg shadow-md p-6 flex flex-col justify-center items-center bg-gray-100">
          <SkeletonTheme baseColor={"#101828"} highlightColor={"#42495e"}>
            <Skeleton circle height={40} width={40} className="mb-3" />
            <Skeleton height={24} width={120} className="mb-3" />
            <div className="flex justify-between gap-2 md:gap-10 mt-5 flex-wrap">
              <Skeleton height={40} width={130} />
              <Skeleton height={40} width={130} />
            </div>
          </SkeletonTheme>
        </div>
      </div>
    </div>
  );
}
