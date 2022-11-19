import { all, call, put, takeEvery } from "redux-saga/effects";
import { RESPONSE_STATUS } from "../commons/constants";
import {
  setCreateMessResponseStatus,
  setError,
  setLoadMessesReponseStatus,
  setMesses,
  updateMesses,
} from "./actions";
import { MESS_ACTIONS } from "./constants";
import { createMessRequest, loadMessesRequest } from "./services";

/**
 * This function creates a new mess with the logged-in admin
 * as the mess incharge
 */
function* createMess(action) {
  try {
    yield put(setCreateMessResponseStatus(RESPONSE_STATUS.PENDING));
    const { name, fee } = action.payload;
    const response = yield call(createMessRequest, name, fee);
    // Updating the already existing messes
    yield put(updateMesses([response.data]));
    yield put(setCreateMessResponseStatus(RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setCreateMessResponseStatus(RESPONSE_STATUS.FAILED));
    yield put(setError("Unable to create a new mess!"));
  }
}

function* loadMesses(action) {
  try {
    yield put(setLoadMessesReponseStatus(RESPONSE_STATUS.PENDING));
    const response = yield call(loadMessesRequest);
    yield put(setMesses(response.data));
    yield put(setLoadMessesReponseStatus(RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setLoadMessesReponseStatus(RESPONSE_STATUS.FAILED));
    yield put(setError("Unable to load messes!"));
  }
}

export default function* messSaga() {
  yield all([
    yield takeEvery(MESS_ACTIONS.CREATE_MESS, createMess),
    yield takeEvery(MESS_ACTIONS.LOAD_MESSES, loadMesses),
  ]);
}
