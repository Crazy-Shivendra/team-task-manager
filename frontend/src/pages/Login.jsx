import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      toast.success(res.data.message);

      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem("role", res.data.user.role);

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        />

        <button className="w-full bg-black text-white p-3 rounded">
          Login
        </button>

        <p className="mt-4 text-center">
          Don’t have an account?
          <Link to="/signup" className="text-blue-500 ml-2">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
