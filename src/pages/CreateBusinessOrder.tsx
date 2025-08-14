import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import TransactionSuggestion from "../components/TransactionSuggestion";
import { BusinessOrderForm, Supplier, Transaction } from "../types/types";

const CreateBusinessOrder: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showSuggestionsIndex, setShowSuggestionsIndex] = useState<
    number | null
  >(null);
  const [searchTerms, setSearchTerms] = useState<string[]>([""]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<BusinessOrderForm>({
    defaultValues: {
      relatedTransactions: [{ transactionId: "" }],
      supplier: "Select a supplier",
    },
  });
  const { fields, append, remove } = useFieldArray<BusinessOrderForm>({
    control,
    name: "relatedTransactions",
  });
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URI}suppliers`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = await response.json();
        setSuppliers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSuppliers();
  }, []);
  const onSubmit = async (data: BusinessOrderForm) => {
    console.log(data);
    try {
      setIsLoading(true);
      await fetch(`${import.meta.env.VITE_API_URI}b2b-orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setError("Failed to create business order");
    }

    reset();
  };
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URI}cash-transactions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactions();
  }, []);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".suggestion-container")) {
        setShowSuggestionsIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);
  const handleSuggestion = (searchTerm: string) => {
    return transactions?.filter(({ transactionId }) =>
      transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };
  console.log("Transactions:", transactions);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Create Business Order
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name:
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Supplier Field */}
        <div>
          <label
            htmlFor="supplier"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Supplier:
          </label>
          <select
            id="supplier"
            {...register("supplier", { required: "Supplier is required" })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.supplier
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          >
            <option disabled>Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
          {errors.supplier && (
            <p className="mt-1 text-sm text-red-600">
              {errors.supplier.message}
            </p>
          )}
        </div>

        {/* Date Field */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            {...register("date", { required: "Date is required" })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.date
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        {/* Due Date Field */}
        <div>
          <label
            htmlFor="due"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Due Amount:
          </label>
          <input
            type="number"
            id="due"
            {...register("due", {
              required: "Due date is required",
              min: { value: 0, message: "Due date must be 0 or greater" },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.due
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          />
          {errors.due && (
            <p className="mt-1 text-sm text-red-600">{errors.due.message}</p>
          )}
        </div>

        {/* Payment Amount Field */}
        <div>
          <label
            htmlFor="payment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Payment Amount:
          </label>
          <input
            type="number"
            id="payment"
            step="0.01"
            {...register("payment", {
              required: "Payment amount is required",
              min: { value: 0, message: "Payment must be 0 or greater" },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.payment
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          />
          {errors.payment && (
            <p className="mt-1 text-sm text-red-600">
              {errors.payment.message}
            </p>
          )}
        </div>

        {/* Total Amount Field */}
        <div>
          <label
            htmlFor="total"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Total Amount:
          </label>
          <input
            type="number"
            id="total"
            step="0.01"
            {...register("total", {
              required: "Total amount is required",
              min: { value: 0, message: "Total must be 0 or greater" },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.total
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          />
          {errors.total && (
            <p className="mt-1 text-sm text-red-600">{errors.total.message}</p>
          )}
        </div>

        {/* Discount Amount Field */}
        <div>
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Discount Amount:
          </label>
          <input
            type="number"
            id="discount"
            step="0.01"
            {...register("discount", {
              min: { value: 0, message: "Discount must be 0 or greater" },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.discount
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          />
          {errors.discount && (
            <p className="mt-1 text-sm text-red-600">
              {errors.discount.message}
            </p>
          )}
        </div>

        {/* Quantity Field */}
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
            })}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
              errors.quantity
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            }`}
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>
        <TransactionSuggestion
          append={append}
          errors={errors}
          fields={fields}
          handleSuggestion={handleSuggestion}
          register={register}
          remove={remove}
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms}
          setShowSuggestionsIndex={setShowSuggestionsIndex}
          setValue={setValue}
          showSuggestionsIndex={showSuggestionsIndex}
        />
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            {isLoading ? "Creating B2B Order..." : "Create B2B Order"}
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default CreateBusinessOrder;
