const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    totalDays: { type: Number, required: true },
    completedDays: { type: Number, default: 0 },
    missedDays: { type: Number, default: 0 },
    skippedDays: { type: Number, default: 0 }, // ✅ New field for skipped days
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
