import { getRequest, postRequest } from "../../utilities/networkUtils";
import { MESS_API } from "./constants";

/**
 * Function to send a create mess request to the server
 */
export const createMessRequest = async (name, fee) => {
  return await postRequest(MESS_API.CREATE_MESS, { name, fee });
};

/**
 * Function to send a load messes request to the server
 */
export const loadMessesRequest = async () => {
  return await getRequest(MESS_API.LOAD_MESSES);
};
