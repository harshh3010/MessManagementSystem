import { all, call, put, takeEvery } from "redux-saga/effects";
import { EXPENSE_ACTIONS } from "./constants";
import {
  setAddExpenseResponseStatus,
  setError,
  setExpenses,
  setLoadExpensesResponseStatus,
  updateExpenses,
} from "./actions";
import { RESPONSE_STATUS } from "../commons/constants";
import { addExpenseRequest, loadExpensesRequest } from "./services";

/**
 * Function to load expenses belonging to specified mess in the store
 */
function* loadExpenses(action) {
  const { messId } = action.payload;
  try {
    yield put(setLoadExpensesResponseStatus(messId, RESPONSE_STATUS.PENDING));
    const response = yield call(loadExpensesRequest, messId);
    yield put(setExpenses(messId, response.data));
    yield put(setLoadExpensesResponseStatus(messId, RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setError("Unable to load expenses!"));
    yield put(setLoadExpensesResponseStatus(messId, RESPONSE_STATUS.FAILED));
  }
}

/**
 * This function adds a new expense for a specified mess
 */
function* addExpense(action) {
  const { messId, expense } = action.payload;
  try {
    yield put(setAddExpenseResponseStatus(messId, RESPONSE_STATUS.PENDING));
    const response = yield call(addExpenseRequest, messId, expense);
    yield put(updateExpenses(messId, [response.data]));
    yield put(setAddExpenseResponseStatus(messId, RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setError("Unable to add a new expense!"));
    yield put(setAddExpenseResponseStatus(messId, RESPONSE_STATUS.FAILED));
  }
}

export default function* expenseSaga() {
  yield all([
    yield takeEvery(EXPENSE_ACTIONS.LOAD_EXPENSES, loadExpenses),
    yield takeEvery(EXPENSE_ACTIONS.ADD_EXPENSE, addExpense),
  ]);
}
