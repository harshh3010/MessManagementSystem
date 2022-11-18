import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/reducer";

const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
  }),
});

export default store;
