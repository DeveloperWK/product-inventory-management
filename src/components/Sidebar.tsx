import { useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:z-auto`}
      >
        {/* Close Button (Mobile Only) */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-3 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          ✖
        </button>

        {/* Sidebar Header */}
        <div className="p-6 flex flex-col items-center">
          <img
            src="icons/pwa-192x192.png"
            alt="Logo"
            className="w-16 h-16 mb-4 rounded-full"
          />
          <h2 className="text-2xl font-bold">Click & Buy</h2>
        </div>

        {/* Sidebar Links */}
        <ul className="mt-6">
          <li>
            <Link
              to={"/dashboard"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              🏠 <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/products"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              📦 <span className="ml-3">Products</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/categories"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              🏷️ <span className="ml-3">Categories</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/get-orders"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              📦 <span className="ml-3">Orders</span>
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                to={"/register"}
                onClick={onClose}
                className="flex items-center p-4 hover:bg-gray-700"
              >
                👤 <span className="ml-3">Register</span>
              </Link>
            </li>
          )}
          <li>
            <Link
              to={"/create-order"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              🛒 <span className="ml-3">Create Order</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/create-supplier"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              🛒 <span className="ml-3">Create B2B Supplier</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/create-b2b-order"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              🛒 <span className="ml-3">Create B2B Order</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/create-account"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              🏛️ <span className="ml-3">Create Account</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/create-transaction"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              💵 <span className="ml-3">Create Transaction</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/transactions"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              💵 <span className="ml-3">View Transactions</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/cash-account"}
              onClick={onClose}
              className="flex items-center p-4 hover:bg-gray-700"
            >
              🏦 <span className="ml-3">Cash Account</span>
            </Link>
          </li>
          {!isAuthenticated && (
            <li>
              <Link
                to={"/login"}
                onClick={onClose}
                className="flex items-center p-4 hover:bg-gray-700"
              >
                🔐 <span className="ml-3">Login</span>
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button
                onClick={() => {
                  onClose?.();
                  logout();
                }}
                className="flex items-center p-4 hover:bg-gray-700 w-full"
              >
                🔒 <span className="ml-3">Logout</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
