const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentdata",
    required: true
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  duration: { type: Number, default: 60 }, // in minutes
  topic: { type: String, required: true },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled"
  },
  notes: { type: String },
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model("Session", SessionSchema);