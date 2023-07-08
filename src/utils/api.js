import axios from "axios";
import { GRANULARITY_TOKEN } from "./constants";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 50000,
});

export const getHeaders = () => ({
  "x-access-token": localStorage.getItem(GRANULARITY_TOKEN),
});

export const processError = (error) => {
  if (error.response) {
    // client received an error response (5xx, 4xx)

    return error.response.data;
  }

  if (error.request) {
    // client never received a response, or request never left

    return {
      success: false,
      message: "It's not you, it's us, want to give it another try?",
    };
  }

  // anything else

  return {
    success: false,
    message: "Something went wrong.",
  };
};

export const signUp = async ({ email, password }) => {
  try {
    const response = await API.post("/users/signup", {
      email: String(email).trim(),
      password: String(password).trim(),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const response = await API.post("/users/signin", {
      email: String(email).trim(),
      password: String(password).trim(),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getUserInfo = async () => {
  try {
    const response = await API.get("/users/info", {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const updateAccountInfo = async ({ name }) => {
  try {
    const response = await API.put(
      "/users/account",
      {
        name: String(name).trim(),
      },
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getAccountStats = async () => {
  try {
    const response = await API.get("/users/account/stats", {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const triggerEmailVerification = async ({ email }) => {
  try {
    const response = await API.post(
      "/users/trigger-email-verification",
      {
        email: String(email).trim(),
      },
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const verifyEmail = async ({ emailToken }) => {
  try {
    const response = await API.post("/users/verify-email", {
      emailToken,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const changePassword = async ({
  oldPassword,
  newPassword,
  confirmNewPassword,
}) => {
  try {
    const response = await API.put(
      "/users/change-password",
      {
        oldPassword: String(oldPassword).trim(),
        newPassword: String(newPassword).trim(),
        confirmNewPassword: String(confirmNewPassword).trim(),
      },
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const sendPasswordResetInstructions = async ({ email }) => {
  try {
    const response = await API.post("/users/send-password-reset-instructions", {
      email: String(email).trim(),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const checkResetPasswordLinkExpiry = async ({ token }) => {
  try {
    const response = await API.post("/users/check-reset-password-link-expiry", {
      token,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const resetPassword = async ({
  email,
  newPassword,
  confirmNewPassword,
}) => {
  try {
    const response = await API.put("/users/reset-password", {
      email: String(email).trim(),
      newPassword: String(newPassword).trim(),
      confirmNewPassword: String(confirmNewPassword).trim(),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getForms = async () => {
  try {
    const response = await API.get("/forms", {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getForm = async ({ formRef }) => {
  try {
    const response = await API.get(`/forms/${formRef}`, {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getPublishedForm = async ({ formRef }) => {
  try {
    const response = await API.get(`/forms/published/${formRef}`);

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const putForm = async ({
  formRef,
  title = null,
  questions = null,
  isEmailNotificationEnabled = null,
  shouldPublish = null,
  customMetadata = null,
}) => {
  try {
    const response = await API.put(
      "/forms",
      {
        title: title ? String(title).trim() : title,
        formRef,
        questions,
        isEmailNotificationEnabled,
        shouldPublish,
        customMetadata,
      },
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const putPublishForm = async ({ formRef, title, questions }) => {
  try {
    const response = await API.put(
      "/forms/publish",
      { formRef, title, questions },
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const deleteForm = async ({ formRef }) => {
  try {
    const response = await API.delete(`/forms/${formRef}`, {
      headers: getHeaders(),
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const putCustomMetadataForForm = async ({
  formRef,
  title = null,
  description = null,
}) => {
  try {
    const response = await API.put(
      "/forms/custom-metadata",
      {
        formRef,
        title: title ? String(title).trim() : title,
        description: description ? String(description).trim() : description,
      },
      {
        headers: getHeaders(),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postResponse = async ({ formRef, responseRef, response }) => {
  try {
    const result = await API.post("/responses", {
      formRef,
      responseRef,
      response,
    });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getInsights = async ({ formRef }) => {
  try {
    const result = await API.get(`/insights/${formRef}`, {
      headers: getHeaders(),
    });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postOpenEvent = async ({ formRef }) => {
  try {
    const result = await API.post("/insights/events/open", { formRef });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postStartEvent = async ({ formRef }) => {
  try {
    const result = await API.post("/insights/events/start", { formRef });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postCompleteEvent = async ({ formRef }) => {
  try {
    const result = await API.post("/insights/events/complete", { formRef });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postSeeEvent = async ({ formRef, seenQuestionId }) => {
  try {
    const result = await API.post("/insights/events/see", {
      formRef,
      seenQuestionId,
    });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getResponses = async ({ formRef }) => {
  try {
    const result = await API.get(`/responses/${formRef}`, {
      headers: getHeaders(),
    });

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};
