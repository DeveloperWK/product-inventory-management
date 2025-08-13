import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useProduct } from "../hooks/useProduct";
import generateSku from "../lib/generateSku";
import { Category, Product } from "../types/types";

export default function ProductForm() {
  const { categories, createProduct, productsLoading } = useProduct();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Product>({
    mode: "onChange",
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      cost: 0,
      category: "",
      sku: "",
      reorderLevel: 0,
      supplier: "",
    },
  });

  const onSubmit = () => {
    setValue("sku", generateSku());
    const formData = watch();
    createProduct({
      ...formData,
      price: Number(formData?.price),
      stock: Number(formData?.stock),
    });
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Create Product
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 border
              border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2
              focus:ring-indigo-500 dark:focus:ring-indigo-600"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
                {errors.name.message as string}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                min: { value: 0.01, message: "Price must be greater than 0" },
              })}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 border
              border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2
              focus:ring-indigo-500 dark:focus:ring-indigo-600"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-500">
                {errors.price.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Stock
            </label>
            <input
              type="number"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0.01, message: "Stock must be greater than 0" },
              })}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 border
              border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2
              focus:ring-indigo-500 dark:focus:ring-indigo-600"
              placeholder="Enter stock"
            />
            {errors.stock && (
              <p className="mt-2 text-sm text-red-500">
                {errors.stock.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Cost
            </label>
            <input
              type="number"
              {...register("cost", {
                required: "Cost is required",
                min: { value: 0.01, message: "Cost must be greater than 0" },
              })}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 border
              border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2
              focus:ring-indigo-500 dark:focus:ring-indigo-600"
              placeholder="Enter cost"
            />
            {errors.cost && (
              <p className="mt-2 text-sm text-red-500">
                {errors.cost.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Reorder Level
            </label>
            <input
              type="number"
              {...register("reorderLevel", {
                min: {
                  value: 0.01,
                  message: "Reorder Level must be greater than 0",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 border
              border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2
              focus:ring-indigo-500 dark:focus:ring-indigo-600"
              placeholder="Enter Reorder Level"
            />
            {errors.reorderLevel && (
              <p className="mt-2 text-sm text-red-500">
                {errors.reorderLevel.message as string}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Supplier
            </label>
            <input
              type="string"
              {...register("supplier", {
                required: "Supplier is required",
              })}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 border
              border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2
              focus:ring-indigo-500 dark:focus:ring-indigo-600"
              placeholder="Enter Supplier"
            />
            {errors.supplier && (
              <p className="mt-2 text-sm text-red-500">
                {errors.supplier.message as string}
              </p>
            )}
          </div>
          {/* Category */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              defaultValue={""}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 border
              border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2
              focus:ring-indigo-500 dark:focus:ring-indigo-600"
            >
              <option value="" disabled>
                Select a category
              </option>
              {
                <Suspense
                  fallback={
                    <>
                      <p>Loading...</p>
                    </>
                  }
                >
                  {(categories as Category[])?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Suspense>
              }
            </select>
            {errors.category && (
              <p className="mt-2 text-sm text-red-500">
                {errors.category.message as string}
              </p>
            )}
          </div>

          {/* Image URL */}
          {/* <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                  message: "Invalid URL format",
                },
              })}
              className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 border
              border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2
              focus:ring-indigo-500 dark:focus:ring-indigo-600"
              placeholder="Enter image URL"
            />
            {errors.image && (
              <p className="mt-2 text-sm text-red-500">
                {errors.image.message as string}
              </p>
            )}
          </div> */}

          <button
            type="submit"
            disabled={productsLoading}
            className="w-full px-6 py-3 mt-4 text-lg font-semibold text-white
            bg-indigo-600 dark:bg-indigo-700 rounded-lg hover:bg-indigo-700
            dark:hover:bg-indigo-800 focus:outline-none focus:ring-2
            focus:ring-indigo-500 dark:focus:ring-indigo-600 disabled:opacity-50"
          >
            {productsLoading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
