"use client";
import { HeroSection } from "@/app/components";
import { TickIcon } from "@/public/icons";
import React from "react";
import Image from "next/image";
import { images } from "@/app/ui";

const Page = () => {
  return (
    <>
      <HeroSection
        title={"Peptide Education Hub"}
        description={
          "Explore the biological role of peptides, how they function as signaling molecules within the body, and the research pathways that influence recovery, adaptation, and structural resilience."
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
          <div className="flex flex-col gap-2">
            <p className="text-2xl leading-[150%] text-gray-800">
              Peptide Education Hub
            </p>
            <p className="text-[64px] font-semibold leading-[120%] tracking-[-2%] text-black">
              The Biology{" "}
              <span className="text-[#009FFF]">Behind Peptides.</span>
            </p>
            <p className="text-[28px] text-gray-800">
              Peptides are short chains of amino acids that act as signaling
              messengers within biological systems. They play roles in
              communication between cells, helping regulate adaptive and repair
              processes. Their function is not brute force stimulation — it is
              targeted signaling.
            </p>
          </div>
          <div className="flex flex-col gap-14">
            <div className="grid grid-cols-2 items-center gap-16">
              <div className="flex flex-col gap-9">
                <p className="text-4xl font-bold text-black">
                  Core Research Pathways:
                </p>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row gap-4.5">
                    <div className="shrink-0">
                      <TickIcon />
                    </div>
                    <p className="text-2xl text-gray-800 leading-[135%]">
                      <b>Tissue Recovery Signaling:</b> Research explores
                      peptide involvement in pathways related to structural
                      repair and recovery following stress.
                    </p>
                  </div>
                  <div className="flex flex-row gap-4.5">
                    <div className="shrink-0">
                      <TickIcon />
                    </div>
                    <p className="text-2xl text-gray-800 leading-[135%]">
                      <b>Cellular Adaptation:</b> Peptides have been studied in
                      relation to stress response communication and adaptive
                      signaling mechanisms.
                    </p>
                  </div>
                  <div className="flex flex-row gap-4.5">
                    <div className="shrink-0">
                      <TickIcon />
                    </div>
                    <p className="text-2xl text-gray-800 leading-[135%]">
                      <b>Collagen & Structural Protein Signaling:</b> Some
                      peptides are associated with communication pathways
                      involved in extracellular matrix and collagen production.
                    </p>
                  </div>
                  <div className="flex flex-row gap-4.5">
                    <div className="shrink-0">
                      <TickIcon />
                    </div>
                    <p className="text-2xl text-gray-800 leading-[135%]">
                      <b>Inflammatory Response Balance:</b> Research includes
                      examination of peptide roles in regulating inflammatory
                      signaling processes.
                    </p>
                  </div>
                </div>
              </div>
              <Image src={images.innerImages.PeptideImage} alt={"Peptide"} />
            </div>
            <div className="bg-linear-to-r from-[#EFEFEF] to-[#E3E3E3] rounded-[30px]  py-7.5 px-12">
              <div className="grid grid-cols-8 items-center gap-4.5">
                <p className="text-4xl font-bold text-black col-span-3">
                  Why This Matters to Performance
                </p>
                <p className="text-2xl text-gray-800 col-span-5">
                  Adaptation drives progress. Signaling molecules influence how
                  effectively the body responds to training stress, structural
                  strain, and time. Understanding these pathways helps
                  performance-focused individuals approach recovery and
                  resilience strategically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
