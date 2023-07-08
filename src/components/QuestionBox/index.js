import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import enLocale from "date-fns/locale/en-US";
import { LocalizationProvider, DatePicker } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { OKButton, SubmitButton } from "../CustomButton";
import AnswerTextField from "../AnswerTextField";
import OptionsListDialog from "../OptionsListDialog";
import ThankYouBox from "../ThankYouBox";
import { QUESTION_TYPE } from "../../enums/Questions";
import "./styles.css";

const AddOptionsButton = withStyles(() => ({
  root: {
    width: 150,
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

const QuestionBox = (props) => {
  const {
    type,
    number,
    isRequired,
    questionValue,
    questionPlaceholder,
    handleQuestionChange,
    descriptionValue,
    descriptionPlaceholder,
    answer,
    answerPlaceholder,
    handleAnswerChange,
    answerable,
    handleDescriptionChange,
    optionsList,
    createOptionsList,
    handleOK,
    showSubmit,
    showThankYou,
    validationError,
  } = props;

  const [options, setOptions] = useState("");

  const [shouldShowOptionsListDialog, setShouldShowOptionsListDialog] =
    useState(false);

  const handleOpenOptionsListDialog = () => {
    const newOptionsList = optionsList.map((elem) => elem.value);

    if (newOptionsList.length) {
      setOptions(newOptionsList.join("\n"));
    }

    setShouldShowOptionsListDialog(true);
  };

  const handleCloseOptionsListDialog = () => {
    setShouldShowOptionsListDialog(false);
    setOptions("");
  };

  const handleSaveOptions = (payload) => {
    createOptionsList(payload);
    handleCloseOptionsListDialog();
  };

  return (
    <div
      className={
        answerable
          ? "question-box-root-container"
          : "question-box-root-scrollable-container"
      }
    >
      {!showThankYou && (
        <div
          className="question-box-container"
          style={{ marginTop: answerable ? "5%" : 0 }}
        >
          <div className="question-box-question-number">{number})</div>
          <div className="question-box-question-container">
            <div className="question-box-text-field-container">
              {answerable ? (
                <div className="question-box-question-value">
                  {questionValue ? (
                    <Typography
                      style={{
                        whiteSpace: "pre-wrap",
                        fontSize: 22,
                        fontFamily: "Muli",
                      }}
                      component="span"
                    >
                      {questionValue}
                    </Typography>
                  ) : (
                    "..."
                  )}{" "}
                  {isRequired && "*"}
                </div>
              ) : (
                <TextField
                  onChange={handleQuestionChange}
                  value={questionValue}
                  placeholder={questionPlaceholder}
                  className="question-box-text-field"
                  InputProps={{ disableUnderline: true }}
                  multiline
                />
              )}
            </div>

            <div className="question-box-description-text-field-container">
              {answerable ? (
                <div className="question-box-description-value">
                  {descriptionValue ? (
                    <Typography
                      style={{
                        whiteSpace: "pre-wrap",
                        fontSize: 22,
                        fontFamily: "Muli",
                      }}
                      component="span"
                    >
                      {descriptionValue}
                    </Typography>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <TextField
                  onChange={handleDescriptionChange}
                  value={descriptionValue}
                  placeholder={descriptionPlaceholder}
                  className="question-box-description-text-field"
                  InputProps={{ disableUnderline: true }}
                  multiline
                />
              )}
            </div>

            {type === QUESTION_TYPE.TEXT ||
            type === QUESTION_TYPE.EMAIL ||
            type === QUESTION_TYPE.NUMBER ? (
              <div className="question-box-answer-text-field-container">
                <AnswerTextField
                  onChange={(event) => handleAnswerChange(event.target.value)}
                  value={answer}
                  placeholder={answerPlaceholder}
                  className="question-box-answer-text-field"
                  disabled={!answerable}
                  multiline
                />
              </div>
            ) : null}

            {type === QUESTION_TYPE.YES_NO && (
              <div className="yes-no-container">
                <OKButton onClick={() => handleAnswerChange("YES")}>
                  Yes
                </OKButton>
                <OKButton onClick={() => handleAnswerChange("NO")}>No</OKButton>
              </div>
            )}

            {type === QUESTION_TYPE.DATE && (
              <div className="question-box-answer-date-field-container">
                <LocalizationProvider
                  dateAdapter={DateFnsAdapter}
                  locale={enLocale}
                >
                  <DatePicker
                    value={answer}
                    onChange={handleAnswerChange}
                    renderInput={(datePickerProps) => (
                      <TextField
                        {...datePickerProps}
                        className="date-text-field"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            )}

            {type === QUESTION_TYPE.DROPDOWN && (
              <div>
                <div className="question-box-drop-down-container">
                  <FormControl className="question-box-drop-down-input-select-field">
                    <Select
                      value={answer}
                      onChange={(event) =>
                        handleAnswerChange(event.target.value)
                      }
                      autoComplete="off"
                      inputProps={{
                        autoComplete: "new-password",
                      }}
                      disabled={optionsList.length ? false : true}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select an option...
                      </MenuItem>
                      {optionsList.map((item, index) => (
                        <MenuItem
                          key={`${item.value}#${index}`}
                          value={item.value}
                        >
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                {!answerable && (
                  <div className="question-box-drop-down-add-options-button-list-count-container">
                    <AddOptionsButton onClick={handleOpenOptionsListDialog}>
                      Add Options
                    </AddOptionsButton>

                    <Typography
                      variant="subtitle1"
                      style={{ fontFamily: "Muli" }}
                    >
                      {optionsList.length}{" "}
                      {optionsList.length === 1 ? "option" : "options"} in list
                    </Typography>
                  </div>
                )}
              </div>
            )}

            {type === QUESTION_TYPE.MULTIPLE_CHOICE && (
              <div>
                <div className="question-box-multiple-choice-list">
                  {optionsList.map((item, index) => (
                    <div key={`${item.value}#${index}`}>
                      <Checkbox
                        checked={item.checked}
                        onChange={() => handleAnswerChange("", index)}
                        className="question-box-multiple-choice-checkbox"
                      />
                      <span className="question-box-multiple-choice-item">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {!answerable && (
                  <AddOptionsButton onClick={handleOpenOptionsListDialog}>
                    Add Choices
                  </AddOptionsButton>
                )}
              </div>
            )}

            {shouldShowOptionsListDialog && (
              <OptionsListDialog
                open={shouldShowOptionsListDialog}
                handleClose={handleCloseOptionsListDialog}
                handleSave={handleSaveOptions}
                options={options}
              />
            )}

            {validationError && (
              <div className="question-box-validation-error-container">
                {validationError}
              </div>
            )}

            {answerable && type !== QUESTION_TYPE.YES_NO ? (
              <div className="question-box-button-container">
                {showSubmit ? (
                  <SubmitButton onClick={handleOK}>Submit</SubmitButton>
                ) : (
                  <OKButton onClick={handleOK}>Ok</OKButton>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {answerable && showThankYou ? (
        <div className="question-box-thank-you-container">
          <ThankYouBox />
        </div>
      ) : null}
    </div>
  );
};

QuestionBox.propTypes = {
  type: PropTypes.string,
  number: PropTypes.number,
  isRequired: PropTypes.bool,
  questionValue: PropTypes.string,
  questionPlaceholder: PropTypes.string,
  handleQuestionChange: PropTypes.func,
  descriptionValue: PropTypes.string,
  descriptionPlaceholder: PropTypes.string,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  answerPlaceholder: PropTypes.string,
  handleAnswerChange: PropTypes.func.isRequired,
  answerable: PropTypes.bool.isRequired,
  handleDescriptionChange: PropTypes.func,
  optionsList: PropTypes.array,
  createOptionsList: PropTypes.func,
  handleOK: PropTypes.func,
  showSubmit: PropTypes.bool,
  showThankYou: PropTypes.bool,
  validationError: PropTypes.string,
};

export default QuestionBox;
