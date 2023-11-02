import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useInventoryService from "../../hooks/useInventoryService";

const EditProductForm = ({ product, role }) => {
  const user = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const inventoryService = useInventoryService();

  const handleEditProduct = async (data) => {
    try {
      // console.log(data);
      data.id = product.id;
      data.image = product.image;

      let formData = { product: data, user: user };
      const response = await axios.put(`/api/product/${product.id}`, formData);
      console.log("Product edited successfully:", response.data);
      inventoryService.initProducts();
    } catch (error) {
      console.error("Product editing failed:", error.response.data);
    } finally {
      reset();
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <main className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(handleEditProduct)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            {...register("name", { required: "Product Name is required" })}
            defaultValue={product.name}
            disabled={role === "staff"}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            id="name"
            type="text"
            placeholder="Product Name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            {...register("price", {
              required: "Product Price is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Enter a valid price",
              },
            })}
            defaultValue={product.price}
            disabled={role === "staff"}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.price ? "border-red-500" : ""
            }`}
            id="price"
            type="number"
            step="1"
            placeholder="Product Price"
          />
          {errors.price && (
            <p className="text-red-500 text-xs italic">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            {...register("category", {
              required: "Product Category is required",
            })}
            defaultValue={product.category}
            disabled={role === "staff"}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.category ? "border-red-500" : ""
            }`}
            id="category"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="furniture">Furniture</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs italic">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Product Description is required",
            })}
            defaultValue={product.description}
            disabled={role === "staff"}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.description ? "border-red-500" : ""
            }`}
            id="description"
            placeholder="Product Description"
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            {...register("quantity", {
              required: "Product Quantity is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Enter a valid quantity",
              },
            })}
            defaultValue={product.quantity}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.quantity ? "border-red-500" : ""
            }`}
            id="quantity"
            type="number"
            step="1"
            placeholder="Product Quantity"
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs italic">
              {errors.quantity.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditProductForm;
