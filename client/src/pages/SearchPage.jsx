import React, { useState } from "react";
import SearchController from "../components/Search/SearchController";
import ProductCard from "../components/Product/ProductCard";
import useAuth from "../hooks/useAuth";

function SearchPage() {
  const user = useAuth();
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 p-10">
      <SearchController setSearchResults={setSearchResults} />
      {searchResults.length > 0 ? (
        <ul className="w-full min-h-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((result) => (
            <li key={result.id} className="mx-auto">
              <ProductCard
                product={result}
                key={result.id}
                userRole={user.role}
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
            Try adjusting your search criteria or check back later for new
            products.
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
