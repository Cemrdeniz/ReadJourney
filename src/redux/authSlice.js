import { createSlice } from "@reduxjs/toolkit";

const safeUser = localStorage.getItem("user");

const initialState = {
  user:
    safeUser && safeUser !== "undefined"
      ? JSON.parse(safeUser)
      : null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    // 👉 refresh sonrası token güncellemek için
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
});

export const { setCredentials, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;