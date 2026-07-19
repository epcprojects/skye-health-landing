"use client";

export type TreatmentFilterValue =
  | "all"
  | "weight-loss"
  | "hormones"
  | "peptides";

interface FilterItem {
  label: string;
  value: TreatmentFilterValue;
  dotColor?: string;
}

interface TreatmentFiltersProps {
  selectedFilter: TreatmentFilterValue;
  onFilterChange: (value: TreatmentFilterValue) => void;
}

const filterItems: FilterItem[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Weight Loss",
    value: "weight-loss",
    dotColor: "#CEDCF9",
  },
  {
    label: "Hormones",
    value: "hormones",
    dotColor: "#0F1D3A",
  },
  {
    label: "Peptides",
    value: "peptides",
    dotColor: "#F3B39D",
  },
];

const TreatmentFilters = ({
  selectedFilter,
  onFilterChange,
}: TreatmentFiltersProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {filterItems.map((filter) => {
        const isSelected = selectedFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onFilterChange(filter.value)}
            className={`cursor-pointer py-4 px-6 backdrop-blur-[90px] flex items-center gap-2 rounded-lg transition-colors duration-300 ${
              isSelected
                ? "bg-[#3D74E9] text-white"
                : "bg-white text-[#0F1D3A] hover:bg-[#EDF3FF]"
            }`}
          >
            {filter.dotColor && (
              <span
                className="w-3 h-3 shrink-0 rounded-full"
                style={{ backgroundColor: filter.dotColor }}
              />
            )}

            <span className="text-sm font-medium">
              {filter.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TreatmentFilters;