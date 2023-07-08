import React, { useState, useEffect } from "react";
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

const RenameFormDialog = (props) => {
  const { open, handleClose, handleSave, oldName = "" } = props;

  const [name, setName] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const saveName = () => {
    handleSave(name);
  };

  useEffect(() => {
    if (!name || name !== oldName) {
      setName(oldName);
    }
  }, [oldName]);

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
        <DialogTitle onClose={handleClose}>Rename this form</DialogTitle>

        <DialogContent dividers>
          <div style={{ width: "100%", marginTop: 20, marginBottom: 20 }}>
            <TextField
              variant="outlined"
              value={name}
              onChange={handleName}
              autoComplete="new-password"
              style={{ width: "100%" }}
              className="input-text-field"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <SaveButton onClick={saveName} disabled={name ? false : true}>
            Save
          </SaveButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

RenameFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  oldName: PropTypes.string,
};

export default RenameFormDialog;
