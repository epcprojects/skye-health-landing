"use client";

import { NewArrowIcon } from "@/public/icons";

interface BetterTreatmentSectionProps {
  onGetStarted?: () => void;
  onExploreOptions?: () => void;
}

const BetterTreatmentSection = ({
  onGetStarted,
  onExploreOptions,
}: BetterTreatmentSectionProps) => {
  return (
    <section className=" bg-[url('/images/BetterTreatmentBgImage.png')] px-4 xl:px-8 xl:pt-16 bg-[#F5F8FE] bg-contain bg-top xl:bg-center bg-no-repeat  flex flex-col  gap-40 xl:gap-140 items-center  justify-between">
      <p className="text-2xl xl:text-[40px] text-center  font-semibold text-[#0F1D3A] ">
        Better treatment. Better price.{" "}
        <span className="text-[#3D74E9]">Better care.</span>
      </p>
      <div className="flex flex-col items-center gap-5 xl:gap-6">
        <p className="text-lg xl:text-[32px] text-center xl:text-start font-semibold text-[#0F1D3A]">
          Everything you need. Nothing you don&apos;t. $199 flat.
        </p>
        <p className="text-center text-sm text-[#1F3A75] xl:text-base">
          Licensed physicians, clinically proven treatment, and ongoing care.
          <br className="hidden xl:block" />
          All for $199 a month, all built around you.
        </p>
        <div className="flex flex-col xl:flex-row items-center gap-2 xl:gap-3">
          <button
            onClick={onGetStarted}
            className=" cursor-pointer py-3 xl:py-5 px-5 xl:px-8 rounded-full bg-[#3D74E9] text-white text-sm xl:text-base xl:leading-[100%] font-medium"
          >
            Get started now
          </button>
          <button
            onClick={onExploreOptions}
            className=" cursor-pointer py-3 xl:py-5 px-5 xl:px-8 rounded-full ring ring-inset ring-[#0F1D3A] flex flex-row items-center gap-2.5 "
          >
            <p className="text-[#0F1D3A] text-sm xl:text-base xl:leading-[100%] font-medium">
              Explore your options
            </p>
            <NewArrowIcon fill="#0F1D3A" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BetterTreatmentSection;
