import React from "react";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit, reset } = useForm<Product>();

  const onSubmit = (data: Product) => {
    console.log("Product Added:", data);
    reset();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("author", { required: true })}
          type="text"
          placeholder="Author"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("brand", { required: true })}
          type="text"
          placeholder="Brand"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("category", { required: true })}
          type="text"
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("price", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("quantity", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Quantity"
          className="w-full p-2 border rounded"
        />
        <input
          {...register("productImage", { required: true })}
          type="text"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
