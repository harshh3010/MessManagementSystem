import { AUTH_ACTIONS } from "./constants";
import { RESPONSE_STATUS } from "../commons/constants";

const initialState = {
  status: {
    login: RESPONSE_STATUS.NONE,
    signup: RESPONSE_STATUS.NONE,
  },
  error: null,
};

const authReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
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
    default:
      return state;
  }
};

export default authReducer;
