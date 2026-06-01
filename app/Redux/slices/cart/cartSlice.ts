/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/cart/cartSlice.ts
import { ProductType } from "@/app/graphql/queries/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  cartItemId: string;
  productId: string;
  qty: number;
  unitPrice: number; // snapshot at time of add
  nameSnapshot?: string; // optional snapshot
  imageSnapshot?: string; // optional snapshot
  selectedPricingId?: string;
  selectedStrength?: string;
  pricingOptions?: Array<{
    id: string;
    label: string;
    unitPrice: number;
    strength?: string;
    unitQuantity?: string;
  }>;
};

type CartState = {
  itemsById: Record<string, CartItem>; // key = cartItemId
  allIds: string[];
};

const initialState: CartState = {
  itemsById: {},
  allIds: [],
};

const parsePrice = (p: string | number) => {
  const n = typeof p === "number" ? p : Number(p);
  return Number.isFinite(n) ? n : 0;
};

const buildPricingOptions = (product: ProductType) => {
  return (product.productUnitPricings ?? [])
    .filter((pricing) => pricing?.id)
    .map((pricing) => ({
      id: pricing.id,
      label: pricing.unitQuantity || pricing.strength || "Option",
      unitPrice: parsePrice(
        pricing.retailPrice ?? pricing.cost ?? product.price,
      ),
      strength: pricing.strength,
      unitQuantity: pricing.unitQuantity,
    }));
};

const buildCartItemId = (productId: string, selectedPricingId?: string) =>
  selectedPricingId ? `${productId}::${selectedPricingId}` : productId;

const resolveCartItemId = (
  state: CartState,
  payload: { cartItemId?: string; productId?: string },
) => {
  if (payload.cartItemId && state.itemsById[payload.cartItemId]) {
    return payload.cartItemId;
  }
  if (payload.productId && state.itemsById[payload.productId]) {
    return payload.productId;
  }
  return undefined;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Use this if you already have product in UI (recommended)
    addProductToCart: (
      state,
      action: PayloadAction<{
        product: ProductType;
        qty?: number;
        selectedPricingId?: string;
      }>,
    ) => {
      const { product, qty = 1, selectedPricingId } = action.payload;
      const productId = product.id;
      const pricingOptions = buildPricingOptions(product);
      const selectedPricing =
        pricingOptions.find((pricing) => pricing.id === selectedPricingId) ||
        pricingOptions[0];
      const resolvedUnitPrice =
        selectedPricing?.unitPrice ?? parsePrice(product.price);
      const cartItemId = buildCartItemId(productId, selectedPricing?.id);

      if (qty <= 0) return;

      const existing = state.itemsById[cartItemId];
      if (existing) {
        existing.qty += qty;
      } else {
        state.itemsById[cartItemId] = {
          cartItemId,
          productId,
          qty,
          unitPrice: resolvedUnitPrice,
          nameSnapshot: product.name,
          imageSnapshot: product.primaryImage || "",
          pricingOptions,
          selectedPricingId: selectedPricing?.id,
          selectedStrength: selectedPricing?.label,
        };
        state.allIds.push(cartItemId);
      }
    },

    // Use this if you only have productId; UI thunk can resolve product from products slice
    addToCartById: (
      state,
      action: PayloadAction<{
        productId: string;
        unitPrice: number;
        qty?: number;
        nameSnapshot?: string;
        imageSnapshot?: string;
      }>,
    ) => {
      const {
        productId,
        unitPrice,
        qty = 1,
        nameSnapshot,
        imageSnapshot,
      } = action.payload;
      if (qty <= 0) return;

      const cartItemId = buildCartItemId(productId);
      const existing = state.itemsById[cartItemId];
      if (existing) {
        existing.qty += qty;
      } else {
        state.itemsById[cartItemId] = {
          cartItemId,
          productId,
          qty,
          unitPrice,
          nameSnapshot,
          imageSnapshot,
        };
        state.allIds.push(cartItemId);
      }
    },

    setQty: (
      state,
      action: PayloadAction<{
        cartItemId?: string;
        productId?: string;
        qty: number;
      }>,
    ) => {
      const { qty } = action.payload;
      const cartItemId = resolveCartItemId(state, action.payload);
      if (!cartItemId) return;
      const item = state.itemsById[cartItemId];
      if (!item) return;

      if (qty <= 0) {
        delete state.itemsById[cartItemId];
        state.allIds = state.allIds.filter((id) => id !== cartItemId);
        return;
      }

      item.qty = qty;
    },

    incrementQty: (
      state,
      action: PayloadAction<{ cartItemId?: string; productId?: string }>,
    ) => {
      const cartItemId = resolveCartItemId(state, action.payload);
      if (!cartItemId) return;
      const item = state.itemsById[cartItemId];
      if (item) item.qty += 1;
    },

    decrementQty: (
      state,
      action: PayloadAction<{ cartItemId?: string; productId?: string }>,
    ) => {
      const id = resolveCartItemId(state, action.payload);
      if (!id) return;
      const item = state.itemsById[id];
      if (!item) return;

      item.qty -= 1;
      if (item.qty <= 0) {
        delete state.itemsById[id];
        state.allIds = state.allIds.filter((x) => x !== id);
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ cartItemId?: string; productId?: string }>,
    ) => {
      const id = resolveCartItemId(state, action.payload);
      if (!id) return;
      if (state.itemsById[id]) {
        delete state.itemsById[id];
        state.allIds = state.allIds.filter((x) => x !== id);
      }
    },

    setCartItemPricing: (
      state,
      action: PayloadAction<{
        cartItemId?: string;
        productId?: string;
        pricingId: string;
      }>,
    ) => {
      const { pricingId } = action.payload;
      const cartItemId = resolveCartItemId(state, action.payload);
      if (!cartItemId) return;
      const item = state.itemsById[cartItemId];
      if (!item || !item.pricingOptions?.length) return;

      const selectedPricing = item.pricingOptions.find(
        (pricing) => pricing.id === pricingId,
      );
      if (!selectedPricing) return;

      item.selectedPricingId = selectedPricing.id;
      item.selectedStrength = selectedPricing.label;
      item.unitPrice = parsePrice(selectedPricing.unitPrice);
    },

    clearCart: (state) => {
      state.itemsById = {};
      state.allIds = [];
    },
  },
});

export const {
  addProductToCart,
  addToCartById,
  setQty,
  incrementQty,
  decrementQty,
  removeFromCart,
  setCartItemPricing,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

/** Selectors */
export const selectCartState = (state: any) => state.cart as CartState;

export const selectCartItems = (state: any) => {
  const s = state.cart as CartState;
  return s.allIds.map((id) => s.itemsById[id]).filter(Boolean);
};

export const selectCartCount = (state: any) => {
  const items = selectCartItems(state);
  return items.reduce((sum, i) => sum + i.qty, 0);
};

export const selectCartSubtotal = (state: any) => {
  const items = selectCartItems(state);
  return items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);
};

export const selectCartProductIds = (state: any) => {
  const items = selectCartItems(state);
  return items.map((item) => item.selectedPricingId || item.productId);
};
