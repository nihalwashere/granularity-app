import axios from "axios";
import { GRANULARITY_API_BASE_URL_V1 } from "./config";
import { getDefaultHeaders, processError } from "./common";

export const signUp = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/users/signup`,
      {
        email: String(email).trim(),
        password: String(password).trim(),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/users/signin`,
      {
        email: String(email).trim(),
        password: String(password).trim(),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get(
      `${GRANULARITY_API_BASE_URL_V1}/users/info`,
      {
        headers: {
          ...getDefaultHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const updateAccountInfo = async ({ name }) => {
  try {
    const response = await axios.put(
      `${GRANULARITY_API_BASE_URL_V1}/users/account`,
      {
        name: String(name).trim(),
      },
      {
        headers: {
          ...getDefaultHeaders(),
        },
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
    const response = await axios.get(
      `${GRANULARITY_API_BASE_URL_V1}/users/account/stats`,
      {
        headers: {
          ...getDefaultHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const triggerEmailVerification = async ({ email }) => {
  try {
    const response = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/users/trigger-email-verification`,
      {
        email: String(email).trim(),
      },
      {
        headers: {
          ...getDefaultHeaders(),
        },
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
    const response = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/users/verify-email`,
      {
        emailToken,
      }
    );

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
    const response = await axios.put(
      `${GRANULARITY_API_BASE_URL_V1}/users/change-password`,
      {
        oldPassword: String(oldPassword).trim(),
        newPassword: String(newPassword).trim(),
        confirmNewPassword: String(confirmNewPassword).trim(),
      },
      {
        headers: {
          ...getDefaultHeaders(),
        },
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
    const response = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/users/send-password-reset-instructions`,
      {
        email: String(email).trim(),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const checkResetPasswordLinkExpiry = async ({ token }) => {
  try {
    const response = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/users/check-reset-password-link-expiry`,
      {
        token,
      }
    );

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
    const response = await axios.put(
      `${GRANULARITY_API_BASE_URL_V1}/users/reset-password`,
      {
        email: String(email).trim(),
        newPassword: String(newPassword).trim(),
        confirmNewPassword: String(confirmNewPassword).trim(),
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getForms = async () => {
  try {
    const response = await axios.get(`${GRANULARITY_API_BASE_URL_V1}/forms/`, {
      headers: {
        ...getDefaultHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getForm = async ({ formRef }) => {
  try {
    const response = await axios.get(
      `${GRANULARITY_API_BASE_URL_V1}/forms/${formRef}`,
      {
        headers: {
          ...getDefaultHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getPublishedForm = async ({ formRef }) => {
  try {
    const response = await axios.get(
      `${GRANULARITY_API_BASE_URL_V1}/forms/published/${formRef}`
    );

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
    const response = await axios.put(
      `${GRANULARITY_API_BASE_URL_V1}/forms/`,
      {
        title: title ? String(title).trim() : title,
        formRef,
        questions,
        isEmailNotificationEnabled,
        shouldPublish,
        customMetadata,
      },
      {
        headers: {
          ...getDefaultHeaders(),
        },
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
    const response = await axios.put(
      `${GRANULARITY_API_BASE_URL_V1}/forms/publish`,
      { formRef, title, questions },
      {
        headers: {
          ...getDefaultHeaders(),
        },
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
    const response = await axios.delete(
      `${GRANULARITY_API_BASE_URL_V1}/forms/${formRef}`,
      {
        headers: {
          ...getDefaultHeaders(),
        },
      }
    );

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
    const response = await axios.put(
      `${GRANULARITY_API_BASE_URL_V1}/forms/custom-metadata`,
      {
        formRef,
        title: title ? String(title).trim() : title,
        description: description ? String(description).trim() : description,
      },
      {
        headers: {
          ...getDefaultHeaders(),
        },
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
    const result = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/responses/`,
      { formRef, responseRef, response }
    );

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getInsights = async ({ formRef }) => {
  try {
    const result = await axios.get(
      `${GRANULARITY_API_BASE_URL_V1}/insights/${formRef}`,
      {
        headers: {
          ...getDefaultHeaders(),
        },
      }
    );

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postOpenEvent = async ({ formRef }) => {
  try {
    const result = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/insights/events/open`,
      { formRef }
    );

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postStartEvent = async ({ formRef }) => {
  try {
    const result = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/insights/events/start`,
      { formRef }
    );

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postCompleteEvent = async ({ formRef }) => {
  try {
    const result = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/insights/events/complete`,
      { formRef }
    );

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const postSeeEvent = async ({ formRef, seenQuestionId }) => {
  try {
    const result = await axios.post(
      `${GRANULARITY_API_BASE_URL_V1}/insights/events/see`,
      { formRef, seenQuestionId }
    );

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};

export const getResponses = async ({ formRef }) => {
  try {
    const result = await axios.get(
      `${GRANULARITY_API_BASE_URL_V1}/responses/${formRef}`,
      {
        headers: {
          ...getDefaultHeaders(),
        },
      }
    );

    return result.data;
  } catch (error) {
    console.error(error);
    return processError(error);
  }
};
