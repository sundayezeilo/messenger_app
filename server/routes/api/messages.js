const router = require('express').Router();
const onlineUsers = require('../../onlineUsers');
const { Conversation, Message } = require('../../db/models');
const { isAuthorizedToSendToConv } = require('../../middleware/authorization');
const sockets = require('../../socketConnection');

router.post('/', isAuthorizedToSendToConv, async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    if (!text) return res.sendStatus(400);

    let conversation;

    if (!conversationId) {
      conversation = await Conversation.findConversation(senderId, recipientId);

      if (!conversation) {
        conversation = await Conversation.create({
          user1Id: senderId,
          user2Id: recipientId,
        });

        if (onlineUsers[sender.id]) {
          sender.online = true;
        }
      }
    }

    const message = await Message.create({
      senderId,
      text,
      conversationId: conversationId || conversation.id,
    });

    if(onlineUsers[recipientId]) {
      onlineUsers[recipientId].emit('new-message', {
        message,
        sender,
      });
    }

    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
