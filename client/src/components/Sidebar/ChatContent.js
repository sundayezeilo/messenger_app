import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    fontWeight: 'bold',
    letterSpacing: -0.17,
  },
  previewTextUnread: {
    fontWeight: 'bold',
    letterSpacing: -0.17,
    color: '#000',
    fontSize: 12,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, unread } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={`${unread ? classes.previewTextUnread : classes.previewText}`}>
          {latestMessageText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
