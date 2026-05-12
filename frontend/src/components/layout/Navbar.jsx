import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../../api/axios";

const Navbar = () => {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");


  // LOGOUT
  const handleLogout = async () => {

    try {

      const res = await API.post("/auth/logout");

      toast.success(res.data.message);

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");

      navigate("/login");

    } catch {

      toast.error("Logout failed");

    }

  };


  return (

    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <h1 className="text-2xl font-bold text-gray-800">
        Team Task Manager
      </h1>


      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* ROLE BADGE */}
        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
          {role}
        </span>


        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;