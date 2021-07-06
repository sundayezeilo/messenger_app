import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 89,
    marginBottom: 34,
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.10)"
  },
  content: {
    display: "flex",
    alignItems: "center",
    marginLeft: 24
  },
  username: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: "bold",
    marginRight: 14
  },
  statusText: {
    fontSize: 12,
    color: "#BFC9DB",
    letterSpacing: -0.17
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: "50%",
    marginRight: 5,
    backgroundColor: "#D0DAE9"
  },
  online: {
    background: "#1CED84"
  },
  ellipsis: {
    color: "#95A7C4",
    marginRight: 24,
    opacity: 0.5
  }
}));

const Header = (props) => {
  const classes = useStyles();
  const { username, online } = props;

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Typography className={classes.username}>{username}</Typography>
        <Box className={`${classes.statusDot} ${classes[online && "online"]}`}></Box>
        <Typography className={classes.statusText}>{online ? "Online" : "Offline"}</Typography>
      </Box>
      <MoreHorizIcon classes={{ root: classes.ellipsis }} />
    </Box>
  );
};

export default Header;
