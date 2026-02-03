const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: false // we normalize manually
    },
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

// Normalize email
userSchema.pre("save", async function () {
  if (this.isModified("email") || this.isNew) {
    this.email = this.email.toLowerCase().trim();
  }
});

// Force collection name to "users"
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
