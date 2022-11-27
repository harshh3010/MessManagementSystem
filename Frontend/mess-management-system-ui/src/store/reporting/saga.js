import { all, call, put, takeEvery } from "redux-saga/effects";
import { REPORTING_ACTIONS } from "./constants";
import {
  setLoadReportingDataResponseStatus,
  setError,
  setReportingData,
} from "./actions";
import { RESPONSE_STATUS } from "../commons/constants";
import {
  getInventoryOverviewDataRequest,
  getExpensesOverviewDataRequest,
  getConsumptionOverviewDataRequest,
  getRecentExpensesRequest,
  getRecentConsumptionRequest,
} from "./services";

function* loadReportingData(action) {
  const { messId } = action.payload;
  try {
    yield put(
      setLoadReportingDataResponseStatus(messId, RESPONSE_STATUS.PENDING)
    );
    var response;
    response = yield call(getInventoryOverviewDataRequest, messId);
    yield put(setReportingData(messId, "inventoryOverviewData", response.data));
    response = yield call(getExpensesOverviewDataRequest, messId);
    yield put(setReportingData(messId, "expensesOverviewData", response.data));
    response = yield call(getConsumptionOverviewDataRequest, messId);
    yield put(
      setReportingData(messId, "consumptionOverviewData", response.data)
    );
    response = yield call(getRecentExpensesRequest, messId);
    yield put(setReportingData(messId, "recentExpenses", response.data));
    response = yield call(getRecentConsumptionRequest, messId);
    yield put(setReportingData(messId, "recentConsumption", response.data));

    yield put(
      setLoadReportingDataResponseStatus(messId, RESPONSE_STATUS.SUCCESS)
    );
  } catch (e) {
    yield put(setError("Unable to load inventory items!"));
    yield put(
      setLoadReportingDataResponseStatus(messId, RESPONSE_STATUS.FAILED)
    );
  }
}

export default function* reportingSaga() {
  yield all([
    yield takeEvery(REPORTING_ACTIONS.LOAD_REPORTING_DATA, loadReportingData),
  ]);
}
