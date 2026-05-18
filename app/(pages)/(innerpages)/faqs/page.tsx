"use client";
import { InnerFAQ } from "@/app/components";
import NEWFAQ from "@/app/components/cards/FAQAccordion";
import HeroSection from "@/app/components/cards/HeroSection";

import React from "react";

const Page = () => {
  return (
    <>
      <HeroSection
        title="Frequently Asked Questions"
        description="Learn more about how our compounds are manufactured, verified, and handled. This section addresses common questions regarding quality standards, testing procedures, storage, and product transparency."
        onShopNowClick={() => {
          console.log("Shop Now clicked");
        }}
        onExploreScienceClick={() => {
          console.log("Explore Science clicked");
        }}
      />
     <section className="py-8 lg:py-24">
            <div className="container max-w-7xl mx-auto px-4 lg:px-8 flex flex-col items-center gap-6 lg:gap-13.5">
                      <div className="flex flex-col items-center gap-2">
                      <p className="text-3xl lg:text-[54px] font-semibold leading-[120%] tracking-[-2%]  text-neutral-900">Frequently <span className="text-[#009FFF]">Asked Questions?</span></p>
                      <p className="text-xl lg:text-2xl text-gray-800 leading-[150%]">Everything you need to know about our peptides and process.</p>
                      </div>
                      <InnerFAQ/>
            </div>
     </section>
    </>
  );
};

export default Page;
