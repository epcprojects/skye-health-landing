"use client";
import { images } from "@/app/ui";
import {
  PerformanceIcon,
  RecoveryCardIcon,
  RegenerativeIcon,
  SmallTickIcon,
  TickIcon,
} from "@/public/icons";
import Image from "next/image";
import React, { useState } from "react";
import { SegmentedControl } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import HeroSection from "@/app/components/cards/HeroSection";
import CategoryCard from "@/app/components/cards/CategoryCard";
import ThemeButton from "@/app/components/Button/ThemeButton";

const Page = () => {
  const [category, setCategory] = useState("all");

  return (
    <>
      <HeroSection
        title="Research-Grade Precision Compounds"
        description="SKYE RESEARCH provides high-purity research peptides manufactured with molecular precision for educated, performance-focused consumers."
        onShopNowClick={() => {
          console.log("Shop Now clicked");
        }}
        onExploreScienceClick={() => {
          console.log("Explore Science clicked");
        }}
      />
      <section className="py-8 lg:py-24 bg-[url('/images/VectorImage.png')] bg-cover bg-no-repeat bg-position-[center_20px]">
        <div className="container max-w-360 mx-auto px-4 lg:px-8 flex flex-col gap-6 lg:gap-18.5">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-12">
            <h2 className="text-3xl lg:text-[64px] font-semibold leading-[120%] tracking-[-2%] text-black ">
              Research-Grade{" "}
              <span className="text-[#4D94FF]">Precision Compounds.</span>
            </h2>
            <p className="text-xl lg:text-[28px] text-gray-800 leading-[150%]">
              SKYE RESEARCH provides high-purity research peptides manufactured
              with molecular precision for educated, performance-focused
              consumers.{" "}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-16">
            <div className="flex flex-col gap-6.5">
              <p className="text-lg lg:text-2xl text-gray-800">
                Our catalog reflects a disciplined approach to compound
                selection — centered on structural integrity, scientific
                relevance, and consistency of production.
              </p>
              <div className="flex flex-col gap-6">
                <div className="flex flex-row  gap-4.5">
                  {/* <div className="shrink-0">
                    <TickIcon />
                  </div> */}
                  <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                    <SmallTickIcon fill="#05A4E5" />
                  </div>
                  <p className="text-base lg:text-2xl text-gray-800">
                    This is not a trend-driven catalog.
                  </p>
                </div>
                <div className="flex flex-row  gap-4.5">
                  <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                    <SmallTickIcon fill="#05A4E5" />
                  </div>
                  <p className="text-base lg:text-2xl text-gray-800">
                    This is not a supplement-style storefront.
                  </p>
                </div>
                <div className="flex flex-row  gap-4.5">
                  <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                    <SmallTickIcon fill="#05A4E5" />
                  </div>
                  <p className="text-base lg:text-2xl text-gray-800">
                    This is a focused collection of peptides selected for their
                    presence in biological research, their role in signaling
                    pathways, and their relevance to recovery, structural
                    resilience, and cellular communication.
                  </p>
                </div>
              </div>
              <p className="text-lg lg:text-2xl text-gray-800">
                Every compound we offer is evaluated through a structured
                internal framework designed to ensure that what reaches the
                customer is repeatable, verifiable, and manufactured with
                intent.
              </p>
            </div>
            <Image
              src={images.innerImages.ReesearchGradeImage}
              alt={"Girl Sitting"}
              className="rounded-[40px]"
            />
          </div>
        </div>
      </section>
      <section className="bg-[#F8F8F8] py-8 lg:py-24">
        <div className="container max-w-360 mx-auto px-4 lg:px-8 flex flex-col gap-6 lg:gap-16 ">
          <div className="flex flex-col gap-11">
            <div className="flex flex-col gap-3 lg:gap-7.5 items-center">
              <h2 className="text-3xl lg:text-[64px] font-semibold leading-[120%] text-black tracking-[-2%]">
                Compound Performance Categories
              </h2>
              <p className="text-xl lg:text-[28px] text-gray-800 leading-[150%]">
                This isn’t wellness. This is medicine—elevated.
              </p>
            </div>
            <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex min-w-max justify-start lg:justify-center px-1">
                <SegmentedControl.Root
                  value={category}
                  onValueChange={setCategory}
                  size="3"
                  className="min-w-max"
                >
                  <SegmentedControl.Item value="all">All</SegmentedControl.Item>

                  <SegmentedControl.Item value="recovery">
                    Recovery & Structural Support
                  </SegmentedControl.Item>

                  <SegmentedControl.Item value="regenerative">
                    Regenerative Signaling
                  </SegmentedControl.Item>

                  <SegmentedControl.Item value="performance">
                    Performance & Adaptive Signaling
                  </SegmentedControl.Item>
                </SegmentedControl.Root>
              </div>
            </div>
            {/* <div className="flex justify-center">
              <SegmentedControl.Root
                value={category}
                onValueChange={setCategory}
                size={"3"}
              >
                <SegmentedControl.Item value="all">All</SegmentedControl.Item>
                <SegmentedControl.Item value="recovery">
                  Recovery & Structural Support
                </SegmentedControl.Item>

                <SegmentedControl.Item value="regenerative">
                  Regenerative Signaling
                </SegmentedControl.Item>

                <SegmentedControl.Item value="performance">
                  Performance & Adaptive Signaling
                </SegmentedControl.Item>
              </SegmentedControl.Root>
            </div> */}
          </div>
          {category === "all" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 items-stretch  gap-4 lg:gap-8">
              <CategoryCard
                icon={<RecoveryCardIcon />}
                title="Recovery & Structural Support"
                description="Peptides studied in research for their association with tissue repair pathways, connective structure resilience, inflammatory signaling balance, and systemic recovery responses following physical stress."
              />

              <CategoryCard
                icon={<RegenerativeIcon />}
                title="Regenerative Signaling"
                description="Compounds researched in connection with collagen production, extracellular matrix communication, antioxidant response systems, and tissue remodeling pathways."
              />

              <CategoryCard
                icon={<PerformanceIcon />}
                title="Performance & Adaptive Signaling"
                description="Compounds researched in connection with collagen production, extracellular matrix communication, antioxidant response systems, and tissue remodeling pathways."
              />
            </div>
          )}
        </div>
      </section>
      <section className="py-8 lg:py-24">
        <div className="container max-w-360 mx-auto flex flex-col gap-6 lg:gap-16 px-4 lg:px-0">
          <div className="flex flex-col items-center gap-4 lg:gap-8">
            <h2 className="text-3xl lg:text-[74px] font-semibold leading-[120%] text-black tracking-[-2%]">
              <span className="text-[#009FFF]">Our Formulation</span>{" "}
              Philosophy.
            </h2>
            <p className="text-gray-800 text-xl lg:text-[28px] leading-[150%] text-start lg:text-center">
              Our compounds are selected and manufactured through a disciplined
              framework that prioritizes structural integrity, scientific
              relevance, and consistent production standards.
            </p>
          </div>
          <div className="lg:px-8 flex flex-col gap-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className=" bg-linear-to-r from-[#DFD1C5] to-[#FFF6EB] rounded-[30px] pt-4 px-4  lg:px-12.5 lg:pt-12.5 flex flex-col justify-between  overflow-hidden">
                <div className="flex flex-col gap-5">
                       <div className="flex flex-col text-black gap-3">
                  <p className="text-2xl lg:text-4xl font-semibold leading-[140%]">
                    Structural Reliability Comes First
                  </p>
                  <p className="text-lg lg:text-[22px] text-gray-800 line-clamp-2 text-ellipsis">
                    Peptides are only useful when their molecular chain is
                    accurate and stable. We prioritize synthesis partners and
                    methods that emphasize chain fidelity, sequence accuracy,
                    and minimized degradation. Stability from production through
                    storage is a non-negotiable criterion.
                  </p>
                </div>
                <div>
                  <ThemeButton
                    onClick={() => {
                      "";
                    }}
                    label={"Learn More"}
                    size="ultrasmall"
                  />
                </div>
                </div>
               
                <Image
                  src={images.innerImages.ReliabilityCardImage}
                  alt={"Reliability"}
                />
              </div>
              <div className="bg-lightblue  rounded-[30px] flex flex-col items-end overflow-hidden">
                <div className="flex flex-col gap-5 px-4 lg:px-12.5 pt-4 lg:pt-12.5">
                  <div className="flex flex-col text-black gap-3 ">
                    <p className="text-2xl lg:text-4xl font-semibold leading-[140%]">
                      Manufacturing Repeatability
                    </p>
                    <p className="text-lg lg:text-[22px] text-gray-800 line-clamp-2 text-ellipsis">
                      A peptide must be capable of being produced consistently
                      across batches. If purity levels or stability profiles
                      fluctuate beyond acceptable parameters, the compound does
                      not meet SKYE RESEARCH standards.
                    </p>
                  </div>
                  <div>
                    <ThemeButton
                      onClick={() => {
                        "";
                      }}
                      label={"Learn More"}
                      size="ultrasmall"
                    />
                  </div>
                </div>
                <Image
                  src={images.innerImages.ManufacturingCardImage}
                  alt={"Reliability"}
                />
              </div>
            </div>
            <div className=" pt-4 lg:pt-12.5 px-4 lg:px-16 bg-linear-to-b from-[#F5F7FA] to-[#C3CFE2] rounded-[30px] grid grid-cols-1 lg:grid-cols-12 items-center gap-6 relative overflow-hidden">
              <div className="flex flex-col gap-5 lg:col-span-7 pb-4">
                <div className="flex flex-col gap-3">
                  <p className="text-2xl lg:text-4xl font-semibold text-black">
                    Scientific Relevance Over Popularity
                  </p>
                  <p className="text-lg lg:text-[22px] text-gray-800 line-clamp-2 text-ellipsis">
                    We focus on compounds that have meaningful presence in
                    research literature and are associated with established
                    biological signaling pathways. We do not add products simply
                    because demand spikes — our catalog evolves deliberately.
                  </p>
                </div>
                <div>
                  <ThemeButton
                    onClick={() => {
                      "";
                    }}
                    variant="blackFilled"
                    label={"Learn More"}
                    size="ultrasmall"
                  />
                </div>
              </div>
              <div className="lg:col-span-5 relative">
                <Image
                  src={images.innerImages.SkyHealthOverlayImage}
                  alt={"overlay"}
                  className="absolute bottom-0 right-0"
                />
                <Image
                  src={images.innerImages.RelevanceCardImage}
                  alt={"relevance"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 lg:py-24">
        <div className="container max-w-360 mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-4 lg:gap-12">
            <div className="flex flex-col gap-6">
              <p className="text-3xl lg:text-[64px] font-semibold leading-[120%]  tracking-[-2%] text-black">
                Our Quality Control System.
              </p>
              <Image
                src={images.innerImages.QualityControlImage}
                alt={"quality control"}
              />
            </div>
            <div className="flex flex-col gap-7.5">
              <div className="flex flex-col gap-6.25">
                <div className="flex flex-row gap-4.5">
                   <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                    <SmallTickIcon fill="#05A4E5" />
                  </div>
                  <p className="text-lg lg:text-2xl text-gray-800">
                    High-performance liquid chromatography purification
                  </p>
                </div>
                <div className="flex flex-row gap-4.5">
                   <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                    <SmallTickIcon fill="#05A4E5" />
                  </div>
                  <p className="text-lg lg:text-2xl text-gray-800">
                    Mass spectrometry identity confirmation
                  </p>
                </div>
                <div className="flex flex-row gap-4.5">
                  <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                    <SmallTickIcon fill="#05A4E5" />
                  </div>
                  <p className="text-lg lg:text-2xl text-gray-800">
                    Stability and degradation monitoring
                  </p>
                </div>
                <div className="flex flex-row gap-4.5">
                   <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                    <SmallTickIcon fill="#05A4E5" />
                  </div>
                  <p className="text-lg lg:text-2xl text-gray-800">
                    Contaminant screening protocols
                  </p>
                </div>
                <div className="flex flex-row gap-4.5">
                   <div className="w-6.5 h-6.5 shrink-0 bg-white shadow-[0_0_15.27px_0_rgba(0,0,0,0.12)] flex items-center justify-center rounded-full">
                    <SmallTickIcon fill="#05A4E5" />
                  </div>
                  <p className="text-lg lg:text-2xl text-gray-800">
                    Lot-level traceability
                  </p>
                </div>
              </div>
              <p className="text-gray-800 text-xl lg:text-2xl">
                Every layer of quality control exists for one reason: molecular
                consistency. Consistency is what allows informed users to build
                reliable protocols and predictable outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
