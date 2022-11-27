import { MESS_ACTIONS } from "./constants";

export const createMess = (name, fee) => {
  return {
    type: MESS_ACTIONS.CREATE_MESS,
    payload: {
      name,
      fee,
    },
  };
};

export const setCreateMessResponseStatus = (status) => {
  return {
    type: MESS_ACTIONS.SET_CREATE_MESS_RESPONSE_STATUS,
    payload: {
      status,
    },
  };
};

export const loadMesses = () => {
  return {
    type: MESS_ACTIONS.LOAD_MESSES,
  };
};

export const setLoadMessesReponseStatus = (status) => {
  return {
    type: MESS_ACTIONS.SET_LOAD_MESSES_RESPONSE_STATUS,
    payload: {
      status,
    },
  };
};

export const setMesses = (messes) => {
  return {
    type: MESS_ACTIONS.SET_MESSES,
    payload: {
      messes,
    },
  };
};

export const updateMesses = (newMesses) => {
  return {
    type: MESS_ACTIONS.UPDATE_MESSES,
    payload: {
      newMesses,
    },
  };
};

export const setSelectedMess = (messId) => {
  return {
    type: MESS_ACTIONS.SET_SELECTED_MESS,
    payload: {
      messId,
    },
  };
};

export const setError = (error) => {
  return {
    type: MESS_ACTIONS.SET_ERROR,
    payload: {
      error,
    },
  };
};
