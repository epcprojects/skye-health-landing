"use client";
import CategoryCard from "@/app/components/cards/CategoryCard";
import HeroSection from "@/app/components/cards/HeroSection";
import React from "react";

const Page = () => {
  return (
    <>
      <HeroSection
        title="Independent Lab Verification"
        description="Each production batch is tested by third-party laboratories to validate molecular identity, purity levels, and analytical consistency."
        onShopNowClick={() => {
          console.log("Shop Now clicked");
        }}
        onExploreScienceClick={() => {
          console.log("Explore Science clicked");
        }}
      />
      <section className="py-24">
        <div className="container max-w-360 mx-auto px-8 flex flex-col gap-16">
          <div className="flex flex-col gap-2 items-center">
            <p className="text-2xl text-gray-800 leading-[150%]">
              Lab Testing & COA
            </p>
            <p className="text-[64px] font-semibold leading-[120%] tracking-[-2%]  text-black ">
              Verification Through{" "}
              <span className="text-[#009FFF]">Independent Analysis.</span>
            </p>
            <p className="text-[28px] text-gray-800 text-center">
              Each SKYE RESEARCH batch undergoes third-party testing to confirm
              purity, identity, and stability. Testing is not a marketing
              feature — it is a foundational quality requirement.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <CategoryCard
              icon={undefined}
              title={"Testing Overview"}
              description={
                "Analytical processes may include chromatographic separation, molecular mass confirmation, and contaminant screening. These tests verify that the compound matches its intended sequence and meets purity thresholds."
              }
            />
            <CategoryCard
              icon={undefined}
              title={"Why Independent Labs Matter"}
              description={
                "Third-party verification reduces bias and ensures objective analysis. It allows customers to confirm data independently rather than relying on brand claims."
              }
            />
            <CategoryCard
              icon={undefined}
              title={"Documentation Access"}
              description={
                "Certificates of Analysis are available by lot number, giving full transparency into the analytical results associated with each production batch."
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
