const Conversation = require('../db/models/conversation');

const isAuthorizedToSendToConv = async (req, res, next) => {
  const { conversationId } = req.body;
  const currentUser = req.user;

  if (!currentUser) return res.sendStatus(401);

  if (conversationId) {
    const conv = await Conversation.findOne({
      where: { id: conversationId },
    });

    if (!conv) return res.sendStatus(404);

    if (![conv.user1Id, conv.user2Id].includes(currentUser.id))
      return res.sendStatus(403);
  }
  return next();
};

module.exports = { isAuthorizedToSendToConv };
