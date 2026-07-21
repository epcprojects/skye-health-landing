"use client";

import { useQuery } from "@apollo/client/react";
import { FETCH_CATEGORIES } from "@/app/graphql/queries/products";

export type TreatmentFilterValue = string;

interface TreatmentFiltersProps {
  selectedFilter: TreatmentFilterValue;
  onFilterChange: (value: TreatmentFilterValue) => void;
}

const getCategoryColor = (category: string) => {
  const normalizedCategory = category.trim().toLowerCase();

  if (
    normalizedCategory === "hormones" ||
    normalizedCategory === "hormone" ||
    normalizedCategory === "hormone program"
  ) {
    return "#0F1D3A";
  }

  if (
    normalizedCategory === "weight loss" ||
    normalizedCategory === "weight loss program"
  ) {
    return "#CEDCF9";
  }

  if (
    normalizedCategory === "peptide" ||
    normalizedCategory === "peptides"
  ) {
    return "#F3B39D";
  }

  return "#8FC0C2";
};

const TreatmentFilters = ({
  selectedFilter,
  onFilterChange,
}: TreatmentFiltersProps) => {
  const { data, loading } = useQuery<{
    productCategories: string[];
  }>(FETCH_CATEGORIES);

  const backendCategories = data?.productCategories ?? [];

  const categories = Array.from(
    new Map(
      backendCategories
        .filter((category) => category?.trim())
        .map((category) => [
          category.trim().toLowerCase(),
          category.trim(),
        ]),
    ).values(),
  );

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <button
        type="button"
        aria-pressed={selectedFilter === "all"}
        onClick={() => onFilterChange("all")}
        className={`cursor-pointer py-3.5 px-5 xl:py-4 xl:px-6 backdrop-blur-[90px] flex items-center gap-2 rounded-lg transition-colors duration-300 ${
          selectedFilter === "all"
            ? "bg-[#3D74E9] text-white"
            : "bg-white text-[#0F1D3A] hover:bg-[#EDF3FF]"
        }`}
      >
        <span className="text-sm font-medium">All</span>
      </button>

      {loading ? (
        <span className="flex items-center px-5 text-sm text-[#737780]">
          Loading categories...
        </span>
      ) : (
        categories.map((category) => {
          const isSelected = selectedFilter === category;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onFilterChange(category)}
              className={`cursor-pointer py-3.5 px-5 xl:py-4 xl:px-6 backdrop-blur-[90px] flex items-center gap-2 rounded-lg transition-colors duration-300 ${
                isSelected
                  ? "bg-[#3D74E9] text-white"
                  : "bg-white text-[#0F1D3A] hover:bg-[#EDF3FF]"
              }`}
            >
              <span
                className="w-3 h-3 shrink-0 rounded-full"
                style={{
                  backgroundColor: getCategoryColor(category),
                }}
              />

              <span className="text-sm font-medium">
                {category}
              </span>
            </button>
          );
        })
      )}
    </div>
  );
};

export default TreatmentFilters;