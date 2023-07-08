import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { nanoid } from "nanoid";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import CreateFormDialog from "../../components/CreateFormDialog";
import RenameFormDialog from "../../components/RenameFormDialog";
import DeleteFormDialog from "../../components/DeleteFormDialog";
import Spinner from "../../components/Spinner";
import { deleteForm, getForms, putForm } from "../../utils/api";
import ImageAssets from "../../assets/images";
import "./styles.css";

export const wrapForms = (forms) =>
  forms.map((form) => ({ ...form, formOptionsAnchorEl: null }));

export const CreateNewFormButton = withStyles(() => ({
  root: {
    width: 200,
    backgroundColor: "#66b2b2",
    color: "#ffffff",
    fontFamily: "Muli",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#66b2b2d1",
    },
    textTransform: "none",
  },
}))(Button);

const FORM_OPTIONS_LIST = [
  { name: "View", type: "view" },
  { name: "Edit", type: "edit" },
  { name: "Rename", type: "rename" },
  { name: "Insights", type: "insights" },
  { name: "Responses", type: "responses" },
  { name: "Connect", type: "connect" },
  { name: "Share", type: "share" },
  { name: "Delete", type: "delete" },
];

const DashboardContainer = (props) => {
  const { history, handleBreadcrumbs } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [forms, setForms] = useState([]);

  const [formOptionsAnchorEl, setFormOptionsAnchorEl] = useState(null);

  const [selectedForm, setSelectedForm] = useState({});

  const [shouldShowCreateFormDialog, setShouldShowCreateFormDialog] =
    useState(false);

  const [shouldShowRenameFormDialog, setShouldShowRenameFormDialog] =
    useState(false);

  const [shouldShowDeleteFormDialog, setShouldShowDeleteFormDialog] =
    useState(false);

  const handleCloseFormOptions = (index) => {
    const newForms = [...forms];

    newForms[index].formOptionsAnchorEl = null;

    setForms(newForms);

    setFormOptionsAnchorEl(null);
  };

  const handleFormOptions = (event, index) => {
    const newForms = [...forms];

    newForms[index].formOptionsAnchorEl = true;

    setForms(newForms);

    setFormOptionsAnchorEl(event.currentTarget);
  };

  const handleFormOptionSelect = (index, type) => {
    const newForms = [...forms];

    newForms[index].formOptionsAnchorEl = null;

    if (type === "view") {
      window.open(
        `${process.env.REACT_APP_APP_URL}/form/${newForms[index].formRef}`
      );
    }

    if (type === "edit") {
      history.push(`/form-builder/${newForms[index].formRef}`);
    }

    setSelectedForm({ ...newForms[index] });

    if (type === "rename") {
      setShouldShowRenameFormDialog(true);
    }

    if (type === "insights") {
      history.push(`/insights/${newForms[index].formRef}`, {
        title: newForms[index].title,
      });
    }

    if (type === "responses") {
      history.push(`/responses/${newForms[index].formRef}`, {
        title: newForms[index].title,
      });
    }

    if (type === "connect") {
      history.push(`/connect/${newForms[index].formRef}`, {
        title: newForms[index].title,
      });
    }

    if (type === "share") {
      history.push(`/share/${newForms[index].formRef}`, {
        title: newForms[index].title,
      });
    }

    if (type === "delete") {
      setShouldShowDeleteFormDialog(true);
    }

    setForms(newForms);

    setFormOptionsAnchorEl(null);
  };

  const handleFormClick = (index) => {
    handleBreadcrumbs([
      { title: "Dashboard", navigationRoute: "/dashboard" },
      { title: forms[index].title, isLast: true },
    ]);

    history.push(`/form-builder/${forms[index].formRef}`);
  };

  const handleCloseCreateFormDialog = () => {
    setSelectedForm({});
    setShouldShowCreateFormDialog(false);
  };

  const handleSaveCreateForm = (title) => {
    handleCloseCreateFormDialog();
    history.push(`/form-builder/${nanoid(10)}`, {
      shouldCreateNewForm: true,
      title,
    });
  };

  const handleCloseRenameFormDialog = () => {
    setSelectedForm({});
    setShouldShowRenameFormDialog(false);
  };

  const handleSaveRenameForm = async (newTitle) => {
    const response = await putForm({
      formRef: selectedForm.formRef,
      title: newTitle,
    });

    if (response && response.success && response.data) {
      const newForms = [...forms];

      const index = forms.findIndex(
        (elem) => elem.formRef === selectedForm.formRef
      );

      newForms[index].title = response.data.title;

      setForms(newForms);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    handleCloseRenameFormDialog();
  };

  const handleCloseDeleteFormDialog = () => {
    setSelectedForm({});
    setShouldShowDeleteFormDialog(false);
  };

  const handleConfirmDeleteForm = async () => {
    const response = await deleteForm({ formRef: selectedForm.formRef });

    if (response && response.success) {
      const newForms = [...forms];

      const index = forms.findIndex(
        (elem) => elem.formRef === selectedForm.formRef
      );

      newForms.splice(index, 1);

      setForms(newForms);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }

    handleCloseDeleteFormDialog();
  };

  const handleCreateNewForm = () => {
    setShouldShowCreateFormDialog(true);
  };

  useEffect(() => {
    setIsLoading(true);

    const getFormsHandler = async () => {
      const response = await getForms();

      if (response && response.success && response.data) {
        setForms(wrapForms(response.data));
      } else {
        enqueueSnackbar(response.message, { variant: "error" });
      }
    };

    getFormsHandler();

    handleBreadcrumbs([{ title: "Dashboard", isLast: true }]);

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Granularity | Dashboard</title>
      </Helmet>

      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="dashboard-root-container">
          <div className="dashboard-section-left">
            <div className="dashboard-create-new-form-button-container">
              <div className="dashboard-create-new-form-button">
                <CreateNewFormButton onClick={handleCreateNewForm}>
                  Create new form
                </CreateNewFormButton>
              </div>
            </div>

            <Divider />

            <div className="dashboard-left-section-bottom-container">
              <Divider />

              <div className="dashboard-left-section-tab">
                <div className="dashboard-left-section-tab-title">
                  <Link
                    href="/user-feedback"
                    color="inherit"
                    underline="always"
                    target="_blank"
                    rel="noopener"
                  >
                    Give Feedback
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-section-right">
            <div className="dashboard-container">
              {forms.length ? (
                <div className="dashboard-form-cards-grid-container">
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    {forms.map((form, formIndex) => (
                      <Paper
                        key={form._id}
                        elevation={1}
                        className="dashboard-form-card-container"
                      >
                        <div
                          className="dashboard-form-card-title-container"
                          onClick={() => handleFormClick(formIndex)}
                        >
                          <span className="dashboard-form-card-title">
                            {form.title}
                          </span>
                        </div>
                        <div className="dashboard-form-response-container">
                          <span className="dashboard-form-response">
                            {form.responses}{" "}
                            {form.responses === 1 ? "response" : "responses"}
                          </span>

                          <IconButton
                            onClick={(event) =>
                              handleFormOptions(event, formIndex)
                            }
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </div>

                        {form.formOptionsAnchorEl && (
                          <Menu
                            anchorEl={formOptionsAnchorEl}
                            keepMounted
                            open={Boolean(formOptionsAnchorEl)}
                            onClose={() => handleCloseFormOptions(formIndex)}
                          >
                            {FORM_OPTIONS_LIST.map((formOption) => (
                              <MenuItem
                                key={formOption.type}
                                onClick={() =>
                                  handleFormOptionSelect(
                                    formIndex,
                                    formOption.type
                                  )
                                }
                                style={{
                                  width: 150,
                                  fontFamily: "Muli",
                                  fontSize: 14,
                                }}
                              >
                                <span className="dashboard-form-options-list-item-container">
                                  {formOption.name}
                                  {formOption.type === "view" && (
                                    <OpenInNewIcon
                                      style={{ width: 45, height: 20 }}
                                    />
                                  )}
                                </span>
                              </MenuItem>
                            ))}
                          </Menu>
                        )}
                      </Paper>
                    ))}
                  </Grid>
                </div>
              ) : (
                <div className="dashboard-empty-container">
                  <div className="dashboard-empty-header">
                    You don&apos;t have any forms yet
                  </div>

                  <div className="dashboard-empty-illustration-container">
                    <img
                      src={ImageAssets.Empty_Illustration}
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              )}

              {shouldShowCreateFormDialog && (
                <CreateFormDialog
                  open={shouldShowCreateFormDialog}
                  handleClose={handleCloseCreateFormDialog}
                  handleSave={handleSaveCreateForm}
                />
              )}

              {shouldShowRenameFormDialog && (
                <RenameFormDialog
                  open={shouldShowRenameFormDialog}
                  handleClose={handleCloseRenameFormDialog}
                  handleSave={handleSaveRenameForm}
                  oldName={selectedForm.title}
                />
              )}

              {shouldShowDeleteFormDialog && (
                <DeleteFormDialog
                  open={shouldShowDeleteFormDialog}
                  handleClose={handleCloseDeleteFormDialog}
                  confirmDelete={handleConfirmDeleteForm}
                  title={selectedForm.title}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DashboardContainer.propTypes = {
  history: PropTypes.object.isRequired,
  handleBreadcrumbs: PropTypes.func.isRequired,
};

export default DashboardContainer;
