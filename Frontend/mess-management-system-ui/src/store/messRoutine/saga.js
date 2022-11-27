import { all, call, put, takeEvery } from "redux-saga/effects";
import { MESS_ROUTINE_ACTIONS } from "./constants";
import {
  setAddMessRoutineResponseStatus,
  setError,
  setLoadMessRoutinesResponseStatus,
  setMessRoutines,
  updateMessRoutines,
} from "./actions";
import { RESPONSE_STATUS } from "../commons/constants";
import { addMessRoutineRequest, loadMessRoutinesRequest } from "./services";

/**
 * Function to load mess routines belonging to specified mess in the store
 */
function* loadMessRoutines(action) {
  const { messId } = action.payload;
  try {
    yield put(
      setLoadMessRoutinesResponseStatus(messId, RESPONSE_STATUS.PENDING)
    );
    const response = yield call(loadMessRoutinesRequest, messId);
    yield put(setMessRoutines(messId, response.data));
    yield put(
      setLoadMessRoutinesResponseStatus(messId, RESPONSE_STATUS.SUCCESS)
    );
  } catch (e) {
    yield put(setError("Unable to load mess routines!"));
    yield put(
      setLoadMessRoutinesResponseStatus(messId, RESPONSE_STATUS.FAILED)
    );
  }
}

/**
 * This function adds a new mess routine in specified mess
 */
function* addMessRoutine(action) {
  const { messId, messRoutine } = action.payload;
  try {
    yield put(setAddMessRoutineResponseStatus(messId, RESPONSE_STATUS.PENDING));
    const response = yield call(addMessRoutineRequest, messId, messRoutine);
    yield put(updateMessRoutines(messId, [response.data]));
    yield put(setAddMessRoutineResponseStatus(messId, RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setError("Unable to add a new mess routine!"));
    yield put(setAddMessRoutineResponseStatus(messId, RESPONSE_STATUS.FAILED));
  }
}

export default function* messRoutineSaga() {
  yield all([
    yield takeEvery(MESS_ROUTINE_ACTIONS.LOAD_MESS_ROUTINES, loadMessRoutines),
    yield takeEvery(MESS_ROUTINE_ACTIONS.ADD_MESS_ROUTINE, addMessRoutine),
  ]);
}
