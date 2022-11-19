import {
  getRequest,
  getUrlWithParamsReplaced,
  postRequest,
} from "../../utilities/networkUtils";
import { MESS_ROUTINE_API } from "./constants";

/**
 * Function to send an add mess routine request to the server
 */
export const addMessRoutineRequest = async (messId, messRoutine) => {
  return await postRequest(
    getUrlWithParamsReplaced(MESS_ROUTINE_API.ADD_MESS_ROUTINE, {
      mess_id: messId,
    }),
    { ...messRoutine }
  );
};

/**
 * Function to send load all mess routines request to the server
 */
export const loadMessRoutinesRequest = async (messId) => {
  return await getRequest(
    getUrlWithParamsReplaced(MESS_ROUTINE_API.GET_MESS_ROUTINES, {
      mess_id: messId,
    })
  );
};
