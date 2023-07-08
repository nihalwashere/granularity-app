import React, { useState } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import { validateEmail } from "../../../utils/common";
import { GRANULARITY_TOKEN } from "../../../utils/constants";
import { signIn } from "../../../utils/api";
import "./styles.css";

export const SignInButton = withStyles(() => ({
  root: {
    width: 100,
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

const SignInContainer = (props) => {
  const { history, getUserInfo, isLoggedIn } = props;

  if (isLoggedIn) {
    history.push("/dashboard");
  }

  const { enqueueSnackbar } = useSnackbar();

  const [isSignInLoading, setIsSignInLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [emailValidationError, setEmailValidationError] = useState(false);

  const [password, setPassword] = useState("");

  const [passwordValidationError, setPasswordValidationError] = useState(false);

  const handleEmail = (event) => {
    if (emailValidationError) {
      setEmailValidationError(false);
    }

    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    if (passwordValidationError) {
      setPasswordValidationError(false);
    }

    setPassword(event.target.value);
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

    if (!password) {
      setPasswordValidationError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSignIn = async () => {
    if (!isInputValid()) {
      return;
    }

    setIsSignInLoading(true);

    const response = await signIn({ email, password });

    if (response && response.success && response.data) {
      const { token } = response.data;

      localStorage.setItem(GRANULARITY_TOKEN, token);

      getUserInfo();

      setTimeout(() => history.push("/dashboard"), 1000);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    setTimeout(() => setIsSignInLoading(false), 1000);
  };

  return (
    <div>
      <Helmet>
        <title>Granularity | Sign In</title>
      </Helmet>

      <div className="signin-container">
        <Paper elevation={1} style={{ width: 500, height: 450 }}>
          <div className="signin-form-container">
            <div className="signin-form-header">
              Knock knock, who&apos;s there?
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
                className="signin-textfield"
              />
            </div>

            <div style={{ width: "75%", marginTop: "2%", marginBottom: "5%" }}>
              <TextField
                variant="outlined"
                label="Password"
                value={password}
                onChange={handlePassword}
                autoComplete="new-password"
                style={{ width: "100%" }}
                type="password"
                error={!!passwordValidationError}
                className="signin-textfield"
              />
            </div>

            <SignInButton onClick={handleSignIn}>
              {isSignInLoading ? (
                <CircularProgress size={30} style={{ color: "#ffffff" }} />
              ) : (
                "Sign In"
              )}
            </SignInButton>

            <div className="signin-bottom-actions-container">
              <div className="signin-dont-have-account-container">
                Don&apos;t have an account?{" "}
                <Link
                  underline="none"
                  href="/signup"
                  style={{ color: "#66b2b2" }}
                >
                  Sign Up
                </Link>
              </div>

              <div>
                <Link
                  underline="none"
                  href="/forgot-password"
                  style={{ color: "#66b2b2" }}
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

SignInContainer.propTypes = {
  history: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SignInContainer;
