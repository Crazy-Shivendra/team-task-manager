const Task = require("../models/Task");
const Project = require("../models/Project");


// CREATE TASK
const createTask = async (req, res) => {

  try {

    // ONLY ADMIN
    if (req.user.role !== "admin") {

      return res.status(403).json({
        message: "Only admin can create tasks",
      });

    }

    const {
      title,
      description,
      dueDate,
      assignedTo,
      project,
      priority,
    } = req.body;


    // CHECK PROJECT EXISTS
    const existingProject =
      await Project.findById(project);

    if (!existingProject) {

      return res.status(404).json({
        message: "Project not found",
      });

    }


    // CHECK MEMBER BELONGS TO PROJECT
    if (
      !existingProject.members.includes(
        assignedTo
      )
    ) {

      return res.status(400).json({
        message:
          "User is not a member of this project",
      });

    }


    // CREATE TASK
    const task = await Task.create({
      title,
      description,
      dueDate,
      assignedTo,
      project,
      priority,
      createdBy: req.user._id,
    });


    res.status(201).json({
      message: "Task created successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// GET TASKS
const getTasks = async (req, res) => {

  try {

    let tasks;

    // ADMIN -> ALL TASKS
    if (req.user.role === "admin") {

      tasks = await Task.find();

    }

    // MEMBER -> ONLY ASSIGNED TASKS
    else {

      tasks = await Task.find({
        assignedTo: req.user._id,
      });

    }


    tasks = await Task.populate(tasks, [
      {
        path: "assignedTo",
        select: "name email",
      },
      {
        path: "project",
        select: "title",
      },
      {
        path: "createdBy",
        select: "name",
      },
    ]);


    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



// UPDATE TASK STATUS
const updateTaskStatus = async (
  req,
  res
) => {

  try {

    const { status } = req.body;


    // FIND TASK
    const task = await Task.findById(
      req.params.id
    );


    // TASK NOT FOUND
    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });

    }


    // ONLY ASSIGNED USER CAN UPDATE
    if (
      task.assignedTo.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403).json({
        message:
          "You can update only your assigned tasks",
      });

    }


    task.status = status;

    await task.save();


    res.status(200).json({
      message: "Task updated successfully",
      task,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
};