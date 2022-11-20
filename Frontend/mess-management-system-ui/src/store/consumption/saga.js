import { all, call, put, takeEvery } from "redux-saga/effects";
import { CONSUMPTION_ACTIONS } from "./constants";
import {
  setAddConsumptionResponseStatus,
  setError,
  setConsumptions,
  setLoadConsumptionsResponseStatus,
  updateConsumptions,
} from "./actions";
import { RESPONSE_STATUS } from "../commons/constants";
import { addConsumptionRequest, loadConsumptionsRequest } from "./services";

/**
 * Function to load consumptions belonging to specified mess in the store
 */
function* loadConsumptions(action) {
  try {
    const { messId } = action.payload;
    yield put(setLoadConsumptionsResponseStatus(RESPONSE_STATUS.PENDING));
    const response = yield call(loadConsumptionsRequest, messId);
    yield put(setConsumptions(messId, response.data));
    yield put(setLoadConsumptionsResponseStatus(RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setError("Unable to load consumptions!"));
    yield put(setLoadConsumptionsResponseStatus(RESPONSE_STATUS.FAILED));
  }
}

/**
 * This function adds a new consumption for a specified mess
 */
function* addConsumption(action) {
  try {
    const { messId, consumption } = action.payload;
    yield put(setAddConsumptionResponseStatus(RESPONSE_STATUS.PENDING));
    const response = yield call(addConsumptionRequest, messId, consumption);
    yield put(updateConsumptions(messId, [response.data]));
    yield put(setAddConsumptionResponseStatus(RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setError("Unable to add a new consumption!"));
    yield put(setAddConsumptionResponseStatus(RESPONSE_STATUS.FAILED));
  }
}

export default function* consumptionSaga() {
  yield all([
    yield takeEvery(CONSUMPTION_ACTIONS.LOAD_CONSUMPTIONS, loadConsumptions),
    yield takeEvery(CONSUMPTION_ACTIONS.ADD_CONSUMPTION, addConsumption),
  ]);
}
