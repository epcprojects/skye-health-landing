"use client";

import React from "react";

type Props = {
  total: number;
  activeIndex: number;
  onChange?: (index: number) => void;
  primaryClr?: string;
  secondaryClr?: string;
};

const SliderIndicator: React.FC<Props> = ({
  total,
  activeIndex,
  onChange,
  primaryClr = "bg-secondary",
  secondaryClr = "bg-white/70",
}) => {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={index}
            onClick={() => onChange?.(index)}
            className={`
              transition-all duration-300 ease-in-out rounded-full
              ${isActive ? `w-16 h-3 ${primaryClr} ` : `w-6 h-3 ${secondaryClr}`}
            `}
          />
        );
      })}
    </div>
  );
};

export default SliderIndicator;
