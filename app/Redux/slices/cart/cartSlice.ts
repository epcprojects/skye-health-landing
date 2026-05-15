/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/cart/cartSlice.ts
import { ProductType } from "@/app/graphql/queries/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
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
  itemsById: Record<string, CartItem>; // key = productId
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
      unitPrice: parsePrice(pricing.retailPrice ?? pricing.cost ?? product.price),
      strength: pricing.strength,
      unitQuantity: pricing.unitQuantity,
    }));
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
      const resolvedUnitPrice = selectedPricing?.unitPrice ?? parsePrice(product.price);

      if (qty <= 0) return;

      const existing = state.itemsById[productId];
      if (existing) {
        if (selectedPricing) {
          existing.selectedPricingId = selectedPricing.id;
          existing.selectedStrength = selectedPricing.label;
          existing.unitPrice = selectedPricing.unitPrice;
        }
        existing.qty += qty;
      } else {
        state.itemsById[productId] = {
          productId,
          qty,
          unitPrice: resolvedUnitPrice,
          nameSnapshot: product.name,
          imageSnapshot: product.primaryImage || "",
          pricingOptions,
          selectedPricingId: selectedPricing?.id,
          selectedStrength: selectedPricing?.label,
        };
        state.allIds.push(productId);
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

      const existing = state.itemsById[productId];
      if (existing) {
        existing.qty += qty;
      } else {
        state.itemsById[productId] = {
          productId,
          qty,
          unitPrice,
          nameSnapshot,
          imageSnapshot,
        };
        state.allIds.push(productId);
      }
    },

    setQty: (
      state,
      action: PayloadAction<{ productId: string; qty: number }>,
    ) => {
      const { productId, qty } = action.payload;
      const item = state.itemsById[productId];
      if (!item) return;

      if (qty <= 0) {
        delete state.itemsById[productId];
        state.allIds = state.allIds.filter((id) => id !== productId);
        return;
      }

      item.qty = qty;
    },

    incrementQty: (state, action: PayloadAction<{ productId: string }>) => {
      const item = state.itemsById[action.payload.productId];
      if (item) item.qty += 1;
    },

    decrementQty: (state, action: PayloadAction<{ productId: string }>) => {
      const id = action.payload.productId;
      const item = state.itemsById[id];
      if (!item) return;

      item.qty -= 1;
      if (item.qty <= 0) {
        delete state.itemsById[id];
        state.allIds = state.allIds.filter((x) => x !== id);
      }
    },

    removeFromCart: (state, action: PayloadAction<{ productId: string }>) => {
      const id = action.payload.productId;
      if (state.itemsById[id]) {
        delete state.itemsById[id];
        state.allIds = state.allIds.filter((x) => x !== id);
      }
    },

    setCartItemPricing: (
      state,
      action: PayloadAction<{ productId: string; pricingId: string }>,
    ) => {
      const { productId, pricingId } = action.payload;
      const item = state.itemsById[productId];
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
