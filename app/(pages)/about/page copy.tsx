"use client";

import { SectionHeroCTA } from "@/app/components";
import { Images } from "@/app/images";
import Image from "next/image";
import { ArrowIcon, CertificateProviderIcon, CompoundingIcon, SecurityIcon } from "@/public/icons";
import React from "react";
import FaqAccordion from "@/app/components/FaqAccordion";
import HormonesCard from "@/app/components/HormonesCard";
import NEWFAQ from "@/app/components/FAQ";

const page = () => {
  return (
    <>
      <SectionHeroCTA
        title="About Paramount HealthRx"
        titleSize="xl:text-6xl sm:text-5xl text-4xl"
        description="Elevating the Standard of Care"
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

      {/* second section */}
      <section className="xl:pt-24 xl:pb-16 pt-8 pb-8">
        <div className="container max-w-7xl mx-auto  px-4 xl:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4 flex flex-col justify-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl text-center lg:text-start  lg:text-42 font-extrabold text-neutral-900">
                Paramount HealthRx was founded on a simple belief
              </h2>
              <p className="text-lg lg:text-2xl  text-center lg:text-start font-semibold text-neutral-900">
                Modern medicine should optimize—not just treat disease.
              </p>
              <p className="text-base lg:text-lg text-center lg:text-start text-neutral-700">We combine:</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 lg:gap-5">
                <div className="p-4 lg:p-7.5 bg-water flex flex-row lg:flex-col lg:items-start items-center gap-4.5 rounded-2xl lg:rounded-4xl">
                  <div className="flex items-center justify-center relative opacity-100">
                    <Image
                      alt=""
                      src={Images.landingPage.iconBg}
                      className="drop-shadow shrink-0 lg:w-15 lg:h-15 w-10 h-10"
                    />
                    <span className="absolute">
                      <CertificateProviderIcon />
                    </span>
                  </div>
                  <p className="text-netural-700 text-base lg:text-lg">
                    Board-certified providers
                  </p>
                </div>
                <div className="p-4 lg:p-7.5 bg-water flex flex-row lg:flex-col lg:items-start items-center gap-4.5 rounded-2xl lg:rounded-4xl">
                  <div className="flex items-center justify-center relative opacity-100">
                    <Image
                      alt=""
                      src={Images.landingPage.iconBg}
                      className="drop-shadow shrink-0 lg:w-15 lg:h-15 w-10 h-10"
                    />
                    <span className="absolute">
                      <CompoundingIcon/>
                    </span>
                  </div>
                  <p className="text-netural-700 text-base lg:text-lg">
                    Advanced compounding pharmacies
                  </p>
                </div>
                <div className="p-4 lg:p-7.5 bg-water flex flex-row lg:flex-col lg:items-start items-center gap-4.5 rounded-2xl lg:rounded-4xl">
                  <div className="flex items-center justify-center relative opacity-100">
                    <Image
                      alt=""
                      src={Images.landingPage.iconBg}
                      className="drop-shadow shrink-0 lg:w-15 lg:h-15 w-10 h-10"
                    />
                    <span className="absolute">
                      <SecurityIcon />
                    </span>
                  </div>
                  <p className="text-netural-700 text-base lg:text-lg">
                  Evidence-based protocols
                  </p>
                </div>
              </div>
              <p className="text-neutral-800 text-center lg:text-start text-base"><span className="italic">To deliver precision health at scale.</span> This isn’t mass-market wellness.
It’s personalized medical optimization.</p>
            </div>
          </div>
          <div>
            <Image
              alt="mobile"
              src={Images.aboutpageimages.aboutsecondsectionimage}
              className="rounded-4xl h-auto lg:h-full"
            />
          </div>
        </div>
      </section>

      {/* third section */}
      <section className="pb-8 xl:py-16">
         <HormonesCard/>
      </section>

      {/* fourth section */}
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
