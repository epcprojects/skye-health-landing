"use client";

import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { NewArrowIcon } from "@/public/icons";

import TreatmentFilters, {
  type TreatmentFilterValue,
} from "../cards/TreatmentFilters";

import TreatmentProductCard from "../cards/TreatmentProductCard";

import {
  ALL_PRODUCTS,
  type AllProductsType,
  type AllProductsVariables,
  type ProductType,
  ProductStatusEnum,
} from "@/app/graphql/queries/products";
import { images } from "@/app/ui";

interface ExploreOptionsSectionProps {
  selectedFilter: TreatmentFilterValue;
  onFilterChange: (filter: TreatmentFilterValue) => void;
  onGetStarted?: () => void;
  onViewTreatments?: () => void;
  onProductGetStarted?: (product: ProductType) => void;
  onProductLearnMore?: (product: ProductType) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const ExploreOptionsSection = ({
  selectedFilter,
  onFilterChange,
  onGetStarted,
  onViewTreatments,
  onProductGetStarted,
  onProductLearnMore,
}: ExploreOptionsSectionProps) => {
  const router = useRouter();

  const selectedCategory =
    selectedFilter === "all" ? undefined : selectedFilter;

  const { data, loading, error } = useQuery<
    AllProductsType,
    AllProductsVariables
  >(ALL_PRODUCTS, {
    variables: {
      category: selectedCategory,
      page: 1,
      perPage: 4,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const products = data?.allProducts?.allData ?? [];

  return (
    <section className="bg-[#F5F8FE] pb-6 xl:pb-27">
      <div className="container mx-auto flex max-w-7xl flex-col gap-5 px-4 xl:gap-14.5 xl:px-8">
        <div className="flex flex-col gap-3.5 xl:gap-4">
          <h2 className="text-2xl font-semibold text-[#22252B] xl:text-[40px]">
            Explore your options
          </h2>

          <TreatmentFilters
            selectedFilter={selectedFilter}
            onFilterChange={onFilterChange}
          />
        </div>

        {loading && (
          <div className="py-10 text-center text-base text-[#737780]">
            Loading products...
          </div>
        )}

        {!loading && error && (
          <div className="py-10 text-center text-base text-red-500">
            Unable to load products.
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="py-10 text-center text-base text-[#737780]">
            No products found in this category.
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => {
              const soldOut =
                !product.inStock ||
                product.status === ProductStatusEnum.OUT_OF_STOCK;

              return (
                <TreatmentProductCard
                  key={product.id}
                  title={product.name}
                  image={
                    product.primaryImage ||
                    images.landingpageimages.ProductImage
                  }
                  description={product.description}
                  price={`${formatPrice(product.price)}/month`}
                  inStock={product.inStock && !soldOut}
                  newIn={false}
                  soldOut={soldOut}
                  onGetStarted={() => {
                    if (onProductGetStarted) {
                      onProductGetStarted(product);
                      return;
                    }

                    router.push(`/products/${product.id}`);
                  }}
                  onLearnMore={() => {
                    if (onProductLearnMore) {
                      onProductLearnMore(product);
                      return;
                    }

                    router.push(`/products/${product.id}`);
                  }}
                />
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap items-center self-center gap-3 xl:gap-4.5">
          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-full bg-[#3D74E9] px-5 py-3 text-sm font-medium text-white xl:px-8 xl:py-5 xl:text-base"
          >
            Get started now
          </button>

          <button
            type="button"
            onClick={onViewTreatments}
            className="flex flex-row items-center gap-2.5 rounded-full px-5 py-3 ring-1 ring-inset ring-[#0F1D3A] xl:px-8 xl:py-5"
          >
            <span className="text-sm font-medium text-[#0F1D3A] xl:text-base">
              View all treatments
            </span>

            <NewArrowIcon fill="#0F1D3A" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExploreOptionsSection;