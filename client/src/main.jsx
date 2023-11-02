import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout";
import "./index.css";
import store from "./store/store.js";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import AddProductPage from "./pages/AddProductPage";
import ProductListPage from "./pages/ProductListPage";
import EditProductPage from "./pages/EditProductPage";
import ProtectedRoute from "./ProtectedRoute";
import InventoryPage from "./pages/InventoryPage";
import { CloudinaryContext } from "cloudinary-react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/add" element={<AddProductPage />} />
        <Route path="/product/all" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<EditProductPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Route>
    </Route>
  )
);

const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  apiKey: import.meta.env.VITE_CLOUDINARY_CLOUD_API_KEY,
  apiSecret: import.meta.env.VITE_CLOUDINARY_CLOUD_API_SECRET,
  // uploadPreset: ,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CloudinaryContext cloudName={cloudinaryConfig.cloudName}>
        <RouterProvider router={router} />
      </CloudinaryContext>
    </Provider>
  </React.StrictMode>
);
