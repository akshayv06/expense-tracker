// src/services/expense.service.js
const Expense = require("../models/Expense");
const User = require("../models/User");
const mongoose = require("mongoose");

// Option A: Import your date helpers (recommended)
const { parseStartOfDay, parseEndOfDay } = require("../utils/date.utils");

async function getUserExpenses(userId, query = {}) {
  // Validate userId early
  if (!mongoose.isValidObjectId(userId)) {
    throw new Error("Invalid user ID format");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Pagination defaults
  const page  = parseInt(query.page, 10)  || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip  = (page - 1) * limit;

  // Build filter
  const filter = { user: userId };

  if (query.category) {
    filter.category = query.category.toLowerCase().trim();
  }

  if (query.startDate || query.endDate) {
    filter.date = {};

    if (query.startDate) {
      const start = parseStartOfDay(query.startDate);
      if (!start) {
        throw new Error("Invalid startDate format. Use YYYY-MM-DD");
      }
      filter.date.$gte = start;
    }

    if (query.endDate) {
      const end = parseEndOfDay(query.endDate);
      if (!end) {
        throw new Error("Invalid endDate format. Use YYYY-MM-DD");
      }
      filter.date.$lte = end;
    }
  }

  // Execute both queries in parallel
  const [expenses, total] = await Promise.all([
    Expense.find(filter)
      .sort({ date: -1 })     // newest first
      .skip(skip)
      .limit(limit)
      .lean()                 // faster if you don't need virtuals/methods
      .exec(),

    Expense.countDocuments(filter)
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    expenses,
  };
}

module.exports = { getUserExpenses };