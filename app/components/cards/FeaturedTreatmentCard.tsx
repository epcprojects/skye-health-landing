"use client";

import Image, { type StaticImageData } from "next/image";
import { NewArrowIcon } from "@/public/icons";

interface FeaturedTreatmentCardProps {
  image: StaticImageData | string;
  badge: string;
  title: string;
  actionLabel: string;
  backgroundColor?: string;
  badgeBackgroundColor?: string;
  onGetStarted: () => void;
  onAction: () => void;
}

const FeaturedTreatmentCard = ({
  image,
  badge,
  title,
  actionLabel,
  backgroundColor = "#AFC6E5",
  badgeBackgroundColor = "#87A3CA",
  onGetStarted,
  onAction,
}: FeaturedTreatmentCardProps) => {
  return (
    <article
      style={{ background: backgroundColor }}
      className="relative h-full w-full xl:w-206 shrink-0 overflow-hidden rounded-[18px] xl:rounded-[36px]"
    >
      <Image
        src={image}
        alt={title}
        priority
        className="h-full w-full  absolute z-5"
      />

      <div className="xl:absolute xl:inset-0 z-10 relative flex flex-col items-start gap-1 xl:gap-0 justify-between px-6 py-7 xl:p-10">
        <div
          style={{ backgroundColor: badgeBackgroundColor }}
          className="rounded-full xl:px-8 xl:py-5 py-1.5 px-3.5 text-sm xl:text-base font-medium text-white"
        >
          {badge}
        </div>

        <div className="flex flex-col xl:gap-10 gap-12">
          <h3 className="xl:max-w-lg whitespace-pre-line text-[22px] xl:text-5xl font-semibold text-white">
            {title}
          </h3>

          <div className="flex flex-wrap gap-2.5 xl:gap-4">
            <button
              type="button"
              onClick={onGetStarted}
              className="cursor-pointer whitespace-nowrap rounded-full bg-[#3D74E9] hover:bg-blue-900 px-5 py-3 xl:px-8 xl:py-5 text-sm xl:text-base font-medium  text-white"
            >
              Get started now
            </button>

            <button
              type="button"
              onClick={onAction}
              className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full ring ring-inset ring-white px-5 xl:px-8 py-3 xl:py-5 bg-transparent hover:bg-white text-white hover:text-[#0F1D3A] "
            >
              <span className="text-sm xl:text-base font-medium">
                {actionLabel}
              </span>

              <NewArrowIcon fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedTreatmentCard;
