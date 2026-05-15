/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectCartProductIds } from "../cart/cartSlice";
import { setAccessToken, setMe } from "./authSlice";
import { setUserData } from "../user/userSlice";

type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // digits or E.164 based on backend
  password: string;
  coupon: string;
};

export const signupAndLoadMe = createAsyncThunk<
  any,
  SignupPayload,
  { rejectValue: string }
>("auth/signupAndLoadMe", async (payload, thunkApi) => {
  try {
    const state: any = thunkApi.getState();
    const productIds = selectCartProductIds(state);

    // 1) Signup (Next proxy sets HttpOnly cookie)
    const signupRes = await fetch("/api/paramount/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...payload, productIds }),
      cache: "no-store",
    });

    const signupJson = await signupRes.json().catch(() => null);

    if (!signupRes.ok) {
      const msg =
        signupJson?.body?.message || signupJson?.message || "Signup failed";
      return thunkApi.rejectWithValue(msg);
    }

    // Optional: store token in redux (not required since cookie exists)
    if (signupJson?.accessToken) {
      thunkApi.dispatch(setAccessToken(signupJson.accessToken));
    }

    if (signupJson?.json.user) {
      thunkApi.dispatch(
        setUserData({
          me: signupJson.json.user,
          appointments: signupJson.json.appointments ?? [],
          selectedProducts: signupJson.json.selectedProducts ?? [],
        }),
      );
      return {
        signup: signupJson,
      };
    }

    // 2) Get /me (cookie -> proxy -> backend)
    const meRes = await fetch("/api/paramount/users/me", {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const meJson = await meRes.json().catch(() => null);

    if (!meRes.ok) {
      const msg = meJson?.message || "Failed to load user profile";
      return thunkApi.rejectWithValue(msg);
    }

    // ✅ Save to redux
    thunkApi.dispatch(setMe(meJson));

    return { signup: signupJson, me: meJson };
  } catch (e: any) {
    return thunkApi.rejectWithValue(e?.message ?? "Network error");
  }
});
