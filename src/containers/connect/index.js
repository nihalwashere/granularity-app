import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Spinner from "../../components/Spinner";
import { AppIntegrations } from "../../enums/AppIntegrations";
import { getForm, putForm } from "../../utils/api";
import "./styles.css";

const ConnectContainer = (props) => {
  const { history, user, handleBreadcrumbs } = props;

  const formRef = window.location.pathname.split("/")[2];

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [shouldEnableEmailNotifications, setShouldEnableEmailNotifications] =
    useState(null);

  const handleShouldEnableEmailNotifications = async () => {
    const response = await putForm({
      formRef,
      isEmailNotificationEnabled: !shouldEnableEmailNotifications,
    });

    if (response && response.success) {
      setShouldEnableEmailNotifications(!shouldEnableEmailNotifications);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    handleBreadcrumbs([
      { title: "Dashboard", navigationRoute: "/dashboard" },
      {
        title:
          history.location &&
          history.location.state &&
          history.location.state.title
            ? history.location.state.title
            : "Form",
        navigationRoute: `/form-builder/${formRef}`,
      },
      {
        title: "Connect",
        isLast: true,
      },
    ]);

    const getFormHandler = async () => {
      const response = await getForm({ formRef });

      if (response && response.success && response.data) {
        setShouldEnableEmailNotifications(
          response.data.isEmailNotificationEnabled
        );
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    };

    getFormHandler();

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Granularity | Connect</title>
      </Helmet>

      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="connect-root-container">
          <div className="connect-container">
            <div className="connect-header">
              Connect your form to your email
            </div>

            <div className="connect-enable-email-notifications-container">
              <div className="connect-enable-email-notifications-text">
                Enable email notifications?
              </div>

              <div className="connect-enable-email-notifications-switch">
                <Switch
                  checked={shouldEnableEmailNotifications}
                  onChange={handleShouldEnableEmailNotifications}
                  color="primary"
                  disabled={!user.isEmailVerified}
                />
              </div>
            </div>

            <div className="connect-enable-email-notifications-users-list-container">
              <div className="connect-enable-email-notifications-user-card">
                <div style={{ width: "30%", marginTop: 20, marginBottom: 20 }}>
                  <TextField
                    variant="outlined"
                    value={user.email || ""}
                    autoComplete="new-password"
                    style={{ width: "100%" }}
                    className="input-text-field"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="connect-app-integrations-container">
              <div className="connect-app-integrations-header">
                App Integrations (coming soon)
              </div>

              <div className="connect-app-integrations-list">
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="flex-start"
                >
                  {AppIntegrations.map((integration) => (
                    <Paper
                      key={integration.id}
                      elevation={1}
                      className="connect-app-integrations-card-container"
                    >
                      <img
                        src={integration.icon}
                        alt={integration.name}
                        className="connect-app-integration-card-image"
                      />

                      <div className="connect-app-integration-card-title">
                        {integration.name}
                      </div>
                    </Paper>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ConnectContainer.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleBreadcrumbs: PropTypes.func.isRequired,
};

export default ConnectContainer;
