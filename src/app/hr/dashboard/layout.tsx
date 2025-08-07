
"use client"

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const [documents, setDocuments] = useState<File[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) setShowSidebar(false); 
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <Sidebar
        collapsed={sidebarCollapsed}
        toggleCollapsed={toggleSidebar}
        isMobile={isMobile}
        showSidebar={showSidebar}
        onLinkClick={handleLinkClick}
      />
      <main className="flex-1 bg-gray-50 min-h-screen sm:ml-0 ml-20">
        <Header username="John Doe" toggleSidebar={toggleSidebar} />
        {children}
      </main>
    </div>
  );
}