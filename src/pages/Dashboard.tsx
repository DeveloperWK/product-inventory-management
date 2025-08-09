import { useEffect, useState } from "react";
import Card from "../components/Card";
import OrderStatusCard from "../components/OrderStatusCard";
import { OrderData, ProductCount } from "../types/types";

const Dashboard = () => {
  const [productsCount, setProductsCount] = useState<ProductCount>();
  const [isLoading, setIsLoading] = useState(true);
  const [ordersCount, setOrdersCount] = useState<OrderData>({
    status: {
      cancelled: 0,
      completed: 0,
      delivered: 0,
      processing: 0,
      returned: 0,
    },
    total: 0,
  });

  const handleCount = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URI}total-counts`,
      );
      const data = await response.json();
      setProductsCount(data.products);
      setOrdersCount({
        status: {
          cancelled: data.orders.status.cancelled,
          completed: data.orders.status.completed,
          delivered: data.orders.status.delivered,
          processing: data.orders.status.processing,
          returned: data.orders.status.returned,
        },
        total: data.orders.total,
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleCount();
  }, []);
  console.log({
    productsCount,
    ordersCount,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white dark:bg-gray-700">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Total Products" value={productsCount?.total ?? 0} />
        <Card title="Total Inventory" value={productsCount?.totalStock ?? 0} />
        <div className="p-4">
          <OrderStatusCard orderData={ordersCount} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
