import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import AnswerFormContainer from "../../containers/answer-form";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "#66b2b2",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontFamily: "Muli",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PreviewFormDialog = (props) => {
  const classes = useStyles();

  const { open, handleClose, questions } = props;

  const [isMobileView, setIsMobileView] = useState(true);

  const handleIsMobileView = (event) => {
    setIsMobileView(event.target.checked);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Preview
            </Typography>

            <div className="preview-form-dialog-is-mobile-switch-container">
              <Typography variant="subtitle2" className={classes.title}>
                Desktop
              </Typography>

              <Switch
                checked={isMobileView}
                onChange={handleIsMobileView}
                color="default"
              />

              <Typography variant="subtitle2" className={classes.title}>
                Mobile
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        <div className="preview-form-dialog-answer-form-root-container">
          <div
            className={
              isMobileView
                ? "preview-form-dialog-answer-form-container-mobile-view"
                : "preview-form-dialog-answer-form-container-desktop-view"
            }
          >
            <AnswerFormContainer
              isPreviewMode
              isMobilePreviewMode={isMobileView}
              questions={questions}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

PreviewFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};

export default PreviewFormDialog;
