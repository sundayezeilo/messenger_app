const router = require('express').Router();
const onlineUsers = require('../../onlineUsers');
const { Conversation, Message } = require('../../db/models');
const { isAuthorizedToSendToConv } = require('../../middleware/authorization');

router.post('/', isAuthorizedToSendToConv, async (req, res, next) => {
  try {
    const sender = req.user;
    const { recipientId, text, conversationId } = req.body;
    let conversation;

    if (!conversationId) {
      conversation = await Conversation.findConversation(
        sender.id,
        recipientId
      );

      if (!conversation) {
        conversation = await Conversation.create({
          user1Id: sender.id,
          user2Id: recipientId,
        });

        if (onlineUsers.includes(sender.id)) {
          sender.online = true;
        }
      }
    }

    const message = await Message.create({
      senderId: sender.id,
      text,
      conversationId: conversationId || conversation.id,
    });

    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
