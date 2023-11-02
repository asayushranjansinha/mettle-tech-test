import axios from "axios";
import { useDispatch } from "react-redux";
import { updateInventory } from "../store/inventorySlice";

const useInventoryService = () => {
  const dispatch = useDispatch();

  const initProducts = async () => {
    try {
      const response = await axios.get("/api/product/all");
      const products = response.data.results;
      dispatch(updateInventory(products));
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return {
    initProducts,
  };
};

export default useInventoryService;
