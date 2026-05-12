import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../api/axios";
import Layout from "../components/layout/Layout";

function Admin() {

  const [users, setUsers] =
    useState([]);


  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const res = await API.get(
        "/users"
      );

      setUsers(res.data);

    } catch {

      toast.error(
        "Failed to load users"
      );

    }

  };


  // PROMOTE USER
  const promoteUser = async (
    userId
  ) => {

    try {

      const res = await API.put(
        `/users/promote/${userId}`
      );

      toast.success(
        res.data.message
      );

      fetchUsers();

    } catch (error) {

      toast.error(
        error.response.data.message
      );

    }

  };


  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">
        Admin Panel
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-2xl font-bold mb-2">
              {user.name}
            </h2>

            <p className="text-gray-600 mb-2">
              {user.email}
            </p>

            <p className="mb-4">
              Role:
              {" "}
              <span className="font-bold">
                {user.role}
              </span>
            </p>


            {user.role !== "admin" && (

              <button
                onClick={() =>
                  promoteUser(user._id)
                }
                className="bg-black text-white px-5 py-2 rounded-lg"
              >
                Promote To Admin
              </button>

            )}

          </div>

        ))}

      </div>

    </Layout>
  );
}

export default Admin;