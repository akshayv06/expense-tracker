const { createUser, getUserById } = require("../services/user.service");
const { getMonthlySummary } = require("../services/summary.service");

exports.createUser = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    if (err.message === "Invalid user ID") {
      return res.status(400).json({ error: err.message });
    }
    if (err.message === "User not found") {
      return res.status(404).json({ error: err.message });
    }
    next(err);
  }
};

exports.getUserSummary = async (req, res, next) => {
  try {
    const summary = await getMonthlySummary(req.params.id);
    res.status(200).json(summary);
  } catch (err) {
    next(err);
  }
};
