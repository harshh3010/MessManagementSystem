import { CONSUMPTION_ACTIONS } from "./constants";

const initialState = {
  messIdToConsumptionsMap: {},
  messIdToStatusMap: {
    // [messId]: {
    //   loadConsumptions: RESPONSE_STATUS.NONE,
    //   addConsumption: RESPONSE_STATUS.NONE,
    // },
  },
  error: null,
};

const consumptionReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
    case CONSUMPTION_ACTIONS.SET_LOAD_CONSUMPTIONS_RESPONSE_STATUS:
      return {
        ...state,
        messIdToStatusMap: {
          ...state.messIdToStatusMap,
          [data.messId]: {
            ...state.messIdToStatusMap[data.messId],
            loadConsumptions: data.status,
          },
        },
      };
    case CONSUMPTION_ACTIONS.SET_CONSUMPTIONS:
      return {
        ...state,
        messIdToConsumptionsMap: {
          ...state.messIdToConsumptionsMap,
          [data.messId]: data.consumptions,
        },
      };
    case CONSUMPTION_ACTIONS.SET_ADD_CONSUMPTION_RESPONSE_STATUS:
      return {
        ...state,
        messIdToStatusMap: {
          ...state.messIdToStatusMap,
          [data.messId]: {
            ...state.messIdToStatusMap[data.messId],
            addConsumption: data.status,
          },
        },
      };
    case CONSUMPTION_ACTIONS.UPDATE_CONSUMPTIONS:
      return {
        ...state,
        messIdToConsumptionsMap: {
          ...state.messIdToConsumptionsMap,
          [data.messId]: [
            ...state.messIdToConsumptionsMap[data.messId],
            ...data.newConsumptions,
          ],
        },
      };
    case CONSUMPTION_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: data.error,
      };
    default:
      return state;
  }
};

export default consumptionReducer;
