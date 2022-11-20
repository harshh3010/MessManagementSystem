import {
  getRequest,
  getUrlWithParamsReplaced,
  postRequest,
} from "../../utilities/networkUtils";
import { INVENTORY_API } from "./constants";

/**
 * Function to send an add item request to the server
 */
export const addItemRequest = async (messId, item) => {
  return await postRequest(
    getUrlWithParamsReplaced(INVENTORY_API.ADD_ITEM, {
      mess_id: messId,
    }),
    { ...item }
  );
};

/**
 * Function to send load all items request to the server
 */
export const loadItemsRequest = async (messId) => {
  return await getRequest(
    getUrlWithParamsReplaced(INVENTORY_API.GET_ITEMS, {
      mess_id: messId,
    })
  );
};
