const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

const authMiddleware =
require("../middleware/authMiddleware");

const roleMiddleware =
require("../middleware/roleMiddleware");


// CREATE TASK (ADMIN ONLY)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createTask
);


// GET TASKS
router.get(
  "/",
  authMiddleware,
  getTasks
);


// UPDATE TASK STATUS
router.put(
  "/:id",
  authMiddleware,
  updateTaskStatus
);

module.exports = router;