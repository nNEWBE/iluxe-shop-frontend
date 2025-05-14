import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/pages/AddProduct";
import { formatDistanceToNow } from "date-fns";
import { Clock4 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../UiButton";
import { FaCartShopping } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  selectCartItemQuantity,
} from "@/redux/features/cart/cartSlice";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const timeAgo = formatDistanceToNow(new Date(product.createdAt), {
    addSuffix: true,
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const itemsQuantity = useAppSelector((state) =>
    selectCartItemQuantity(state, product?._id)
  );

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return toast.error("Please login first");
    }
    try {
      if (product?.quantity < itemsQuantity + 1) {
        return toast.error("Insufficient stock");
      }
      const orderData = {
        product: product?._id,
        name: product?.name,
        price: product?.price,
        quantity: 1,
        stock: product?.quantity,
        image: product?.productImages[0],
        email: user?.userId,
      };
      dispatch(addToCart(orderData));
      toast.success("Added to cart successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="relative w-full font-madimi py-0 mx-auto border border-gray-300 rounded-lg overflow-hidden">
      <CardContent className="flex flex-col md:flex-row gap-5 p-4 ">
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <Link
            to={`/product/${product._id}`}
            className="block w-full h-64 md:h-52"
          >
            <img
              src={product.productImages[0]}
              alt="Product Image"
              width={250}
              height={250}
              className="w-full h-full object-cover rounded-lg"
            />
          </Link>
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <Link to={`/product/${product._id}`} className="flex-1">
                <h2 className="text-lg md:text-xl font-semibold text-black break-words">
                  {product.name.length > 40
                    ? product.name.slice(0, 40) + "..."
                    : product.name}
                </h2>
              </Link>
            </div>

            <p className="text-gray-600 text-sm md:text-base line-clamp-3">
              {product.description}
            </p>
            <p className="text-lg font-bold text-primary">$ {product.price}</p>
          </div>

          <div className="flex mt-4 flex-wrap gap-4 items-center justify-between">
            <div>
              <Button
                onClick={handleAddToCart}
                text="Add to Cart"
                icon={<FaCartShopping />}
              />
            </div>
            <div className=" flex justify-end items-center text-sm text-gray-600 ">
              <div className="flex items-center gap-1">
                <Clock4 size={18} />
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
