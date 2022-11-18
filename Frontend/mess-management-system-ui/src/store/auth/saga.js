import { all, call, put, takeEvery } from "redux-saga/effects";
import { saveAuthToken } from "../../utilities/storageUtils";
import { RESPONSE_STATUS } from "../commons/constants";
import {
  setError,
  setLoadUserInfoResponseStatus,
  setLoggedInUserInfo,
  setLoginResponseStatus,
  setLoginStatus,
  setSignupResponseStatus,
} from "./actions";
import { AUTH_ACTIONS, LOGIN_STATUS } from "./constants";
import { loadUserInfoRequest, loginRequest, signupRequest } from "./services";

/**
 * This function performs the login action.
 * It sends a login request to the server and depending on the response
 * it updates the redux-store
 */
function* login(action) {
  try {
    yield put(setLoginResponseStatus(RESPONSE_STATUS.PENDING));
    yield put(setLoginStatus(LOGIN_STATUS.UNKNOWN));
    const { email, password } = action.payload;
    const response = yield call(loginRequest, email, password);

    // Saving the auth token to local storage for future use
    saveAuthToken(response.token);
    yield put(setLoginResponseStatus(RESPONSE_STATUS.SUCCESS));

    // Setting login status to unknown
    // This is because an unknows status would trigger the action
    // to load the logged in user's info from the server
    yield put(setLoginStatus(LOGIN_STATUS.UNKNOWN));
  } catch (e) {
    yield put(setLoginResponseStatus(RESPONSE_STATUS.FAILED));
    yield put(setLoginStatus(LOGIN_STATUS.LOGGED_OUT));
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
    yield put(setLoginStatus(LOGIN_STATUS.UNKNOWN));
    const { name, email, password } = action.payload;
    yield call(signupRequest, name, email, password);
    yield put(setSignupResponseStatus(RESPONSE_STATUS.SUCCESS));
    yield put(setLoginStatus(LOGIN_STATUS.LOGGED_OUT));
  } catch (e) {
    yield put(setSignupResponseStatus(RESPONSE_STATUS.FAILED));
    yield put(setLoginStatus(LOGIN_STATUS.LOGGED_OUT));
    yield put(setError("Unable to sign up!"));
  }
}

/**
 * This function loads the user details corresponding to the
 * auth token stored in local storage. In case of invalid auth token
 * the login status is set to false and user will be redirected to the login screen
 */
function* loadUserInfo(action) {
  try {
    yield put(setLoadUserInfoResponseStatus(RESPONSE_STATUS.PENDING));
    yield put(setLoginStatus(LOGIN_STATUS.UNKNOWN));
    const response = yield call(loadUserInfoRequest);
    yield put(setLoggedInUserInfo(response.data));
    yield put(setLoadUserInfoResponseStatus(RESPONSE_STATUS.SUCCESS));
    yield put(setLoginStatus(LOGIN_STATUS.LOGGED_IN));
  } catch (e) {
    yield put(setLoadUserInfoResponseStatus(RESPONSE_STATUS.FAILED));
    yield put(setLoginStatus(LOGIN_STATUS.LOGGED_OUT));
    yield put(setError("Unable to load user info!"));
  }
}

export default function* authSaga() {
  yield all([
    yield takeEvery(AUTH_ACTIONS.LOGIN, login),
    yield takeEvery(AUTH_ACTIONS.SIGNUP, signup),
    yield takeEvery(AUTH_ACTIONS.LOAD_USER_INFO, loadUserInfo),
  ]);
}
