// import { createSlice } from "@reduxjs/toolkit";
// import { signupParamount } from "./authThunks";

// type AuthState = {
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// };

// const initialState: AuthState = {
//   status: "idle",
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearAuthError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupParamount.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(signupParamount.fulfilled, (state) => {
//         state.status = "succeeded";
//       })
//       .addCase(signupParamount.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload ?? "Signup failed";
//       });
//   },
// });

// export const { clearAuthError } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MeResponse = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    surveyCompleted: boolean;
    createdAt: string;
  };
  products: Array<{
    id: number;
    userId: number;
    productId: string;
  }>;
};

type AuthState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;

  accessToken: string | null; // optional, since we store in HttpOnly cookie
  me: MeResponse | null;
};

const initialState: AuthState = {
  status: "idle",
  error: null,
  accessToken: null,
  me: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setMe: (state, action: PayloadAction<MeResponse | null>) => {
      state.me = action.payload;
    },
    clearAuth: (state) => {
      state.status = "idle";
      state.error = null;
      state.accessToken = null;
      state.me = null;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setAuthStatus: (state, action: PayloadAction<AuthState["status"]>) => {
      state.status = action.payload;
    },
  },
});

export const { setAccessToken, setMe, clearAuth, setAuthError, setAuthStatus } =
  authSlice.actions;

export default authSlice.reducer;
export type { MeResponse };
