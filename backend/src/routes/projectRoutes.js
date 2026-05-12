const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
  addMember,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// CREATE PROJECT (ADMIN ONLY)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createProject
);


// GET PROJECTS
router.get(
  "/",
  authMiddleware,
  getProjects
);

router.put(
  "/add-member",
  authMiddleware,
  roleMiddleware("admin"),
  addMember
);

module.exports = router;