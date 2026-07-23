"use client";

import Image, { type StaticImageData } from "next/image";
import { NewArrowIcon } from "@/public/icons";
import { images } from "@/app/ui";

export interface HeroSectionData {
  backgroundImage: string;
  title: string;
  description: string;
  logo: StaticImageData | string;
  ringImage: StaticImageData | string;
  heroImage: StaticImageData | string;
}

interface HeroSectionProps {
  hero: HeroSectionData;
  onGetStarted?: () => void;
  onViewTreatments?: () => void;
}

const HeroSection = ({
  hero,
  onGetStarted,
  onViewTreatments,
}: HeroSectionProps) => {
  return (
    <section
      style={{
        backgroundImage: `url("${hero.backgroundImage}")`,
      }}
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat pt-10.5 pb-14 xl:pb-36 xl:pt-73.5"
    >
      <div className="container relative z-20 mx-auto grid max-w-7xl grid-cols-1 items-start px-4 xl:grid-cols-2 xl:px-8">
        <div className="flex flex-col gap-5 xl:gap-10">
          <Image
            src={hero.logo}
            alt="Skye Health"
            className="h-auto w-50 xl:w-fit"
          />

          <div className="flex flex-col gap-2.5 xl:gap-4">
            <h1 className="text-2xl font-semibold text-white xl:text-5xl">
              {hero.title}
            </h1>

            <p className="text-base font-light text-white xl:text-xl">
              {hero.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onGetStarted}
              className="cursor-pointer rounded-full bg-[#0F1D3A] hover:bg-[#0F1D3A80] transition-colors duration-300 px-5 py-3 text-sm font-medium text-white xl:px-8 xl:py-5 xl:text-base"
            >
              Get started now
            </button>

            <button
              type="button"
              onClick={onViewTreatments}
              className="flex group cursor-pointer items-center gap-2.5 rounded-full px-5 py-3 ring-1 ring-inset ring-white bg-transparent text-white hover:text-[#0F1D3A]  hover:bg-white transition-colors duration-300 xl:px-8 xl:py-5"
            >
              <span className="text-sm font-medium  xl:text-base">
                View all treatments
              </span>
              <NewArrowIcon fill="currentColor" />
            </button>
          </div>
        </div>
      </div>
      <div className="hidden w-full xl:block ">
        <Image
          src={images.landingpageimages.heroImage}
          alt={"hero"}
          className="absolute right-0 top-[18%] bottom-0"
        />
      </div>
      {/* <div className="hidden w-full xl:block">
        <Image
          src={hero.ringImage}
          alt=""
          aria-hidden="true"
          className="absolute right-0 bottom-0"
        />

        <Image
          src={hero.heroImage}
          alt={hero.title}
          className="absolute -right-6 bottom-0 z-10"
        />
      </div> */}
    </section>
  );
};

export default HeroSection;
