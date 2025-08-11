import { useProduct } from "../hooks/useProduct";
import { Product } from "../types/types";
import ActionButtons from "./ui/ActionButtons";

interface ProductTableProps {
  products: Product[] | null;
}

const ProductTable = ({ products }: ProductTableProps) => {
  const { deleteProduct } = useProduct();
  const { categories } = useProduct();
  const handleEdit = (id: string) => {
    console.log("Edit button clicked", id);
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              SKU
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {products?.map((product) => (
            <tr
              key={product._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {product.sku}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {categories.find(
                  (category) => category._id === product.category,
                )?.name || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                ৳ {product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {product.stock}
              </td>
              <td className="flex justify-center items-center px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <ActionButtons
                  onDelete={() => deleteProduct(product._id!)}
                  onEdit={() => handleEdit(product._id!)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
export default ProductTable;
