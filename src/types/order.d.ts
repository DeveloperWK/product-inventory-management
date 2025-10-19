export interface OrderItem {
  product: {
    name: string;
    price: number;
    stock: number;
    sku: string;
    cost: number;
  };
  quantity: number;
  unitPrice: number;
}

export interface Transaction {
  type?: string;
  category?: string;
  date?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  transactionId?: string;
  createdAt?: string;
}

export interface Order {
  _id: string;
  orderType: string;
  items: OrderItem[];
  transaction: Transaction;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  courierId: string;
  trackingCode: string;
  createdAt: string;
  updatedAt: string;
}
