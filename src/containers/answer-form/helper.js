import { QUESTION_TYPE } from "../../enums/Questions";
import { validateEmail, validateURL } from "../../utils/common";

const textTypeValidator = (question) => {
  const { isRequired, maxCharacters, answer } = question;

  let validationError = "";

  if (isRequired && !answer) {
    validationError = "Please answer this question";
  }

  if (maxCharacters && answer < maxCharacters) {
    validationError = "Max characters reached";
  }

  return {
    ...question,
    validationError,
  };
};

const yesOrNoTypeValidator = (question) => {
  const { isRequired, answer } = question;

  let validationError = "";

  if (isRequired && !answer) {
    validationError = "Please answer this question";
  }

  return {
    ...question,
    validationError,
  };
};

const dateTypeValidator = (question) => {
  const { isRequired, answer } = question;

  let validationError = "";

  if (isRequired && !answer) {
    validationError = "Please answer this question";
  }

  return {
    ...question,
    validationError,
  };
};

const numberValidator = (question) => {
  const { isRequired, min, max, answer } = question;

  let validationError = "";

  if (isRequired && !answer) {
    validationError = "Please answer this question";
  }

  if (min && !(answer >= min)) {
    validationError = `Please enter a value greather than ${min}`;
  }

  if (max && !(answer <= max)) {
    validationError = `Please enter a value less than ${max}`;
  }

  if (min && max && !(answer >= min && answer <= max)) {
    validationError = `Please enter a value between ${min} and ${max}`;
  }

  return {
    ...question,
    validationError,
  };
};

const dropDownValidator = (question) => {
  const { isRequired, answer } = question;

  let validationError = "";

  if (isRequired && !answer) {
    validationError = "Please answer this question";
  }

  return {
    ...question,
    validationError,
  };
};

const emailValidator = (question) => {
  const { isRequired, answer } = question;

  let validationError = "";

  if (isRequired && !answer) {
    validationError = "Please answer this question";
  }

  if (answer && !validateEmail(answer)) {
    validationError = "Please enter a valid email";
  }

  return {
    ...question,
    validationError,
  };
};

const multipleChoiceValidator = (question) => {
  const { isRequired, answer } = question;

  let validationError = "";

  if (isRequired && !answer[0]) {
    validationError = "Please answer this question";
  }

  return {
    ...question,
    validationError,
  };
};

const websiteTypeValidator = (question) => {
  const { isRequired, answer } = question;

  let validationError = "";

  if (isRequired && !answer) {
    validationError = "Please answer this question";
  }

  if (answer && !validateURL(answer)) {
    validationError = "Please enter a valid URL";
  }

  return {
    ...question,
    validationError,
  };
};

const linearScaleTypeValidator = (question) => {
  const { isRequired, answer } = question;

  let validationError = "";

  if (isRequired && !answer) {
    validationError = "Please answer this question";
  }

  return {
    ...question,
    validationError,
  };
};

const ratingTypeValidator = (question) => {
  const { isRequired, answer } = question;

  let validationError = "";

  if (isRequired && !answer) {
    validationError = "Please answer this question";
  }

  return {
    ...question,
    validationError,
  };
};

export const validate = (question) => {
  const mapper = {
    [QUESTION_TYPE.TEXT]: textTypeValidator,
    [QUESTION_TYPE.STATEMENT]: () => question, // no validation
    [QUESTION_TYPE.YES_NO]: yesOrNoTypeValidator,
    [QUESTION_TYPE.DATE]: dateTypeValidator,
    [QUESTION_TYPE.NUMBER]: numberValidator,
    [QUESTION_TYPE.DROPDOWN]: dropDownValidator,
    [QUESTION_TYPE.EMAIL]: emailValidator,
    [QUESTION_TYPE.MULTIPLE_CHOICE]: multipleChoiceValidator,
    [QUESTION_TYPE.WEBSITE]: websiteTypeValidator,
    [QUESTION_TYPE.LINEAR_SCALE]: linearScaleTypeValidator,
    [QUESTION_TYPE.RATING]: ratingTypeValidator,
  };

  const applyMapper = mapper[question.type];

  return applyMapper ? applyMapper(question) : null;
};
