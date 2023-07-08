import React, { useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import PasswordResetInstructionsSentDialog from "../../../components/PasswordResetInstructionsSentDialog";
import { validateEmail } from "../../../utils/common";
import { sendPasswordResetInstructions } from "../../../utils/api";
import "./styles.css";

export const SendInstructionsButton = withStyles(() => ({
  root: {
    width: 200,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 18,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

const ForgotPasswordContainer = (props) => {
  const { history } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isSendInstructionsLoading, setIsSendInstructionsLoading] =
    useState(false);

  const [email, setEmail] = useState("");

  const [emailValidationError, setEmailValidationError] = useState(false);

  const [
    shouldShowPasswordInstructionsSentDialog,
    setShouldShowPasswordInstructionsSentDialog,
  ] = useState(false);

  const handleShowPasswordInstructionsSentDialog = () => {
    setShouldShowPasswordInstructionsSentDialog(true);
  };

  const handleClosePasswordInstructionsSentDialog = () => {
    setShouldShowPasswordInstructionsSentDialog(false);
  };

  const handleEmail = (event) => {
    if (emailValidationError) {
      setEmailValidationError(false);
    }

    setEmail(event.target.value);
  };

  const isInputValid = () => {
    let isValid = true;

    if (!email) {
      setEmailValidationError(true);
      isValid = false;
    }

    if (email && !validateEmail(email)) {
      setEmailValidationError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSendInstructions = async () => {
    if (!isInputValid()) {
      return;
    }

    setIsSendInstructionsLoading(true);

    const response = await sendPasswordResetInstructions({ email });

    if (response && response.success) {
      handleShowPasswordInstructionsSentDialog();
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    setIsSendInstructionsLoading(false);
  };

  const handleOkay = () => {
    history.push("/signin");
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Granularity | Forgot Password</title>
      </Helmet>

      <div className="forgot-password-container">
        <Paper elevation={1} style={{ width: 500, height: 450 }}>
          <div className="forgot-password-form-container">
            <div className="forgot-password-form-header">
              Forgot your password? Relax!
            </div>

            <div style={{ width: "75%", marginTop: "5%", marginBottom: "5%" }}>
              <TextField
                variant="outlined"
                label="Email"
                value={email}
                onChange={handleEmail}
                autoComplete="new-password"
                style={{ width: "100%" }}
                error={!!emailValidationError}
                className="forgot-password-textfield"
              />
            </div>

            <div className="forgot-password-instructions">
              Type the address linked to your account and we&apos;ll send you
              password reset instructions. They might end up in your spam
              folder, so please check there as well.
            </div>

            <SendInstructionsButton onClick={handleSendInstructions}>
              {isSendInstructionsLoading ? (
                <CircularProgress size={30} style={{ color: "#ffffff" }} />
              ) : (
                "Send Instructions"
              )}
            </SendInstructionsButton>

            <div className="forgot-password-dont-have-an-account-container">
              Don&apos;t have an account yet?{" "}
              <Link
                underline="none"
                href="/signup"
                style={{ color: "#66b2b2" }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </Paper>

        {shouldShowPasswordInstructionsSentDialog && (
          <PasswordResetInstructionsSentDialog
            open={shouldShowPasswordInstructionsSentDialog}
            handleClose={handleClosePasswordInstructionsSentDialog}
            handleOkay={handleOkay}
          />
        )}
      </div>
    </div>
  );
};

ForgotPasswordContainer.propTypes = {
  history: PropTypes.object.isRequired,
};

export default ForgotPasswordContainer;
