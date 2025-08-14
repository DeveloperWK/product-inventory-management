// interface CashAccount {
//   name: string;
//   type: "bank" | "cash" | "mobile";
//   balance: number;
//   currency: string;
//   accountNumber?: string;
//   institution?: string;
// }

interface Product extends ProductForm {
  _id?: string;
}
type Category = {
  _id: string;
  name: string;
};
interface Supplier {
  _id: string;
  name: string;
  contact: string;
}
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
  institution: string;
}
interface CashAccount extends CashAccountForm {
  _id: string;
  currency: string;
  accountNumber: string;
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

type TransactionType = "income" | "expense" | "transfer";

interface TransactionFormData {
  type: TransactionType;
  category: string;
  amount: number;
  paymentMethod: string;
  cashAccount: string;
  description?: string;
  date: string;
  transactionId?: string;
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
interface BusinessOrderForm {
  name: string;
  supplierId: string;
  due: number;
  payment: number;
  total: number;
  discount: number;
  quantity: number;
  date: string;
}

export type {
  BusinessOrderForm,
  CashAccount,
  CashAccount,
  CashAccountForm,
  Category,
  OrderData,
  OrderFormData,
  OrderItem,
  OrderShowTable,
  OrderStatus,
  OrderType,
  PaymentStatus,
  Product,
  ProductCount,
  StatusConfig,
  Supplier,
  TransactionFormData,
};
