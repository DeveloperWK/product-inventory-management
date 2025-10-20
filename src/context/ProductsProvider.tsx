import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Category, Product } from "../types/types";
import ProductsContext from "./ProductsContext";

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { isAuthenticated } = useAuth();

  const getProducts = async () => {
    try {
      setProductsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URI}products`);
      const data: Product[] = await res.json();
      setProducts(data);
    } catch (error) {
      setProductsLoading(false);
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
    }
  };
  const createProduct = async (product: Product) => {
    try {
      setProductsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URI}products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (res.status === 201) {
        getProducts();
        alert("Product created successfully");
      }
      if (!res.ok) {
        throw new Error("Create Product Failed");
      }
      setProductsLoading(false);
    } catch (error) {
      console.error(error);
      setProductsLoading(false);
      throw new Error("Create Product Failed");
    }
  };
  const getCategory = async () => {
    try {
      setProductsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URI}categories`);
      const data = await res.json();
      setCategories(data?.data);
      setProductsLoading(false);
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong");
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      setProductsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URI}products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 200) {
        getProducts();
        alert("Product deleted successfully");
      }
      if (!res.ok) {
        throw new Error("Delete Product Failed");
      }
      setProductsLoading(false);
    } catch (error) {
      console.error(error);
      setProductsLoading(false);
      throw new Error("Delete Product Failed");
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      getProducts();
      getCategory();
    }
  }, [isAuthenticated]);
  const value = {
    products,
    productsLoading,
    createProduct,
    categories,
    deleteProduct,
    setProducts,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
