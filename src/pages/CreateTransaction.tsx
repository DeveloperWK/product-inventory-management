import { useForm } from "react-hook-form";

type TransactionType = "income" | "expense" | "transfer";
type CashAccount = "cash" | "checking" | "savings";

interface TransactionFormData {
  type: TransactionType;
  category: string;
  amount: number;
  paymentMethod: string;
  cashAccount: CashAccount;
  description?: string;
  date: string;
}
const CreateTransaction = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TransactionFormData>({
    defaultValues: {
      type: "expense",
      cashAccount: "cash",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedType = watch("type");

  const onSubmit = (data: TransactionFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Create Transaction
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Transaction Type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Transaction Type:
          </label>
          <select
            id="type"
            {...register("type", { required: "Transaction type is required" })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="transfer">Transfer</option>
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>

        {/* Category with dynamic options based on type */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Transaction Category:
          </label>
          <input
            type="text"
            id="category"
            {...register("category", {
              required: "Category is required",
              minLength: {
                value: 1,
                message: "Category must be at least 1 character",
              },
            })}
            list={
              selectedType === "income"
                ? "incomeCategories"
                : "expenseCategories"
            }
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {selectedType === "income" && (
            <datalist id="incomeCategories">
              <option value="Salary" />
              <option value="Bonus" />
              <option value="Investment" />
              <option value="Freelance" />
              <option value="Gift" />
            </datalist>
          )}
          {selectedType === "expense" && (
            <datalist id="expenseCategories">
              <option value="Food" />
              <option value="Transport" />
              <option value="Housing" />
              <option value="Entertainment" />
              <option value="Healthcare" />
            </datalist>
          )}
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Transaction Amount:
          </label>
          <div className="relative">
            <span className="absolute left-2 top-2">TK</span>
            <input
              type="number"
              id="amount"
              step="0.01"
              {...register("amount", {
                required: "Amount is required",
                valueAsNumber: true,
                validate: {
                  positive: (v) => v > 0 || "Amount must be positive",
                  maxValue: (v) =>
                    v <= 1000000 || "Amount must be less than 1,000,000",
                },
              })}
              className="w-full pl-8 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Payment Method:
          </label>
          <input
            type="text"
            id="paymentMethod"
            {...register("paymentMethod", {
              required: "Payment method is required",
              minLength: {
                value: 1,
                message: "Payment method must be at least 1 character",
              },
            })}
            list="paymentMethods"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <datalist id="paymentMethods">
            <option value="Cash" />
            <option value="Credit Card" />
            <option value="Debit Card" />
            <option value="Bank Transfer" />
            <option value="Digital Wallet" />
          </datalist>
          {errors.paymentMethod && (
            <p className="mt-1 text-sm text-red-600">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        {/* Cash Account */}
        <div>
          <label
            htmlFor="cashAccount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cash Account:
          </label>
          <select
            id="cashAccount"
            {...register("cashAccount", {
              required: "Cash account is required",
            })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="cash">Cash</option>
            <option value="checking">Checking Account</option>
            <option value="savings">Savings Account</option>
          </select>
          {errors.cashAccount && (
            <p className="mt-1 text-sm text-red-600">
              {errors.cashAccount.message}
            </p>
          )}
        </div>

        {/* Date */}
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
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        {/* Description (optional) */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description (optional):
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Transaction
        </button>
      </form>
    </div>
  );
};
export default CreateTransaction;
