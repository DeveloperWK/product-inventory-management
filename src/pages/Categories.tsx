import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useProduct } from "../hooks/useProduct";

const Categories = () => {
  const { categories, productsLoading } = useProduct();

  if (productsLoading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white p-3">
        Categories
      </h1>
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader className="bg-gray-50 dark:bg-gray-900">
          <TableRow>
            <TableHead className="w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Sl No
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!productsLoading &&
            categories.map((category, idx) => (
              <TableRow
                key={category._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {idx + 1}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {category.name}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default Categories;
