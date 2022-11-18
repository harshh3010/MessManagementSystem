import { AUTH_ACTIONS } from "./constants";

// Login action generator
export const login = (email, password) => {
  return {
    type: AUTH_ACTIONS.LOGIN,
    payload: {
      email,
      password,
    },
  };
};

// Signup action generator
export const signup = (name, email, password) => {
  return {
    type: AUTH_ACTIONS.SIGNUP,
    payload: {
      name,
      email,
      password,
    },
  };
};

export const logout = () => {
  return {
    type: AUTH_ACTIONS.LOGOUT,
  };
};

export const setLoginResponseStatus = (status) => {
  return {
    type: AUTH_ACTIONS.SET_LOGIN_RESPONSE_STATUS,
    payload: {
      status,
    },
  };
};

export const setSignupResponseStatus = (status) => {
  return {
    type: AUTH_ACTIONS.SET_SIGNUP_RESPONSE_STATUS,
    payload: {
      status,
    },
  };
};

export const setError = (error) => {
  return {
    type: AUTH_ACTIONS.SET_ERROR,
    payload: {
      error,
    },
  };
};

export const setLoginStatus = (status) => {
  return {
    type: AUTH_ACTIONS.SET_LOGIN_STATUS,
    payload: {
      status,
    },
  };
};

export const loadUserInfo = () => {
  return {
    type: AUTH_ACTIONS.LOAD_USER_INFO,
  };
};

export const setLoggedInUserInfo = (user) => {
  return {
    type: AUTH_ACTIONS.SET_LOGGED_IN_USER_INFO,
    payload: {
      user,
    },
  };
};

export const setLoadUserInfoResponseStatus = (status) => {
  return {
    type: AUTH_ACTIONS.SET_LOAD_USER_INFO_RESPONSE_STATUS,
    payload: {
      status,
    },
  };
};
