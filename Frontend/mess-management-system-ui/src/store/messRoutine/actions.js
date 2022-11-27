import { MESS_ROUTINE_ACTIONS } from "./constants";

export const loadMessRoutines = (messId) => {
  return {
    type: MESS_ROUTINE_ACTIONS.LOAD_MESS_ROUTINES,
    payload: {
      messId,
    },
  };
};

export const setLoadMessRoutinesResponseStatus = (messId, status) => {
  return {
    type: MESS_ROUTINE_ACTIONS.SET_LOAD_MESS_ROUTINES_RESPONSE_STATUS,
    payload: {
      messId,
      status,
    },
  };
};

export const setMessRoutines = (messId, messRoutines) => {
  return {
    type: MESS_ROUTINE_ACTIONS.SET_MESS_ROUTINES,
    payload: {
      messId,
      messRoutines,
    },
  };
};

export const addMessRoutine = (messId, messRoutine) => {
  return {
    type: MESS_ROUTINE_ACTIONS.ADD_MESS_ROUTINE,
    payload: {
      messId,
      messRoutine,
    },
  };
};

export const setAddMessRoutineResponseStatus = (messId, status) => {
  return {
    type: MESS_ROUTINE_ACTIONS.SET_ADD_MESS_ROUTINES_RESPONSE_STATUS,
    payload: {
      messId,
      status,
    },
  };
};

export const updateMessRoutines = (messId, newMessRoutines) => {
  return {
    type: MESS_ROUTINE_ACTIONS.UPDATE_MESS_ROUTINES,
    payload: {
      messId,
      newMessRoutines,
    },
  };
};

export const setError = (error) => {
  return {
    type: MESS_ROUTINE_ACTIONS.SET_ERROR,
    payload: {
      error,
    },
  };
};
