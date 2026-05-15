/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { setProducts, setMeta } from "./productsSlice";
// import type { Product } from "./productsSlice";

// type ApiResponse = {
//   data: Product[];
//   meta: {
//     total: number;
//     page: string;
//     limit: string;
//     totalPages: number;
//   };
// };

// export const fetchParamountProducts = createAsyncThunk<
//   ApiResponse,
//   { page: number; limit: number; token?: string },
//   { rejectValue: string }
// >(
//   "products/fetchParamountProducts",
//   async ({ page, limit, token }, thunkApi) => {
//     try {
//       const res = await fetch(
//         `/api/paramount/products?page=${page}&limit=${limit}`,
//         {
//           headers: {
//             Accept: "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//           cache: "no-store",
//         },
//       );

//       if (!res.ok) {
//         const errText = await res.text();
//         return thunkApi.rejectWithValue(errText || "Failed to fetch products");
//       }

//       const json = (await res.json()) as ApiResponse;

//       // Save products + meta into slice
//       thunkApi.dispatch(setProducts(json.data));
//       thunkApi.dispatch(
//         setMeta({
//           total: json.meta.total,
//           page: Number(json.meta.page),
//           limit: Number(json.meta.limit),
//           totalPages: json.meta.totalPages,
//         }),
//       );

//       return json;
//     } catch (e: any) {
//       return thunkApi.rejectWithValue(e?.message ?? "Network error");
//     }
//   },
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProducts, setMeta, setCategories } from "./productsSlice";
import { ProductType } from "@/app/graphql/queries/products";

type ApiResponse = {
  data: ProductType[];
  meta: { total: number; page: string; limit: string; totalPages: number };
};

//
export const fetchParamountCategories = createAsyncThunk<
  any[], // The array of {name, count} objects
  { token?: string }
>("products/fetchParamountCategories", async ({ token }, thunkApi) => {
  try {
    const res = await fetch(`/api/paramount/products/categories`, {
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      return thunkApi.rejectWithValue(errText || "Failed to fetch categories");
    }

    const json = await res.json();

    // Dispatch to your slice
    thunkApi.dispatch(setCategories(json));

    return json;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e?.message ?? "Network error");
  }
});

export const fetchParamountProducts = createAsyncThunk<
  ApiResponse,
  {
    page: number;
    limit: number;
    filter: string;
    token?: string;
    replace?: boolean;
  },
  { rejectValue: string }
>(
  "products/fetchParamountProducts",
  async ({ page, limit, filter, token }, thunkApi) => {
    try {
      const res = await fetch(
        `/api/paramount/products?page=${page}&limit=${limit}&filter=${filter}`,
        {
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        const errText = await res.text();
        return thunkApi.rejectWithValue(errText || "Failed to fetch products");
      }

      const json = (await res.json()) as ApiResponse;

      // append/merge products
      thunkApi.dispatch(setProducts(json.data));
      thunkApi.dispatch(
        setMeta({
          total: json.meta.total,
          page: Number(json.meta.page),
          limit: Number(json.meta.limit),
          totalPages: json.meta.totalPages,
        }),
      );

      return json;
    } catch (e: any) {
      return thunkApi.rejectWithValue(e?.message ?? "Network error");
    }
  },
);

// Get Product By Id
export const fetchProductById = createAsyncThunk<
  ProductType,
  { id: string; token?: string },
  { rejectValue: string }
>("products/fetchProductById", async ({ id, token }, thunkApi) => {
  try {
    const res = await fetch(`/api/paramount/products/${id}`, {
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      return thunkApi.rejectWithValue(errText || "Failed to fetch product");
    }

    const product = (await res.json()) as ProductType;

    // optional: store as selected product
    // thunkApi.dispatch(setSelectedProduct(product));

    return product;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e?.message ?? "Network error");
  }
});
