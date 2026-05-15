"use client";
import { SectionHeroCTA } from "../../components";
import HormonesCard from "@/app/components/HormonesCard";
import NEWFAQ from "@/app/components/FAQ";

const page = () => {
  return (
    <>
      <SectionHeroCTA
        title="Frequent Asked Questions"
        titleSize="lg:text-6xl sm:text-5xl text-4xl"
        description="Get quick answers to your most common questions"
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
      <section className="container max-w-7xl mx-auto  px-4 xl:px-8 pt-8 xl:pt-24 pb-8 xl:pb-16">
        <NEWFAQ />
        {/* <FaqAccordion /> */}
      </section>

      <section className="py-8 xl:py-16">
        <HormonesCard />
      </section>
    </>
  );
};

export default page;
