const Expense = require("../models/Expense");
const User = require("../models/User");
const mongoose = require("mongoose");
const { getCurrentMonthRange } = require("../utils/date.utils");

async function getMonthlySummary(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const { start, end } = getCurrentMonthRange();

  const summary = await Expense.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        date: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: null,
        totalExpenses: { $sum: "$amount" },
        expenseCount: { $sum: 1 }
      }
    }
  ]);

  const totalExpenses = summary[0]?.totalExpenses || 0;
  const expenseCount = summary[0]?.expenseCount || 0;

  return {
    month: start.toLocaleString("default", { month: "long", year: "numeric" }),
    totalExpenses,
    remainingBudget: user.monthlyBudget - totalExpenses,
    expenseCount
  };
}

module.exports = { getMonthlySummary };
