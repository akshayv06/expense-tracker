const express = require("express");
const app = express();

const userRoutes = require("./routes/user.routes");
const expenseRoutes = require("./routes/expense.routes");
const errorMiddleware = require("./middlewares/error.middleware");

app.use(express.json());

// Routes
app.use("/", userRoutes);
app.use("/", expenseRoutes);

// Global Error Handler (LAST)
app.use(errorMiddleware);

module.exports = app;
