import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { OkayButton } from "../CustomButton";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" style={{ fontFamily: "Muli" }}>
        {children}
      </Typography>

      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

const PasswordResetInstructionsSentDialog = (props) => {
  const { open, handleClose, handleOkay } = props;

  return (
    <div>
      <Dialog
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose(event, reason);
          }
        }}
        open={open}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle onClose={handleClose}>Affirmative!</DialogTitle>

        <DialogContent dividers>
          <Typography style={{ fontFamily: "Muli" }}>
            If the address you just typed matches one of our accounts,
            we&apos;ll send an email there with instructions to reset your
            password.
          </Typography>
        </DialogContent>

        <DialogActions>
          <OkayButton onClick={handleOkay}>Okay</OkayButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PasswordResetInstructionsSentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOkay: PropTypes.func.isRequired,
};

export default PasswordResetInstructionsSentDialog;
