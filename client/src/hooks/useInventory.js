import { useSelector } from "react-redux";

export default function useInventory() {
  const inventory = useSelector((store) => store.inventory.items);
  return inventory;
}
