import { Rating } from "@fluentui/react-components";
import { FaCartShopping, FaCircle } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CardProps } from "../../home/FeaturedProducts/FeaturedProducts.types";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  addToCart,
  selectCartItemQuantity,
} from "../../../redux/features/cart/cartSlice";
import { toast } from "sonner";
import {
  decrement,
  increment,
  selectCounter,
} from "../../../redux/features/counter/counterSlice";

const Card: React.FC<CardProps> = ({ product }) => {
  const counter = useAppSelector((state) => selectCounter(state, product?._id));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const itemsQuantity = useAppSelector((state) =>
    selectCartItemQuantity(state, product?._id)
  );

  const handleCreateOrder = () => {
    if (!user) {
      navigate("/login");
      return toast.error("Please login first");
    }
    try {
      if (product?.quantity < itemsQuantity + counter) {
        return toast.error("Insufficient stock");
      }
      const orderData = {
        product: product?._id,
        name: product?.name,
        price: product?.price,
        quantity: counter,
        stock: product?.quantity,
        image: product?.productImage,
        email: user?.userId,
      };
      dispatch(addToCart(orderData));
      toast.success("Added to cart successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleCounter = (count: string) => {
    if (count === "plus" && counter < product?.quantity) {
      dispatch(increment(product?._id));
    } else if (count === "minus" && counter > 1) {
      dispatch(decrement(product?._id));
    }
  };

  return (
    <div>
      <div
        data-aos="fade-up"
        data-aos-easing="ease-in-back"
        data-aos-anchor-placement="top-bottom"
        className="sm:h-[26rem] overflow-hidden border-2 border-primary shadow-xl md:w-[20rem] rounded-xl bg-primary"
      >
        <div
          data-aos="fade-up"
          data-aos-easing="ease-in-back"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="200"
          className="pt-4 rounded-t-2xl text-white sm:h-[25rem] w-full mt-[1rem] bg-secondary flex flex-col"
        >
          <div className="px-5 h-full flex flex-col justify-between">
            <h1 className="text-2xl text-center font-berkshire">
              {product?.name}
            </h1>
            <div className="border-2 border-primary mt-4 rounded-xl overflow-hidden">
              <img
                className="h-[10rem] rounded-xl duration-500 hover:scale-110 object-cover w-[275px] mx-auto"
                src={product?.productImage}
                alt={product?.name}
              />
            </div>
            <div className="flex-grow">
              <div className="flex flex-wrap gap-5 items-center justify-between mt-5">
                <div>
                  <div className="font-madimi">
                    {product?.inStock ? (
                      <p className="text-green-500">
                        <FaCircle className="w-[5px] inline mr-1" />
                        In Stock
                      </p>
                    ) : (
                      <p className="text-red-500">
                        <FaCircle className="w-[5px] inline mr-1" />
                        Out of Stock
                      </p>
                    )}
                  </div>
                  <Rating
                    size="large"
                    step={0.5}
                    color="marigold"
                    value={product?.rating}
                    className="pointer-events-none"
                  />
                </div>

                <div className="flex justify-center gap-2 items-center text-base font-lobster text-primary">
                  <button
                    onClick={() => handleCounter("minus")}
                    disabled={counter <= 1}
                    className={`border-primary p-1 rounded-sm border text-primary ${
                      counter <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <FiMinus />
                  </button>
                  <p className="select-none">{counter}</p>
                  <button
                    disabled={
                      counter >= product?.quantity ||
                      product?.quantity < itemsQuantity + counter + 1
                    }
                    onClick={() => handleCounter("plus")}
                    className={`border-primary p-1 rounded-sm border text-primary ${
                      counter >= product?.quantity ||
                      product?.quantity < itemsQuantity + counter + 1
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex sm:mt-0 mt-10 flex-wrap gap-5 justify-between font-madimi items-center mb-5">
              <Link to={`/product/${product?._id}`}>
                <Button
                  icon={<IoIosArrowRoundForward />}
                  text={"View Details"}
                />
              </Link>
              <div>
                <Button varient="tag" text={`Price: ${product?.price}$`} />
              </div>
            </div>
          </div>

          <div
            onClick={handleCreateOrder}
            className="flex items-center justify-center gap-3 cursor-pointer py-1 uppercase text-sm sm:text-base font-madimi bg-primary text-white text-center"
          >
            <p>Add to Cart</p>
            <FaCartShopping />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
