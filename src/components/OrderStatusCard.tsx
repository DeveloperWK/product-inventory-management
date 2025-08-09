import React from "react";
import { OrderData, StatusConfig } from "../types/types";

const OrderStatusCard: React.FC<{ orderData: OrderData }> = ({ orderData }) => {
  const { status, total } = orderData;

  const statusConfig: StatusConfig = {
    processing: {
      label: "Processing",
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    delivered: {
      label: "Delivered",
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    cancelled: {
      label: "Cancelled",
      color: "bg-red-500",
      textColor: "text-red-500",
    },
    completed: {
      label: "Completed",
      color: "bg-purple-500",
      textColor: "text-purple-500",
    },
    returned: {
      label: "Returned",
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
        <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-bold">
          Total: {total}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(status).map(([key, value]) => (
          <div
            key={key}
            className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${statusConfig[key]?.color || "bg-gray-500"}`}
                ></div>
                <span className="text-sm font-medium text-gray-600">
                  {statusConfig[key]?.label || key}:
                </span>
              </div>
              <span className="text-lg font-bold text-gray-800">{value} </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusCard;
