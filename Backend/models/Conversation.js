const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  mentorId: { type: Schema.Types.ObjectId, ref: 'Mentor' },
  lastMessageAt: { type: Date },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }] // Reference to Message
});

module.exports = mongoose.model('Conversation', conversationSchema);
