import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/product/productApi";
import Title from "../components/ui/Title";
import "react-loading-skeleton/dist/skeleton.css";
import Button from "../components/ui/Button";
import { FaShoppingCart } from "react-icons/fa";
import { IoFlash } from "react-icons/io5";
import { FaTags } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import ViewDetailsSkeleton from "../components/ui/Skeleton/ViewDetailsSkeleton";
import { addToCart, selectCartItemQuantity } from "../redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "sonner";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { openDrawer } from "../redux/features/drawer/drawerSlice";

const ViewDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id as string);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const product = data?.data;
  const itemsQuantity = useAppSelector((state) =>
      selectCartItemQuantity(state, product?._id)
    );

  const handleAddToCart = () => {
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
  
  return (
    <div className="my-10 mx-auto max-w-4xl px-4">
      <Title word_1="Product" word_2="Details" />

      {isLoading ? (
        <ViewDetailsSkeleton />
      ) : product ? (
        <div className="mt-10 flex flex-col md:flex-row gap-10 bg-white shadow-lg p-3 sm:p-6 rounded-lg border-2 border-secondary">
          <div className="w-full relative md:w-1/2">
            <img
              src={product?.productImage}
              alt={product?.name}
              className="w-full max-h-[15rem] md:max-h-full  h-full border-2 border-secondary object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2">
              <Button varient="tag" text={product?.brand} icon={<FaTags />} />
            </div>
          </div>

          <div className="w-full font-madimi md:w-1/2 flex flex-col justify-between">
            <h2 className="text-2xl font-bold font-berkshire text-gray-800">
              {product?.name.split(" ").map((word: string, index: number) => (
                <span key={index}>
                  <span
                    style={{ textShadow: "1px 1px #101828" }}
                    className="text-primary"
                  >
                    {word.charAt(0)}
                  </span>
                  {word.slice(1)}{" "}
                </span>
              ))}
            </h2>

            <p className="mt-2 text-gray-700">{product?.description}</p>
            <p
              style={{ textShadow: "1px 1px #101828" }}
              className="text-primary font-righteous text-xl font-semibold"
            >
              ${product?.price}
            </p>
            <p
              className={`text-sm font-semibold ${
                product?.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product?.inStock ? `${product?.quantity} Left In Stock` : "Out of Stock"}
            </p>
            <div className="flex items-center gap-1 text-lg text-gray-600">
              <BiSolidCategory />
              <p>{product?.category}</p>
            </div>
            <div className="mt-4 p-4 border-2 border-secondary bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-700">Seller Info:</h3>
              <p className="text-gray-600">Name: {product?.author?.name || "N/A"}</p>
              <p className="text-gray-600">Email: {product?.author?.email || "N/A"}</p>
              <p className="text-gray-600">
                Role: {product?.author?.role || "N/A"}{" "}
                {product?.author?.isBlocked && "(Blocked)"}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-4">
              <Button onClick={handleAddToCart} text="Add to Cart" icon={<FaShoppingCart />} />
              <Button onClick={()=>dispatch(openDrawer())} type="secondary" text="Buy Now" icon={<IoFlash />} />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500 mt-10">Product not found.</p>
      )}
    </div>
  );
};

export default ViewDetails;
