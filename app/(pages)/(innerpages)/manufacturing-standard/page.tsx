"use client";
import { SingleTickIcon } from "@/public/icons";
import React from "react";
import Image from "next/image";
import { images } from "@/app/ui";
import HeroSection from "@/app/components/cards/HeroSection";
const Page = () => {
  return (
    <>
      <HeroSection
        title={"Manufacturing Standards First"}
        description={
          "Our approach prioritizes structural accuracy, independent verification, and disciplined production practices to ensure reliable research compounds."
        }
        onShopNowClick={() => {
          "";
        }}
        onExploreScienceClick={() => {
          "";
        }}
      />
      <section className="py-24">
        <div className="container max-w-360 mx-auto px-8 flex flex-col gap-16">
          <div className="flex flex-col gap-6">
            <p className="text-[64px] leading-[120%] tracking-[-2%] font-semibold text-black">
              A Brand{" "}
              <span className="text-[#009FFF]">Built on Discipline.</span>
            </p>
            <div className="flex flex-col gap-5">
              <p className="text-[28px] text-gray-800 leading-[150%] ">
                SKYE RESEARCH was founded with a focus on raising manufacturing
                standards within the peptide market. The goal was not expansion
                at all costs — but consistency, transparency, and structural
                reliability.
              </p>
              <p className="text-[28px] text-gray-800 leading-[150%] ">
                We observed a space where marketing often exceeded verification.
                We built SKYE RESEARCH around the opposite principle:
                documentation first, claims second.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="px-12 pt-12  backdrop-blur-[20px] bg-linear-to-r from-[#DFD1C5] to-[#FFF6EB] rounded-[30px] flex flex-col gap-10 relative">
              <Image
                src={images.innerImages.SkyHealthOverlayImage}
                alt={"overlay"}
                className="absolute z-0 bottom-0 right-0"
              />
              <div className="flex flex-col gap-10 pb-10">
                <p className="text-4xl font-bold text-black">
                  Our Core Values.
                </p>
                <div className="flex flex-col gap-7">
                  <div className="flex flex-row items-start gap-4.5">
                    <div className="py-0.75">
                      <div className="w-6.5 h-6.5 flex items-center justify-center rounded-full bg-white shrink-0 ">
                        <SingleTickIcon />
                      </div>
                    </div>

                    <p className="text-2xl leading-[135%] text-gray-800">
                      Manufacturing Integrity — Precision in synthesis and
                      purification
                    </p>
                  </div>
                  <div className="flex flex-row items-start gap-4.5">
                    <div className="py-0.75">
                      <div className="w-6.5 h-6.5 flex items-center justify-center rounded-full bg-white shrink-0 ">
                        <SingleTickIcon />
                      </div>
                    </div>
                    <p className="text-2xl leading-[135%] text-gray-800">
                      Verification Transparency — Independent testing as
                      standard
                    </p>
                  </div>
                  <div className="flex flex-row items-start gap-4.5">
                    <div className="py-0.75">
                      <div className="w-6.5 h-6.5 flex items-center justify-center rounded-full bg-white shrink-0 ">
                        <SingleTickIcon />
                      </div>
                    </div>
                    <p className="text-2xl leading-[135%] text-gray-800">
                      Respect for Informed Consumers — Clear data, not
                      exaggerated claims
                    </p>
                  </div>
                  <div className="flex flex-row items-start gap-4.5">
                    <div className="py-0.75">
                      <div className="w-6.5 h-6.5 flex items-center justify-center rounded-full bg-white shrink-0 ">
                        <SingleTickIcon />
                      </div>
                    </div>
                    <p className="text-2xl leading-[135%] text-gray-800">
                      Long-Term Reliability — Stability and repeatability over
                      rapid expansion
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Image
              src={images.innerImages.ManufacturingPageImage}
              alt={"Manufacturing"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
