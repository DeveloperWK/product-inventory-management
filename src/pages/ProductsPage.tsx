import { Link } from "react-router";

import ProductTable from "../components/ProductTable";
import { useProduct } from "../hooks/useProduct";

const ProductsPage = () => {
  const { products, productsLoading } = useProduct();

  if (productsLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Products
        </h1>
        <Link
          to="/create-product"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </Link>
      </div>

      <ProductTable products={products} />
     
    </div>
  );
};
export default ProductsPage;
