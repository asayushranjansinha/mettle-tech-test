import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    console.log("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white font-semibold hover:text-gray-300">
            Home
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="text-white font-semibold hover:text-gray-300"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
