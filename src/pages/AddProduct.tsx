import React, { useState } from "react";
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
import ISImagePreviewer from "../components/ui/ImageUpload/ISImagePreviwer";
import { useNavigate } from "react-router-dom";

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
  productImages: string[];
  createdAt: string;
  updatedAt: string;
};

const AddProduct: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const navigate =useNavigate();
  const token = useAppSelector(useCurrentToken);
  const { data } = useGetMeQuery(token);
  const userId = data?.data?._id;
  const [createProduct] = useCreateProductMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    const { price, quantity, rating, ...restData } = data;

    const productData = {
      price: parseFloat(price),
      quantity: parseInt(quantity),
      rating: parseFloat(rating),
      ...restData,
      author: userId,
    };
    console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ productData:", productData)

    formData.append("data", JSON.stringify(productData));
    for (const file of imageFiles) {
      formData.append("images", file);
    }
    const toastId = toast.loading("Product creating in ...");
    try {
      await createProduct({ data: formData, token }).unwrap();
      toast.success("Product created successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate("/admin/dashboard/manage-products");
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
    <div className="mx-auto sm:p-8 p-5 my-2.5 bg-white rounded-xl border border-gray-200">
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

        <div className="grid grid-cols-1">
          <div className="flex gap-4 ">
            <FileInput
              setImageFiles={setImageFiles}
              setImagePreview={setImagePreview}
              label="Images"
              name="productImages"
              control={control}
              errors={errors?.productImage?.message as string}
            />
            <ISImagePreviewer
              className="flex flex-wrap gap-4 mt-6"
              setImageFiles={setImageFiles}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput
            label="Category"
            name="category"
            control={control}
            options={categoryOptions}
            errors={errors?.category?.message as string}
          />
          <Input
            label="Price"
            type="text"
            errors={errors?.price?.message as string}
            register={register("price", {
              required: { value: true, message: "Enter product price" },
            })}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Quantity"
            type="text"
            errors={errors?.quantity?.message as string}
            register={register("quantity", {
              required: { value: true, message: "Enter product quantity" },
            })}
          />
          <Input
            label="Rating"
            type="text"
            errors={errors?.rating?.message as string}
            register={register("rating", {
              required: { value: true, message: "Enter product rating" },
            })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-1 active:scale-95 cursor-pointer rounded-lg text-base font-medium hover:bg-blue-700 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
