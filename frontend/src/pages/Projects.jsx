import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../api/axios";
import Layout from "../components/layout/Layout";

function Projects() {
    const role = localStorage.getItem("role");

  const [projects, setProjects] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });


  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const res = await API.get(
        "/projects"
      );

      setProjects(res.data);

    } catch {

      toast.error(
        "Failed to load projects"
      );

    }

  };


  // CREATE PROJECT
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/projects",
        formData
      );

      toast.success(
        res.data.message
      );

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();

    } catch (error) {

      toast.error(
        error.response.data.message
      );

    }

  };


  useEffect(() => {
    fetchProjects();
  }, []);


  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">
        Projects
      </h1>

        
      {/* CREATE FORM */}
      {role === "admin" && (
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >

        <h2 className="text-2xl font-semibold mb-5">
          Create Project
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          className="bg-black text-white px-6 py-3 rounded"
        >
          Create Project
        </button>

      </form>
        )}


      {/* PROJECTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {projects.map((project) => (

          <div
            key={project._id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-2xl font-bold mb-2">
              {project.title}
            </h2>

            <p className="text-gray-600 mb-4">
              {project.description}
            </p>

            <p className="text-sm text-gray-500">
              Members:
              {" "}
              {project.members.length}
            </p>

          </div>

        ))}

      </div>

    </Layout>
  );
}

export default Projects;