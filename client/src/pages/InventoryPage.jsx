import axios from "axios";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import useInventory from "../hooks/useInventory";
import { deleteProduct, updateInventory } from "../store/inventorySlice";
import InventoryAlertImage from "../assets/warning.png";
import { FaTrash } from "react-icons/fa";

function InventoryPage() {
  const products = useInventory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/product/${id}`);
      dispatch(deleteProduct(id));
      console.log("Product Deleted successfully:", response.data);
    } catch (error) {
      console.error("Product delete failed:", error.response.data);
    }
  };

  useEffect(() => {
    async function handleInventory() {
      try {
        if (loading === false) {
          setLoading(true);
          setError(false);
          const response = await axios.get("/api/product/all");
          const products = response.data.results;
          dispatch(updateInventory(products));
        }
      } catch (error) {
        console.log("Error Loading Inventory:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    handleInventory();
  }, []);
  if (!products) {
    return (
      <div className="bg-red-500 text-blue-500 p-4 mb-4 rounded">
        No products available.
      </div>
    );
  }
  return (
    <div className="w-full h-full p-10 flex flex-col justify-center items-center bg-blue-50">
      <h1 className="text-3xl font-bold mb-4">Inventory Page</h1>
      {error && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded">
          Error loading products. Please try again later.
        </div>
      )}

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Product</th>
              <th className="border border-gray-300 p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="border border-gray-300 p-2">{product.id}</td>
                <td className="border border-gray-300 p-2">
                  <div className="flex items-center justify-between">
                    <img
                      src={product.image}
                      alt={`Product ${product.id}`}
                      className="h-8 w-8 mr-2"
                    />
                    {product.name}
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={()=>handleDelete(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex items-center">
                    {product.quantity}
                    {product.quantity < 10 && (
                      <img
                        src={InventoryAlertImage}
                        alt="Low Stock Alert"
                        className="h-8 w-8 ml-2"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InventoryPage;
