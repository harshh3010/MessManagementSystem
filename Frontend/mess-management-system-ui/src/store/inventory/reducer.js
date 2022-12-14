import { INVENTORY_ACTIONS } from "./constants";

const initialState = {
  messIdToInventoryMap: {},
  messIdToStatusMap: {
    // [messId]: {
    //   loadItems: RESPONSE_STATUS.NONE,
    //   addItem: RESPONSE_STATUS.NONE,
    // }
  },
  error: null,
};

const inventoryReducer = (state = initialState, action) => {
  const data = action.payload;
  switch (action.type) {
    case INVENTORY_ACTIONS.SET_LOAD_ITEMS_RESPONSE_STATUS:
      return {
        ...state,
        messIdToStatusMap: {
          ...state.messIdToStatusMap,
          [data.messId]: {
            ...state.messIdToStatusMap[data.messId],
            loadItems: data.status,
          },
        },
      };
    case INVENTORY_ACTIONS.SET_ITEMS:
      return {
        ...state,
        messIdToInventoryMap: {
          ...state.messIdToInventoryMap,
          [data.messId]: data.items,
        },
      };
    case INVENTORY_ACTIONS.SET_ADD_ITEM_RESPONSE_STATUS:
      return {
        ...state,
        messIdToStatusMap: {
          ...state.messIdToStatusMap,
          [data.messId]: {
            ...state.messIdToStatusMap[data.messId],
            addItem: data.status,
          },
        },
      };
    case INVENTORY_ACTIONS.UPDATE_ITEMS:
      return {
        ...state,
        messIdToInventoryMap: {
          ...state.messIdToInventoryMap,
          [data.messId]: [
            ...state.messIdToInventoryMap[data.messId],
            ...data.newItems,
          ],
        },
      };
    case INVENTORY_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: data.error,
      };
    default:
      return state;
  }
};

export default inventoryReducer;
