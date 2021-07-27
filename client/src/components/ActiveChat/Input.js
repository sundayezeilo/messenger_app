import React, { useState } from 'react';
import { FormControl, FilledInput } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { postMessage } from '../../store/utils/thunkCreators';

const styles = {
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    marginBottom: 20,
  },
};

const Input = (props) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    if (event.target.text.value) {
      const reqBody = {
        text: event.target.text.value,
        recipientId: props.otherUser.id,
        conversationId: props.conversationId,
        sender: props.conversationId ? null : user,
      };
      dispatch(postMessage(reqBody));
      setText('');
    }
  };

  const { classes } = props;
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder='Type something...'
          value={text}
          name='text'
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

export default withStyles(styles)(Input);
