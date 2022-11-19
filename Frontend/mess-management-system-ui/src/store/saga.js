import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import messSaga from "./mess/saga";
import messRoutineSaga from "./messRoutine/saga";
import studentSaga from "./student/saga";

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(messSaga),
    fork(studentSaga),
    fork(messRoutineSaga),
  ]);
}

export default rootSaga;
