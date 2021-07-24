import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { withStyles } from '@material-ui/core/styles';
import { setActiveChat } from '../../store/activeConversation';
import { updateMsgReadStatus } from '../../store/utils/thunkCreators';
import BadgeUnread from './BadgeUnread';

const styles = {
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
};

const Chat = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleClick = (conversation) => {
    const { messages } = conversation;

    dispatch(setActiveChat(conversation.otherUser.username));

    if (messages?.length && !messages[messages.length - 1].recipientRead) {
      dispatch(updateMsgReadStatus(conversation.id));
    }
  };

  const { classes } = props;
  const otherUser = props.conversation.otherUser;

  const unread = props.conversation.messages.filter(
    (msg) => !msg.recipientRead && msg.senderId !== user.id
  );

  return (
    <Box
      className={classes.root}
      onClick={() => handleClick(props.conversation)}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} unread={unread.length} />
      <BadgeUnread unread={unread} />
    </Box>
  );
};

export default (withStyles(styles)(Chat));
