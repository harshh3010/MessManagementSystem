import { INVENTORY_ACTIONS } from "./constants";

export const loadItems = (messId) => {
  return {
    type: INVENTORY_ACTIONS.LOAD_ITEMS,
    payload: {
      messId,
    },
  };
};

export const setLoadItemsResponseStatus = (status) => {
  return {
    type: INVENTORY_ACTIONS.SET_LOAD_ITEMS_RESPONSE_STATUS,
    payload: {
      status,
    },
  };
};

export const setItems = (messId, items) => {
  return {
    type: INVENTORY_ACTIONS.SET_ITEMS,
    payload: {
      messId,
      items,
    },
  };
};

export const addItem = (messId, item) => {
  return {
    type: INVENTORY_ACTIONS.ADD_ITEM,
    payload: {
      messId,
      item,
    },
  };
};

export const setAddItemResponseStatus = (status) => {
  return {
    type: INVENTORY_ACTIONS.SET_ADD_ITEM_RESPONSE_STATUS,
    payload: {
      status,
    },
  };
};

export const updateItems = (messId, newItems) => {
  return {
    type: INVENTORY_ACTIONS.UPDATE_ITEMS,
    payload: {
      messId,
      newItems,
    },
  };
};

export const setError = (error) => {
  return {
    type: INVENTORY_ACTIONS.SET_ERROR,
    payload: {
      error,
    },
  };
};
