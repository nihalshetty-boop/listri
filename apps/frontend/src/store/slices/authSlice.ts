import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const loadFromLocalStorage = (): AuthState => {
  if (typeof window === "undefined") return initialState;

  try {
    const stored = localStorage.getItem("listri-auth");
    return stored ? JSON.parse(stored) : initialState;
  } catch {
    return initialState;
  }
};

const saveToLocalStorage = (state: AuthState) => {
  try {
    localStorage.setItem("listri-auth", JSON.stringify(state));
  } catch {}
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadFromLocalStorage(),
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      saveToLocalStorage(state);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("listri-auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
