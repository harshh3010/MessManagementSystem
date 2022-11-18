import { AUTH_ACTIONS, LOGIN_STATUS } from "./constants";
import { RESPONSE_STATUS } from "../commons/constants";
import { removeAuthToken } from "../../utilities/storageUtils";

const initialState = {
  loggedInUser: null,
  loginStatus: LOGIN_STATUS.UNKNOWN,
  status: {
    login: RESPONSE_STATUS.NONE,
    signup: RESPONSE_STATUS.NONE,
    loadUserInfo: RESPONSE_STATUS.NONE,
  },
  error: null,
};

const authReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
    case AUTH_ACTIONS.LOGOUT:
      removeAuthToken();
      return {
        ...state,
        loginStatus: LOGIN_STATUS.LOGGED_OUT,
      };
    case AUTH_ACTIONS.SET_LOGIN_RESPONSE_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          login: data.status,
        },
      };
    case AUTH_ACTIONS.SET_SIGNUP_RESPONSE_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          signup: data.status,
        },
      };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: data.error,
      };
    case AUTH_ACTIONS.SET_LOGIN_STATUS:
      return {
        ...state,
        loginStatus: data.status,
      };
    case AUTH_ACTIONS.SET_LOGGED_IN_USER_INFO:
      return {
        ...state,
        loggedInUser: data.user,
      };
    case AUTH_ACTIONS.SET_LOAD_USER_INFO_RESPONSE_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          loadUserInfo: data.status,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
