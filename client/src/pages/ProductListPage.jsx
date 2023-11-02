import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/Product/ProductCard";
import useAuth from "../hooks/useAuth";
import useInventory from "../hooks/useInventory";

const ProductListPage = () => {
  const user = useAuth();
  const products = useInventory();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("User not found");
      navigate("/login");
    } 
  }, []);

  if (!products) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col mb-8">
      <h1 className="text-3xl font-semibold mb-6">Product List</h1>
      {products.length > 0 ? (
        <ul className="w-full min-h-max grid grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((result) => (
            <li key={result.id} className="mx-auto">
              <ProductCard
                product={result}
                userRole={user.role}
                key={result.id}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            No Products Found
          </h2>
          <p className="text-gray-600">
            Try to check back later for new products.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
