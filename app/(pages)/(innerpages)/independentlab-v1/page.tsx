"use client";
import CategoryCard from "@/app/components/cards/CategoryCard";
import HeroSection from "@/app/components/cards/HeroSection";
import {
  SingleTickIcon,
} from "@/public/icons";
import React, { useState } from "react";

const Page = () => {
  const phases = [
    {
      id: 1,
      title: "Phase 1 — Peptide Synthesis",
      description:
        "Peptides are produced using solid-phase peptide synthesis, a method that allows sequential amino acid assembly under controlled conditions. Reaction environments are optimized to reduce byproducts and minimize incomplete chain formations. This stage focuses on achieving accurate sequence construction.",
    },
    {
      id: 2,
      title: "Phase 2 — Purification",
      description:
        "Following synthesis, crude peptide material undergoes purification, typically through chromatographic methods. This stage isolates the intended molecular chain from truncated sequences, synthesis residues, and byproducts. Purification is where raw output becomes refined compound.",
    },
    {
      id: 3,
      title: "Phase 3 — Independent Laboratory Verification",
      description:
        "Each production lot is submitted to third-party analytical laboratories. Testing commonly includes:",
      points: [
        "Purity percentage analysis",
        "Molecular identity confirmation",
        "Contaminant detection",
      ],
    },
    {
      id: 4,
      title: "Phase 4 — Packaging & Stability Protection",
      description:
        "Peptides are sensitive to environmental factors such as moisture, light exposure, and temperature variation. Products are packaged using materials and sealing processes designed to reduce these risks and maintain structural integrity during transit and storage.",
    },
    {
      id: 5,
      title: "Phase 5 — Documentation Transparency",
      description:
        "Lot-specific Certificates of Analysis are made accessible so customers can independently verify the testing results associated with their batch. Transparency is built into the process — not added later.",
    },
  ];
  const [activePhase, setActivePhase] = useState(1);
  return (
    <>
      <HeroSection
        title="How the SKYE Research Process Works"
        description="Each compound moves through a disciplined multi-phase system including synthesis, purification, independent laboratory testing, stability protection, and lot-level documentation."
        onShopNowClick={() => {
          console.log("Shop Now clicked");
        }}
        onExploreScienceClick={() => {
          console.log("Explore Science clicked");
        }}
      />
      <section className="py-8 lg:py-24">
        <div className="container max-w-360 mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4.5">
            <div className="flex flex-col gap-2">
              <p className="text-xl lg:text-2xl text-gray-800">How It Works </p>
              <p className="text-3xl lg:text-[64px] font-semibold leading-[120%]  tracking-[-2%] text-black">
                A Controlled System from{" "}
                <span className="text-[#009FFF]">Synthesis to Delivery.</span>
              </p>
            </div>
            <p className="text-xl lg:text-2xl text-neutral-800">
              SKYE RESEARCH operates through a structured quality-control
              framework designed to protect compound integrity at every stage —
              from molecular assembly to final delivery. This system is built
              around precision, documentation, and stability.
            </p>
          </div>

          <div className="flex flex-col">
            {phases.map((phase, index) => {
              const isActive = activePhase === phase.id;

              return (
                <div
                  key={phase.id}
                  className="flex flex-row gap-5 cursor-pointer"
                  onClick={() => setActivePhase(phase.id)}
                >
                  <div className="flex flex-col items-center gap-2 pb-2">
                    <button
                      type="button"
                      className={`py-1.5 px-4 text-xl rounded-full flex items-center justify-center w-10 h-10 border-3 ${
                        isActive
                          ? "text-white bg-primary border-white shadow-[0_0_0_2px_#04306D]"
                          : "text-[#414651] bg-white border-[#E9EAEB]"
                      }`}
                    >
                      {phase.id}
                    </button>

                    {index !== phases.length - 1 && (
                      <div className="border-l-2 border-dotted border-[#AAAAAA] opacity-60 flex-1"></div>
                    )}
                  </div>

                  <div className="pt-1 pb-9 flex flex-col gap-2">
                    <p className="text-xl lg:text-2xl font-semibold text-black">
                      {phase.title}
                    </p>

                    <p className="text-lg lg:text-xl leading-[150%] text-neutral-800">
                      {phase.description}
                    </p>

                    {phase.points && (
                      <div className="flex flex-col gap-2">
                        {phase.points.map((point) => (
                          <div
                            key={point}
                            className="flex flex-row gap-2.5 items-center"
                          >
                            <div className="w-4.5 h-4.5 bg-white rounded-full shadow-[0_0_10.5px_0_rgba(0,0,0,0.12)] items-center flex justify-center ">
                              <SingleTickIcon />
                            </div>
                            <p className="text-lg text-gray-800">{point}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
