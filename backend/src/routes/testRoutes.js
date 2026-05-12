const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// MEMBER OR ADMIN
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Profile accessed",
      user: req.user,
    });
  }
);


// ADMIN ONLY
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

module.exports = router;