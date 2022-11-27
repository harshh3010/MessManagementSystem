import { REPORTING_ACTIONS } from "./constants";

export const loadReportingData = (messId) => {
  return {
    type: REPORTING_ACTIONS.LOAD_REPORTING_DATA,
    payload: {
      messId,
    },
  };
};

export const setLoadReportingDataResponseStatus = (messId, status) => {
  return {
    type: REPORTING_ACTIONS.SET_LOAD_REPORTING_DATA_RESPONSE_STATUS,
    payload: {
      messId,
      status,
    },
  };
};

export const setReportingData = (messId, dataType, data) => {
  return {
    type: REPORTING_ACTIONS.SET_REPORTING_DATA,
    payload: {
      messId,
      dataType,
      data,
    },
  };
};

export const setError = (error) => {
  return {
    type: REPORTING_ACTIONS.SET_ERROR,
    payload: {
      error,
    },
  };
};
