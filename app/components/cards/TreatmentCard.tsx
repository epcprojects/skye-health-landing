"use client";

import React from "react";
import { NewArrowIcon } from "@/public/icons";

interface TreatmentCardProps {
  title: string;
  buttonLabel: string;
  backgroundImage: string;
  backgroundColor?: string;
  hoverText: string;
  hoverBackgroundColor: string;
  onClick?: () => void;
  onButtonClick?: () => void;
}

const TreatmentCard = ({
  title,
  buttonLabel,
  backgroundImage,
  backgroundColor = "transparent",
  hoverText,
  hoverBackgroundColor,
  onClick,
  onButtonClick,
}: TreatmentCardProps) => {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick();
        }
      }}
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundColor,
      }}
      className="group min-h-88.25 overflow-hidden rounded-4xl bg-cover bg-center bg-no-repeat px-12 flex items-center cursor-pointer"
    >
      <div className="flex flex-col gap-6">
        <div className="z-10 flex flex-col gap-4">
          <h3 className="text-[32px] font-medium text-white">
            {title}
          </h3>

          <div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onButtonClick?.();
              }}
              className="bg-white cursor-pointer py-5 px-8 rounded-full flex items-center gap-2.5"
            >
              <span className="text-base font-medium text-[#0F1D3A]">
                {buttonLabel}
              </span>

              <NewArrowIcon fill="#0F1D3A" />
            </button>
          </div>
        </div>

        <div className="self-start overflow-hidden max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
          <div
            style={{ backgroundColor: hoverBackgroundColor }}
            className="rounded-full p-4 flex items-center justify-center text-sm font-medium text-white"
          >
            {hoverText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard;