import React from 'react';
import { Box, Badge } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  badge: {
    fontSize: 20,
    minHeight: 25,
    minWidth: 25,
    color: '#FFF',
    marginRight: 20,
    borderRadius: '50%',
    backgroundColor: '#DC004E',
  },
}));

export default function BadgeUnread(props) {
  const classes = useStyles();

  return (
    <Box>
      <Badge
        classes={{ badge: `${classes.badge}` }}
        badgeContent={props.unread.length}
        color='secondary'
      />
    </Box>
  );
}
