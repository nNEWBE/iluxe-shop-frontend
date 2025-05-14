import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Button from "../UiButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback} from "react";
import { useGetAllProductsWithoutQueryQuery } from "@/redux/api/product/productApi";
import { Product } from "@/pages/AddProduct";

export default function FilterSidebar() {
  const [price, setPrice] = useState([0]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useGetAllProductsWithoutQueryQuery(undefined);
  const cardData: Product[] = data?.data || [];

  const handleSearchQuery = (key: string, value: string | number) => {
    const params = new URLSearchParams(location.search);
    params.set(key, value.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  const uniqueBrands = Array.from(
    new Map(cardData.map((item) => [item.brand, item])).values()
  );

  const uniqueCategories = Array.from(
    new Map(cardData.map((item) => [item.category, item])).values()
  );

  const handleClearAll = useCallback(() => {
    navigate(location.pathname);
    setPrice([0]);
    setSelectedBrand(null);
  }, [navigate, location.pathname]);

//  useEffect(() => {
//    const navigationEntries = performance.getEntriesByType(
//      "navigation"
//    ) as PerformanceNavigationTiming[];

//    const isPageReload =
//      navigationEntries.length > 0
//        ? navigationEntries[0].type === "reload"
//        : performance.navigation.type === 1;

//    if (isPageReload) {
//      handleClearAll();
//    }
//  }, [handleClearAll]);

  return (
    <div className="p-6 border mb-5 border-gray-300 font-madimi rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Filter
        </h2>
        <Button onClick={handleClearAll} text="Clear Filters" />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Price</h2>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>TK 0</span>
          <span>TK 100</span>
        </div>
        <Slider
          max={100}
          step={1}
          value={price}
          onValueChange={(value) => {
            setPrice(value);
            handleSearchQuery("price", value[0]);
          }}
          className="w-full bg-black h-2 rounded-full"
        />
        <p className="text-sm mt-2">Selected Price: Tk {price[0]}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Product Category</h2>
        <RadioGroup
          value={selectedBrand ?? ""}
          onValueChange={(value) => {
            setSelectedBrand(value);
            handleSearchQuery("category", value);
          }}
        >
          <div className="space-y-3">
            {uniqueCategories.map((item) => (
              <div key={item._id} className="flex items-center space-x-2">
                <RadioGroupItem value={item.category} id={item.category} />
                <Label
                  htmlFor={item.category}
                  className="text-gray-500 dark:text-white cursor-pointer font-light"
                >
                  {item.category}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Product Brand</h2>
        <RadioGroup
          value={selectedBrand ?? ""}
          onValueChange={(value) => {
            setSelectedBrand(value);
            handleSearchQuery("brand", value);
          }}
        >
          <div className="space-y-3">
            {uniqueBrands.map((item) => (
              <div key={item._id} className="flex items-center space-x-2">
                <RadioGroupItem value={item.brand} id={item.brand} />
                <Label
                  htmlFor={item.brand}
                  className="text-gray-500 dark:text-white cursor-pointer font-light"
                >
                  {item.brand}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
