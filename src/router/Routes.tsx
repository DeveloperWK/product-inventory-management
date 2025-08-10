import { createBrowserRouter } from "react-router";
import App from "../App";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
import Unauthorized from "../components/Unauthorized";
import Categories from "../pages/Categories";
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
        element: <RegistrationForm />,
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
        element: <CreateOrder />,
      },
      {
        path: "/create-account",
        element: <CreateCashAcc />,
      },
      {
        path: "/get-orders",
        element: <OrderShow />,
      },
      {
        path: "/make-transaction",
        element: <CreateTransaction />,
      },
    ],
  },

  // {
  //   path: "/orders",
  //   element: <Orders />,
  // },
  // {
  //   path: "/settings",
  //   element: <Settings />,
  // },
]);
export default router;
