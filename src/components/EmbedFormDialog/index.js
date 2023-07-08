import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import Switch from "@material-ui/core/Switch";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { CopyBlock, atomOneDark } from "react-code-blocks";
import { CopyButton } from "../CustomButton";
import {
  EmbedLayoutOptions,
  EmbedLayoutType,
  EmbedType,
  EmbedUnitTypes,
} from "../../enums/Embed";
import { getEmbedCode } from "./helper";
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

const EmbedFormDialog = (props) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const { open, handleClose, embedOption, formRef, publicLink } = props;

  const [embedWidth, setEmbedWidth] = useState("100");

  const [embedHeight, setEmbedHeight] = useState("600");

  const [embedWidthUnit, setEmbedWidthUnit] = useState("%");

  const [embedHeightUnit, setEmbedHeightUnit] = useState("px");

  const [isFullScreenMode, setIsFullScreenMode] = useState(false);

  const [embedLayout, setEmbedLayout] = useState(EmbedLayoutType.STANDARD);

  const [embedCode, setEmbedCode] = useState(
    getEmbedCode({
      type: embedOption.type,
      layout: embedLayout,
      width: "100%",
      height: "600px",
      formRef,
    })
  );

  const handleIsFullScreen = (event) => {
    setIsFullScreenMode(event.target.checked);

    if (event.target.checked) {
      setEmbedCode(
        getEmbedCode({
          type: embedOption.type,
          layout: embedLayout,
          formRef,
          isFullScreen: true,
        })
      );
    } else {
      setEmbedCode(
        getEmbedCode({
          type: embedOption.type,
          layout: embedLayout,
          width: `${embedWidth}${embedWidthUnit}`,
          height: `${embedHeight}${embedHeightUnit}`,
          formRef,
          isFullScreen: false,
        })
      );
    }
  };

  const handleEmbedLayoutChange = (event) => {
    setEmbedLayout(event.target.value);
    setEmbedCode(
      getEmbedCode({
        type: embedOption.type,
        layout: event.target.value,
        width: `${embedWidth}${embedWidthUnit}`,
        height: `${embedHeight}${embedHeightUnit}`,
        formRef,
        isFullScreen: isFullScreenMode,
      })
    );
  };

  const handleEmbedWidthChange = (event) => {
    setEmbedWidth(event.target.value);
    setEmbedCode(
      getEmbedCode({
        type: embedOption.type,
        layout: embedLayout,
        width: `${event.target.value}${embedWidthUnit}`,
        height: `${embedHeight}${embedHeightUnit}`,
        formRef,
      })
    );
  };

  const handleEmbedHeightChange = (event) => {
    setEmbedHeight(event.target.value);
    setEmbedCode(
      getEmbedCode({
        type: embedOption.type,
        layout: embedLayout,
        width: `${embedWidth}${embedWidthUnit}`,
        height: `${event.target.value}${embedHeightUnit}`,
        formRef,
      })
    );
  };

  const handleEmbedWidthUnitChange = (event) => {
    setEmbedWidthUnit(event.target.value);
    setEmbedCode(
      getEmbedCode({
        type: embedOption.type,
        layout: embedLayout,
        width: `${embedWidth}${event.target.value}`,
        height: `${embedHeight}${embedHeightUnit}`,
        formRef,
      })
    );
  };

  const handleEmbedHeightUnitChange = (event) => {
    setEmbedHeightUnit(event.target.value);
    setEmbedCode(
      getEmbedCode({
        type: embedOption.type,
        layout: embedLayout,
        width: `${embedWidth}${embedWidthUnit}`,
        height: `${embedHeight}${event.target.value}`,
        formRef,
      })
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(publicLink);

    enqueueSnackbar("Link copied to clipboard!", { variant: "success" });
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
              {embedOption.name}
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="embed-form-dialog-root-container">
          {(embedOption.type === EmbedType.IFRAME ||
            embedOption.type === EmbedType.JAVASCRIPT ||
            embedOption.type === EmbedType.REACTJS) && (
            <div className="embed-form-container">
              <div className="embed-form-settings-container">
                <span className="embed-form-window-settings-text">
                  Settings
                </span>

                {embedLayout !== EmbedLayoutType.POPUP && (
                  <div className="embed-form-settings-full-screen-switch-container">
                    <span className="embed-form-window-full-screen-text">
                      Set to Fullscreen?
                    </span>

                    <Switch
                      checked={isFullScreenMode}
                      onChange={handleIsFullScreen}
                      className="embed-form-full-screen-switch"
                    />
                  </div>
                )}

                {(embedOption.type === EmbedType.JAVASCRIPT ||
                  embedOption.type === EmbedType.REACTJS) && (
                  <div className="embed-form-settings-layout-switch-container">
                    <span className="embed-form-window-layout-text">
                      Layout
                    </span>

                    <FormControl
                      variant="outlined"
                      className="embed-form-settings-input-select-field"
                      style={{ width: 120 }}
                    >
                      <Select
                        value={embedLayout}
                        onChange={handleEmbedLayoutChange}
                        autoComplete="off"
                        inputProps={{
                          autoComplete: "new-password",
                        }}
                      >
                        {EmbedLayoutOptions.map((option) => (
                          <MenuItem
                            key={option.value}
                            value={option.value}
                            style={{
                              fontFamily: "Muli",
                              fontSize: 14,
                            }}
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}

                {!isFullScreenMode && embedLayout !== EmbedLayoutType.POPUP && (
                  <div>
                    <div className="embed-form-setting-container">
                      <span className="embed-form-setting-header">Width: </span>

                      <div>
                        <TextField
                          variant="outlined"
                          value={embedWidth}
                          onChange={handleEmbedWidthChange}
                          className="embed-form-settings-input-text-field"
                        />
                      </div>

                      <FormControl
                        variant="outlined"
                        className="embed-form-settings-input-select-field"
                      >
                        <Select
                          value={embedWidthUnit}
                          onChange={handleEmbedWidthUnitChange}
                          autoComplete="off"
                          inputProps={{
                            autoComplete: "new-password",
                          }}
                        >
                          {EmbedUnitTypes.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                              style={{
                                fontFamily: "Muli",
                                fontSize: 14,
                              }}
                            >
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="embed-form-setting-container">
                      <span className="embed-form-setting-header">
                        Height:{" "}
                      </span>

                      <div>
                        <TextField
                          variant="outlined"
                          value={embedHeight}
                          onChange={handleEmbedHeightChange}
                          className="embed-form-settings-input-text-field"
                        />
                      </div>

                      <FormControl
                        variant="outlined"
                        className="embed-form-settings-input-select-field"
                      >
                        <Select
                          value={embedHeightUnit}
                          onChange={handleEmbedHeightUnitChange}
                          autoComplete="off"
                          inputProps={{
                            autoComplete: "new-password",
                          }}
                        >
                          {EmbedUnitTypes.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                              style={{
                                fontFamily: "Muli",
                                fontSize: 14,
                              }}
                            >
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                )}
              </div>

              <div className="embed-form-instructions-container">
                Paste this code in your site&apos;s HTML page you want your form
                to appear.
              </div>

              <div className="embed-form-code-container">
                <CopyBlock
                  customStyle={{
                    height: "400px",
                    overflow: "scroll",
                  }}
                  text={embedCode}
                  language="html"
                  theme={atomOneDark}
                  showLineNumbers={false}
                />
              </div>
            </div>
          )}

          {embedOption.type === EmbedType.NOTION && (
            <div className="embed-form-container">
              <div className="embed-form-notion-steps-header">Steps:</div>
              <div className="embed-form-notion-step-text">
                1. Type{" "}
                <span className="command-block command-text">/embed</span>
              </div>
              <div className="embed-form-notion-step-text">
                2. Paste your form&apos;s public URL
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "60%",
                  marginTop: 30,
                  marginBottom: 10,
                }}
              >
                <TextField
                  variant="outlined"
                  value={publicLink}
                  autoComplete="new-password"
                  style={{ width: "80%" }}
                  className="input-text-field"
                />

                <CopyButton onClick={handleCopy}>Copy</CopyButton>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

EmbedFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  embedOption: PropTypes.object.isRequired,
  formRef: PropTypes.string.isRequired,
  publicLink: PropTypes.string.isRequired,
};

export default EmbedFormDialog;
