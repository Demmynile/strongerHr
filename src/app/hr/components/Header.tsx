"use client";

import { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

type HeaderProps = {
  username: string;
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ username, toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  const navigate = useRouter();

  const logout = () => navigate.push("/");

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow">
      <div className="flex items-center gap-4">
        <button className="sm:hidden" onClick={toggleSidebar}>
          <FaBars size={20} className="text-blue-500" />
        </button>
        <h1 className="text-xl font-semibold text-blue-500">StrongerHR</h1>
      </div>
      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer text-blue-500"
          onClick={() => setOpen(!open)}
        >
          <FaUserCircle size={24} /> <span>{username}</span>
        </div>
        {open && (
          <div className="absolute right-0 mt-2 bg-white shadow rounded p-2 z-10">
            <button
              className="flex items-center gap-2 text-red-600"
              onClick={logout}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
