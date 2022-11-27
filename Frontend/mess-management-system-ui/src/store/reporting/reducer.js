import { REPORTING_ACTIONS } from "./constants";

const initialState = {
  messIdToReportingDataMap: {},
  messIdToStatusMap: {
    // [messId]: {
    //   loadReportingData: RESPONSE_STATUS.NONE,
    // }
  },
  error: null,
};

const reportingReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
    case REPORTING_ACTIONS.SET_LOAD_REPORTING_DATA_RESPONSE_STATUS:
      return {
        ...state,
        messIdToStatusMap: {
          ...state.messIdToStatusMap,
          [data.messId]: {
            ...state.messIdToStatusMap[data.messId],
            loadReportingData: data.status,
          },
        },
      };
    case REPORTING_ACTIONS.SET_REPORTING_DATA:
      return {
        ...state,
        messIdToReportingDataMap: {
          ...state.messIdToReportingDataMap,
          [data.messId]: {
            ...state.messIdToReportingDataMap[data.messId],
            [data.dataType]: data.data,
          },
        },
      };
    case REPORTING_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: data.error,
      };
    default:
      return state;
  }
};

export default reportingReducer;
