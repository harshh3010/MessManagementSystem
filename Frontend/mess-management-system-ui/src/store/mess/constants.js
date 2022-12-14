import { SERVER_DETAILS } from "../commons/constants";

export const MESS_ACTIONS = {
  CREATE_MESS: "MESS_ACTIONS_CREATE_MESS",
  SET_CREATE_MESS_RESPONSE_STATUS:
    "MESS_ACTIONS_SET_CREATE_MESS_RESPONSE_STATUS",
  LOAD_MESSES: "MESS_ACTIONS_LOAD_MESSES",
  SET_LOAD_MESSES_RESPONSE_STATUS:
    "MESS_ACTIONS_SET_LOAD_MESSES_RESPONSE_STATUS",
  SET_MESSES: "MESS_ACTIONS_SET_MESSES",
  UPDATE_MESSES: "MESS_ACTIONS_UPDATE_MESSES",
  SET_SELECTED_MESS: "MESS_ACTIONS_SET_SELECTED_MESS",
  SET_ERROR: "MESS_ACTIONS_SET_ERROR",
};

export const MESS_API = {
  CREATE_MESS: `${SERVER_DETAILS.API_URL}/mess`,
  LOAD_MESSES: `${SERVER_DETAILS.API_URL}/mess`,
};
