import {
  getRequest,
  getUrlWithParamsReplaced,
  postRequest,
} from "../../utilities/networkUtils";
import { EXPENSE_API } from "./constants";

/**
 * Function to send an add expense request to the server
 */
export const addExpenseRequest = async (messId, expense) => {
  return await postRequest(
    getUrlWithParamsReplaced(EXPENSE_API.ADD_EXPENSE, {
      mess_id: messId,
    }),
    { ...expense }
  );
};

/**
 * Function to send load all expenses request to the server
 */
export const loadExpensesRequest = async (messId) => {
  return await getRequest(
    getUrlWithParamsReplaced(EXPENSE_API.GET_EXPENSES, {
      mess_id: messId,
    })
  );
};
