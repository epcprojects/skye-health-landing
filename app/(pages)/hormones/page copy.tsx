"use client";
import { SectionHeroCTA } from "@/app/components";
import NEWFAQ from "@/app/components/FAQ";
import { Images } from "@/app/images";
import Image from "next/image";

const page = () => {
  return (
    <>
      <SectionHeroCTA
        title="Hormone Optimization"
        titleSize="xl:text-6xl sm:text-5xl text-4xl"
        description="Restore Balance. Reclaim Performance.
Hormonal decline doesn’t just affect energy—it affects everything."
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

      <section className="container mx-auto max-w-7xl px-4 xl:px-8 pt-12 xl:pt-24 pb-8 xl:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="rounded-4xl bg-mercury overflow-hidden  sm:pb-0 pb-0">
            <div className="space-y-3 p-4 lg:p-5 sm:p-10">
              <h2 className="text-neutral-900 text-base lg:text-lg text-center">
                This is medicine, not supplementation.
              </h2>

              <h3 className=" text-4xl  xl:text-5xl font-extrabold text-neutral-900 text-center">
                Hormonal decline doesn’t just affect energy it affects
                everything.
              </h3>
            </div>

            <Image
              alt=""
              className="lg:-mt-24"
              src={Images.landingPage.harmoneMobile}
            />
          </div>

          <div className="bg-[url('/images/HarmoneOptimize3.png')] min-h-120 sm:min-h-180 lg:min-h-0 p-4 sm:p-7.5 rounded-4xl flex items-end justify-end bg-no-repeat bg-cover bg-center">
            <div className=" w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5  xl:p-5 bg-white/75 flex  backdrop-blur items-center gap-2 lg:gap-4 rounded-3xl">
                <Image
                  alt=""
                  src={Images.landingPage.charLine}
                  className="drop-shadow lg:w-10.5 lg:h-10.5 w-9 h-9"
                />
                <span className="text-black text-base lg:text-lg">
                  Testosterone Optimization
                </span>
              </div>
              <div className="p-3.5 xl:p-5 bg-white/75  backdrop-blur flex items-center gap-2 lg:gap-4 rounded-3xl">
                <Image
                  alt=""
                  src={Images.landingPage.balance}
                  className="drop-shadow lg:w-10.5 lg:h-10.5 w-9 h-9"
                />
                <span className="text-black text-base lg:text-lg">
                  Female Hormone Balance
                </span>
              </div>
              <div className="p-3.5 xl:p-5 bg-white/75 flex  backdrop-blur items-center gap-2 lg:gap-4 rounded-3xl">
                <Image
                  alt=""
                  src={Images.landingPage.support}
                  className="drop-shadow lg:w-10.5 lg:h-10.5 w-9 h-9"
                />
                <span className="text-black text-base lg:text-lg">
                  Thyroid Support
                </span>
              </div>

              <div className="p-3.5 xl:p-5 bg-white/75 backdrop-blur flex items-center gap-2 lg:gap-4 rounded-3xl">
                <Image
                  alt=""
                  src={Images.landingPage.monitor}
                  className="drop-shadow lg:w-10.5 lg:h-10.5 w-9 h-9"
                />
                <span className="text-black text-base lg:text-lg">
                  Monitoring & adjustments
                </span>
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
          <NEWFAQ />
          {/* <FaqAccordion /> */}
        </div>
      </section>
    </>
  );
};

export default page;
