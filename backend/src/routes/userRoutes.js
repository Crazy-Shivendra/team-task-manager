const express = require("express");

const router = express.Router();

const {
  getUsers,
  promoteToAdmin,
} = require("../controllers/userController");

const authMiddleware =
require("../middleware/authMiddleware");
const roleMiddleware =
require("../middleware/roleMiddleware");


// GET USERS
router.get(
  "/",
  authMiddleware,
  getUsers
);

router.put(
  "/promote/:id",
  authMiddleware,
  roleMiddleware("admin"),
  promoteToAdmin
);

module.exports = router;