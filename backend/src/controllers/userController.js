const User = require("../models/User");

// GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: "member",
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const promoteToAdmin = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = "admin";

    await user.save();

    res.status(200).json({
      message:
        "User promoted to admin",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getUsers,
    promoteToAdmin,
};
