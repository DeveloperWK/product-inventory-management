// src/pages/ProductsPage.tsx
import { Link } from "react-router";

import ProductTable from "../components/ProductTable";
import { useProduct } from "../hooks/useProduct";

const ProductsPage = () => {
  // const [showForm, setShowForm] = useState(false);
  const { products, productsLoading } = useProduct();
  // useEffect(() => {
  //   // Replace with your actual API call
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   }, []);

  // const handleSave = (product: Product) => {
  //   setProducts([...products, product]);
  //   setShowForm(false);
  // };

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
      {/* <ProductForm`
        show={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
      /> */}
    </div>
  );
};
export default ProductsPage;
