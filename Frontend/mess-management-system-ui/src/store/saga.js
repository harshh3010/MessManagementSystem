import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import consumptionSaga from "./consumption/saga";
import expenseSaga from "./expense/saga";
import inventorySaga from "./inventory/saga";
import messSaga from "./mess/saga";
import messRoutineSaga from "./messRoutine/saga";
import reportingSaga from "./reporting/saga";
import studentSaga from "./student/saga";

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(messSaga),
    fork(studentSaga),
    fork(messRoutineSaga),
    fork(inventorySaga),
    fork(expenseSaga),
    fork(consumptionSaga),
    fork(reportingSaga),
  ]);
}

export default rootSaga;
