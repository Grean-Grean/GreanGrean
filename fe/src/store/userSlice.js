// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userID: null,
    userNickName: null,
    userEmail: null,
    userPassword: null,
    isLoggedIn: false,
  },
  reducers: {
    setUser(state, action) {
      state.userID = action.payload.userID;
      state.userNickName = action.payload.userNickName;
      state.userEmail = action.payload.userEmail;
      state.userPassword = action.payload.userPassword;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.userID = null;
      state.userNickName = null;
      state.userEmail = null;
      state.userPassword = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
