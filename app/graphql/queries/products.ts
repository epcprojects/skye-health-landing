import { gql } from "@apollo/client";

export const ProductStatusEnum = {
  IN_STOCK: "IN_STOCK",
  LOW_STOCK: "LOW_STOCK",
  OUT_OF_STOCK: "OUT_OF_STOCK",
} as const;

export type ProductStatusEnum =
  (typeof ProductStatusEnum)[keyof typeof ProductStatusEnum];

export const ALL_PRODUCTS = gql`
  query AllProducts(
    $search: String
    $category: String
    $vendor: String
    $in_demand: Boolean
    $favoriteProducts: Boolean
    $patientId: ID
    $page: Int
    $perPage: Int
  ) {
    allProducts(
      search: $search
      category: $category
      vendor: $vendor
      inDemand: $in_demand
      favoriteProducts: $favoriteProducts
      patientId: $patientId
      page: $page
      perPage: $perPage
    ) {
      totalPages
      nextPage
      prevPage
      count
      allData {
        id
        sku
        name
        description
        category
        brand
        price
        quantity
        inStock
        primaryImage
        form
        status
        strength
        vendor
        subCategory
        hideFromCustomer
        productUnitPricings {
          id
          sku
          quantity
          strength
          unitQuantity
          cost
        }
      }
    }
  }
`;

export type ProductUnitPricingType = {
  id: string;
  sku: string;
  quantity: number;
  strength: string;
  unitQuantity: string;
  cost: number;
  retailPrice?: number | null;
};

export type ProductType = {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  subCategory?: string | null;
  brand: string;
  price: number;
  retailPrice?: number | null;
  quantity: number;
  inStock: boolean;
  primaryImage: string;
  status: string;
  form: string;
  strength: string;
  vendor: string;
  hideFromCustomer: boolean;
  productUnitPricings?: ProductUnitPricingType[];
};

export type AllProductsType = {
  allProducts: {
    count: number;
    nextPage: number | null;
    prevPage: number | null;
    totalPages: number;
    allData: ProductType[];
  };
};

export type AllProductsVariables = {
  search?: string | null;
  status?: ProductStatusEnum | null;
  category?: string | null;
  in_demand?: boolean | null;
  page?: number | null;
  perPage?: number | null;
};

export const FETCH_CATEGORIES = gql`
  query ProductCategories {
    productCategories
  }
`;
