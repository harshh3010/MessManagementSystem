import { all, call, put, takeEvery } from "redux-saga/effects";
import { saveAuthToken } from "../../utilities/storageUtils";
import { RESPONSE_STATUS } from "../commons/constants";
import {
  setError,
  setLoginResponseStatus,
  setSignupResponseStatus,
} from "./actions";
import { AUTH_ACTIONS } from "./constants";
import { loginRequest, signupRequest } from "./services";

/**
 * This function performs the login action.
 * It sends a login request to the server and depending on the response
 * it updates the redux-store
 */
function* login(action) {
  try {
    yield put(setLoginResponseStatus(RESPONSE_STATUS.PENDING));
    const { email, password } = action.payload;
    const response = yield call(loginRequest, email, password);
    // Saving the auth token to local storage for future use
    saveAuthToken(response.token);
    yield put(setLoginResponseStatus(RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setLoginResponseStatus(RESPONSE_STATUS.FAILED));
    console.log(e);
    yield put(setError("Unable to login!"));
  }
}

/**
 * This function performs the signup action.
 * It sends a signup request to the server and depending on the response
 * it updates the redux-store
 */
function* signup(action) {
  try {
    yield put(setSignupResponseStatus(RESPONSE_STATUS.PENDING));
    const { name, email, password } = action.payload;
    yield call(signupRequest, name, email, password);
    yield put(setSignupResponseStatus(RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setSignupResponseStatus(RESPONSE_STATUS.FAILED));
    console.log(e);
    yield put(setError("Unable to sign up!"));
  }
}

export default function* authSaga() {
  yield all([
    yield takeEvery(AUTH_ACTIONS.LOGIN, login),
    yield takeEvery(AUTH_ACTIONS.SIGNUP, signup),
  ]);
}
