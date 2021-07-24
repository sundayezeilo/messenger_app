const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { promisify } = require('util');

const authenticateConnection = async (socket, next) => {
  const token = socket.handshake.auth ? socket.handshake.auth.token : null;

  if (!token) return next(new Error('Bad request'));

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SESSION_SECRET
    );

    const user = await User.findOne({
      where: { id: decoded.id },
    });
    if (!user) return next(new Error('Not authorized!'));
    socket.user = user;
    next();
  } catch {
    return next(new Error('authentication failed!'));
  }
};

module.exports = authenticateConnection;
