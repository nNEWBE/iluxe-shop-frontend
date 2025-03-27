import { MdOutlinePayment } from "react-icons/md";
import Button from "../Button";
import { useCreateOrderMutation } from "../../../redux/api/order/orderApi";
import { IcartItem, placeOrder } from "../../../redux/features/cart/cartSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { toast } from "sonner";
import { ApiError } from "../../../error/error";
import { setCounter } from "../../../redux/features/counter/counterSlice";

interface ITotalAmountCard {
  totalPrice: number;
  totalQuantity: number;
  orderData: IcartItem[];
}

const TotalAmountCard: React.FC<ITotalAmountCard> = ({
  totalPrice,
  totalQuantity,
  orderData,
}) => {
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();
  console.log(orderData);
  const handlePlaceOrder = async () => {
    const toastId = toast.loading("Placing order...");

    try {
      await Promise.all(
        orderData.map(async (item) => {
          const createOrderData = {
            email: item?.email,
            product: item?.product,
            quantity: item?.quantity,
          };
          await createOrder(createOrderData).unwrap();
        })
      );

      dispatch(setCounter(1));
      dispatch(placeOrder());

      toast.success("Order placed successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: unknown) {
      console.error(error);
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as ApiError;
        toast.error(
          apiError?.data?.error?.details?.[0]?.message ||
            "Something went wrong",
          { id: toastId, duration: 2000 }
        );
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    }
  };

  return (
    <div className="my-3 sticky top-[6.5rem] sm:my-0 rounded-lg w-full bg-white border-[1px] border-gray-300 p-4">
      <div>
        <p className="font-berkshire text-xl">Order Summary</p>
      </div>
      <div className="text-secondary flex justify-between items-center">
        <p className="font-berkshire">Total Price</p>
        <p className="my-1">${totalPrice}</p>
      </div>
      <div className="text-secondary flex justify-between items-center">
        <p className="font-berkshire">Total Quantity</p>
        <p className="my-1">{totalQuantity}</p>
      </div>
      <div className="text-secondary flex justify-between items-center">
        <p className="font-berkshire">Delivery Charge</p>
        <p className="my-1">$0</p>
      </div>
      <hr className="my-3 border-[1px] border-gray-300" />
      <div>
        <p className="font-berkshire text-xl">Payment Summary</p>
      </div>
      <div className="text-secondary flex justify-between items-center mb-5">
        <p className="font-berkshire">Total Amount</p>
        <p className="my-1">${totalPrice}</p>
      </div>
      <Button
        onClick={handlePlaceOrder}
        text="Place Order"
        type="primary"
        icon={<MdOutlinePayment />}
      />
    </div>
  );
};

export default TotalAmountCard;