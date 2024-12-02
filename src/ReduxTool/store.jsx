// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../ReduxTool/counterSlice";
import authReducer from "../ReduxTool/authSlice";
import userReducer from "../ReduxTool/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [authReducer.name]: authReducer.reducer,
    [userReducer.name]: userReducer.reducer,
  },
});
