const Expense = require("../models/Expense");
const User = require("../models/User");
const mongoose = require("mongoose");
const { getUserExpenses } = require("../services/expense.service");

exports.createExpense = async (req, res, next) => {
  try {
    const { user, amount, category, date } = req.body;

    if (!user || amount == null) {
      return res.status(400).json({ error: "user and amount are required" });
    }

    if (!mongoose.isValidObjectId(user)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const expense = new Expense({ user, amount, category, date });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

exports.getExpensesByUser = async (req, res, next) => {
  try {
    const data = await getUserExpenses(req.params.id, req.query);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
