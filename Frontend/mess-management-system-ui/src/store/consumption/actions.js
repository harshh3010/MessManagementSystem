import { CONSUMPTION_ACTIONS } from "./constants";

export const loadConsumptions = (messId) => {
  return {
    type: CONSUMPTION_ACTIONS.LOAD_CONSUMPTIONS,
    payload: {
      messId,
    },
  };
};

export const setLoadConsumptionsResponseStatus = (messId, status) => {
  return {
    type: CONSUMPTION_ACTIONS.SET_LOAD_CONSUMPTIONS_RESPONSE_STATUS,
    payload: {
      messId,
      status,
    },
  };
};

export const setConsumptions = (messId, consumptions) => {
  return {
    type: CONSUMPTION_ACTIONS.SET_CONSUMPTIONS,
    payload: {
      messId,
      consumptions,
    },
  };
};

export const addConsumption = (messId, consumption) => {
  return {
    type: CONSUMPTION_ACTIONS.ADD_CONSUMPTION,
    payload: {
      messId,
      consumption,
    },
  };
};

export const setAddConsumptionResponseStatus = (messId, status) => {
  return {
    type: CONSUMPTION_ACTIONS.SET_ADD_CONSUMPTION_RESPONSE_STATUS,
    payload: {
      messId,
      status,
    },
  };
};

export const updateConsumptions = (messId, newConsumptions) => {
  return {
    type: CONSUMPTION_ACTIONS.UPDATE_CONSUMPTIONS,
    payload: {
      messId,
      newConsumptions,
    },
  };
};

export const setError = (error) => {
  return {
    type: CONSUMPTION_ACTIONS.SET_ERROR,
    payload: {
      error,
    },
  };
};
