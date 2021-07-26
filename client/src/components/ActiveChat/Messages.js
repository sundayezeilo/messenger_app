import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
import { updateMsgReadStatus } from '../../store/utils/thunkCreators';

const Messages = (props) => {
  const { messages, otherUser, userId, convoId } = props;

  const dispatch = useDispatch();

  const handleMouseOver = (id) => {
    if (!messages?.length) return;

    const mostRecentMsg = messages[messages.length - 1];

    if (!mostRecentMsg.recipientRead && mostRecentMsg.senderId.id !== userId)
      dispatch(updateMsgReadStatus(id));
  };

  return (
    <Box onMouseOver={() => handleMouseOver(convoId)}>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
