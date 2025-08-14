import { createBrowserRouter } from "react-router";
import App from "../App";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
import Unauthorized from "../components/Unauthorized";
import CashAcc from "../pages/CashAcc";
import Categories from "../pages/Categories";
import CreateBusinessOrder from "../pages/CreateBusinessOrder";
import CreateCashAcc from "../pages/CreateCashAcc";
import CreateOrder from "../pages/CreateOrder";
import CreateProduct from "../pages/CreateProduct";
import CreateTransaction from "../pages/CreateTransaction";
import Dashboard from "../pages/Dashboard";
import LoginForm from "../pages/LoginForm";
import OrderShow from "../pages/OrderShow";
import ProductsPage from "../pages/ProductsPage";
import RegistrationForm from "../pages/RegistrationForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <Dashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <ProductsPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <Categories />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/create-product",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <CreateProduct />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <RegistrationForm />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "/create-order",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <CreateOrder />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/create-account",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <CreateCashAcc />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/get-orders",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <OrderShow />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/make-transaction",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <CreateTransaction />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/create-b2b-order",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <CreateBusinessOrder />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/cash-account",
        element: (
          <RoleProtectedRoute requiredRole="admin">
            <CashAcc />
          </RoleProtectedRoute>
        ),
      },
    ],
  },
]);
export default router;
