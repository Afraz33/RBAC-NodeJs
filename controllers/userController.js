const User = require("../models/userModel");

async function getUser(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error getting user", error: err.message });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const updates = req.body;

  const allowedUpdates = ["name", "password"];

  const isValidUpdate = Object.keys(updates).every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).json({ message: "Invalid update fields" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updates.name) {
      user.name = updates.name;
    }

    const updatedUser = await user.save();

    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
}

module.exports = { getUser, updateUser };
