import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import {
  IcartItem,
  removeFromCart,
  updateQuantity,
} from "../../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { toast } from "sonner";

interface Props {
  orderData: IcartItem;
}

const NavSidebarCard: React.FC<Props> = ({ orderData }) => {
  const [counter, setCounter] = useState(orderData?.quantity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCounter(orderData?.quantity);
  }, [orderData]);

  const handleCounter = (count: string) => {
    if (count === "plus") {
      dispatch(updateQuantity({ id: orderData?.product, quantity: counter + 1 }));
      setCounter(counter + 1);
    } else if (count === "minus" && counter > 1) {
      dispatch(updateQuantity({ id: orderData?.product, quantity: counter - 1 }));
      setCounter(counter - 1);
    }
  };
  const handleOrderDelete = () => {
    try {
      dispatch(removeFromCart(orderData?.product));
      toast.success("Removed from cart successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex w-full justify-between items-center mb-3 rounded-lg bg-white border-[1px] border-gray-300 p-4">
      <div className="flex gap-5 md:items-center">
        <div>
          <img
            className="w-32 md:h-20 h-full rounded-lg border-[1px] border-gray-300 object-cover"
            src={orderData?.image}
            alt=""
          />
        </div>
        <div className="text-secondary">
          <p className="font-berkshire">{orderData?.name}</p>
          <p className="my-1">${orderData?.price}</p>
          <div className="flex gap-2 items-center font-lobster">
            <button
              onClick={() => handleCounter("minus")}
              disabled={counter <= 1}
              className={`border-secondary p-[2px] rounded-sm border ${
                counter <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <FiMinus />
            </button>
            <p className="select-none">{counter}</p>
            <button
              disabled={counter >= orderData?.stock}
              onClick={() => handleCounter("plus")}
              className={`border-secondary ${
                counter >= orderData?.stock
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              } p-[2px] rounded-sm border`}
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={handleOrderDelete}
        className="p-1.5 cursor-pointer bg-primary transition-colors duration-500 hover:bg-gradient-to-r hover:from-primary hover:to-blue-900 rounded-full"
      >
        <MdDeleteOutline className="text-lg text-white" />
      </div>
    </div>
  );
};

export default NavSidebarCard;
