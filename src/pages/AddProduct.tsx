import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/ui/Input/Input";
import Title from "../components/ui/Title";
import SelectInput from "../components/ui/Input/Select";
import TextArea from "../components/ui/Input/TextArea";
import { categoryOptions } from "../components/ui/Filter/FilterUtils";
import FileInput from "../components/ui/Input/FileInput";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { useGetMeQuery } from "../redux/api/user/userApi";
import { useCreateProductMutation } from "../redux/api/product/productApi";
import { toast } from "sonner";
import { ApiError } from "../error/error";

export type Product = {
  _id: string;
  author: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  inStock: boolean;
  quantity: number;
  rating: number;
  productImage: string;
  createdAt: string;
  updatedAt: string;
};

const AddProduct: React.FC = () => {
  const token = useAppSelector(useCurrentToken);
  const [createProduct] = useCreateProductMutation();
  const { data } = useGetMeQuery(token);
  const userId = data?.data?._id;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    const { productImage, price, quantity, rating, ...restData } = data;

    const productData = {
      price: parseFloat(price),
      quantity: parseInt(quantity),
      rating: parseFloat(rating),
      ...restData,
      author: userId,
    };

    formData.append("data", JSON.stringify(productData));
    formData.append("file", productImage);
    const toastId = toast.loading("Product creating in");
    try {
      await createProduct({ data: formData, token }).unwrap();
      toast.success("Product created successfully", {
        id: toastId,
        duration: 2000,
      });
      reset();
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as ApiError;
        toast.error(
          apiError?.data?.error?.details?.[0]?.message ||
            "Something went wrong",
          {
            id: toastId,
            duration: 2000,
          }
        );
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 my-10 bg-white shadow-lg rounded-xl border border-gray-200">
      <Title word_1="Add" word_2="Product" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 font-madimi">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            type="text"
            errors={errors?.name?.message as string}
            register={register("name", {
              required: { value: true, message: "Enter product name" },
            })}
          />
          <Input
            label="Brand"
            type="text"
            errors={errors?.brand?.message as string}
            register={register("brand", {
              required: { value: true, message: "Enter brand name" },
            })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileInput
            label="Image"
            name="productImage"
            control={control}
            errors={errors?.productImage?.message as string}
          />

          <SelectInput
            label="Category"
            name="category"
            control={control}
            options={categoryOptions}
            errors={errors?.category?.message as string}
          />
        </div>

        <div>
          <TextArea
            label="Description"
            register={register("description", {
              required: { value: true, message: "Enter product description" },
            })}
            errors={errors?.description?.message as string}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Price"
            type="number"
            errors={errors?.price?.message as string}
            register={register("price", {
              required: { value: true, message: "Enter product price" },
            })}
          />
          <Input
            label="Quantity"
            type="number"
            errors={errors?.quantity?.message as string}
            register={register("quantity", {
              required: { value: true, message: "Enter product quantity" },
            })}
          />
          <Input
            label="Rating"
            type="number"
            errors={errors?.rating?.message as string}
            register={register("rating", {
              required: { value: true, message: "Enter product rating" },
            })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
