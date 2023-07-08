import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { SaveButton } from "../CustomButton";

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

const ChangePasswordDialog = (props) => {
  const { open, handleClose, handleSave } = props;

  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordValidationError, setOldPasswordValidationError] =
    useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordValidationError, setNewPasswordValidationError] =
    useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [
    confirmNewPasswordValidationError,
    setConfirmNewPasswordValidationError,
  ] = useState("");

  const handleOldPassword = (event) => {
    if (oldPasswordValidationError) {
      setOldPasswordValidationError("");
    }

    setOldPassword(event.target.value);
  };

  const handleNewPassword = (event) => {
    if (newPasswordValidationError) {
      setNewPasswordValidationError("");
    }

    setNewPassword(event.target.value);
  };

  const handleConfirmNewPassword = (event) => {
    if (confirmNewPasswordValidationError) {
      setConfirmNewPasswordValidationError("");
    }

    setConfirmNewPassword(event.target.value);
  };

  const isInputValid = () => {
    let isValid = true;

    if (!oldPassword) {
      isValid = false;
      setOldPasswordValidationError("Please enter your current password");
    }

    if (!newPassword) {
      isValid = false;
      setNewPasswordValidationError("Please enter your new password");
    }

    if (newPassword && newPassword.length < 8) {
      isValid = false;
      setNewPasswordValidationError("Please enter atleast 8 characters");
    }

    if (!confirmNewPassword) {
      isValid = false;
      setConfirmNewPasswordValidationError("Please confirm your new password");
    }

    if (confirmNewPassword && confirmNewPassword.length < 8) {
      isValid = false;
      setConfirmNewPasswordValidationError("Please enter atleast 8 characters");
    }

    if (
      newPassword &&
      confirmNewPassword &&
      newPassword !== confirmNewPassword
    ) {
      isValid = false;
      setConfirmNewPasswordValidationError(
        "New and confirmed password does not match"
      );
    }

    return isValid;
  };

  const saveName = () => {
    if (!isInputValid()) {
      return;
    }

    handleSave({ oldPassword, newPassword, confirmNewPassword });
  };

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
        <DialogTitle onClose={handleClose}>Change your password</DialogTitle>

        <DialogContent dividers>
          <div style={{ marginBottom: 20 }}>
            <Typography variant="subtitle1" style={{ fontFamily: "Muli" }}>
              Old password
            </Typography>

            <div style={{ width: "100%", marginTop: 10 }}>
              <TextField
                variant="outlined"
                value={oldPassword}
                onChange={handleOldPassword}
                autoComplete="new-password"
                style={{ width: "100%" }}
                className="input-text-field"
                type="password"
                error={!!oldPasswordValidationError}
              />

              {!!oldPasswordValidationError && (
                <span
                  style={{
                    marginTop: 2,
                    fontFamily: "Muli",
                    fontSize: 14,
                    color: "#c73030",
                  }}
                >
                  {oldPasswordValidationError}
                </span>
              )}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <Typography variant="subtitle1" style={{ fontFamily: "Muli" }}>
              New password
            </Typography>

            <div style={{ width: "100%", marginTop: 10 }}>
              <TextField
                variant="outlined"
                value={newPassword}
                onChange={handleNewPassword}
                autoComplete="new-password"
                style={{ width: "100%" }}
                className="input-text-field"
                type="password"
                error={!!newPasswordValidationError}
              />

              {!!newPasswordValidationError && (
                <span
                  style={{
                    marginTop: 2,
                    fontFamily: "Muli",
                    fontSize: 14,
                    color: "#c73030",
                  }}
                >
                  {newPasswordValidationError}
                </span>
              )}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <Typography variant="subtitle1" style={{ fontFamily: "Muli" }}>
              Confirm your new password
            </Typography>

            <div style={{ width: "100%", marginTop: 10 }}>
              <TextField
                variant="outlined"
                value={confirmNewPassword}
                onChange={handleConfirmNewPassword}
                autoComplete="new-password"
                style={{ width: "100%" }}
                className="input-text-field"
                type="password"
                error={!!confirmNewPasswordValidationError}
              />

              {!!confirmNewPasswordValidationError && (
                <span
                  style={{
                    marginTop: 2,
                    fontFamily: "Muli",
                    fontSize: 14,
                    color: "#c73030",
                  }}
                >
                  {confirmNewPasswordValidationError}
                </span>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <SaveButton onClick={saveName}>Save</SaveButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ChangePasswordDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default ChangePasswordDialog;
