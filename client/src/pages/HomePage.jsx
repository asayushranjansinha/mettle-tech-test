import { useEffect } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useInventoryService from "../hooks/useInventoryService";

function HomePage() {
  const user = useAuth();
  const inventoryService = useInventoryService();

  useEffect(() => {
    inventoryService.initProducts();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-blue-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Product App</h1>
      </div>
      <div className="w-full max-w-xs h-full flex flex-col gap-8">
        {user.role === "admin" && (
          <Link
            to="/product/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Product
          </Link>
        )}
        <Link
          to="/product/all"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          All Products
        </Link>
        <Link
          to="/search"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search Products
        </Link>
        <Link
          to="/inventory"
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Inventory
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
