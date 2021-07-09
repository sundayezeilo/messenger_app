const Conversation = require('../db/models/conversation');

const isAuthorizedToSendToConv = async (req, res, next) => {
  const { conversationId } = req.body;
  const currentUser = req.user;

  if (!currentUser) return res.sendStatus(401);

  if (conversationId) {
    const conv = await Conversation.findOne({
      where: { id: conversationId },
    });

    // no conversation, return 404
    if (!conv) return res.sendStatus(404);

    // Ensure that users can send messages to only their own conversation(s)
    if (![conv.user1Id, conv.user2Id].includes(currentUser.id))
      // not authorized, return 403
      return res.sendStatus(403);
  }
  return next();
};

module.exports = { isAuthorizedToSendToConv };
