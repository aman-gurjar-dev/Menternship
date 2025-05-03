const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },
    bio: { type: String, default: "" },
    role: { 
      type: String, 
      enum: ["User", "Mentor", "Admin", "Student"], 
      default: "User" 
    },
    phone: { type: String, default: "" },
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }],
    college: { type: String, default: "" },
    followedMentors: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Mentor" 
    }],
    chatHistory: [
        {
          text: String,
          sender: {
            type: String,
            enum: ['user', 'bot'],
            required: true
          },
          timestamp: {
            type: Date,
            default: Date.now
          }
        }
    ],
    learningGoals: [{  
      title: String,
      targetDate: Date
    }],
    bookedSessions: [{  
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session"
    }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true } 
});

// Virtual for mentor status
userSchema.virtual('isMentor').get(function() {
  return this.role === "Mentor";
});

// Virtual to track unread messages
userSchema.virtual('unreadMessages').get(function() {
  // Assuming you have a message model that keeps track of read/unread statuses
  return this.chatHistory.filter(msg => msg.status === "unread").length;
});

module.exports = mongoose.model('studentdata', userSchema);
