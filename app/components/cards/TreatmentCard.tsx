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
      className="group xl:min-h-88.25 overflow-hidden rounded-2xl xl:rounded-4xl bg-cover bg-center bg-no-repeat py-8 xl:py-0 px-6 xl:px-12 flex items-center cursor-pointer"
    >
      <div className="flex flex-col justify-center   gap-6">
        <div className="z-10 flex flex-col   gap-4">
          <h3 className="text-xl xl:text-[32px] font-medium text-white">
            {title}
          </h3>

          <div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onButtonClick?.();
              }}
              className="bg-white cursor-pointer py-3 px-5 xl:py-5 xl:px-8 rounded-full flex items-center gap-2.5"
            >
              <span className="text-sm xl:text-base font-medium text-[#0F1D3A]">
                {buttonLabel}
              </span>

              <NewArrowIcon fill="#0F1D3A" />
            </button>
          </div>
        </div>

        <div className="self-start overflow-hidden transition-all duration-300 ">
          <div
            style={{ backgroundColor: hoverBackgroundColor }}
            className="rounded-full px-4 p-2 md:p-4 flex items-center justify-center text-sm font-medium text-white"
          >
            {hoverText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard;
