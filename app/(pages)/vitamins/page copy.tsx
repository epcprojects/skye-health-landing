"use client";

import { SectionHeroCTA } from "@/app/components";
import FaqAccordion from "@/app/components/FaqAccordion";
import React from "react";
import Image from "next/image";
import { Images } from "@/app/images";
import NEWFAQ from "@/app/components/FAQ";
const page = () => {
  return (
    <>
      <SectionHeroCTA
        title="Vitamins, Done Clinically"
        titleSize="xl:text-6xl sm:text-5xl text-4xl"
        description="Because “One-Size-Fits-All” Doesn’t Work"
        primaryButton={{
          label: "Start Your Assessment",
          onClick: () => console.log("Primary clicked"),
        }}
        secondaryButton={{
          label: "Explore Treatments",
          withArrow: true,
          onClick: () => console.log("Secondary clicked"),
        }}
      />

      <section className="pt-8 xl:pt-24 pb-8 xl:pb-16 container mx-auto max-w-7xl px-4 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <div className="bg-peace rounded-4xl flex flex-col items-center pt-4 lg:pt-10 pr-4 lg:pl-10 lg:pr-10 pl-4">
            <div className="flex flex-col items-center gap-4 ">
              <p className="text-base lg:text-lg text-center">
                No fillers. No mega-dose marketing.
              </p>
              <p className="text-4xl text-center font-extrabold text-neutral-900">
                Most People Are Deficient and Don’t Know It.
              </p>
            </div>
            <Image
              alt="mobile"
              src={Images.vitaminpageimages.VitaminPageMobilePicture}
            />
          </div>
          <div className="relative  min-h-120 lg:min-h-0 p-8 flex items-end justify-end rounded-4xl">
            <Image
              src={Images.vitaminpageimages.VitaminPageFruits}
              alt="background"
              fill
              className="object-cover rounded-4xl"
            />
            <div className="relative grid grid-cols-1 xl:grid-cols-3 gap-3 lg:gap-6 w-full xl:w-auto">
              <div className="bg-white/75 flex xl:flex-col flex-row  xl:items-start items-center  gap-2 lg:gap-4 rounded-3xl  p-3.5 xl:p-6">
                <Image
                  src={Images.vitaminpageimages.TestTubeImage}
                  alt="Test Tube"
                  className="drop-shadow lg:w-10.5 lg:h-10.5 w-9 h-9"
                />
                <p className="text-base  xl:text-xl">Lab diagnostics</p>
              </div>

              <div className="bg-white/75 flex xl:flex-col flex-row xl:items-start items-center  gap-2 lg:gap-4 rounded-3xl p-3.5 xl:p-6">
                <Image
                  src={Images.vitaminpageimages.DropIcon}
                  alt="Test Tube"
                  className="drop-shadow lg:w-10.5 lg:h-10.5 w-9 h-9"
                />
                <p className="text-base xl:text-xl">Absorption profiles</p>
              </div>

              <div className="bg-white/75 flex xl:flex-col flex-row xl:items-start items-center gap-2 lg:gap-4 rounded-3xl  p-3.5 xl:p-6">
                <Image
                  src={Images.vitaminpageimages.BrainIcon}
                  alt="Test Tube"
                  className="drop-shadow lg:w-10.5 lg:h-10.5 w-9 h-9"
                />
                <p className="text-base  xl:text-xl">Individual physiology</p>
              </div>
            </div>
          </div>
        </div>
      </section>

     <section className="container mx-auto max-w-7xl px-4 xl:px-8">
        <div className="space-y-5 lg:space-y-11">
          <h2 className="text-4xl sm:text-5xl xl:text-[54px] font-extrabold text-center text-neutral-900 ">
            Frequent Asked Question?
          </h2>
           <NEWFAQ/>
          {/* <FaqAccordion /> */}
        </div>
      </section>
    </>
  );
};

export default page;
