import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import API from "../api/axios";
import Layout from "../components/layout/Layout";

function Tasks() {
    const role = localStorage.getItem("role");
  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    project: "",
    priority: "medium",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");

      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");

      setProjects(res.data);
    } catch {}
  };

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");

      setUsers(res.data);
    } catch {}
  };

  // CREATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/tasks", formData);

      toast.success(res.data.message);

      setFormData({
        title: "",
        description: "",
        dueDate: "",
        assignedTo: "",
        project: "",
        priority: "medium",
      });

      fetchTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (taskId, status) => {
    try {
      const res = await API.put(`/tasks/${taskId}`, { status });

      toast.success(res.data.message);

      fetchTasks();
    } catch {
      toast.error("Failed to update task");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Tasks</h1>

     {/* CREATE TASK */}
{role === "admin" && (

  <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded-xl shadow mb-10"
  >

    <h2 className="text-2xl font-semibold mb-5">
      Create Task
    </h2>


    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />


      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      />


      <textarea
        name="description"
        placeholder="Task Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4 md:col-span-2"
      />


      {/* USERS */}
      <select
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      >

        <option value="">
          Select User
        </option>

        {users.map((user) => (

          <option
            key={user._id}
            value={user._id}
          >
            {user.name}
          </option>

        ))}

      </select>


      {/* PRIORITY */}
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4"
      >

        <option value="low">
          Low Priority
        </option>

        <option value="medium">
          Medium Priority
        </option>

        <option value="high">
          High Priority
        </option>

      </select>


      {/* PROJECTS */}
      <select
        name="project"
        value={formData.project}
        onChange={handleChange}
        className="w-full border p-3 rounded mb-4 md:col-span-2"
      >

        <option value="">
          Select Project
        </option>

        {projects.map((project) => (

          <option
            key={project._id}
            value={project._id}
          >
            {project.title}
          </option>

        ))}

      </select>

    </div>


    <button
      className="bg-black hover:bg-gray-800 transition duration-300 text-white px-6 py-3 rounded-lg"
    >
      Create Task
    </button>

  </form>

)}

      {tasks.length === 0 && (
        <div className="flex justify-center items-center h-40 text-gray-500 text-xl">
          No Tasks Found
        </div>
      )}

      {/* TASK LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-2xl font-bold break-words">{task.title}</h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
    ${
      task.priority === "high"
        ? "bg-red-100 text-red-600"
        : task.priority === "medium"
          ? "bg-yellow-100 text-yellow-600"
          : "bg-green-100 text-green-600"
    }`}
              >
                {task.priority}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{task.description}</p>

            <p className="mb-2">Assigned To: {task.assignedTo?.name}</p>

            <p className="mb-2">Project: {task.project?.title}</p>

            <p className="text-sm text-gray-500 mb-3">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>

            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
    ${
      task.status === "completed"
        ? "bg-green-100 text-green-600"
        : task.status === "in-progress"
          ? "bg-blue-100 text-blue-600"
          : "bg-yellow-100 text-yellow-600"
    }`}
              >
                {task.status}
              </span>
            </div>

            {/* STATUS BUTTONS */}

            {role === "member" && (
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => updateStatus(task._id, "pending")}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Pending
              </button>

              <button
                onClick={() => updateStatus(task._id, "in-progress")}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                In Progress
              </button>

              <button
                onClick={() => updateStatus(task._id, "completed")}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Completed
              </button>
            </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Tasks;
