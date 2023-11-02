import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EditProductForm from "../components/Product/EditProductForm";
import useAuth from "../hooks/useAuth";

function EditProductPage() {
  const user = useAuth();
  const productId = useParams().productId;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`);
        setProduct(response.data.result);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [productId]);
  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-50">
      <EditProductForm product={product} role={user.role} />
    </div>
  );
}

export default EditProductPage;
