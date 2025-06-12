import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { UserData } from "../../context/UserContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = UserData();

  const links = [
    {
      to: "/admin/dashboard",
      icon: <AiFillHome />,
      label: "Home",
    },
    {
      to: "/admin/course",
      icon: <FaBook />,
      label: "Courses",
    },
    ...(user && user.mainrole === "superadmin"
      ? [
          {
            to: "/admin/users",
            icon: <FaUserAlt />,
            label: "Users",
          },
        ]
      : []),
    {
      to: "/account",
      icon: <AiOutlineLogout />,
      label: "Logout",
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-screen w-64
        bg-gradient-to-br from-purple-600/80 via-pink-400/70 to-yellow-300/70
        backdrop-blur-xl shadow-xl border-r border-purple-100
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ backgroundBlendMode: "overlay" }}
      >
        <div className="h-20 flex items-center justify-center border-b border-purple-100 bg-white/10">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 bg-clip-text text-transparent tracking-wide drop-shadow">
            Admin Panel
          </span>
        </div>
        <ul className="py-6 space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="flex items-center gap-3 px-6 py-3 text-lg font-medium text-white hover:bg-white/20 hover:text-yellow-200 transition rounded-lg"
                onClick={() => setSidebarOpen && setSidebarOpen(false)}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      {/* Spacer for sidebar on desktop */}
      <div className="hidden md:block w-64 flex-shrink-0" />
    </>
  );
};

export default Sidebar;