import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProductForm from "../components/Product/CreateProductForm";
import useAuth from "../hooks/useAuth";

function AddProductPage() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("User not found");
      navigate("/login");
    } else if (user.role !== "admin") {
      console.log("User not Authorized");
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-50">
      <CreateProductForm />
    </div>
  );
}

export default AddProductPage;
