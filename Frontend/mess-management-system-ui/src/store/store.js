import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import authReducer from "./auth/reducer";
import rootSaga from "./saga";
import messReducer from "./mess/reducer";
import studentReducer from "./student/reducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    mess: messReducer,
    student: studentReducer,
  }),
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
