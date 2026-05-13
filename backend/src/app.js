const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const projectRoutes =require("./routes/projectRoutes");
const taskRoutes =require("./routes/taskRoutes");
const dashboardRoutes =require("./routes/dashboardRoutes");
const userRoutes =require("./routes/userRoutes");


app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

module.exports = app;