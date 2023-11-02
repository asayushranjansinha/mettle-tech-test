import axios from "axios";
import { useForm } from "react-hook-form";
import useInventoryService from "../../hooks/useInventoryService";

const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const inventoryService = useInventoryService();
  const handleListProduct = async (data) => {
    try {
      console.log(data);

      let preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      const formData = new FormData();
      formData.append("file", data.image[0]);
      formData.append("upload_preset", preset);

      const imageResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        formData
      );

      if (!imageResponse.data.secure_url) {
        console.error("Image upload failed");
        return;
      }

      const imageUrl = imageResponse.data.secure_url;

      data.image = imageUrl;

      const response = await axios.post("/api/product/create", data);
      console.log("Product listed successfully:", response.data);
      inventoryService.initProducts();
    } catch (error) {
      console.error("Product listing failed:", error.response.data);
    } finally {
      reset();
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(handleListProduct)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Product Name  */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            {...register("name", { required: "Product Name is required" })}
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

        {/* Product Price */}
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
                message: "Enter a valid quantity",
              },
            })}
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

        {/* Product Quantity */}
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
        {/* Product Category */}
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

        {/* Product Images */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            {...register("image", {
              required: "Please select at least one image.",
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.image ? "border-red-500" : ""
            }`}
            id="images"
            type="file"
            accept="image/*"
          />
          {errors.images && (
            <p className="text-red-500 text-xs italic">
              {errors.image.message}
            </p>
          )}
        </div>

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

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            List Product
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateProductForm;
