import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import QuestionBox from "../../components/QuestionBox";
import PublishButton from "../../components/PublishButton";
import {
  InsightsButton,
  ResponsesButton,
  ConnectButton,
  ShareButton,
} from "../../components/CustomButton";
import AutoSave from "../../components/AutoSave";
import PublishFormDialog from "../../components/PublishFormDialog";
import PreviewFormDialog from "../../components/PreviewFormDialog";
import Spinner from "../../components/Spinner";
import { GRANULARITY_APP_URL } from "../../utils/config";
import {
  QUESTION_TYPE,
  QUESTION_TYPES_OPTIONS,
  QUESTION_TYPE_DEFAULTS,
} from "../../enums/Questions";
import { FORM_PUBLISH_STATUS } from "../../enums/FormPublishStatus";
import { truncateString } from "../../utils/common";
import {
  DEFAULT_PAGE_TITLE,
  DEFAULT_PAGE_DESCRIPTION,
} from "../../utils/constants";
import { getForm, putForm, putPublishForm } from "../../utils/api";

import "./styles.css";

const QUESTION_OPTIONS = [
  {
    name: "Duplicate",
    type: "duplicate",
  },
  { name: "Delete", type: "delete" },
];

const defaultQuestion = {
  ...QUESTION_TYPE_DEFAULTS[0],
  number: 1,
  id: nanoid(),
};

const FormBuilderContainer = (props) => {
  const { history, handleBreadcrumbs } = props;

  const formRef = window.location.pathname.split("/")[2];

  const publicLink = `${GRANULARITY_APP_URL}/form/${formRef}`;

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");

  const [questions, setQuestions] = useState([]);

  const [selectedQuestion, setSelectedQuestion] = useState({});

  const [shouldPublish, setShouldPublish] = useState(false);

  const [publishStatus, setPublishStatus] = useState(
    FORM_PUBLISH_STATUS.PUBLISH
  );

  const [anchorForQuestionTypeMenu, setAnchorForQuestionTypeMenu] =
    useState(null);

  const [questionOptionsAnchorEl, setQuestionOptionsAnchorEl] = useState(null);

  const [shouldShowPublishFormDialog, setShouldShowPublishFormDialog] =
    useState(false);

  const [shouldShowPreviewFormDialog, setShouldShowPreviewFormDialog] =
    useState(false);

  const handleClosePublishFormDialog = () => {
    setShouldShowPublishFormDialog(false);
  };

  const handleClosePreviewFormDialog = () => {
    setShouldShowPreviewFormDialog(false);
  };

  const handleAddQuestion = (questionType) => {
    const newQuestions = [...questions];

    const index = QUESTION_TYPE_DEFAULTS.findIndex(
      (elem) => elem.type === questionType.type
    );

    const questionTypeDefault = QUESTION_TYPE_DEFAULTS[index];

    const newQuestion = {
      ...questionTypeDefault,
      number: questions.length + 1,
      id: nanoid(),
    };

    newQuestions.push(newQuestion);

    setQuestions(newQuestions);

    setSelectedQuestion(newQuestion);

    setAnchorForQuestionTypeMenu(null);

    if (publishStatus !== FORM_PUBLISH_STATUS.PUBLISH) {
      setPublishStatus(FORM_PUBLISH_STATUS.PUBLISH);
      shouldPublish(true);
    }
  };

  const handleQuestionChange = (questionId, value) => {
    const newQuestions = [...questions];

    const index = newQuestions.findIndex(
      (element) => element.id === questionId
    );

    newQuestions[index].questionValue = value;

    setQuestions(newQuestions);

    setSelectedQuestion({ ...newQuestions[index] });

    if (publishStatus !== FORM_PUBLISH_STATUS.PUBLISH) {
      setPublishStatus(FORM_PUBLISH_STATUS.PUBLISH);
    }

    setShouldPublish(true);
  };

  const handleDescriptionChange = (questionId, value) => {
    const newQuestions = [...questions];

    const index = newQuestions.findIndex(
      (element) => element.id === questionId
    );

    newQuestions[index].descriptionValue = value;

    setQuestions(newQuestions);

    setSelectedQuestion({ ...newQuestions[index] });

    if (publishStatus !== FORM_PUBLISH_STATUS.PUBLISH) {
      setPublishStatus(FORM_PUBLISH_STATUS.PUBLISH);
    }

    setShouldPublish(true);
  };

  const handleQuestionTypeMenuOpen = (event) => {
    setAnchorForQuestionTypeMenu(event.currentTarget);
  };

  const handleQuestionTypeMenuClose = () => {
    setAnchorForQuestionTypeMenu(null);
  };

  const handleQuestionOptionsMenuClose = () => {
    setQuestionOptionsAnchorEl(null);
  };

  const handleSelectedQuestionChange = (questionId) => {
    const index = questions.findIndex((elem) => elem.id === questionId);

    setSelectedQuestion({ ...questions[index] });
  };

  const handleQuestionTypeChange = (event) => {
    const newQuestions = [...questions];

    const index = questions.findIndex(
      (elem) => elem.id === selectedQuestion.id
    );

    const questionDefaultSettings = QUESTION_TYPE_DEFAULTS.find(
      (elem) => elem.type === event.target.value
    );

    const newQuestion = {
      ...questionDefaultSettings,
      number: selectedQuestion.number,
      id: selectedQuestion.id,
    };

    newQuestions[index] = { ...newQuestion };

    setQuestions(newQuestions);

    setSelectedQuestion({ ...newQuestion });

    if (publishStatus !== FORM_PUBLISH_STATUS.PUBLISH) {
      setPublishStatus(FORM_PUBLISH_STATUS.PUBLISH);
    }

    setShouldPublish(true);
  };

  const handleQuestionIsRequiredChange = (event) => {
    const newQuestions = [...questions];

    const index = questions.findIndex(
      (elem) => elem.id === selectedQuestion.id
    );

    newQuestions[index].isRequired = event.target.checked;

    setQuestions(newQuestions);

    setSelectedQuestion({
      ...selectedQuestion,
      isRequired: event.target.checked,
    });

    if (publishStatus !== FORM_PUBLISH_STATUS.PUBLISH) {
      setPublishStatus(FORM_PUBLISH_STATUS.PUBLISH);
    }

    setShouldPublish(true);
  };

  const createOptionsList = (questionId, payload) => {
    const cleanItems = [];

    const items = payload.split("\n").map((item) => String(item.trim()));

    items.map((item) => {
      if (item) {
        cleanItems.push({ value: item, checked: false });
      }
    });

    const index = questions.findIndex((elem) => elem.id === questionId);

    const newQuestions = [...questions];

    newQuestions[index].options = [...cleanItems];

    setQuestions(newQuestions);

    setSelectedQuestion({ ...newQuestions[index] });
  };

  const handleAnswerChange = (
    questionId,
    questionType,
    answer,
    optionIndex = null // for multiple_choice
  ) => {
    const questionIndex = questions.findIndex((elem) => elem.id === questionId);

    const newQuestions = [...questions];

    if (questionType === QUESTION_TYPE.MULTIPLE_CHOICE) {
      const newOptions = [...questions[questionIndex].options];

      newOptions[optionIndex].checked = !newOptions[optionIndex].checked;

      newQuestions[questionIndex].options = [...newOptions];

      const answers = [];

      newOptions.map((elem) => {
        if (elem.checked) {
          answers.push(elem.value);
        }
      });

      newQuestions[questionIndex].answers = [...answers];
    } else {
      newQuestions[questionIndex].answer = answer;
    }

    setQuestions(newQuestions);

    setSelectedQuestion({ ...newQuestions[questionIndex] });
  };

  const handlePreview = () => {
    setShouldShowPreviewFormDialog(true);
  };

  const handlePublish = async () => {
    setShouldShowPublishFormDialog(true);

    setPublishStatus(FORM_PUBLISH_STATUS.PUBLISHING);

    setShouldPublish(false);

    await putForm({ formRef, shouldPublish: false });

    const response = await putPublishForm({ formRef, title, questions });

    if (response && response.success && response.data) {
      setTimeout(() => setPublishStatus(FORM_PUBLISH_STATUS.PUBLISHED), 1000);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const handleShowInsights = () => {
    history.push(`/insights/${formRef}`, { title });

    handleBreadcrumbs([
      { title: "Dashboard", navigationRoute: "/dashboard" },
      { title, navigationRoute: `/form-builder/${formRef}` },
      {
        title: "Insights",
        isLast: true,
      },
    ]);
  };

  const handleShowResponses = () => {
    history.push(`/responses/${formRef}`, { title });

    handleBreadcrumbs([
      { title: "Dashboard", navigationRoute: "/dashboard" },
      { title, navigationRoute: `/form-builder/${formRef}` },
      {
        title: "Responses",
        isLast: true,
      },
    ]);
  };

  const handleShowConnect = () => {
    history.push(`/connect/${formRef}`, { title });

    handleBreadcrumbs([
      { title: "Dashboard", navigationRoute: "/dashboard" },
      { title, navigationRoute: `/form-builder/${formRef}` },
      {
        title: "Connect",
        isLast: true,
      },
    ]);
  };

  const handleShowShare = () => {
    history.push(`/share/${formRef}`, { title, shouldPublish });

    handleBreadcrumbs([
      { title: "Dashboard", navigationRoute: "/dashboard" },
      { title, navigationRoute: `/form-builder/${formRef}` },
      {
        title: "Share",
        isLast: true,
      },
    ]);
  };

  const handleQuestionOptionsOpen = (event, index) => {
    const newQuestions = [...questions];

    newQuestions[index].questionOptionsAnchorEl = true;

    setQuestions(newQuestions);

    setQuestionOptionsAnchorEl(event.currentTarget);
  };

  const handleQuestionOptionSelect = (index, type) => {
    const newQuestions = [...questions];

    const max = newQuestions.length;

    if (type === "duplicate") {
      const newQuestion = {
        ...newQuestions[index],
        questionOptionsAnchorEl: null,
        number: newQuestions[max - 1].number + 1,
        id: nanoid(),
      };

      setSelectedQuestion({ ...newQuestion });

      newQuestions.push(newQuestion);

      setQuestions(newQuestions);
    }

    if (type === "delete") {
      if (max !== 1) {
        newQuestions.splice(index, 1);

        const updatedQuestions = [];

        newQuestions.map((question, questionIndex) => {
          updatedQuestions.push({
            ...question,
            number: questionIndex + 1,
          });
        });

        setSelectedQuestion({
          ...updatedQuestions[updatedQuestions.length - 1],
        });

        setQuestions(updatedQuestions);
      }
    }

    setQuestionOptionsAnchorEl(null);
  };

  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newQuestions = [...questions];

    const sourceQuestion = { ...newQuestions[source.index] };
    const destinationQuestion = { ...newQuestions[destination.index] };

    newQuestions[destination.index] = { ...sourceQuestion };
    newQuestions[source.index] = { ...destinationQuestion };

    const updatedQuestions = [];

    newQuestions.map((question, questionIndex) => {
      updatedQuestions.push({
        ...question,
        number: questionIndex + 1,
      });
    });

    setQuestions(updatedQuestions);
    setSelectedQuestion({ ...updatedQuestions[destination.index] });

    if (publishStatus !== FORM_PUBLISH_STATUS.PUBLISH) {
      setPublishStatus(FORM_PUBLISH_STATUS.PUBLISH);
    }

    setShouldPublish(true);
  };

  const handleCopyPublicLink = () => {
    navigator.clipboard.writeText(publicLink);

    handleClosePublishFormDialog();

    enqueueSnackbar("Link copied to clipboard!", { variant: "success" });
  };

  useEffect(() => {
    let shouldCreateNewForm = false;

    let newTitle = "";

    if (
      history.location &&
      history.location.state &&
      history.location.state.shouldCreateNewForm
    ) {
      shouldCreateNewForm = true;

      newTitle = history.location.state.title;

      history.replace({ location: { ...history.location, state: undefined } });
    }

    setIsLoading(true);

    if (shouldCreateNewForm) {
      const createNewForm = async () => {
        const response = await putForm({
          title: newTitle,
          formRef,
          questions: [defaultQuestion],
          isEmailNotificationEnabled: true,
          shouldPublish: true,
          customMetadata: {
            title: DEFAULT_PAGE_TITLE,
            description: DEFAULT_PAGE_DESCRIPTION,
          },
        });

        if (response && response.success && response.data) {
          setTitle(response.data.title);
          setQuestions(response.data.questions);
          setSelectedQuestion(response.data.questions[0]);
          if (response.data.shouldPublish) {
            setPublishStatus(FORM_PUBLISH_STATUS.PUBLISH);
            setShouldPublish(true);
          } else {
            setPublishStatus(FORM_PUBLISH_STATUS.PUBLISHED);
            setShouldPublish(false);
          }
          handleBreadcrumbs([
            { title: "Dashboard", navigationRoute: "/dashboard" },
            { title: response.data.title, isLast: true },
          ]);
        } else {
          enqueueSnackbar(response.message, { variant: "error" });
        }
      };

      createNewForm();
    } else {
      const getExistingForm = async () => {
        const response = await getForm({ formRef });

        if (response && response.success && response.data) {
          setTitle(response.data.title);
          setQuestions(response.data.questions);
          setSelectedQuestion(response.data.questions[0]);
          if (response.data.shouldPublish) {
            setPublishStatus(FORM_PUBLISH_STATUS.PUBLISH);
            setShouldPublish(true);
          } else {
            setPublishStatus(FORM_PUBLISH_STATUS.PUBLISHED);
            setShouldPublish(false);
          }
          handleBreadcrumbs([
            { title: "Dashboard", navigationRoute: "/dashboard" },
            { title: response.data.title, isLast: true },
          ]);
        } else {
          enqueueSnackbar(response.message, { variant: "error" });
        }
      };

      getExistingForm();
    }

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // console.log("selectedQuestion : ", selectedQuestion);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Granularity | Form Builder</title>
      </Helmet>

      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="form-builder-container">
          <div className="form-builder-left-section">
            {/* Form Content */}
            <div className="form-builder-left-scrollable-container">
              <div className="form-builder-left-section-header-container">
                <span className="form-builder-left-section-header">
                  Content
                </span>
                <Button
                  variant="contained"
                  color="default"
                  onClick={handleQuestionTypeMenuOpen}
                >
                  <AddIcon />
                </Button>
              </div>

              <Menu
                anchorEl={anchorForQuestionTypeMenu}
                keepMounted
                open={Boolean(anchorForQuestionTypeMenu)}
                onClose={handleQuestionTypeMenuClose}
              >
                {QUESTION_TYPES_OPTIONS.map((questionType) => (
                  <MenuItem
                    key={questionType.type}
                    onClick={() => handleAddQuestion(questionType)}
                    style={{
                      width: 150,
                      fontFamily: "Muli",
                      fontSize: 14,
                    }}
                  >
                    {questionType.name}
                  </MenuItem>
                ))}
              </Menu>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="question-list-droppable">
                  {(provided) => (
                    <div
                      className="form-builder-left-section-questions-list"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {provided.placeholder}
                      {questions.map((question, questionIndex) => (
                        <Draggable
                          key={question.id}
                          draggableId={question.id}
                          index={questionIndex}
                        >
                          {(draggableProvided) => (
                            <div
                              key={question.id}
                              className="form-builder-left-section-question-container"
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                            >
                              <div
                                className="form-builder-left-section-question"
                                onClick={() =>
                                  handleSelectedQuestionChange(question.id)
                                }
                              >
                                {question.number}){" "}
                                {question.questionValue
                                  ? truncateString(question.questionValue, 15)
                                  : "..."}
                              </div>
                              <IconButton
                                onClick={(event) =>
                                  handleQuestionOptionsOpen(
                                    event,
                                    questionIndex
                                  )
                                }
                              >
                                <MoreVertIcon />
                              </IconButton>
                              {question.questionOptionsAnchorEl && (
                                <Menu
                                  anchorEl={questionOptionsAnchorEl}
                                  keepMounted
                                  open={Boolean(questionOptionsAnchorEl)}
                                  onClose={handleQuestionOptionsMenuClose}
                                >
                                  {QUESTION_OPTIONS.map((questionOption) => {
                                    if (
                                      questions.length === 1 &&
                                      questionOption.type === "delete"
                                    ) {
                                      return null;
                                    }

                                    return (
                                      <MenuItem
                                        key={questionOption.type}
                                        onClick={() =>
                                          handleQuestionOptionSelect(
                                            questionIndex,
                                            questionOption.type
                                          )
                                        }
                                        style={{
                                          width: 120,
                                          fontFamily: "Muli",
                                          fontSize: 14,
                                        }}
                                      >
                                        {questionOption.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Menu>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <Divider />
          </div>

          <div className="form-builder-middle-section">
            {/* Form Builder */}
            <div className="form-builder-middle-section-question-container">
              {selectedQuestion && selectedQuestion.id && (
                <QuestionBox
                  id={selectedQuestion.id}
                  type={selectedQuestion.type}
                  number={selectedQuestion.number}
                  isRequired={selectedQuestion.isRequired}
                  questionValue={selectedQuestion.questionValue}
                  questionPlaceholder={selectedQuestion.questionPlaceholder}
                  handleQuestionChange={(event) =>
                    handleQuestionChange(
                      selectedQuestion.id,
                      event.target.value
                    )
                  }
                  descriptionValue={selectedQuestion.descriptionValue}
                  descriptionPlaceholder={
                    selectedQuestion.descriptionPlaceholder
                  }
                  answer={selectedQuestion.answer}
                  answerPlaceholder={selectedQuestion.answerPlaceholder}
                  handleAnswerChange={(value, optionIndex = null) =>
                    handleAnswerChange(
                      selectedQuestion.id,
                      selectedQuestion.type,
                      value,
                      optionIndex
                    )
                  }
                  answerable={false}
                  handleDescriptionChange={(event) =>
                    handleDescriptionChange(
                      selectedQuestion.id,
                      event.target.value
                    )
                  }
                  optionsList={selectedQuestion.options}
                  createOptionsList={(payload) =>
                    createOptionsList(selectedQuestion.id, payload)
                  }
                />
              )}
            </div>
          </div>

          <div className="form-builder-right-section">
            {/* Form Actions */}

            <div className="form-builder-right-section-actions-container">
              <IconButton onClick={handlePreview}>
                <VisibilityIcon />
              </IconButton>

              <IconButton href={publicLink} target="_blank" rel="noopener">
                <OpenInNewIcon />
              </IconButton>

              <PublishButton status={publishStatus} onClick={handlePublish} />
            </div>

            <Divider />

            <div
              className="form-builder-right-section-actions-container"
              style={{ marginTop: "4%", marginBottom: "4%" }}
            >
              <InsightsButton onClick={handleShowInsights}>
                Insights
              </InsightsButton>

              <ResponsesButton onClick={handleShowResponses}>
                Responses
              </ResponsesButton>
            </div>

            <Divider />

            <div
              className="form-builder-right-section-actions-container"
              style={{ marginTop: "4%", marginBottom: "4%" }}
            >
              <ConnectButton onClick={handleShowConnect}>Connect</ConnectButton>

              <ShareButton onClick={handleShowShare}>Share</ShareButton>
            </div>

            <Divider />

            {/* Form Settings */}

            <div className="form-builder-right-section-header-container">
              <span className="form-builder-right-section-header">
                Settings
              </span>
            </div>

            {selectedQuestion && selectedQuestion.type && (
              <div className="form-builder-right-section-question-type-dropdown-container">
                <div className="form-builder-right-section-question-type-dropdown-header">
                  Type
                </div>

                <FormControl
                  variant="outlined"
                  className="form-builder-right-section-question-type-dropdown-input-select-field"
                >
                  <Select
                    value={selectedQuestion.type}
                    onChange={handleQuestionTypeChange}
                    autoComplete="off"
                    inputProps={{
                      autoComplete: "new-password",
                    }}
                  >
                    {QUESTION_TYPES_OPTIONS.map((option) => (
                      <MenuItem
                        key={option.type}
                        value={option.type}
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

            {/* eslint-disable-next-line */}
            {selectedQuestion && selectedQuestion.hasOwnProperty("isRequired") && (
              <div className="form-builder-right-section-question-required-container">
                <div className="form-builder-right-section-question-required-header">
                  Required?
                </div>
                <Switch
                  checked={selectedQuestion.isRequired}
                  onChange={handleQuestionIsRequiredChange}
                  className="form-builder-required-switch"
                />
              </div>
            )}

            <div className="form-builder-autosave-message-root-container">
              <div className="form-builder-autosave-message-container">
                <div className="form-builder-autosave-message">
                  Granularity autosaves your work!
                </div>
              </div>
            </div>
          </div>

          {shouldShowPublishFormDialog && (
            <PublishFormDialog
              open={shouldShowPublishFormDialog}
              handleClose={handleClosePublishFormDialog}
              handleCopy={handleCopyPublicLink}
              publicLink={publicLink}
            />
          )}

          {shouldShowPreviewFormDialog && (
            <PreviewFormDialog
              open={shouldShowPreviewFormDialog}
              handleClose={handleClosePreviewFormDialog}
              questions={questions}
            />
          )}

          <AutoSave
            formRef={formRef}
            questions={questions}
            shouldPublish={shouldPublish}
          />
        </div>
      )}
    </div>
  );
};

FormBuilderContainer.propTypes = {
  history: PropTypes.object.isRequired,
  handleBreadcrumbs: PropTypes.func.isRequired,
};

export default FormBuilderContainer;
