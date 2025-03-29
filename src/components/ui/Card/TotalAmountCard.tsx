import { MdOutlinePayment } from "react-icons/md";
import Button from "../Button";
import { useCreateOrderMutation } from "../../../redux/api/order/orderApi";
import { IcartItem, placeOrder } from "../../../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toast } from "sonner";
import { ApiError } from "../../../error/error";
import { setCounter } from "../../../redux/features/counter/counterSlice";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { useGetMeQuery } from "../../../redux/api/user/userApi";
import { useNavigate } from "react-router-dom";

interface ITotalAmountCard {
  totalPrice: number;
  totalQuantity: number;
  orderData: IcartItem[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  phone?: string;
  address?: string;
  city?: string;
  isBlocked: boolean;
}

const TotalAmountCard: React.FC<ITotalAmountCard> = ({
  totalPrice,
  totalQuantity,
  orderData,
}) => {
  const token = useAppSelector(useCurrentToken);
  const { data } = useGetMeQuery(token);
  const userData: IUser = data?.data;
  const userId = userData?._id;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createOrder] = useCreateOrderMutation();
  const handlePlaceOrder = async () => {
    if (userData?.role === "admin") {
      return toast.error("You are not allowed to place an order", {
        duration: 2000,
      });
    }
    if (
      userData?.address === "N/A" ||
      userData?.city === "N/A" ||
      userData?.phone === "N/A"
    ) {
      toast.error("Please update your profile", { duration: 2000 });
      navigate("user/dashboard/manage-profile");
      return;
    }

    const toastId = toast.loading("Placing order");
    const createOrderData = {
      user: userId,
      products: orderData.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      totalPrice,
    };
    try {
      const response = await createOrder({data:createOrderData,token}).unwrap();
      console.log("🚀 ~ handlePlaceOrder ~ response:", response);
      if (response?.data) {
        window.location.href = response?.data;
      }

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
