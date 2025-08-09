import { createContext } from "react";
import { Category, Product, ProductForm } from "../types/types";

interface ProductsContextType {
  products: Product[];
  createProduct: (product: ProductForm) => Promise<void>;
  productsLoading: boolean;
  categories: Category[];
  deleteProduct: (id: string) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export default ProductsContext;
