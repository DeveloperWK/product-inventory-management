type Product = {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
};
type Category = {
  _id: string;
  name: string;
};
type CategoryWiseStock = {
  totalStock: number;
  categoryName: string;
};

type TotalStock = {
  fullStock: number;
};

type AveragePrice = {
  averagePrice: number;
};

type ProductsWithTotalStock = {
  productList: Product[];
  categoryWiseStock: CategoryWiseStock[];
  totalStock: TotalStock[];
  averagePrice: AveragePrice[];
};

// type ProductsResponse = {
//   message: string;
//   productsWithTotalStock: ProductsWithTotalStock[];
//   currentPage: number;
//   count: number;
//   totalPages: number;
// };

type OrderType = "purchase" | "sale";
type PaymentStatus = "paid" | "pending" | "partial";

interface OrderItem {
  product: string;
  quantity: number;
  unitPrice: number;
}

interface OrderFormData {
  orderType: OrderType;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentStatus: PaymentStatus;
  transaction?: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_address: string;
  note: string;
  invoice: string;
  delivery_type: string;
}
interface CashAccountForm {
  type: string;
  name: string;
  balance?: number;
}
interface ProductForm {
  name: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  cost: number;
  reorderLevel: number;
  supplier: string;
}

interface OrderStatus {
  cancelled: number;
  completed: number;
  delivered: number;
  processing: number;
  returned: number;
}

interface OrderData {
  status: OrderStatus;
  total: number;
}

interface StatusConfig {
  [key: string]: {
    label: string;
    color: string;
    textColor: string;
  };
}
interface ProductCount {
  total: number;
  totalStock: number;
}
interface OrderShowTable {
  _id: string;
  orderType: string;
  totalAmount: number;
  status: "processing" | "delivered" | "cancelled" | "completed" | "returned";
  paymentStatus: "pending" | "paid" | "partial";
  courierId: string;
  trackingCode: string;
  updatedAt: string;
}
export type {
  AveragePrice,
  CashAccountForm,
  Category,
  CategoryWiseStock,
  OrderData,
  OrderFormData,
  OrderItem,
  OrderShowTable,
  OrderStatus,
  OrderType,
  PaymentStatus,
  Product,
  ProductCount,
  ProductForm,
  ProductsWithTotalStock,
  StatusConfig,
  TotalStock,
};
