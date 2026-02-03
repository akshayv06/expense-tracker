const mongoose = require("mongoose");
const { getMonthlySummary: getMonthlySummaryService } = require("../services/summary.service");

exports.getMonthlySummary = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const summary = await getMonthlySummaryService(userId);
    return res.status(200).json(summary);

  } catch (err) {
    if (err?.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }

    // fallback error
    return res.status(500).json({ error: "Internal server error" });
  }
};
