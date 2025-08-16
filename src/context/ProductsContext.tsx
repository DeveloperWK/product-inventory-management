import { createContext, Dispatch, SetStateAction } from "react";
import { Category, Product } from "../types/types";

interface ProductsContextType {
  products: Product[];
  createProduct: (product: Product) => Promise<void>;
  productsLoading: boolean;
  categories: Category[];
  deleteProduct: (id: string) => Promise<void>;
  setProducts: Dispatch<SetStateAction<Product[] | []>>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export default ProductsContext;
