import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload?.user ?? null;
      state.token = action.payload?.token ?? null;
    },
    setCredentials: (state, action) => {
      state.user = action.payload?.user ?? null;
      state.token = action.payload?.token ?? null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, setCredentials, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
