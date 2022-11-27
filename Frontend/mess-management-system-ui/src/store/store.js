import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import authReducer from "./auth/reducer";
import rootSaga from "./saga";
import messReducer from "./mess/reducer";
import studentReducer from "./student/reducer";
import messRoutineReducer from "./messRoutine/reducer";
import inventoryReducer from "./inventory/reducer";
import expenseReducer from "./expense/reducer";
import consumptionReducer from "./consumption/reducer";
import reportingReducer from "./reporting/reducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    mess: messReducer,
    student: studentReducer,
    messRoutine: messRoutineReducer,
    inventory: inventoryReducer,
    expense: expenseReducer,
    consumption: consumptionReducer,
    reporting: reportingReducer,
  }),
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
