import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "../../../components/Avatar";
import ChangeAccountNameDialog from "../../../components/ChangeAccountNameDialog";
import ChangePasswordDialog from "../../../components/ChangePasswordDialog";
import {
  updateAccountInfo,
  changePassword,
  triggerEmailVerification,
} from "../../../utils/api";
import "./styles.css";

export const ChangeAccountNameButton = withStyles(() => ({
  root: {
    width: 200,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

export const ChangePasswordButton = withStyles(() => ({
  root: {
    width: 200,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

export const VerifyEmailButton = withStyles(() => ({
  root: {
    width: 120,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

const AccountContainer = (props) => {
  const { user } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isEmailVerificationLoading, setIsEmailVerificationLoading] =
    useState(false);

  const [name, setName] = useState("");

  const [avatar, setAvatar] = useState("");

  const [shouldShowChangeNameDialog, setShouldShowChangeNameDialog] =
    useState(false);

  const [shouldShowChangePasswordDialog, setShouldShowChangePasswordDialog] =
    useState(false);

  const handleCloseShouldShowChangeNameDialog = () => {
    setShouldShowChangeNameDialog(false);
  };

  const handleChangeAccountName = () => {
    setShouldShowChangeNameDialog(true);
  };

  const handleCloseShouldShowChangePasswordDialog = () => {
    setShouldShowChangePasswordDialog(false);
  };

  const handleChangePassword = () => {
    setShouldShowChangePasswordDialog(true);
  };

  const handleSaveName = async (newName) => {
    const response = await updateAccountInfo({ name: newName });

    if (response && response.success && response.data) {
      setName(response.data.name);
      setAvatar(response.data.avatar);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    handleCloseShouldShowChangeNameDialog();
  };

  const handleSavePassword = async (payload) => {
    const response = await changePassword(payload);

    if (response && response.success) {
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    handleCloseShouldShowChangePasswordDialog();
  };

  const handleTriggerEmailVerification = async () => {
    setIsEmailVerificationLoading(true);

    const response = await triggerEmailVerification({ email: user.email });

    if (response && response.success) {
      setTimeout(() => {
        setIsEmailVerificationLoading(false);
        enqueueSnackbar(response.message, { variant: "success" });
      }, 1000);
    } else {
      setTimeout(() => {
        setIsEmailVerificationLoading(false);
        enqueueSnackbar(response.message, { variant: "error" });
      }, 1000);
    }
  };

  useEffect(() => {
    setName(user.name);
    setAvatar(user.avatar);
  }, []);

  return (
    <div className="account-root-container">
      <div className="account-container">
        <div className="account-header">Account</div>

        <Paper elevation={1} style={{ width: "100%" }}>
          <div className="account-name-card-container">
            <div className="account-name-avatar-card-container">
              <div className="account-avatar">
                <Avatar emailMd5={avatar} name={name} />
              </div>

              <div className="account-name">{name}</div>
            </div>

            <ChangeAccountNameButton
              onClick={handleChangeAccountName}
              style={{ marginRight: "5%" }}
            >
              Change account name
            </ChangeAccountNameButton>

            <ChangePasswordButton onClick={handleChangePassword}>
              Change password
            </ChangePasswordButton>
          </div>
        </Paper>

        <Paper elevation={1} style={{ width: "100%", marginTop: "5%" }}>
          <div className="email-card-container">
            <div className="email-text">
              {user && user.email ? user.email : ""}
              {user && user.isEmailVerified ? (
                <span className="email-verified-text"> (Verified)</span>
              ) : (
                <span className="email-unverified-text"> (Not verified)</span>
              )}
            </div>

            {!user.isEmailVerified && (
              <VerifyEmailButton
                onClick={handleTriggerEmailVerification}
                style={{ marginTop: "3%" }}
              >
                {isEmailVerificationLoading ? (
                  <CircularProgress size={25} style={{ color: "#ffffff" }} />
                ) : (
                  "Verify email"
                )}
              </VerifyEmailButton>
            )}
          </div>
        </Paper>
      </div>

      {shouldShowChangeNameDialog && (
        <ChangeAccountNameDialog
          open={shouldShowChangeNameDialog}
          handleClose={handleCloseShouldShowChangeNameDialog}
          oldName={name}
          handleSave={handleSaveName}
        />
      )}

      {shouldShowChangePasswordDialog && (
        <ChangePasswordDialog
          open={shouldShowChangePasswordDialog}
          handleClose={handleCloseShouldShowChangePasswordDialog}
          handleSave={handleSavePassword}
        />
      )}
    </div>
  );
};

AccountContainer.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AccountContainer;
