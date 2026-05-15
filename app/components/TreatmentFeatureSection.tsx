"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowIcon, CheckIcon } from "@/public/icons";
import { useDeviceType } from "../hooks/useDeviceType";

type BulletItem = {
  label: string;
};

type ImageDirection = "left" | "right";

type TreatmentFeatureSectionProps = {
  imageSrc: StaticImageData | string;
  imageAlt?: string;

  title: string;

  paragraphs: string[];

  bulletIntroText?: string;
  bullets: BulletItem[];

  footerText?: string;

  buttonLabel: string;
  onButtonClick?: () => void;

  direction?: ImageDirection;

  /** Styling tokens */
  containerBgClass: string; // e.g. "bg-linear-to-b from-powder-blue to-white"
  bulletIconBgClass: string; // e.g. "bg-radial from-white from-40% to-pacific-blue"
  bulletIconTextClass: string; // e.g. "text-pacific-blue"
  buttonBgClass: string; // e.g. "bg-pacific-blue"
  buttonTextClass?: string; // e.g. "text-white"
  buttonIconBgClass: string; // e.g. "bg-white"
  buttonIconTextClass: string; // e.g. "text-pacific-blue"
};

export default function TreatmentFeatureSection({
  imageSrc,
  imageAlt = "",
  title,
  paragraphs,
  bulletIntroText,
  bullets,
  footerText,
  buttonLabel,
  onButtonClick,
  direction,
  containerBgClass,
  bulletIconBgClass,
  bulletIconTextClass,
  buttonBgClass,
  buttonTextClass = "text-white",
  buttonIconBgClass,
  buttonIconTextClass,
}: TreatmentFeatureSectionProps) {
  const imageOrder = direction === "right" ? "sm:order-2" : "sm:order-1";

  const contentOrder = direction === "right" ? "sm:order-1" : "sm:order-2";
  const { isMobile } = useDeviceType();
  return (
    <div
      className={`
        p-8 lg:p-16 rounded-[40px]
        grid gap-8 sm:gap-16 items-center
        grid-cols-1 sm:grid-cols-2
        ${containerBgClass}
      `}
    >
      {/* Image */}
      <div className={imageOrder}>
        <Image src={imageSrc} alt={imageAlt} />
      </div>

      {/* Content */}
      <div className={`${contentOrder} space-y-3 lg:space-y-7`}>
        <div className="space-y-2">
          <h2 className="font-bold text-xl lg:text-[32px] text-black">
            {title}
          </h2>

          <div className="space-y-3 lg:space-y-6">
            {/* Paragraphs */}
            {paragraphs.map((text, idx) => (
              <p key={idx} className="text-gray-800 text-base lg:text-lg">
                {text}
              </p>
            ))}

            {/* Bullet Intro */}
            {bulletIntroText && (
              <p className="text-gray-800 text-base lg:text-lg">
                {bulletIntroText}
              </p>
            )}

            {/* Bullet List */}
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

            {/* Footer Text */}
            {footerText && (
              <p className="text-gray-800 text-base lg:text-lg">{footerText}</p>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onButtonClick}
          className={`
            cursor-pointer
            ${buttonBgClass}
            ${buttonTextClass}
            p-3 lg:ps-6 rounded-full
            font-medium
            text-sm lg:text-base
            lg:justify-start justify-center
            lg:w-auto w-full
            flex items-center gap-2
            group
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
