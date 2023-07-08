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
import { signUp } from "../../../utils/api";
import "./styles.css";

export const SignUpButton = withStyles(() => ({
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

const SignUpContainer = (props) => {
  const { history, getUserInfo, isLoggedIn } = props;

  if (isLoggedIn) {
    history.push("/dashboard");
  }

  const { enqueueSnackbar } = useSnackbar();

  const [isSignUpLoading, setIsSignUpLoading] = useState(false);

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

    if (!password || password.length < 8) {
      setPasswordValidationError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!isInputValid()) {
      return;
    }

    setIsSignUpLoading(true);

    const response = await signUp({ email, password });

    if (response && response.success && response.data) {
      const { token } = response.data;

      localStorage.setItem(GRANULARITY_TOKEN, token);

      getUserInfo();

      setTimeout(() => history.push("/dashboard"), 1000);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    setTimeout(() => setIsSignUpLoading(false), 1000);
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Granularity | Sign Up</title>
      </Helmet>

      <div className="signup-container">
        <Paper elevation={1} style={{ width: 500, height: 450 }}>
          <div className="signup-form-container">
            <div className="signup-form-header">
              Ask efficiently and analyze effectively with forms, surveys,
              quizzes and more.
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
                className="signup-textfield"
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
                className="signup-textfield"
              />

              <span className="password-atleast-chars-requirement-text">
                Atleast 8 characters required
              </span>
            </div>

            <SignUpButton onClick={handleSignUp}>
              {isSignUpLoading ? (
                <CircularProgress size={30} style={{ color: "#ffffff" }} />
              ) : (
                "Sign Up"
              )}
            </SignUpButton>

            <div className="signup-have-an-account-container">
              Already have an account?{" "}
              <Link
                underline="none"
                href="/signin"
                style={{ color: "#66b2b2" }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

SignUpContainer.propTypes = {
  history: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SignUpContainer;
