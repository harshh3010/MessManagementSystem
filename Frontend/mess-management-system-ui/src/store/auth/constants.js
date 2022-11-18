import { SERVER_DETAILS } from "../commons/constants";

export const AUTH_ACTIONS = {
  LOGIN: "AUTH_ACTIONS_LOGIN",
  SIGNUP: "AUTH_ACTIONS_SIGNUP",
  SET_LOGIN_RESPONSE_STATUS: "AUTH_ACTIONS_SET_LOGIN_RESPONSE_STATUS",
  SET_SIGNUP_RESPONSE_STATUS: "AUTH_ACTIONS_SET_SIGNUP_RESPONSE_STATUS",
  SET_ERROR: "AUTH_ACTIONS_SET_ERROR",
};

export const AUTH_API = {
  LOGIN: `${SERVER_DETAILS.API_URL}/users/login`,
  SIGNUP: `${SERVER_DETAILS.API_URL}/users/signup`,
};
