const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");

// POST /expenses – Add an expense for a user
router.post("/expenses", expenseController.createExpense);

module.exports = router;
