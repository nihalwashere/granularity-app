import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const vertical = "top";
const horizontal = "right";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const SnackBar = (props) => {
  const { open, handleClose, message, severity } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={message}
      autoHideDuration={2000}
      key={vertical + horizontal}
    >
      {severity && message ? (
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      ) : null}
    </Snackbar>
  );
};

SnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  severity: PropTypes.string,
};

export default SnackBar;
