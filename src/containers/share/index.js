import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import IconButton from "@material-ui/core/IconButton";
// import EditIcon from "@material-ui/icons/Edit";
import Spinner from "../../components/Spinner";
import { CopyButton } from "../../components/CustomButton";
import EmbedFormDialog from "../../components/EmbedFormDialog";
import ImageAssets from "../../assets/images";
import { EmbedOptions } from "../../enums/Embed";
import { getPublishedForm } from "../../utils/api";
import "./styles.css";

const ShareContainer = (props) => {
  const { history, handleBreadcrumbs } = props;

  const { enqueueSnackbar } = useSnackbar();

  const formRef = window.location.pathname.split("/")[2];

  const publicLink = `${process.env.REACT_APP_APP_URL}/form/${formRef}`;

  const [isLoading, setIsLoading] = useState(false);

  const [warningMessage, setWarningMessage] = useState("");

  // const [isCustomMetadataSaveLoading, setIsCustomMetadataSaveLoading] =
  //   useState(false);

  // const [
  //   shouldAllowEditingCustomMetadata,
  //   setShouldAllowEditingCustomMetadata,
  // ] = useState(false);

  // const [title, setTitle] = useState("");

  // const [titleValidationError, setTitleValidationError] = useState("");

  // const [description, setDescription] = useState("");

  // const [descriptionValidationError, setDescriptionValidationError] =
  //   useState("");

  const [selectedEmbedType, setSelectedEmbedType] = useState({});

  const [shouldShowEmbedFormDialog, setShouldShowEmbedFormDialog] =
    useState(false);

  const handleCloseEmbedFormDialog = () => {
    setShouldShowEmbedFormDialog(false);
  };

  const handleEmbed = (option) => {
    setSelectedEmbedType(option);
    setShouldShowEmbedFormDialog(true);
  };

  // const handleTitle = (event) => {
  //   if (titleValidationError) {
  //     setTitleValidationError("");
  //   }

  //   setTitle(event.target.value);
  // };

  // const handleDescription = (event) => {
  //   if (descriptionValidationError) {
  //     setDescriptionValidationError("");
  //   }

  //   setDescription(event.target.value);
  // };

  const handleCopy = () => {
    navigator.clipboard.writeText(publicLink);

    enqueueSnackbar("Link copied to clipboard!", { variant: "success" });
  };

  // const handleEdit = () => {
  //   setShouldAllowEditingCustomMetadata(!shouldAllowEditingCustomMetadata);
  // };

  // const isCustomMetadataInputValid = () => {
  //   let isValid = true;

  //   if (!title) {
  //     isValid = false;
  //     setTitleValidationError("Please enter page title");
  //   }

  //   if (!description) {
  //     isValid = false;
  //     setDescriptionValidationError("Please enter page description");
  //   }

  //   return isValid;
  // };

  // const handleSaveCustomMetadata = async () => {
  //   if (!isCustomMetadataInputValid()) {
  //     return;
  //   }

  //   setIsCustomMetadataSaveLoading(true);

  //   const response = await putCustomMetadataForForm({
  //     formRef,
  //     title,
  //     description,
  //   });

  //   if (response && response.success) {
  //     setTimeout(() => {
  //       setIsCustomMetadataSaveLoading(false);
  //       enqueueSnackbar(response.message, { variant: "success" });
  //     }, 1000);
  //   } else {
  //     setTimeout(() => {
  //       setIsCustomMetadataSaveLoading(false);
  //       enqueueSnackbar(response.message, { variant: "error" });
  //     }, 1000);
  //   }
  // };

  useEffect(() => {
    setIsLoading(true);

    const getPublishedFormHandler = async () => {
      const response = await getPublishedForm({ formRef });

      if (!response || !response.success) {
        setWarningMessage(
          "⚠️ You need to publish your form before you can share it."
        );
      } else if (
        history.location &&
        history.location.state &&
        history.location.state.shouldPublish
      ) {
        setWarningMessage(
          "⚠️ This form has unpublished changes. Publish your form to share the latest version."
        );
      }
    };

    getPublishedFormHandler();

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
        title: "Share",
        isLast: true,
      },
    ]);

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Granularity | Share</title>
      </Helmet>

      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="share-root-container">
          <div className="share-container">
            {!!warningMessage && (
              <div className="share-warning-container">{warningMessage}</div>
            )}

            <div className="share-header">Share your form with the world</div>

            <Paper elevation={1} className="share-form-link-container">
              <div className="share-form-link-header-container">
                <img
                  src={ImageAssets.Share_Link_Icon}
                  alt=""
                  width={20}
                  height={20}
                />

                <span className="share-form-link-header">
                  Get the link to your form
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
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
            </Paper>

            {/* <div className="share-customize-metadata-header">
              Customize Metadata
            </div>

            <Paper elevation={1} className="share-customize-metadata-container">
              <div className="share-customize-metadata-header-container">
                Customize page title and description in search results, social
                media and messengers.
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              </div>

              <div
                style={{
                  width: "100%",
                  marginTop: 30,
                  marginBottom: 10,
                }}
              >
                <Typography
                  variant="subtitle2"
                  style={{ fontFamily: "Muli", marginBottom: 3 }}
                >
                  Title
                </Typography>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    variant="outlined"
                    value={title}
                    onChange={handleTitle}
                    autoComplete="new-password"
                    style={{ width: "80%" }}
                    className="input-text-field"
                    error={!!titleValidationError}
                    disabled={!shouldAllowEditingCustomMetadata}
                  />

                  {!!titleValidationError && (
                    <span
                      style={{
                        marginTop: 2,
                        fontFamily: "Muli",
                        fontSize: 14,
                        color: "#c73030",
                      }}
                    >
                      {titleValidationError}
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  marginTop: 30,
                  marginBottom: 10,
                }}
              >
                <Typography
                  variant="subtitle2"
                  style={{ fontFamily: "Muli", marginBottom: 3 }}
                >
                  Description
                </Typography>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    variant="outlined"
                    value={description}
                    onChange={handleDescription}
                    autoComplete="new-password"
                    style={{ width: "80%" }}
                    className="input-multiline-text-field"
                    multiline
                    rows={5}
                    error={!!descriptionValidationError}
                    disabled={!shouldAllowEditingCustomMetadata}
                  />

                  {!!descriptionValidationError && (
                    <span
                      style={{
                        marginTop: 2,
                        fontFamily: "Muli",
                        fontSize: 14,
                        color: "#c73030",
                      }}
                    >
                      {descriptionValidationError}
                    </span>
                  )}
                </div>
              </div>

              {shouldAllowEditingCustomMetadata && (
                <SaveButton
                  onClick={handleSaveCustomMetadata}
                  style={{ marginTop: "2%", marginBottom: "2%" }}
                  disabled={isCustomMetadataSaveLoading}
                >
                  {isCustomMetadataSaveLoading ? (
                    <CircularProgress size={20} style={{ color: "#ffffff" }} />
                  ) : (
                    "Save"
                  )}
                </SaveButton>
              )}
            </Paper> */}

            <div className="share-embed-header">Embed your form</div>

            <div className="share-form-embed-options-list">
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="flex-start"
              >
                {EmbedOptions.map((option) => (
                  <Paper
                    key={option.id}
                    elevation={1}
                    className="share-form-embed-options-card-container"
                    onClick={() => handleEmbed(option)}
                  >
                    <img
                      src={option.icon}
                      alt={option.name}
                      className="share-form-embed-option-card-image"
                    />

                    <div className="share-form-embed-option-card-title">
                      {option.name}
                    </div>
                  </Paper>
                ))}
              </Grid>
            </div>
          </div>

          {shouldShowEmbedFormDialog && (
            <EmbedFormDialog
              open={shouldShowEmbedFormDialog}
              handleClose={handleCloseEmbedFormDialog}
              embedOption={selectedEmbedType}
              formRef={formRef}
              publicLink={publicLink}
            />
          )}
        </div>
      )}
    </div>
  );
};

ShareContainer.propTypes = {
  history: PropTypes.object.isRequired,
  handleBreadcrumbs: PropTypes.func.isRequired,
};

export default ShareContainer;
