import moment from "moment-timezone";
import { GRANULARITY_TOKEN } from "./constants";

export const getDefaultHeaders = () => {
  const token = localStorage.getItem(GRANULARITY_TOKEN);

  return {
    "x-access-token": token,
  };
};

export const truncateString = (input, maxAllowedLength) =>
  input.length > maxAllowedLength
    ? `${input.substring(0, maxAllowedLength)}...`
    : input;

export const formatDate = (date, format) => moment(date).format(format);

export const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLowerCase());
};

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

export const debounce = (func, timeout) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const validateURL = (str) => {
  const regex = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  return !!regex.test(str);
};
