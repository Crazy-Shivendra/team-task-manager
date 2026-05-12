const Task = require("../models/Task");

const getDashboardStats = async (req, res) => {
  try {

    // Total tasks
    const totalTasks =
      await Task.countDocuments();

    // Completed tasks
    const completedTasks =
      await Task.countDocuments({
        status: "completed",
      });

    // Pending tasks
    const pendingTasks =
      await Task.countDocuments({
        status: "pending",
      });

    // In Progress tasks
    const inProgressTasks =
      await Task.countDocuments({
        status: "in-progress",
      });

    // Overdue tasks
    const overdueTasks =
      await Task.countDocuments({
        dueDate: {
          $lt: new Date(),
        },
        status: {
          $ne: "completed",
        },
      });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};