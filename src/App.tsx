import { useEffect, useState } from "react";

import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const path = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    if (isAuthenticated && path.pathname === "/") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, path]);

  return (
    <div className="flex min-h-screen dark:bg-gray-800 dark:text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toggle Button (Visible only on small screens) */}
        <button
          className="md:hidden p-2 bg-gray-800 text-white rounded m-4"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        {/* Page Content */}
        <div className="flex-1 p-6  bg-[#F2EDD1]">
          {isAuthenticated}
          {!isAuthenticated && (
            <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome to Our App
                </h2>
                <p className="text-gray-600 mt-2">
                  Please sign in to continue{" "}
                  <a href="/login" className="text-blue-500 hover:underline">
                    Sign in
                  </a>
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Don't have an account? Contact the admin for your credentials.
                </p>
              </div>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default App;
