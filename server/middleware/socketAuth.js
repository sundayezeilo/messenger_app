const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { promisify } = require('util');

const authenticateConnection = async (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) next(new Error('authentication failed!'));

  try {
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SESSION_SECRET
    );

    await User.findOne({
      where: { id: decoded.id },
    });

    next();
  } catch {
    next(new Error('authentication failed!'));
  }
};

module.exports = authenticateConnection;
