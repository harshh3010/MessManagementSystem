import { RESPONSE_STATUS } from "../commons/constants";
import { MESS_ROUTINE_ACTIONS } from "./constants";

const initialState = {
  messIdToRoutinesMap: {},
  messIdToStatusMap: {
    // [messId]: {
    //   loadMessRoutines: RESPONSE_STATUS.NONE,
    //   addMessRoutine: RESPONSE_STATUS.NONE,
    // },
  },
  error: null,
};

const messRoutineReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
    case MESS_ROUTINE_ACTIONS.SET_LOAD_MESS_ROUTINES_RESPONSE_STATUS:
      return {
        ...state,
        messIdToStatusMap: {
          ...state.messIdToStatusMap,
          [data.messId]: {
            ...state.messIdToStatusMap[data.messId],
            loadMessRoutines: data.status,
          },
        },
      };
    case MESS_ROUTINE_ACTIONS.SET_MESS_ROUTINES:
      return {
        ...state,
        messIdToRoutinesMap: {
          ...state.messIdToRoutinesMap,
          [data.messId]: data.messRoutines,
        },
      };
    case MESS_ROUTINE_ACTIONS.SET_ADD_MESS_ROUTINES_RESPONSE_STATUS:
      return {
        ...state,
        messIdToStatusMap: {
          ...state.messIdToStatusMap,
          [data.messId]: {
            ...state.messIdToStatusMap[data.messId],
            addMessRoutine: data.status,
          },
        },
      };
    case MESS_ROUTINE_ACTIONS.UPDATE_MESS_ROUTINES:
      return {
        ...state,
        messIdToRoutinesMap: {
          ...state.messIdToRoutinesMap,
          [data.messId]: {
            ...state.messIdToRoutinesMap[data.messId],
            [data.newMessRoutines[0].dayOfWeek]: [
              ...state.messIdToRoutinesMap[data.messId][
                data.newMessRoutines[0].dayOfWeek
              ],
              ...data.newMessRoutines,
            ],
          },
        },
      };
    case MESS_ROUTINE_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: data.error,
      };
    default:
      return state;
  }
};

export default messRoutineReducer;
