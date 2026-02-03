const User = require("../models/User");
const mongoose = require("mongoose");

exports.createUser = async ({ name, email }) => {
  if (!name || !email) {
    throw new Error("name and email are required");
  }

  const user = new User({ name, email });
  await user.save();
  return user;
};

exports.getUserById = async (id) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid user ID");
  }

  const user = await User.findById(id).lean();
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
