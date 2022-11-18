import { all, takeEvery } from "redux-saga/effects";
import { AUTH_ACTIONS } from "./constants";

function* login(action) {
  console.log("Login:", action);
}

function* signup(action) {
  console.log("Signup:", action);
}

export default function* authSaga() {
  yield all([
    yield takeEvery(AUTH_ACTIONS.LOGIN, login),
    yield takeEvery(AUTH_ACTIONS.SIGNUP, signup),
  ]);
}
