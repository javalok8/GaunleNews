// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../ReduxTool/counterSlice";
import authReducer from "../ReduxTool/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [authReducer.name]: authReducer.reducer,
  },
});
