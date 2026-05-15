"use client";

import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowIcon, CheckIcon } from "@/public/icons";
import { useDeviceType } from "../hooks/useDeviceType";

type BulletItem = {
  label: string;
};

type PeptideFeatureSectionProps = {
  /** Top visual */
  imageSrc: StaticImageData | string;
  imageAlt?: string;
  marqueeSlot?: ReactNode; // <MarqueeCard />

  /** Content */
  title: string;
  description: string;
  bullets: BulletItem[];

  /** CTA */
  buttonLabel: string;
  onButtonClick?: () => void;

  /** Styling tokens */
  containerBgClass: string; // bg-linear-to-b from-french-pass to-white
  bulletIconBgClass: string; // bg-radial from-white from-40% to-periwinkle-blue
  bulletIconTextClass: string; // text-periwinkle-blue
  buttonBgClass: string; // bg-periwinkle-blue
  buttonTextClass?: string; // text-white
  buttonIconBgClass: string; // bg-white
  buttonIconTextClass: string; // text-periwinkle-blue
};

export default function PeptideFeatureSection({
  imageSrc,
  imageAlt = "",
  marqueeSlot,
  title,
  description,
  bullets,
  buttonLabel,
  onButtonClick,
  containerBgClass,
  bulletIconBgClass,
  bulletIconTextClass,
  buttonBgClass,
  buttonTextClass = "text-white",
  buttonIconBgClass,
  buttonIconTextClass,
}: PeptideFeatureSectionProps) {
  const { isMobile } = useDeviceType();
  return (
    <div
      className={`
       lg:px-16 pb-4 lg:pb-16 rounded-[40px]
        grid grid-cols-1 sm:grid-cols-2 lg:gap-y-0 gap-y-2
        gap-x-8 sm:gap-x-16
        ${containerBgClass}
      `}
    >
      {/* Top Visual (Image + Marquee) */}
      <div className="col-span-full flex items-center justify-center min-h-85 lg:min-h-100 relative">
        <Image
          alt={imageAlt}
          src={imageSrc}
          className="h-100 w-100 top-0 absolute bottom-0 z-20"
        />
        {marqueeSlot}
      </div>
      {/* Left Content */}
      <div className="space-y-7 px-8 lg:px-0">
        <div className="space-y-2">
          <h2 className="font-bold text-xl lg:text-3xl text-black">{title}</h2>
          <p className="text-gray-800 text-base lg:text-lg">{description}</p>
        </div>
      </div>

      {/* Right Content */}
      <div className="space-y-3 lg:space-y-7 px-8 lg:px-0">
        <ul className="space-y-2 text-base lg:text-lg text-gray-800">
          {bullets.map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span
                className={`
                  w-4.5 h-4.5 lg:h-6 lg:w-6 rounded-full
                  flex items-center justify-center
                  ${bulletIconBgClass}
                  ${bulletIconTextClass}
                `}
              >
                <CheckIcon
                  fill="currentColor"
                  width={isMobile ? "9" : "13"}
                  height={isMobile ? "7" : "9"}
                />
              </span>
              {item.label}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={onButtonClick}
          className={`
            cursor-pointer
            ${buttonBgClass}
            ${buttonTextClass}
            p-3 ps-6 rounded-full
            text-sm lg:text-base
            lg:w-auto w-full
            lg:justify-start justify-center
            font-medium
            group
            flex items-center gap-2
          `}
        >
          {buttonLabel}
          <span
            className={`
              h-6 w-6 rounded-full
              flex items-center justify-center
              -rotate-45
              transition-transform duration-500
              group-hover:rotate-0
              ${buttonIconBgClass}
              ${buttonIconTextClass}
            `}
          >
            <ArrowIcon fill="currentColor" />
          </span>
        </button>
      </div>
    </div>
  );
}
