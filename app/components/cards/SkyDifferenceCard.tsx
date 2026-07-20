"use client";

import Image, { type StaticImageData } from "next/image";
import { NewPlusIcon } from "@/public/icons";

interface SkyDifferenceCardProps {
  title: string;
  description: string;
  image: StaticImageData;

  hoverTitle: string;
  hoverDescription: string;
  hoverImage: StaticImageData;
  hoverBackgroundImage?: string;

  onClick: () => void;
}

const SkyDifferenceCard = ({
  title,
  description,
  image,
  hoverTitle,
  hoverDescription,
  hoverImage,
  hoverBackgroundImage = "/images/SkyDifferenceBg.png",
  onClick,
}: SkyDifferenceCardProps) => {
  return (
   <article className="group grid h-full w-full max-w-89.25 overflow-hidden rounded-[28px]">
      <div className="relative col-start-1 row-start-1 flex   h-full flex-col bg-white opacity-100 transition-all duration-500 group-hover:pointer-events-none group-hover:scale-95 group-hover:opacity-0">
        <div className="flex flex-col gap-4 p-10">
          <h3 className="text-[32px] font-semibold leading-[100%] text-[#0F1D3A]">
            {title}
          </h3>

          <p className="text-base text-[#1F3A75]">
            {description}
          </p>
        </div>

        <Image
          src={image}
          alt={title}
          className="mt-auto h-auto w-full rounded-b-[28px] object-cover"
        />

        <button
          type="button"
          onClick={onClick}
          aria-label={`Learn more about ${title}`}
          className="absolute bottom-6 right-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A]"
        >
          <NewPlusIcon fill="white" />
        </button>
      </div>

      <div
        style={{
          backgroundImage: `url("${hoverBackgroundImage}")`,
        }}
        className="pointer-events-none relative col-start-1 row-start-1 flex flex-col bg-fill bg-center bg-no-repeat opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:opacity-100"
      >
        <div className="flex flex-col gap-4 p-12">
          <h3 className="text-[32px] font-semibold leading-[100%] text-white">
            {hoverTitle}
          </h3>

          <p className="text-base text-[#F5F8FE]">
            {hoverDescription}
          </p>
        </div>

        <Image
          src={hoverImage}
          alt={hoverTitle}
          className="mt-auto h-auto w-full object-cover"
        />

        <button
          type="button"
          onClick={onClick}
          aria-label={`Learn more about ${hoverTitle}`}
          className="absolute bottom-6 right-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A]"
        >
          <NewPlusIcon fill="white" />
        </button>
      </div>
    </article>
  );
};

export default SkyDifferenceCard;