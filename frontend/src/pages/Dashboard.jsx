import { useEffect, useState, useCallback } from "react";

import toast from "react-hot-toast";

import API from "../api/axios";

import Layout from "../components/layout/Layout";

function Dashboard() {

  const role = localStorage.getItem("role");

  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  });


  // FETCH DASHBOARD
  const fetchDashboard = useCallback(async () => {

    try {

      const res = await API.get("/dashboard");

      setStats(res.data);

    } catch {

      toast.error("Failed to load dashboard");

    }

  }, []);


  useEffect(() => {

    fetchDashboard();

  }, [fetchDashboard]);


  return (

    <Layout>

      {/* PAGE TITLE */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard
        </h1>

      </div>


      {/* ADMIN DASHBOARD */}
      {role === "admin" && (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

          {/* TOTAL TASKS */}
          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-gray-500 font-medium">
              Total Tasks
            </h2>

            <p className="text-3xl font-bold mt-3">
              {stats.totalTasks}
            </p>

          </div>


          {/* COMPLETED */}
          <div className="bg-green-100 p-6 rounded-2xl shadow-md">

            <h2 className="text-green-700 font-medium">
              Completed
            </h2>

            <p className="text-3xl font-bold mt-3">
              {stats.completedTasks}
            </p>

          </div>


          {/* PENDING */}
          <div className="bg-yellow-100 p-6 rounded-2xl shadow-md">

            <h2 className="text-yellow-700 font-medium">
              Pending
            </h2>

            <p className="text-3xl font-bold mt-3">
              {stats.pendingTasks}
            </p>

          </div>


          {/* IN PROGRESS */}
          <div className="bg-blue-100 p-6 rounded-2xl shadow-md">

            <h2 className="text-blue-700 font-medium">
              In Progress
            </h2>

            <p className="text-3xl font-bold mt-3">
              {stats.inProgressTasks}
            </p>

          </div>


          {/* OVERDUE */}
          <div className="bg-red-100 p-6 rounded-2xl shadow-md">

            <h2 className="text-red-700 font-medium">
              Overdue
            </h2>

            <p className="text-3xl font-bold mt-3">
              {stats.overdueTasks}
            </p>

          </div>

        </div>

      )}


      {/* MEMBER DASHBOARD */}
      {role === "member" && (

        <div className="bg-white p-6 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-6">
            My Dashboard
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* PENDING */}
            <div className="bg-yellow-100 p-5 rounded-xl">

              <h3 className="text-lg font-semibold text-yellow-700">
                Pending Tasks
              </h3>

              <p className="text-3xl font-bold mt-3">
                {stats.pendingTasks}
              </p>

            </div>


            {/* IN PROGRESS */}
            <div className="bg-blue-100 p-5 rounded-xl">

              <h3 className="text-lg font-semibold text-blue-700">
                In Progress
              </h3>

              <p className="text-3xl font-bold mt-3">
                {stats.inProgressTasks}
              </p>

            </div>


            {/* COMPLETED */}
            <div className="bg-green-100 p-5 rounded-xl">

              <h3 className="text-lg font-semibold text-green-700">
                Completed Tasks
              </h3>

              <p className="text-3xl font-bold mt-3">
                {stats.completedTasks}
              </p>

            </div>

          </div>

        </div>

      )}

    </Layout>

  );
}

export default Dashboard;