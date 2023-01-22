import { createSlice } from "@reduxjs/toolkit";

const state = {
  imageAvatar: null,
  userId: null,
  login: null,
  stateChange: false,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      imageAvatar: payload.imageAvatar,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
