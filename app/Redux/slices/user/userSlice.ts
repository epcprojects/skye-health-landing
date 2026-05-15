import { ProductType } from "@/app/graphql/queries/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coupon: string;
  surveyCompleted: boolean;
  hadAppointment: boolean;
  createdAt: string;
};

export type Appointment = {
  id: number;
  userId: number;
  productIds: string[];
  scheduledAt: string;
  status: string;
  createdAt: string;
};

type UserState = {
  me: User | null;
  appointments: Appointment[];
  selectedProducts: ProductType[];
};

const initialState: UserState = {
  me: null,
  appointments: [],
  selectedProducts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{
        me: User | null;
        appointments?: Appointment[];
        selectedProducts?: ProductType[];
      }>,
    ) => {
      state.me = action.payload.me;
      state.appointments = action.payload.appointments ?? [];
      state.selectedProducts = action.payload.selectedProducts ?? [];
    },

    setMe: (state, action: PayloadAction<User | null>) => {
      state.me = action.payload;
    },

    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
    },

    setSelectedProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.selectedProducts = action.payload;
    },

    clearUserData: (state) => {
      state.me = null;
      state.appointments = [];
      state.selectedProducts = [];
    },
  },
});

export const {
  setUserData,
  setMe,
  setAppointments,
  setSelectedProducts,
  clearUserData,
} = userSlice.actions;

export default userSlice.reducer;
