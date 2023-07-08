import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Spinner from "../../../components/Spinner";
import { resetPassword } from "../../../utils/api";
import ImageAssets from "../../../assets/images";
import {
  GRANULARITY_SUPPORT_EMAIL,
  GRANULARITY_TOKEN,
} from "../../../utils/constants";
import "./styles.css";

export const ResetPasswordButton = withStyles(() => ({
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

const ResetPasswordContainer = (props) => {
  const { history, getUserInfo } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [shouldShowLinkExpiredScreen, setShouldShowLinkExpiredScreen] =
    useState(false);

  const [newPassword, setNewPassword] = useState("");

  const [newPasswordValidationError, setNewPasswordValidationError] =
    useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [
    confirmNewPasswordValidationError,
    setConfirmNewPasswordValidationError,
  ] = useState("");

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

    if (!newPassword) {
      setNewPasswordValidationError("Please enter your new password");
      isValid = false;
    }

    if (newPassword && newPassword.length < 8) {
      isValid = false;
      setNewPasswordValidationError("Please enter atleast 8 characters");
    }

    if (!confirmNewPassword) {
      setConfirmNewPasswordValidationError("Please confirm your new password");
      isValid = false;
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

  const handleSendInstructions = async () => {
    if (!isInputValid()) {
      return;
    }

    setIsLoading(true);

    const response = await resetPassword({
      email,
      newPassword,
      confirmNewPassword,
    });

    if (response && response.success && response.data) {
      const { token } = response.data;

      localStorage.setItem(GRANULARITY_TOKEN, token);

      getUserInfo();

      setTimeout(() => history.push("/dashboard"), 1000);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      history.location &&
      history.location.state &&
      history.location.state.isLinkExpired
    ) {
      setShouldShowLinkExpiredScreen(true);
    }

    if (
      history.location &&
      history.location.state &&
      !history.location.state.isLinkExpired &&
      history.location.state.email
    ) {
      setEmail(history.location.state.email);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Granularity | Reset Password</title>
      </Helmet>

      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="reset-password-container">
          {shouldShowLinkExpiredScreen ? (
            <div className="reset-password-form-container">
              <div className="reset-password-link-expired-text">
                ⚠️ You have accessed an account recovery link that has expired
                or been previously used.
              </div>
              <div className="reset-password-link-expired-illustration-container">
                <img
                  src={ImageAssets.Void_Illustration}
                  alt=""
                  width="100%"
                  height="100%"
                />
              </div>

              <div className="reset-password-link-support-text">
                Contact{" "}
                <a
                  href={`mailto:${GRANULARITY_SUPPORT_EMAIL}`}
                  style={{ color: "inherit" }}
                >
                  {GRANULARITY_SUPPORT_EMAIL}
                </a>{" "}
                for any issues
              </div>
            </div>
          ) : (
            <Paper elevation={1} style={{ width: 500, height: 450 }}>
              <div className="reset-password-form-container">
                <div className="reset-password-form-header">
                  Reset your password
                </div>

                <div style={{ width: "75%" }}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontFamily: "Muli" }}
                  >
                    New password
                  </Typography>

                  <TextField
                    variant="outlined"
                    value={newPassword}
                    onChange={handleNewPassword}
                    autoComplete="new-password"
                    style={{ width: "100%" }}
                    error={!!newPasswordValidationError}
                    className="reset-password-textfield"
                    type="password"
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

                <div
                  style={{ width: "75%", marginTop: "5%", marginBottom: "5%" }}
                >
                  <Typography
                    variant="subtitle1"
                    style={{ fontFamily: "Muli" }}
                  >
                    Confirm new password
                  </Typography>

                  <TextField
                    variant="outlined"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPassword}
                    autoComplete="new-password"
                    style={{ width: "100%" }}
                    error={!!confirmNewPasswordValidationError}
                    className="reset-password-textfield"
                    type="password"
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

                <ResetPasswordButton onClick={handleSendInstructions}>
                  Reset Password
                </ResetPasswordButton>

                <div className="reset-password-dont-have-an-account-container">
                  Back to{" "}
                  <Link
                    underline="none"
                    href="/signin"
                    style={{ color: "#66b2b2" }}
                  >
                    Sign In?
                  </Link>
                </div>
              </div>
            </Paper>
          )}
        </div>
      )}
    </div>
  );
};

ResetPasswordContainer.propTypes = {
  history: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
};

export default ResetPasswordContainer;
