import React from "react";

interface Transaction {
  _id: string;
  type: "income" | "expense" | "transfer";
  category: string;
  amount: number;
  date: string;
  description?: string;
  paymentMethod?: string;
  isRecurring: boolean;
  transactionId: string;
  cashAccount: {
    name: string;
  };
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Transaction History
      </h2>

      {/* ✅ Responsive Layout: Table on Desktop, Cards on Mobile */}
      <div className="hidden md:block">
        <table className="w-full border-collapse bg-white rounded-2xl shadow-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Category</th>
              <th className="text-right p-3">Amount</th>
              <th className="text-left p-3">Payment</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Cash Account</th>
              <th className="text-left p-3">TransactionId</th>
              <th className="text-left p-3">Recurring</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx._id}
                className="border-t hover:bg-gray-50 transition duration-150"
              >
                <td className="p-3 font-medium">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      tx.type === "income"
                        ? "bg-green-100 text-green-700"
                        : tx.type === "expense"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td className="p-3">{tx.category}</td>
                <td className="p-3 text-right font-semibold">
                  {tx.type === "expense" ? "-" : "+"}Tk{tx.amount.toFixed(2)}
                </td>
                <td className="p-3">{tx.paymentMethod || "N/A"}</td>
                <td className="p-3 text-sm text-gray-600">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {tx.cashAccount ? (
                    <span className="text-green-600 font-medium">
                      {tx.cashAccount.name}
                    </span>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
                <td className="p-3">
                  {tx.transactionId ? (
                    <span className="text-blue-600 font-medium">
                      {tx.transactionId}
                    </span>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
                <td className="p-3">
                  {tx.isRecurring ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {transactions.map((tx) => (
          <div
            key={tx._id}
            className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  tx.type === "income"
                    ? "bg-green-100 text-green-700"
                    : tx.type === "expense"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {tx.type}
              </span>
              <span className="text-lg font-bold">
                {tx.type === "expense" ? "-" : "+"}Tk{tx.amount.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-700 text-sm mb-1">
              <strong>Category:</strong> {tx.category}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              <strong>Payment:</strong> {tx.paymentMethod || "N/A"}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              <strong>Date:</strong> {new Date(tx.date).toLocaleDateString()}
            </p>
            {tx.cashAccount ? (
              <span className="text-green-600 font-medium">
                {tx.cashAccount.name}
              </span>
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
            <p>
              {tx.transactionId ? (
                <span className="text-blue-600 font-medium">
                  {tx.transactionId}
                </span>
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              <strong>Recurring:</strong> {tx.isRecurring ? "Yes" : "No"}
            </p>
            {tx.description && (
              <p className="text-gray-600 text-sm mt-2 italic">
                “{tx.description}”
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
