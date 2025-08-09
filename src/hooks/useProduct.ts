import { useContext } from "react";
import ProductsContext from "../context/ProductsContext";

export const useProduct = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProduct must be used within an ProductsProvider");
  }
  return context;
};
