import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteProduct } from "../../store/inventorySlice";

function ProductCard({ product, userRole }) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/product/${product.id}`);
      dispatch(deleteProduct(product.id));
      console.log("Product Deleted successfully:", response.data);
    } catch (error) {
      console.error("Product delete failed:", error.response.data);
    }
  };
  return (
    <div
      key={product?.id}
      className="max-w-sm bg-white shadow-md p-4 rounded-md relative"
    >
      <div className="flex absolute top-2 right-2 space-x-2">
        {userRole === "admin" && (
          <button
            className="text-red-500 hover:text-red-700 p-2 bg-white rounded-full shadow-md"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        )}
        <Link
          to={`/product/${product.id}`}
          className="text-blue-500 hover:text-blue-700 p-2 bg-white rounded-full shadow-md"
        >
          <FaEdit />
        </Link>
      </div>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">Category: {product.category}</p>
      <p className="text-gray-700 mb-2">Price: ₹{product.price}</p>
      <p className="text-gray-700">Quantity: {product.quantity}</p>
    </div>
  );
}

export default ProductCard;
