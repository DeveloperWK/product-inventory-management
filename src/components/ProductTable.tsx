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
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
            <tr>
              {["SKU", "Name", "Category", "Price", "Stock", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
            {products?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                  {product.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {categories.find((c) => c._id === product.category)?.name ||
                    "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  ৳ {product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex space-x-2">
                  <ActionButtons
                    onDelete={() => deleteProduct(product._id!)}
                    onEdit={() => handleEdit(product._id!)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="sm:hidden space-y-4 p-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span className="font-semibold">SKU:</span>
              <span className="font-mono">{product.sku}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Name:</span>
              <span>{product.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Category:</span>
              <span>
                {categories.find((c) => c._id === product.category)?.name ||
                  "N/A"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Price:</span>
              <span>৳ {product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Stock:</span>
              <span>{product.stock}</span>
            </div>
            <div className="flex space-x-2 mt-2">
              <ActionButtons
                onDelete={() => deleteProduct(product._id!)}
                onEdit={() => handleEdit(product._id!)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductTable;
