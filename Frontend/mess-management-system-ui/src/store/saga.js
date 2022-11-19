import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import messSaga from "./mess/saga";
import studentSaga from "./student/saga";

function* rootSaga() {
  yield all([fork(authSaga), fork(messSaga), fork(studentSaga)]);
}

export default rootSaga;
