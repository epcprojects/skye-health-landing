"use client";

import React from "react";
import ThemeButton from "../Button/ThemeButton";
import { ButtonArrowIcon } from "@/public/icons";
import Image from "next/image";
import { images } from "@/app/ui";

type HeroSectionProps = {
  title: string;
  description: string;
  onShopNowClick: () => void;
  onExploreScienceClick: () => void;
};

const HeroSection = ({
  title,
  description,
  onShopNowClick,
  onExploreScienceClick,
}: HeroSectionProps) => {
  return (
    <section id="page-hero" className="bg-linear-to-b from-[#04306D] to-[#085DD3] rounded-b-[48px] relative overflow-hidden">
      <Image
        src={images.innerImages.DottedImage}
        alt={"dotted image"}
        fill
        className="object-cover object-center "
      />

      <div className="relative pb-24 pt-47 container max-w-360 mx-auto px-8 flex flex-col gap-10.5 items-center z-10">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-6xl font-semibold text-neutral-100 leading-[100%] tracking-[-2%]">
            {title}
          </h1>

          <p className="text-2xl leading-[150%]  text-neutral-100 text-center">
            {description}
          </p>
        </div>

        <div className="flex flex-row gap-5.5">
          <ThemeButton
            onClick={onShopNowClick ?? (() => {})}
            label={"Shop Now"}
            size="xxl"
          />

          <button
            onClick={onExploreScienceClick ?? (() => {})}
            className="py-4 cursor-pointer  pr-3 pl-6 flex flex-row items-center gap-2.5 bg-white/20 backdrop-blur-[66px] rounded-full "
          >
            <span className="text-lg font-semibold text-white">
              Explore Science
            </span>

            <div className="w-7.5 h-7.5 bg-white rounded-full flex items-center justify-center">
              <ButtonArrowIcon />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
