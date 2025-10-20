import { useState } from "react";
import { Order } from "../types/order";

interface Props {
  order: Order;
}

const OrderDetails: React.FC<Props> = ({ order }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [transactionID, setTransactionID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTransactionIDChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionID(e.target.value);
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await fetch(`${import.meta.env.VITE_API_URI}orders/${order._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction: { transactionId: transactionID },
        }),
      });
    } catch (error) {
      console.error("Transaction update failed:", error);
    } finally {
      setIsLoading(false);
      setIsEdit(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 space-y-6">
      {/* Header */}
      <header className="border-b pb-4 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Order #{order._id.slice(-6)}
          </h1>
          <p className="text-gray-500 text-sm">
            Created: {new Date(order.createdAt).toLocaleDateString()} | Updated:{" "}
            {new Date(order.updatedAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`mt-3 md:mt-0 px-4 py-2 rounded-full text-sm font-semibold ${
            order.status === "delivered"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {order.status.toUpperCase()}
        </span>
      </header>

      {/* Order Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
          <p className="text-gray-600">
            <span className="font-semibold">Order Type:</span> {order.orderType}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Total Amount:</span> ৳
            {order.totalAmount}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Payment Status:</span>{" "}
            <span
              className={`font-semibold ${
                order.paymentStatus === "paid"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {order.paymentStatus}
            </span>
          </p>
        </div>

        {/* Courier Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-700">
            Courier & Tracking
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold">Courier ID:</span>{" "}
            {order.courierId || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Tracking Code:</span>{" "}
            {order.trackingCode || "N/A"}
          </p>
          {order.trackingCode && (
            <a
              href={`https://steadfast.com.bd/t/${order.trackingCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:underline text-sm"
            >
              Track Package →
            </a>
          )}
        </div>
      </section>

      {/* Ordered Items */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Ordered Items
        </h2>
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4 text-center">Qty</th>
                <th className="py-3 px-4 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {item.product.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.product.sku}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    ৳{item.unitPrice}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-800">
                    ৳{item.unitPrice * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Transaction Section */}
      <section className="w-full max-w-md mx-auto bg-gray-50 shadow-inner rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Transaction Details
          </h2>
          {!isEdit && (
            <button
              onClick={() => setIsEdit(true)}
              className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md transition-colors duration-200 w-full sm:w-auto"
            >
              Add Transaction
            </button>
          )}
        </div>

        {isEdit && (
          <form onSubmit={handleOnSubmit} className="mt-4 space-y-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1 text-sm">
                Transaction ID
              </label>
              <input
                type="text"
                onChange={handleTransactionIDChange}
                value={transactionID}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter transaction ID"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition-colors duration-200"
              >
                {isLoading ? "Updating..." : "Update"}
              </button>

              <button
                type="button"
                onClick={() => setIsEdit(false)}
                className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {!isEdit && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mt-4">
            <p>
              <span className="font-semibold">Transaction Type:</span>{" "}
              {order.transaction?.type || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {order.transaction?.category || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Payment Method:</span>{" "}
              {order.transaction?.paymentMethod || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Payment Status:</span>{" "}
              {order.transaction?.paymentStatus || order.paymentStatus}
            </p>
            <p>
              <span className="font-semibold">Transaction ID:</span>{" "}
              {order.transaction?.transactionId || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {order.transaction?.date
                ? new Date(order.transaction.date).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderDetails;
