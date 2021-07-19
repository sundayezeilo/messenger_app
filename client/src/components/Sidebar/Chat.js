import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { withStyles } from '@material-ui/core/styles';
import { setActiveChat } from '../../store/activeConversation';
import { updateMsgReadStatus } from '../../store/utils/thunkCreators';
import BadgeUnread from './BadgeUnread';
import { connect } from 'react-redux';

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

class Chat extends Component {
  handleClick = (conversation) => {
    const { messages } = conversation;

    this.props.setActiveChat(conversation.otherUser.username);

    if (!messages[messages.length - 1].recipientRead) {
      this.props.updateReadStatus(conversation.id);
    }
  };

  render() {
    const { classes } = this.props;
    const otherUser = this.props.conversation.otherUser;
    return (
      <Box
        className={classes.root}
        onClick={() => this.handleClick(this.props.conversation)}
      >
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={true}
        />
        <ChatContent conversation={this.props.conversation} />
        <BadgeUnread
          unread={this.props.conversation.messages.filter(
            (msg) => !msg.recipientRead && msg.senderId !== this.props.user.id
          )}
        />
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },

    updateReadStatus: (convId) => {
      dispatch(updateMsgReadStatus(convId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat));
