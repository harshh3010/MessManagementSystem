import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import messSaga from "./mess/saga";

function* rootSaga() {
  yield all([fork(authSaga), fork(messSaga)]);
}

export default rootSaga;
