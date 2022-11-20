import {
  getRequest,
  getUrlWithParamsReplaced,
  postRequest,
} from "../../utilities/networkUtils";
import { CONSUMPTION_API } from "./constants";

/**
 * Function to send an add consumption request to the server
 */
export const addConsumptionRequest = async (messId, consumption) => {
  return await postRequest(
    getUrlWithParamsReplaced(CONSUMPTION_API.ADD_CONSUMPTION, {
      mess_id: messId,
    }),
    { ...consumption }
  );
};

/**
 * Function to send load all consumptions request to the server
 */
export const loadConsumptionsRequest = async (messId) => {
  return await getRequest(
    getUrlWithParamsReplaced(CONSUMPTION_API.GET_CONSUMPTIONS, {
      mess_id: messId,
    })
  );
};
