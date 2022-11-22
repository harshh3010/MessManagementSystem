import { EXPENSE_ACTIONS } from "./constants";

export const loadExpenses = (messId) => {
  return {
    type: EXPENSE_ACTIONS.LOAD_EXPENSES,
    payload: {
      messId,
    },
  };
};

export const setLoadExpensesResponseStatus = (messId, status) => {
  return {
    type: EXPENSE_ACTIONS.SET_LOAD_EXPENSES_RESPONSE_STATUS,
    payload: {
      messId,
      status,
    },
  };
};

export const setExpenses = (messId, expenses) => {
  return {
    type: EXPENSE_ACTIONS.SET_EXPENSES,
    payload: {
      messId,
      expenses,
    },
  };
};

export const addExpense = (messId, expense) => {
  return {
    type: EXPENSE_ACTIONS.ADD_EXPENSE,
    payload: {
      messId,
      expense,
    },
  };
};

export const setAddExpenseResponseStatus = (messId, status) => {
  return {
    type: EXPENSE_ACTIONS.SET_ADD_EXPENSE_RESPONSE_STATUS,
    payload: {
      messId,
      status,
    },
  };
};

export const updateExpenses = (messId, newExpenses) => {
  return {
    type: EXPENSE_ACTIONS.UPDATE_EXPENSES,
    payload: {
      messId,
      newExpenses,
    },
  };
};

export const setError = (error) => {
  return {
    type: EXPENSE_ACTIONS.SET_ERROR,
    payload: {
      error,
    },
  };
};
