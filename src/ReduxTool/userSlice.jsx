import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    isAuthenticated: false,
    initialState: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  },

  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice;
