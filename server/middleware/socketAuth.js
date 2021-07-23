const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

const authenticateConnection = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (token) {
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err) {
        next(new Error('invalid token'));
      }
      User.findOne({
        where: { id: decoded.id },
      })
        .then(() => next())
        .catch(() => next(new Error('authentication failed!')));
    });
  }
  next(new Error('authentication failed!'));
};

module.exports = authenticateConnection;
