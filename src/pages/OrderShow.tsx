import { useEffect, useState } from "react";
import { OrderShowTable } from "../types/types";

const OrderShow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderShowTable[]>([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [tempStatus, setTempStatus] =
    useState<OrderShowTable["status"]>("processing");
  const [tempPaymentStatus, setTempPaymentStatus] =
    useState<OrderShowTable["paymentStatus"]>("pending");

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URI}orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateClick = async (orderId: string) => {
    try {
      setUpdateLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: tempStatus,
            paymentStatus: tempPaymentStatus,
          }),
        },
      );
      if (res.ok) {
        setOrders(
          orders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status: tempStatus,
                  paymentStatus: tempPaymentStatus,
                }
              : order,
          ),
        );
        setEditingOrderId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleEditClick = (order: OrderShowTable) => {
    setEditingOrderId(order._id);
    setTempStatus(order.status);
    setTempPaymentStatus(order.paymentStatus);
  };

  const handleCancelClick = () => setEditingOrderId(null);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) return <div className="p-4">Orders Loading...</div>;
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order List</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto max-h-[70vh]">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
              <tr>
                {[
                  "Order ID",
                  "Type",
                  "Amount",
                  "Status",
                  "Payment",
                  "Courier",
                  "Tracking",
                  "Updated",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-mono">
                    {order._id.substring(0, 8)}...
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {order.orderType}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {order.totalAmount} TK
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {editingOrderId === order._id ? (
                      <select
                        value={tempStatus}
                        onChange={(e) =>
                          setTempStatus(
                            e.target.value as OrderShowTable["status"],
                          )
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                      >
                        {[
                          "processing",
                          "delivered",
                          "cancelled",
                          "completed",
                          "returned",
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {editingOrderId === order._id ? (
                      <select
                        value={tempPaymentStatus}
                        onChange={(e) =>
                          setTempPaymentStatus(
                            e.target.value as OrderShowTable["paymentStatus"],
                          )
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                      >
                        {["pending", "paid", "partial"].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                        {order.paymentStatus}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {order.courierId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {order.trackingCode}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.updatedAt)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    {editingOrderId === order._id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateClick(order._id)}
                          className="text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="text-xs text-gray-700 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditClick(order)}
                        disabled={updateLoading}
                        className="text-xs text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="sm:hidden space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Order ID:</span>
                <span className="font-mono">
                  {order._id.substring(0, 8)}...
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Type:</span>
                <span className="capitalize">{order.orderType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Amount:</span>
                <span>{order.totalAmount} TK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Status:</span>
                {editingOrderId === order._id ? (
                  <select
                    value={tempStatus}
                    onChange={(e) =>
                      setTempStatus(e.target.value as OrderShowTable["status"])
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm text-sm"
                  >
                    {[
                      "processing",
                      "delivered",
                      "cancelled",
                      "completed",
                      "returned",
                    ].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                    {order.status}
                  </span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Payment:</span>
                {editingOrderId === order._id ? (
                  <select
                    value={tempPaymentStatus}
                    onChange={(e) =>
                      setTempPaymentStatus(
                        e.target.value as OrderShowTable["paymentStatus"],
                      )
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm text-sm"
                  >
                    {["pending", "paid", "partial"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                    {order.paymentStatus}
                  </span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Courier:</span>
                <span className="font-mono">{order.courierId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Tracking:</span>
                <span className="font-mono">{order.trackingCode}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">Updated:</span>
                <span>{formatDate(order.updatedAt)}</span>
              </div>
              <div className="flex space-x-2 mt-2">
                {editingOrderId === order._id ? (
                  <>
                    <button
                      onClick={() => handleUpdateClick(order._id)}
                      className="text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="text-xs text-gray-700 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditClick(order)}
                    disabled={updateLoading}
                    className="text-xs text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderShow;
