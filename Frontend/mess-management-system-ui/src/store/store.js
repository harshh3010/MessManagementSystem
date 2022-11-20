import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import authReducer from "./auth/reducer";
import rootSaga from "./saga";
import messReducer from "./mess/reducer";
import studentReducer from "./student/reducer";
import messRoutineReducer from "./messRoutine/reducer";
import inventoryReducer from "./inventory/reducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    mess: messReducer,
    student: studentReducer,
    messRoutine: messRoutineReducer,
    inventory: inventoryReducer,
  }),
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
