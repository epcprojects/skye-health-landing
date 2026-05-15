/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/products/productsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchParamountProducts } from "./productsThunks";
import { ProductType } from "@/app/graphql/queries/products";

// export type Product = {
//   id: string;
//   name: string;
//   description: string;
//   form: string;
//   type: string;
//   quantity: string;
//   strength: string;
//   vendor: string;
//   categories: string[];
//   paramountPrice: string; // from API (string)
//   examIds: string[];
//   attachmentSrc: string;
//   isActive: boolean;
// };

type ProductsState = {
  byId: Record<string, ProductType>;
  allIds: string[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  categories: { name: string; count: number }[];

  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
};

const initialState: ProductsState = {
  byId: {},
  allIds: [],
  categories: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      const products = action.payload;

      console.log("products", products);

      // Merge/Upsert
      for (const p of products) {
        state.byId[p.id] = p;
        if (!state.allIds.includes(p.id)) state.allIds.push(p.id);
      }
    },
    setCategories: (
      state,
      action: PayloadAction<{ name: string; count: number }[]>,
    ) => {
      state.categories = action.payload;
    },
    // If you want to reset and replace (instead of merge):
    replaceProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.byId = {};
      state.allIds = [];
      for (const p of action.payload) {
        state.byId[p.id] = p;
        state.allIds.push(p.id);
      }
    },

    setMeta: (
      state,
      action: PayloadAction<{
        total?: number;
        page?: number;
        limit?: number;
        totalPages?: number;
      }>,
    ) => {
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
    },

    clearProducts: (state) => {
      state.byId = {};
      state.allIds = [];
      state.total = undefined;
      state.page = undefined;
      state.limit = undefined;
      state.totalPages = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParamountProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchParamountProducts.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchParamountProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to load products";
      });
  },
});

export const {
  setCategories,
  setProducts,
  replaceProducts,
  setMeta,
  clearProducts,
} = productsSlice.actions;

export default productsSlice.reducer;

/** Selectors */
export const selectProductsState = (state: any) =>
  state.products as ProductsState;

export const selectProductById = (state: any, id: string) =>
  (state.products as ProductsState).byId[id] ?? null;

export const selectAllProducts = (state: any) => {
  const s = state.products as ProductsState;
  return s.allIds.map((id) => s.byId[id]).filter(Boolean);
};

export const selectProductsByIds = (state: any, ids: string[]) => {
  const s = state.products as ProductsState;
  return ids.map((id) => s.byId[id]).filter(Boolean);
};

export const selectTotalCategoryCount = (state: any) => {
  const categories = (state.products as ProductsState).categories;

  return categories.reduce((total, cat) => total + (cat.count || 0), 0);
};

export const selectRelatedProducts = (
  state: any,
  productId?: string,
  limit: number = 6,
) => {
  const s = state.products as ProductsState;

  const allProducts = s.allIds.map((id) => s.byId[id]).filter(Boolean);

  // If no productId → return random products
  if (!productId) {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  }

  const currentProduct = s.byId[productId];

  if (!currentProduct) return [];

  const category = currentProduct.category;

  // Match same category
  const related = allProducts.filter(
    (p) => p.id !== productId && p.category === category,
  );

  return related.slice(0, limit);
};

// Optional helper if you want a pure function (not a selector):
export const getProductsByIds = (
  productsById: Record<string, ProductType>,
  ids: string[],
) => ids.map((id) => productsById[id]).filter(Boolean);
