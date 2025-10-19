import { Order } from "../types/order";

interface Props {
  order: Order;
}

const OrderDetails: React.FC<Props> = ({ order }) => {
  console.log(order);
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 space-y-6">
      {/* Header */}
      <div className="border-b pb-4 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Order Details #{order._id.slice(-6)}
          </h1>
          <p className="text-gray-500 text-sm">
            Created on {new Date(order.createdAt).toLocaleDateString()} | Last
            updated {new Date(order.updatedAt).toLocaleDateString()}
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
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className={`${
                order.paymentStatus === "paid"
                  ? "text-green-600"
                  : "text-yellow-600"
              } font-semibold`}
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
          <a
            href={`https://steadfast.com.bd/t/${order.trackingCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:underline text-sm"
          >
            Track Package →
          </a>
        </div>
      </div>

      {/* Items */}
      <div>
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
      </div>

      {/* Transaction */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Transaction Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
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
      </div>
    </div>
  );
};

export default OrderDetails;
