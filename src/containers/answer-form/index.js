import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Link from "@material-ui/core/Link";
import QuestionBox from "../../components/QuestionBox";
import Spinner from "../../components/Spinner";
import CannotAccessForm from "../../components/CannotAccessForm";
import { QUESTION_TYPE } from "../../enums/Questions";
import { validate } from "./helper";
import { GRANULARITY_WEB_URL } from "../../utils/config";
import {
  DEFAULT_PAGE_TITLE,
  DEFAULT_PAGE_DESCRIPTION,
} from "../../utils/constants";
import {
  getPublishedForm,
  postOpenEvent,
  postStartEvent,
  postCompleteEvent,
  postSeeEvent,
  postResponse,
} from "../../utils/api";
import "./styles.css";

const SLIDE_TIMEOUT_MS = 500;

const wrapQuestions = (questions) =>
  questions.map((question) => ({
    ...question,
    seen: false,
  }));

const AnswerFormContainer = (props) => {
  const { isPreviewMode = false, isMobilePreviewMode = false } = props;

  const formRef = window.location.pathname.split("/")[2];

  const [isLoading, setIsLoading] = useState(false);

  const [responseRef, setResponseRef] = useState("");

  const [questions, setQuestions] = useState([]);

  const [selectedQuestion, setSelectedQuestion] = useState({});

  const [shouldShowSubmitButton, setShouldShowSubmitButton] = useState(false);

  const [shouldShowThankYouBlock, setShouldShowThankYouBlock] = useState(false);

  const [shouldDisablePrevious, setShouldDisablePrevious] = useState(true);

  const [shouldDisableNext, setShouldDisableNext] = useState(false);

  const [shouldShowCannotAccessForm, setShouldShowCannotAccessForm] =
    useState(false);

  const [slideIn, setSlideIn] = useState(true);

  const [slideDirection, setSlideDirection] = useState("right");

  // const [customMetadata, setCustomMetadata] = useState({
  //   title: "",
  //   description: "",
  // });

  const handlePrevious = () => {
    setSlideDirection("right");
    setSlideIn(false);

    setTimeout(() => {
      const currentQuestion = questions.find(
        (elem) => elem.id === selectedQuestion.id
      );

      const previousQuestion = questions.find(
        (elem) => elem.number === currentQuestion.number - 1
      );

      const nextQuestion = questions.find(
        (elem) => elem.number === previousQuestion.number - 1
      );

      if (previousQuestion) {
        setSelectedQuestion({ ...previousQuestion });
        setShouldDisableNext(false);
        setShouldShowSubmitButton(false);
      }

      if (!nextQuestion) {
        setShouldDisablePrevious(true);
      }

      setSlideDirection("right");
      setSlideIn(true);
    }, SLIDE_TIMEOUT_MS);
  };

  const handleNext = async () => {
    setSlideDirection("left");
    setSlideIn(false);

    setTimeout(async () => {
      const previousQuestionIndex = questions.findIndex(
        (elem) => elem.id === selectedQuestion.id
      );

      const previousQuestion = questions[previousQuestionIndex];

      if (previousQuestionIndex === 0 && !previousQuestion.seen) {
        // console.log("start");

        if (!isPreviewMode) {
          await postStartEvent({ formRef });
        }
      }

      if (!previousQuestion.seen) {
        const newQuestions = [...questions];

        newQuestions[previousQuestionIndex].seen = true;

        setQuestions(newQuestions);

        // see API call

        // console.log("see");

        if (!isPreviewMode) {
          await postSeeEvent({ formRef, seenQuestionId: previousQuestion.id });
        }
      }

      const currentQuestion = questions.find(
        (elem) => elem.number === previousQuestion.number + 1
      );

      let nextQuestion = null;

      if (currentQuestion) {
        setSelectedQuestion({ ...currentQuestion });

        setShouldDisablePrevious(false);

        nextQuestion = questions.find(
          (elem) => elem.number === currentQuestion.number + 1
        );
      }

      if (!nextQuestion) {
        setShouldDisableNext(true);
        setShouldShowSubmitButton(true);
      } else {
        setShouldShowSubmitButton(false);
      }

      if (!currentQuestion && !nextQuestion) {
        setShouldShowThankYouBlock(true);

        // complete API call

        if (!isPreviewMode) {
          setIsLoading(true);
          // console.log("submit response");
          await postResponse({ formRef, responseRef, response: questions });

          // console.log("complete");
          await postCompleteEvent({ formRef });
          setIsLoading(false);
        }
      }

      setSlideDirection("left");
      setSlideIn(true);
    }, SLIDE_TIMEOUT_MS);
  };

  const isValid = (question) => {
    const newQuestion = validate(question);

    if (newQuestion && newQuestion.validationError) {
      setSelectedQuestion({ ...newQuestion });
      return false;
    }

    return true;
  };

  const validateAllAnswers = () => {
    let isAnswerValid = true;

    for (let i = 0; i < questions.length; i += 1) {
      const newQuestion = validate(questions[i]);

      if (newQuestion && newQuestion.validationError) {
        setSelectedQuestion({ ...newQuestion });
        setShouldShowSubmitButton(false);
        isAnswerValid = false;

        if (newQuestion.number === 1) {
          setShouldDisablePrevious(true);
          setShouldDisableNext(false);
        } else if (newQuestion.number === questions.length) {
          setShouldDisablePrevious(false);
          setShouldDisableNext(true);
        } else {
          setShouldDisablePrevious(false);
          setShouldDisableNext(false);
        }

        break;
      }
    }

    return isAnswerValid;
  };

  const handleOK = async () => {
    // validate

    const previousQuestion = questions.find(
      (elem) => elem.id === selectedQuestion.id
    );

    if (!isValid(previousQuestion)) {
      return;
    }

    if (shouldShowSubmitButton && !validateAllAnswers()) {
      return;
    }

    // move to next question
    await handleNext();
  };

  const handleAnswerChange = async (
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

      newQuestions[questionIndex].answer = [...answers];
    } else {
      newQuestions[questionIndex].answer = answer;
    }

    setQuestions(newQuestions);

    setSelectedQuestion({ ...questions[questionIndex] });

    if (questionType === QUESTION_TYPE.YES_NO) {
      await handleNext();
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (!isPreviewMode) {
      const getPublishedFormHandler = async () => {
        const response = await getPublishedForm({ formRef });

        if (response && response.success && response.data) {
          setQuestions(wrapQuestions(response.data.questions));
          setSelectedQuestion({ ...response.data.questions[0], seen: false });
          setResponseRef(nanoid());
          setSlideIn(true);

          if (response.data.questions.length === 1) {
            setShouldDisableNext(true);
            setShouldShowSubmitButton(true);
          }

          await postOpenEvent({ formRef });
        } else {
          setShouldShowCannotAccessForm(true);
        }
      };

      getPublishedFormHandler();
    } else {
      setQuestions(wrapQuestions(props.questions));
      setSelectedQuestion({ ...props.questions[0], seen: false });
    }

    setTimeout(() => setIsLoading(false), 1000);

    if (!formRef) {
      setShouldShowCannotAccessForm(true);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>{DEFAULT_PAGE_TITLE}</title>
        <meta property="og:image" content="%PUBLIC_URL%/og_image.svg" />
        <meta property="og:description" content={DEFAULT_PAGE_DESCRIPTION} />
      </Helmet>

      {isLoading ? (
        <div className="spinner-container">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="answer-form-root-container">
          {shouldShowCannotAccessForm ? (
            <CannotAccessForm />
          ) : (
            <div className="answer-form-root-container">
              <Slide
                direction={slideDirection}
                in={slideIn}
                mountOnEnter
                unmountOnExit
                timeout={SLIDE_TIMEOUT_MS}
              >
                <div className="answer-form-container">
                  <QuestionBox
                    id={selectedQuestion.id}
                    type={selectedQuestion.type}
                    number={selectedQuestion.number}
                    isRequired={selectedQuestion.isRequired}
                    questionValue={selectedQuestion.questionValue}
                    descriptionValue={selectedQuestion.descriptionValue}
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
                    answerable
                    optionsList={selectedQuestion.options}
                    validationError={selectedQuestion.validationError}
                    handleOK={handleOK}
                    showSubmit={shouldShowSubmitButton}
                    showThankYou={shouldShowThankYouBlock}
                  />

                  {!shouldShowThankYouBlock && (
                    <div
                      className={
                        isMobilePreviewMode
                          ? "answer-form-bottom-actions-root-container-mobile-preview-mode"
                          : "answer-form-bottom-actions-root-container"
                      }
                    >
                      <div
                        className={
                          isMobilePreviewMode
                            ? "answer-form-bottom-actions-container-mobile-preview-mode"
                            : "answer-form-bottom-actions-container"
                        }
                      >
                        <div className="answer-form-bottom-actions-button">
                          <Button
                            variant="contained"
                            onClick={handlePrevious}
                            disabled={shouldDisablePrevious}
                            style={{
                              backgroundColor: "#66b2b2",
                              color: "#ffffff",
                              fontFamily: "Muli",
                              fontSize: 14,
                              "&:hover": {
                                backgroundColor: "#66b2b2d1",
                              },
                              textTransform: "none",
                            }}
                          >
                            Prev
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={shouldDisableNext}
                            style={{
                              backgroundColor: "#66b2b2",
                              color: "#ffffff",
                              fontFamily: "Muli",
                              fontSize: 14,
                              "&:hover": {
                                backgroundColor: "#66b2b2d1",
                              },
                              textTransform: "none",
                            }}
                          >
                            Next
                          </Button>
                        </div>

                        <Button
                          variant="contained"
                          style={{
                            width: 190,
                            backgroundColor: "#66b2b2",
                            color: "#ffffff",
                            fontFamily: "Muli",
                            fontSize: 14,
                            "&:hover": {
                              backgroundColor: "#66b2b2d1",
                            },
                            textTransform: "none",
                          }}
                        >
                          <Link
                            underline="none"
                            color="inherit"
                            href={GRANULARITY_WEB_URL}
                            target="_blank"
                            rel="noopener"
                          >
                            Crafted in{" "}
                            <span style={{ fontWeight: "bold" }}>
                              Granularity
                            </span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Slide>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

AnswerFormContainer.propTypes = {
  isPreviewMode: PropTypes.bool,
  isMobilePreviewMode: PropTypes.bool,
  questions: PropTypes.array,
};

export default AnswerFormContainer;
