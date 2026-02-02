import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { UserDto } from "../auth/authApi.types";

interface IAuthState {
  token: string | null;
  user: UserDto | null;
}

const getStoredUser = (): UserDto | null => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;
  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

const initialState: IAuthState = {
  token: localStorage.getItem("token"),
  user: getStoredUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload,
      }: PayloadAction<{ token: string; email: string; role: string }>,
    ) => {
      state.token = payload.token;
      state.user = { email: payload.email, role: payload.role };
      localStorage.setItem("token", payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
