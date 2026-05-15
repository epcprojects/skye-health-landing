"use client";

import * as React from "react";
import * as Slider from "@radix-ui/react-slider";

type DosageSliderProps = {
  label?: string; // "Dosage (mg):"
  unit?: string; // "mg"
  value: number; // controlled value from parent
  onValueChange: (v: number) => void;

  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;

  className?: string; // optional wrapper classes
};

export function DosageSlider({
  label = "Dosage (mg):",
  unit = "mg",
  value,
  onValueChange,
  min = 0,
  max = 10,
  step = 1,
  disabled = false,
  className = "",
}: DosageSliderProps) {
  return (
    <div
      className={[
        "w-full rounded-full border-2 border-neutral-200 bg-white",
        "px-6 py-3",
        "flex items-center gap-4",
        className,
      ].join(" ")}
    >
      {/* Left label */}
      <span className="text-sm sm:text-base font-medium text-neutral-900 whitespace-nowrap">
        {label}
      </span>

      {/* Slider */}
      <Slider.Root
        value={[value]}
        onValueChange={(arr) => onValueChange(arr[0] ?? min)}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="relative flex items-center select-none touch-none w-full max-w-60"
        aria-label="Dosage"
      >
        {/* Track */}
        <Slider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
          {/* Range (blue fill) */}
          <Slider.Range className="absolute h-full bg-secondary" />
        </Slider.Track>

        {/* Thumb */}
        <Slider.Thumb
          className={[
            "block h-5 w-5 rounded-full bg-white",
            "border-2 border-secondary shadow-sm",
            "focus:outline-none focus:ring-4 focus:ring-sky-100",
            "disabled:opacity-50",
          ].join(" ")}
        />
      </Slider.Root>

      {/* Right value */}
      <span className="text-base font-medium text-neutral-900 whitespace-nowrap">
        {value}
        {unit}
      </span>
    </div>
  );
}
