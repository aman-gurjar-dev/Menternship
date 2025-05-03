const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');

const socketMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Unauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error('Invalid token'));
    }

    socket.userId = decoded.userId;
    next();
  });
};

module.exports = socketMiddleware;