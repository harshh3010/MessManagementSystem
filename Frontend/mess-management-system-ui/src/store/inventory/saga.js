import { all, call, put, takeEvery } from "redux-saga/effects";
import { INVENTORY_ACTIONS } from "./constants";
import {
  setAddItemResponseStatus,
  setError,
  setItems,
  setLoadItemsResponseStatus,
  updateItems,
} from "./actions";
import { RESPONSE_STATUS } from "../commons/constants";
import { addItemRequest, loadItemsRequest } from "./services";

/**
 * Function to load inventory items belonging to specified mess in the store
 */
function* loadItems(action) {
  const { messId } = action.payload;
  try {
    yield put(setLoadItemsResponseStatus(messId, RESPONSE_STATUS.PENDING));
    const response = yield call(loadItemsRequest, messId);
    yield put(setItems(messId, response.data));
    yield put(setLoadItemsResponseStatus(messId, RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setError("Unable to load inventory items!"));
    yield put(setLoadItemsResponseStatus(messId, RESPONSE_STATUS.FAILED));
  }
}

/**
 * This function adds a new item in inventory of specified mess
 */
function* addItem(action) {
  const { messId, item } = action.payload;
  try {
    yield put(setAddItemResponseStatus(messId, RESPONSE_STATUS.PENDING));
    const response = yield call(addItemRequest, messId, item);
    yield put(updateItems(messId, [response.data]));
    yield put(setAddItemResponseStatus(messId, RESPONSE_STATUS.SUCCESS));
  } catch (e) {
    yield put(setError("Unable to add a new item in inventory!"));
    yield put(setAddItemResponseStatus(messId, RESPONSE_STATUS.FAILED));
  }
}

export default function* inventorySaga() {
  yield all([
    yield takeEvery(INVENTORY_ACTIONS.LOAD_ITEMS, loadItems),
    yield takeEvery(INVENTORY_ACTIONS.ADD_ITEM, addItem),
  ]);
}
