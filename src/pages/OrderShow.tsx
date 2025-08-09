import { useEffect, useState } from "react";
import { OrderShowTable } from "../types/types";

const OrderShow = () => {
  // const [orders, setOrders] = useState([]);
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
      const res = await fetch(`${import.meta.env.VITE_API_URI}orders`);
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      }
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
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleEditClick = (order: OrderShowTable) => {
    setEditingOrderId(order._id);
    setTempStatus(order.status);
    setTempPaymentStatus(order.paymentStatus);
  };

  // const handleUpdateClick = (orderId: string) => {
  //   setOrders(
  //     orders.map((order) =>
  //       order._id === orderId
  //         ? { ...order, status: tempStatus, paymentStatus: tempPaymentStatus }
  //         : order,
  //     ),
  //   );
  //   setEditingOrderId(null);
  // };

  const handleCancelClick = () => {
    setEditingOrderId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  if (isLoading) {
    return <div> Orders Loading...</div>;
  }
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order List</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Container with both vertical and horizontal scrolling */}
        <div className="overflow-auto max-h-[70vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Order Type
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Payment Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Courier ID
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Tracking Code
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Last Updated
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-mono">
                    {order._id.substring(0, 8)}...
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {order.orderType}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {order.totalAmount}{" "}
                    <span className="text-gray-400">TK</span>
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
                        <option value="processing">Processing</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                        <option value="returned">Returned</option>
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
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="partial">Partial</option>
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
                      <div className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-2">
                        <button
                          onClick={() => handleUpdateClick(order._id)}
                          className="text-xs text-white bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded whitespace-nowrap"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="text-xs text-gray-700 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded whitespace-nowrap"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditClick(order)}
                        disabled={updateLoading}
                        className="text-xs text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded whitespace-nowrap"
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
      </div>
    </div>
  );
};
export default OrderShow;
