import { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderDetails from "../components/OrderDetails";
import { Order } from "../types/order";

const GetOrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [err, setErr] = useState("");

  const handleGetOrder = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setOrder(data);
      } else {
        setErr(data.error || "Failed to load order details.");
      }
    } catch (e) {
      console.error(e);
      setErr("Something went wrong while fetching the order.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetOrder();
  }, []);
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 animate-pulse">Loading order details...</p>
      </div>
    );

  if (err)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {err}
      </div>
    );

  if (!order)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        No order found.
      </div>
    );

  return <OrderDetails order={order} />;
};

export default GetOrderDetails;
