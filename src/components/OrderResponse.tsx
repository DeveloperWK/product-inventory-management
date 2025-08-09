import { useState } from "react";

const OrderResponse = ({
  order,
}: {
  order: { courierId: number; trackingCode: string };
}) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = (text: string) => {
    console.log("Copying to clipboard:", text);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8">
      <div className="p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h1>
          {/*<p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order is being processed.
          </p>*/}

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Courier ID</p>
                  <p className="font-medium text-gray-800">{order.courierId}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(order.courierId.toString())}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {!copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Tracking Code</p>
                  <p className="font-medium text-gray-800 break-all">
                    {order.trackingCode}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(order.trackingCode)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderResponse;
