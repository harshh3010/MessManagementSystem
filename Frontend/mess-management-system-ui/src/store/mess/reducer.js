import { RESPONSE_STATUS } from "../commons/constants";
import { MESS_ACTIONS } from "./constants";

const initialState = {
  messes: [],
  status: {
    createMess: RESPONSE_STATUS.NONE,
    loadMesses: RESPONSE_STATUS.NONE,
  },
  error: null,
};

const messReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
    case MESS_ACTIONS.SET_CREATE_MESS_RESPONSE_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          createMess: data.status,
        },
      };
    case MESS_ACTIONS.SET_LOAD_MESSES_RESPONSE_STATUS:
      return {
        ...state,
        status: {
          ...state.status,
          loadMesses: data.status,
        },
      };
    case MESS_ACTIONS.SET_MESSES:
      return {
        ...state,
        messes: data.messes,
      };
    case MESS_ACTIONS.UPDATE_MESSES:
      return {
        ...state,
        messes: [...state.messes, ...data.newMesses],
      };
    case MESS_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: data.error,
      };
    default:
      return state;
  }
};

export default messReducer;
