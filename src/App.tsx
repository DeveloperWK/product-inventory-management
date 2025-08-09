import React, { useState } from "react";

import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const [installPromptEvent, promptInstall] = usePWAInstallPrompt();

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
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default App;
