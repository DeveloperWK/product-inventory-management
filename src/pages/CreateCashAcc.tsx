import { useState } from "react";
import { useForm } from "react-hook-form";
import { CashAccountForm } from "../types/types";
const CreateCashAcc = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CashAccountForm>({
    defaultValues: {
      balance: 0,
      name: "",
      type: "",
      institution: "",
    },
  });

  const handleOnSubmit = async (data: CashAccountForm) => {
    try {
      setIsLoading(true);
      await fetch(`${import.meta.env.VITE_API_URI}cash-accounts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      reset();
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl">Create Cash Account</h1>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label
            htmlFor="institution"
            className="block text-sm font-medium text-gray-700"
          >
            Institution
          </label>
          <input
            id="institution"
            type="text"
            {...register("institution", {
              required: "Institution is required",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.institution && (
            <p className="text-sm text-red-600">{errors.institution.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Account Type</label>
          <select
            {...register("type", {
              required: "Type  is required",
            })}
            className="w-full p-2 border rounded"
          >
            <option value="bank">Bank</option>
            <option value="cash">Cash</option>
            <option value="mobile">Mobile</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="balance"
            className="block text-sm font-medium text-gray-700"
          >
            Balance
          </label>
          <input
            id="balance"
            type="number"
            {...register("balance")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.balance && (
            <p className="text-sm text-red-600">{errors.balance.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {isLoading ? "Creating..." : "Create Account"}
        </button>
        {isError && (
          <p className="text-sm text-red-600">
            An error occurred while creating the order.
          </p>
        )}
      </form>
    </>
  );
};
export default CreateCashAcc;
