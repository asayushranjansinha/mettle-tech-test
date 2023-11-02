import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const SearchController = ({ setSearchResults }) => {
  const { register, handleSubmit } = useForm();

  const handleSearch = async (data) => {
    try {
      const response = await axios.post("/api/product/search", {
        filters: data,
      });
      console.log("Search Results:", response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  useEffect(() => {
    handleSearch({});
  }, []);

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit(handleSearch)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="furniture">Furniture</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price Range
          </label>
          <div className="flex">
            <input
              type="number"
              {...register("minPrice")}
              placeholder="Min"
              className="w-1/2 border rounded py-2 px-3 mr-2 focus:outline-none focus:shadow-outline"
            />
            <input
              type="number"
              {...register("maxPrice")}
              placeholder="Max"
              className="w-1/2 border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchController;
