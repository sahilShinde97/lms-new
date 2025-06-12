import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 flex">
      {/* Sidebar (always on the left) */}
      <div className="hidden md:block">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      {/* Mobile Sidebar (overlay) */}
      <div className="md:hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      {/* Main Content (centered) */}
      <div className="flex-1 flex flex-col">
        {/* Mobile menu button */}
        <div className="md:hidden p-4">
          <button
            onClick={() => setSidebarOpen((open) => !open)}
            className="text-2xl text-purple-700 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        </div>
        <div className="flex-1 p-4 max-w-7xl mx-auto w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;