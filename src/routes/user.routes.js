const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const expenseController = require("../controllers/expense.controller");
const summaryController = require("../controllers/summary.controller");

// POST /users – Create a new user
router.post("/users", userController.createUser);

// GET /users/:id – Get user details
router.get("/users/:id", userController.getUserById);

// GET /users/:id/expenses – Fetch all expenses for a user
router.get("/users/:id/expenses", expenseController.getExpensesByUser);

// GET /users/:id/summary – Fetch monthly expense summary
router.get("/users/:id/summary", summaryController.getMonthlySummary);

module.exports = router;
