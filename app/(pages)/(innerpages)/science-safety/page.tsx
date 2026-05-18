"use client";

import HeroSection from "@/app/components/cards/HeroSection";
import {
  MoleculesIcon,
  PulseRectangleIcon,
  SecurityFilledIcon,
  SmallTickIcon,
} from "@/public/icons";

import React from "react";

const Page = () => {
  return (
    <>
      <HeroSection
        title="The Science Behind Safety"
        description="Understanding peptide signaling requires molecular precision, analytical verification, and disciplined manufacturing practices to ensure structural accuracy and research reliability."
        onShopNowClick={() => {
          console.log("Shop Now clicked");
        }}
        onExploreScienceClick={() => {
          console.log("Explore Science clicked");
        }}
      />
      <section className="py-8 lg:py-24">
        <div className="container max-w-360 mx-auto px-4 lg:px-8 flex flex-col gap-4 lg:gap-16">
          <div className="flex flex-col gap-2">
            <p className="text-gray-800 text-xl lg:text-2xl ">Science & Safety</p>
            <p className="text-3xl lg:text-[64px] font-semibold leading-[120%] tracking-[-2%] text-black">
              Precision Biology{" "}
              <span className="text-[#009FFF]">
                Requires Precision Chemistry.
              </span>
            </p>
            <p className="text-xl lg:text-[28px] text-gray-800 leading-[150%]">
              Peptides function as biological signaling molecules. Their role in
              research contexts is tied to cellular communication, structural
              adaptation, and recovery pathways. Because of their signaling
              nature, small variations in structure can alter how they interact
              with biological systems. This is why structural accuracy and
              purity are central to SKYE RESEARCH operations.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-[30px] p-4 lg:p-12 backdrop-blur-[20px] overflow-hidden bg-linear-to-r from-[#E9DEFA] to-[#FFF6EB] flex flex-col gap-4 lg:gap-16">
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  <div className="bg-white/48 shrink-0 border border-white w-20 h-20 rounded-xl flex items-center justify-center">
                    <PulseRectangleIcon />
                  </div>
                  <p className="text-2xl lg:text-4xl font-bold text-black text-center lg:text-start">
                    Understanding Biological Signaling.
                  </p>
                </div>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-7">
                    <div className="flex flex-row gap-4.5 items-start">
                      <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                        <SmallTickIcon />
                      </div>
                      <p className="text-gray-800 text-xl lg:text-2xl leading-[135%]">
                        Tissue repair cascades
                      </p>
                    </div>
                    <div className="flex flex-row gap-4.5 items-start">
                      <div className="w-6.5 h-6.5 shrink-0  bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                        <SmallTickIcon />
                      </div>
                      <p className="text-gray-800 text-xl lg:text-2xl leading-[135%]">
                        Inflammatory response modulation
                      </p>
                    </div>
                    <div className="flex flex-row gap-4.5 items-start">
                      <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                        <SmallTickIcon />
                      </div>
                      <p className="text-gray-800 text-xl lg:text-2xl leading-[135%]">
                        Collagen and extracellular matrix communication
                      </p>
                    </div>
                    <div className="flex flex-row gap-4.5 items-start">
                      <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                        <SmallTickIcon />
                      </div>
                      <p className="text-gray-800 text-xl lg:text-2xl leading-[135%]">
                        Cellular signaling efficiency
                      </p>
                    </div>
                  </div>
                  <p className="text-xl lg:text-2xl text-gray-800">
                    Their value lies in targeted communication within complex
                    biological systems.
                  </p>
                </div>
              </div>
              <div className="rounded-[30px] p-4 lg:p-12 backdrop-blur-[20px] overflow-hidden bg-lightblue flex flex-col gap-4 lg:gap-16">
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  <div className="bg-white/48 shrink-0 border border-white w-20 h-20 rounded-xl flex items-center justify-center">
                    <SecurityFilledIcon />
                  </div>
                  <p className="text-2xl lg:text-4xl font-bold text-black text-center lg:text-start">
                    Our Safety
                    <br /> Position.
                  </p>
                </div>
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-7">
                    <div className="flex flex-row gap-4.5 items-start">
                      <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                        <SmallTickIcon fill="#287EFF" />
                      </div>
                      <p className="text-gray-800 text-xl lg:text-2xl leading-[135%]">
                        Transparent testing practices
                      </p>
                    </div>
                    <div className="flex flex-row gap-4.5 items-start">
                      <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                        <SmallTickIcon fill="#287EFF" />
                      </div>
                      <p className="text-gray-800 text-xl lg:text-2xl leading-[135%]">
                        Responsible storage and handling
                      </p>
                    </div>
                    <div className="flex flex-row gap-4.5 items-start">
                      <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                        <SmallTickIcon fill="#287EFF" />
                      </div>
                      <p className="text-gray-800 text-xl lg:text-2xl leading-[135%]">
                        Respect for regional regulatory frameworks
                      </p>
                    </div>
                    <div className="flex flex-row gap-4.5 items-start">
                      <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                        <SmallTickIcon fill="#287EFF" />
                      </div>
                      <p className="text-gray-800 text-xl lg:text-2xl leading-[135%]">
                        Informed, research-aware consumers
                      </p>
                    </div>
                  </div>
                  <p className="text-xl lg:text-2xl text-gray-800">
                    We focus on manufacturing integrity and documentation —
                    allowing customers to make educated decisions.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-linear-to-t from-[#C1DFC4] to-[#DEECDD] rounded-[30px] p-4 lg:p-12 backdrop-blur-[20px] flex flex-col gap-8">
              <div className="flex flex-col lg:flex-row items-center gap-5">
                <div className="bg-white/48 border border-white rounded-xl flex items-center justify-center w-20 h-20 ">
                  <MoleculesIcon />
                </div>
                <p className="text-2xl lg:text-4xl text-center lg:text-start font-bold text-black leading-[130%]">
                  The Importance of Purity
                </p>
              </div>
              <p className="text-xl lg:text-2xl text-gray-800 leading-[150%]">
                Impurities can influence receptor interaction, alter expected
                biological behavior, and introduce variability. A compound’s
                theoretical potential only matters if its molecular form is
                accurate and uncontaminated. SKYE RESEARCH emphasizes purity
                because variability undermines research reliability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
