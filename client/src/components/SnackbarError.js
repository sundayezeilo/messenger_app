import React from "react";
import { Button, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    backgroundColor: "red",
    fontWeight: "bold"
  },
  icon: {
    color: "white"
  }
}));

const SnackbarError = (props) => {
  const classes = useStyles();
  return (
    <Snackbar
      open={props.snackBarOpen}
      onClose={() => props.setSnackBarOpen(false)}
      message={props.errorMessage || "Sorry, an error occured. Please try again"}
      action={
        <React.Fragment>
          <Button
            className={classes.icon}
            size="small"
            onClick={() => props.setSnackBarOpen(false)}>
            <Close color="secondary" />
          </Button>
        </React.Fragment>
      }
      ContentProps={{
        classes: {
          root: classes.snackbar
        }
      }}
    />
  );
};

export default SnackbarError;
