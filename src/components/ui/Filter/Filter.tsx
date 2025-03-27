import { useGetAllProductsWithoutQueryQuery } from "../../../redux/api/product/productApi";
import { Product } from "../../home/FeaturedProducts/FeaturedProducts.types";
import InputSelect from "../Input/InputSelect";
import Range from "../Range";
import { categoryOptions, stockOptions } from "./FilterUtils";

interface FilterProps {
  isFilterOpen: boolean;
  isFullyHidden: boolean;
  setIsFiltering: (isFiltering: boolean) => void;
}

const Filter: React.FC<FilterProps> = ({ isFilterOpen, isFullyHidden,setIsFiltering }) => {
  const { data } = useGetAllProductsWithoutQueryQuery(undefined);
  const cardData = data?.data;

  return (
    <div
      className={`flex justify-center transition-all duration-500 ease-in-out 
            ${isFilterOpen ? "max-h-[600px]" : "max-h-0"}
            ${
              isFullyHidden
                ? "opacity-0 overflow-hidden"
                : "opacity-100 overflow-visible"
            }
            md:opacity-100 md:max-h-[400px] md:overflow-visible lg:sticky top-32`}
    >
      <div className="w-80 sm:w-[41rem] lg:w-64 rounded-xl border-2 border-secondary bg-secondary lg:h-[25rem] sm:h-[14rem] h-[25rem] flex items-center mx-5 md:mx-0">
        <div className="w-full flex flex-col sm:flex-row lg:flex-col bg-white rounded-xl h-[calc(100%-20px)]">
          <div className="w-full">
            <h3 className="text-center py-3 lg:w-[250px] rounded-t-xl font-berkshire text-secondary text-2xl">
              Filter
            </h3>
            <div className="mx-3 flex flex-col gap-3">
              <InputSelect setIsFiltering={setIsFiltering} options={categoryOptions} placeholder="Category" />
              <InputSelect setIsFiltering={setIsFiltering} options={stockOptions} placeholder="Stock" />
              <div className="border-2 border-secondary text-sm font-madimi text-[#bfbfbf] flex items-center gap-3 py-1.5 px-4 rounded-lg">
                <p>Price</p>
                <div className="w-full">
                  <Range
                    setIsFiltering={setIsFiltering}
                    min={
                      cardData?.length
                        ? Math.min(
                            ...cardData.map((product: Product) => product.price)
                          )
                        : 0
                    }
                    max={
                      cardData?.length
                        ? Math.max(
                            ...cardData.map((product: Product) => product.price)
                          )
                        : 120
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-center py-3 lg:w-[250px] font-berkshire text-secondary text-2xl">
              Search
            </h3>
            <div className="mx-3 flex flex-col gap-3">
              <InputSelect
                setIsFiltering={setIsFiltering}
                options={Array.from(
                  new Set(cardData?.map((item: Product) => item.name))
                ).map((name) => ({
                  label: name,
                  value: name,
                }))}
                placeholder="Name"
              />
              <InputSelect
                setIsFiltering={setIsFiltering}
                options={Array.from(
                  new Set(cardData?.map((item: Product) => item.brand))
                ).map((brand) => ({
                  label: brand,
                  value: brand,
                }))}
                placeholder="Brand"
              />
              <InputSelect
                setIsFiltering={setIsFiltering}
                options={Array.from(
                  new Set(
                    cardData?.map((item: Product) =>
                      JSON.stringify({
                        label: item.author.name,
                        value: item.author._id,
                      })
                    )
                  )
                ).map((author: unknown) => JSON.parse(author as string))}
                placeholder="Author"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
