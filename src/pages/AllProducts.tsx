import { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import FeaturedProductsCard from "../components/home/FeaturedProducts/FeaturedProductsCard";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";
import { useGetAllProductsQuery } from "../redux/api/product/productApi";
import Filter from "../components/ui/Filter/Filter";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  clearParams,
  selectParams,
  setParams,
} from "../redux/features/filter/filterSlice";
import { RiResetLeftFill } from "react-icons/ri";
import { ConfigProvider, Pagination, Spin } from "antd";
import noProducts from "../assets/noProducts.svg";
import { animateScroll } from "react-scroll";

const AllProducts = () => {
  const params = useAppSelector(selectParams);
  const dispatch = useAppDispatch();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFullyHidden, setIsFullyHidden] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  const { data, isLoading } = useGetAllProductsQuery(params, {
    refetchOnMountOrArgChange: true,
  });
  console.log("🚀 ~ AllProducts ~ data:", data)

  const cardData = data?.data?.result;
  const metaData = data?.data?.meta;
  const skeletonCount = cardData?.length || 6;
  const currentPage = metaData?.page || 1;
  const options = {
    duration: 0,
    smooth: "easeInOutQuint",
  };

  useEffect(() => {
    if (isFilterOpen) {
      setIsFullyHidden(false);
    } else {
      const timer = setTimeout(() => setIsFullyHidden(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isFilterOpen]);

useEffect(() => {
  const isLargeScreen = window.innerWidth >= 1024;

  if (isFiltering) {
    if (isLargeScreen) {
      animateScroll.scrollToTop({
        duration: 0,
        smooth: "easeInOutQuint",
      });
    }

    setTimeout(() => setIsFiltering(false), 1000);
  }
}, [isFiltering]);


  const handleFilterChange = (key: string, value: string) => {
    setIsFiltering(true);
    dispatch(setParams([{ key, value }]));
  };

  return (
    <div className="relative my-10">
      <Title word_1="all" word_2="products" />

      <div className="flex justify-center md:justify-end">
        <div
          className={`flex transition-all duration-500 ease-in-out
            ${isFilterOpen ? "" : "translate-x-[122px]"}
            ${
              isFullyHidden
                ? "opacity-0 overflow-hidden"
                : "opacity-100 overflow-visible"
            }
           justify-end md:opacity-100 md:-translate-x-0 m-5 ml-10 sm:ml-28 md:mx-28`}
        >
          <Button
            onClick={() => {
              setIsFiltering(true);
              dispatch(clearParams());
            }}
            text={"Reset"}
            icon={<RiResetLeftFill />}
          />
        </div>
        <div className="flex justify-end md:hidden m-5 mr-10 sm:mr-28">
          <Button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            text={"Filter"}
            icon={<FiFilter />}
          />
        </div>
      </div>

      <div className="flex lg:flex-row gap-10 lg:gap-0 flex-col lg:mx-8">
        <Filter
          setIsFiltering={setIsFiltering}
          isFilterOpen={isFilterOpen}
          isFullyHidden={isFullyHidden}
        />

        {isFiltering ? (
          <div className="flex justify-center items-center w-full h-60">
            <Spin size="large" />
          </div>
        ) : cardData?.length !== 0 ? (
          <FeaturedProductsCard
            gap="gap-5"
            data={cardData}
            isLoading={isLoading}
            skeletonCount={skeletonCount}
            cardShowCount={cardData?.length}
          />
        ) : (
          <div className="flex mb-10 mt-20 lg:mt-0 md:mb-0 justify-center w-full flex-col items-center gap-5">
            <img className="w-20" src={noProducts} alt="no products" />{" "}
            <p className="font-lobster text-2xl ">No products found</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-10 mb-5">
        {cardData?.length !== 0 ? (
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "Madimi One",
                colorBgTextHover: "#1677ff",
                colorBgTextActive: "#1677ff",
              },
            }}
          >
            <Pagination
              style={{
                borderLeft: "5px solid #1677ff",
                borderRight: "5px solid #1677ff",
                borderTop: "1px solid #1677ff",
                borderBottom: "1px solid #1677ff",
                padding: "8px",
                borderRadius: "10px",
                background: "#101828",
              }}
              pageSize={6}
              current={currentPage}
              defaultCurrent={1}
              total={metaData?.total || 0}
              onChange={(page) => {
                animateScroll.scrollToTop(options);
                handleFilterChange("page", `${page}`);
              }}
            />
          </ConfigProvider>
        ) : null}
      </div>
    </div>
  );
};

export default AllProducts;
