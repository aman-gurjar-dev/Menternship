const socketIo = require('socket.io');

const io = socketIo();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', async (data) => {
    const { text, receiver } = data;

    // Store the message in the database
    const message = new Message({
      text,
      sender: socket.userId, // Assuming you have userId from the token
      receiver,
      createdAt: new Date(),
    });

    await message.save();

    // Emit the message to the receiver
    socket.to(receiver).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

module.exports = io;