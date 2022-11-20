import { SERVER_DETAILS } from "../commons/constants";

export const CONSUMPTION_ACTIONS = {
  LOAD_CONSUMPTIONS: "CONSUMPTION_ACTIONS_LOAD_CONSUMPTIONS",
  SET_LOAD_CONSUMPTIONS_RESPONSE_STATUS:
    "CONSUMPTION_ACTIONS_SET_LOAD_CONSUMPTIONS_RESPONSE_STATUS",
  SET_CONSUMPTIONS: "CONSUMPTION_ACTIONS_SET_CONSUMPTIONS",
  ADD_CONSUMPTION: "CONSUMPTION_ACTIONS_ADD_CONSUMPTION",
  SET_ADD_CONSUMPTION_RESPONSE_STATUS:
    "CONSUMPTION_ACTIONS_SET_ADD_CONSUMPTION_RESPONSE_STATUS",
  UPDATE_CONSUMPTIONS: "CONSUMPTION_ACTIONS_UPDATE_CONSUMPTIONS",
  SET_ERROR: "CONSUMPTION_ACTIONS_SET_ERROR",
};

export const CONSUMPTION_API = {
  ADD_CONSUMPTION: `${SERVER_DETAILS.API_URL}/mess/<<mess_id>>/consumption`,
  GET_CONSUMPTIONS: `${SERVER_DETAILS.API_URL}/mess/<<mess_id>>/consumption`,
};
