import { SERVER_DETAILS } from "../commons/constants";

export const EXPENSE_ACTIONS = {
  LOAD_EXPENSES: "EXPENSE_ACTIONS_LOAD_EXPENSES",
  SET_LOAD_EXPENSES_RESPONSE_STATUS:
    "EXPENSE_ACTIONS_SET_LOAD_EXPENSES_RESPONSE_STATUS",
  SET_EXPENSES: "EXPENSE_ACTIONS_SET_EXPENSES",
  ADD_EXPENSE: "EXPENSE_ACTIONS_ADD_EXPENSE",
  SET_ADD_EXPENSE_RESPONSE_STATUS:
    "EXPENSE_ACTIONS_SET_ADD_EXPENSE_RESPONSE_STATUS",
  UPDATE_EXPENSES: "EXPENSE_ACTIONS_UPDATE_EXPENSES",
  SET_ERROR: "EXPENSE_ACTIONS_SET_ERROR",
};

export const EXPENSE_API = {
  ADD_EXPENSE: `${SERVER_DETAILS.API_URL}/mess/<<mess_id>>/expense`,
  GET_EXPENSES: `${SERVER_DETAILS.API_URL}/mess/<<mess_id>>/expense`,
};
