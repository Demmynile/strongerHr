import { FC } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import {
  AiOutlineDashboard,
  AiOutlineFileText,
  AiOutlineUpload,
} from "react-icons/ai";
import Link from "next/link";

type SidebarProps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
  isMobile: boolean;
  showSidebar: boolean;
  onLinkClick: () => void;
};

const Sidebar: FC<SidebarProps> = ({
  collapsed,
  toggleCollapsed,
  isMobile,
  onLinkClick,
}) => {
  return (
    <aside
      className={`
        bg-white text-blue-500 shadow-lg transition-all duration-300 z-30
        ${collapsed ? "w-20 p-4" : "w-64 p-6"}
        ${isMobile ? "fixed top-0 left-0 h-full" : "sticky top-0 h-screen"}
      `}
    >
      {/* Collapse Toggle */}
      <div
        className={`flex ${
          collapsed ? "justify-center" : "justify-between"
        } items-center mb-8`}
      >
        {!collapsed && <h2 className="text-xl font-bold">Menu</h2>}
        <button onClick={toggleCollapsed} className="text-blue-500">
          {collapsed ? (
            <FaAngleDoubleRight size={20} title="Expand Sidebar" />
          ) : (
            <FaAngleDoubleLeft size={20} title="Collapse Sidebar" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-6 mt-6">
        <Link
          href="/hr/dashboard"
          onClick={onLinkClick}
          className="flex items-center gap-3 text-lg hover:text-blue-700 transition"
        >
          <AiOutlineDashboard size={20} />
          {!collapsed && "Dashboard"}
        </Link>
        <Link
          href="/hr/dashboard/onboarding"
          onClick={onLinkClick}
          className="flex items-center gap-3 text-lg hover:text-blue-700 transition"
        >
          <AiOutlineUpload size={20} />
          {!collapsed && "Onboarding"}
        </Link>
       
      </nav>
    </aside>
  );
};

export default Sidebar;
