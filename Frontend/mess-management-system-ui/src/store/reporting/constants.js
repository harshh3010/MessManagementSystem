import { SERVER_DETAILS } from "../commons/constants";

export const REPORTING_ACTIONS = {
  LOAD_REPORTING_DATA: "REPORTING_ACTIONS_LOAD_REPORTING_DATA",
  SET_LOAD_REPORTING_DATA_RESPONSE_STATUS:
    "REPORTING_ACTIONS_SET_LOAD_REPORTING_DATA_RESPONSE_STATUS",
  SET_REPORTING_DATA: "REPORTING_ACTIONS_SET_REPORTING_DATA",
  SET_ERROR: "REPORTING_API_SET_ERROR",
};

export const REPORTING_API = {
  GET_INVENTORY_OVERVIEW_DATA: `${SERVER_DETAILS.API_URL}/mess/<<mess_id>>/reporting/getInventoryOverviewData`,
  GET_EXPENSE_OVERVIEW_DATA: `${SERVER_DETAILS.API_URL}/mess/<<mess_id>>/reporting/getExpenseOverviewData`,
  GET_CONSUMPTION_OVERVIEW_DATA: `${SERVER_DETAILS.API_URL}/mess/<<mess_id>>/reporting/getConsumptionOverviewData`,
  GET_RECENT_EXPENSES: `${SERVER_DETAILS.API_URL}/mess/<<mess_id>>/reporting/getRecentExpenses`,
  GET_RECENT_CONSUMPTION: `${SERVER_DETAILS.API_URL}/mess/<<mess_id>>/reporting/getRecentConsumption`,
};
