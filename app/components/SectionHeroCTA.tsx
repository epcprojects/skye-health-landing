"use client";

import React from "react";
import { ArrowIcon } from "@/public/icons";

type ButtonConfig = {
  label: string;
  onClick?: () => void;
  withArrow?: boolean;
};

type SectionHeroCTAProps = {
  title: string;
  description?: string;
  primaryButton?: ButtonConfig;
  secondaryButton?: ButtonConfig;
  tags?: string[];
  width?: string;
  titleSize?: string;
};

export default function SectionHeroCTA({
  title,
  description,
  primaryButton,
  secondaryButton,
  tags,
  width = "max-w-4xl",
  titleSize = "text-6xl",
}: SectionHeroCTAProps) {
  return (
    <section id="page-hero" className="bg-linear-[245deg] from-[#252B37] pt-30 xl:pt-40 pb-10 xl:pb-17 to-[#535862]  relative  ">
      <div className="noise absolute! inset-0 w-full" />
      <div
        className={`container mx-auto space-y-6 px-4 xl:px-8 pb-8  lg:pt-8 sm:py-16 relative ${width}`}
      >
        {/* Title */}
        <h1 className={`text-white wrap-anywhere  text-center font-extrabold ${titleSize}`}>
          {title}
        </h1>

        {/* Description */}
        {description && (
          <h3 className="text-white text-lg xl:text-xl text-center font-normal">
            {description}
          </h3>
        )}

        {tags && (
          <div className="flex items-center justify-center flex-wrap gap-2">
            {tags.map((tag, index) =>
              tag ? (
                <span
                  key={index}
                  className="block w-fit rounded-full bg-white border border-gray-200 py-1 px-3 text-gray-700 font-medium text-xs md:text-sm"
                >
                  {tag}
                </span>
              ) : null,
            )}
          </div>
        )}

        {/* Buttons */}
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {primaryButton && (
              <button
                onClick={primaryButton.onClick}
                className="px-6 py-3 sm:justify-start justify-center sm:w-auto w-full rounded-full font-semibold cursor-pointer hover:bg-secondary hover:text-white text-neutral-900 text-base bg-white shadow hover:shadow-md transition"
              >
                {primaryButton.label}
              </button>
            )}
            {secondaryButton && (
              <button
                onClick={secondaryButton.onClick}
                className="lg:ps-6 px-6 lg:pe-3 sm:w-auto w-full sm:justify-start justify-center py-3 rounded-full bg-white font-semibold  cursor-pointer hover:bg-primary hover:text-white text-neutral-900 flex items-center gap-2 shadow group hover:shadow-md transition"
              >
                {secondaryButton.label}

                {secondaryButton.withArrow && (
                  <span
                    className="
                    flex items-center justify-center
                    rounded-full
                    bg-secondary
                    h-6 w-6
                    -rotate-45
                    transition-transform duration-500
                    group-hover:rotate-0
                  "
                  >
                    <ArrowIcon fill="white" />
                  </span>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
