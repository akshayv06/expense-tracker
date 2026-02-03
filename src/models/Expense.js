const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    amount: { type: Number, required: true },
    category: { type: String },
    date: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

// ✅ Async pre-save hook (Mongoose v7+ safe)
expenseSchema.pre("save", async function () {
  const userExists = await mongoose
    .model("User")
    .exists({ _id: this.user });

  if (!userExists) {
    throw new Error("User does not exist");
  }
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
