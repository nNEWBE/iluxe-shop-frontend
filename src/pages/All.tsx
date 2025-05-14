import ProductCard from "@/components/ui/Card/ProductCard";
import FilterSidebar from "../components/ui/Filter/FilterSidebar";
import SmallDeviceSidebar from "../components/ui/Filter/SmallDeviceSidebar";
import { Product } from "./AddProduct";
import { useGetAllProductsQuery } from "@/redux/api/product/productApi";
import { useSearchParams } from "react-router-dom";
import AMPagination from "@/components/ui/Pagination";
import ProductsSkeleton from "@/components/ui/Skeleton/ProductsSkeleton";

const ProductsPage =  () => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const category = searchParams.get("category");
  const brand= searchParams.get("brand");
  const price = searchParams.get("price");
  const search = searchParams.get("search");
    const params = new URLSearchParams();
    console.log("🚀 ~ ProductsPage ~ params:", params)
  
  const { data } = useGetAllProductsQuery(
    {
      page: page,
      limit: limit,
      query: {
        category: category,
        brand: brand,
        price: price,
        search: search
      },
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  
    const cardData = data?.data?.result;
    const metaData = data?.data?.meta;
    console.log("🚀 ~ ProductsPage ~ metaData:", metaData)

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-10">
      {/* Mobile & md Sidebar */}
      <div className="block lg:hidden mb-4">
        <SmallDeviceSidebar />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-[20rem]">
          <FilterSidebar />
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {cardData ? (
              cardData.length > 0 ? (
                cardData.map((product: Product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p className="font-medium mb-10 font-madimi text-black dark:text-white text-center col-span-full">
                  No Product Available!
                </p>
              )
            ) : (
              Array.from({ length: 6 }).map((_, index) => <ProductsSkeleton key={index} />)
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center md:justify-end mt-6">
            <AMPagination totalPage={metaData?.totalPage} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
