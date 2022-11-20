import { RESPONSE_STATUS } from "../commons/constants";
import { EXPENSE_ACTIONS } from "./constants";

const initialState = {
  messIdToExpensesMap: {},
  status: {
    loadExpenses: RESPONSE_STATUS.NONE,
    addExpense: RESPONSE_STATUS.NONE,
  },
  error: null,
};

const expenseReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
    case EXPENSE_ACTIONS.SET_LOAD_EXPENSES_RESPONSE_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          loadExpenses: data.status,
        },
      };
    case EXPENSE_ACTIONS.SET_EXPENSES:
      return {
        ...state,
        messIdToExpensesMap: {
          ...state.messIdToExpensesMap,
          [data.messId]: data.expenses,
        },
      };
    case EXPENSE_ACTIONS.SET_ADD_EXPENSE_RESPONSE_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          addExpense: data.status,
        },
      };
    case EXPENSE_ACTIONS.UPDATE_EXPENSES:
      return {
        ...state,
        messIdToExpensesMap: {
          ...state.messIdToExpensesMap,
          [data.messId]: [
            ...state.messIdToExpensesMap[data.messId],
            ...data.newExpenses,
          ],
        },
      };
    case EXPENSE_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: data.error,
      };
    default:
      return state;
  }
};

export default expenseReducer;
