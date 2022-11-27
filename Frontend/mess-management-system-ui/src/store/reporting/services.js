import {
  getRequest,
  getUrlWithParamsReplaced,
} from "../../utilities/networkUtils";
import { REPORTING_API } from "./constants";

export const getInventoryOverviewDataRequest = async (messId) => {
  return await getRequest(
    getUrlWithParamsReplaced(REPORTING_API.GET_INVENTORY_OVERVIEW_DATA, {
      mess_id: messId,
    })
  );
};

export const getExpensesOverviewDataRequest = async (messId) => {
  return await getRequest(
    getUrlWithParamsReplaced(REPORTING_API.GET_EXPENSE_OVERVIEW_DATA, {
      mess_id: messId,
    })
  );
};

export const getConsumptionOverviewDataRequest = async (messId) => {
  return await getRequest(
    getUrlWithParamsReplaced(REPORTING_API.GET_CONSUMPTION_OVERVIEW_DATA, {
      mess_id: messId,
    })
  );
};

export const getRecentExpensesRequest = async (messId) => {
  return await getRequest(
    getUrlWithParamsReplaced(REPORTING_API.GET_RECENT_EXPENSES, {
      mess_id: messId,
    })
  );
};

export const getRecentConsumptionRequest = async (messId) => {
  return await getRequest(
    getUrlWithParamsReplaced(REPORTING_API.GET_RECENT_CONSUMPTION, {
      mess_id: messId,
    })
  );
};
