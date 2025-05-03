const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  seats: { type: Number, required: true },
  status: { type: String, enum: ["available", "booked"], required: true },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentdata"
  }
});

const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentdata"
  }
});

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  degrees: { type: String, required: false },
  expertise: { type: [String], required: [] },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  password: { type: String, required: true },
  role: { type: String, default: "Mentor" },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  about: { type: String, default: "Mentor" },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  slots: { type: [SlotSchema], default: [] },
  reviews: { type: [ReviewSchema], default: [] }, // Ensure default array
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "studentdata", unique: true }],
  profileImage: { type: String, default: "default-mentor.jpg" },
  sessionRate: { type: Number, default: 100 },
  availability: {
    days: { type: [String], default: [] },
    hours: { type: String, default: "9:00 AM - 5:00 PM" }
  }
}, { 
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      // Ensure reviews exists in the output
      if (!ret.reviews) {
        ret.reviews = [];
      }
      return ret;
    }
  }
});

// Safe virtual property with null checks
MentorSchema.virtual('averageRating').get(function() {
  if (!this.reviews || !Array.isArray(this.reviews)) return 0;
  if (this.reviews.length === 0) return 0;
  
  const sum = this.reviews.reduce((acc, review) => {
    return acc + (review.rating || 0);
  }, 0);
  
  return (sum / this.reviews.length).toFixed(1);
});

// Virtual for followers count
MentorSchema.virtual('followersCount').get(function() {
  return this.followers?.length || 0;
});

// Add index for better performance
MentorSchema.index({ name: 'text', expertise: 'text' });

// Add these to your MentorSchema
MentorSchema.virtual('completedSessions').get(function() {
  return this.slots?.filter(s => s.status === 'completed').length || 0;
});

MentorSchema.virtual('upcomingSessions').get(function() {
  return this.slots?.filter(s => s.status === 'booked').length || 0;
});

MentorSchema.virtual('pendingMessages').get(function() {
  // You'll need to implement this based on your message system
  return 0;
});

module.exports = mongoose.model("Mentor", MentorSchema);