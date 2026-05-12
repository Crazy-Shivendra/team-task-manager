import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Shield,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const role = localStorage.getItem("role");

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition duration-300
    ${
      isActive
        ? "bg-blue-500 text-white"
        : "hover:bg-gray-800 text-gray-200"
    }`;

  return (

    <div className="w-64 bg-gray-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-10">
        Task Manager
      </h1>

      <div className="flex flex-col gap-3">

        {/* DASHBOARD */}
        <NavLink
          to="/dashboard"
          className={navLinkClass}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>


        {/* PROJECTS */}
        <NavLink
          to="/projects"
          className={navLinkClass}
        >
          <FolderKanban size={20} />
          Projects
        </NavLink>


        {/* TASKS */}
        <NavLink
          to="/tasks"
          className={navLinkClass}
        >
          <CheckSquare size={20} />
          Tasks
        </NavLink>


        {/* ADMIN */}
        {role === "admin" && (

          <NavLink
            to="/admin"
            className={navLinkClass}
          >
            <Shield size={20} />
            Admin Panel
          </NavLink>

        )}

      </div>

    </div>
  );
};

export default Sidebar;