"use client";
import {
  MarqueeCard,
  PeptideFeatureSection,
  SectionHeroCTA,
  TreatmentFeatureSection,
} from "@/app/components";
import { Images } from "@/app/images";
import { ArrowIcon, CheckCircleIcon } from "@/public/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <>
      {/* <SectionHeroCTA
        title="Our Treatments"
        titleSize="xl:text-6xl sm:text-5xl text-4xl "
        description="Targeted. Personalized. Clinically Guided."
        primaryButton={{
          label: "Start Your Assessment",
          onClick: () => router.push("/products"),
        }}
        secondaryButton={{
          label: "Get Started",
          withArrow: true,
          onClick: () => router.push("/products"),
        }}
      /> */}
      <section id="page-hero">
        <div
          className={`bg-[url('/images/otMockup.png')] bg-cover bg-no-repeat lg:pt-28 pt-24 flex items-center justify-center bg-top  xl:px-8 min-h-[85dvh] h-full space-y-2 md:space-y-10 py-6 md:py-24`}
        >
          <div className="container px-4 md:px-8 relative mx-auto max-w-7xl">
            <div className="  grid grid-cols-1  md:grid-cols-3 gap-8 ">
              <div className="space-y-5 md:col-span-2  md:space-y-12">
                <div className="space-y-3">
                  <h2 className="text-white capitalize font-extrabold md:leading-20 text-3xl md:text-7xl">
                    Our Treatments
                  </h2>

                  <p className="text-neutral-200 text-xl md:leading-9 md:text-2xl">
                    Targeted. <br /> Personalized. <br /> Clinically Guided.
                  </p>
                </div>
                <div className="flex items-center gap-3 lg:pe-20">
                 <div className="flex flex-col lg:flex-row gap-2 lg:gap-5.5">
            <Link
             href={"/products"}
              className="py-3 justify-center cursor-pointer px-4 lg:px-6 flex flex-row gap-2.5 rounded-lg text-base text-neutral-900 font-semibold  bg-white"
            >
              Explore Treatments
            </Link>
            <Link
             href={"/products"}
              className="py-3 px-4 lg:px-6 cursor-pointer  justify-center flex flex-row gap-2.5 rounded-lg text-base text-white font-semibold  bg-black/17 border border-white/50 backdrop-blur-[20px]"
            >
              Start Your Assessment
            </Link>
          </div>
                </div>
              </div>
              <div className="rounded-3xl hidden col-span-1 bg-black/40 backdrop-blur space-y-3 md:space-y-6 p-4 md:p-8">
                <h2 className="text-lg md:text-2xl font-semibold text-neutral-100">
                  Paramount HealthRx focuses on:
                </h2>
                <div className="space-y-3">
                  <div>
                    <ul className="space-y-3.5">
                      {["Cleaner", "Smarter", "More intentional"].map(
                        (b, i) => (
                          <li
                            key={i}
                            className="flex gap-2 items-center text-neutral-200 md:text-xl text-lg"
                          >
                            <CheckCircleIcon /> {b}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <p className="text-sm md:text-lg text-neutral-200 font-normal">
                    Built for people who understand that optimization starts
                    with the basics — done properly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 space-y-8 sm:space-y-16 container max-w-7xl mx-auto px-4 xl:px-8">
        <div className="space-y-4">
          <h3 className="text-gray-700 text-center text-lg lg:text-xl font-normal">
            Comprehensive health optimization across multiple pathways
          </h3>

          <h4 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-center text-neutral-900">
            Optimizing the systems <br /> that matter most.
          </h4>
        </div>

        <div className="space-y-10">
          <TreatmentFeatureSection
            imageSrc={Images.landingPage.HarmoneOptimize2}
            title="Hormone Optimization"
            paragraphs={[
              "Hormones control nearly everything—energy, mood, metabolism, muscle, libido, and cognition.",
            ]}
            bulletIntroText="Paramount HealthRx provides:"
            bullets={[
              { label: "Testosterone Optimization (TRT)" },
              { label: "Estrogen & Progesterone Support" },
              { label: "Thyroid Optimization" },
              { label: "Hormone Balancing Protocols" },
            ]}
            footerText="All treatments require medical evaluation and lab testing."
            buttonLabel="Check Availability"
            onButtonClick={() => router.push("/products")}
            containerBgClass="bg-linear-to-b from-powder-blue to-white"
            bulletIconBgClass="bg-radial from-white from-40% to-pacific-blue"
            bulletIconTextClass="text-pacific-blue"
            buttonBgClass="bg-pacific-blue"
            buttonIconBgClass="bg-white"
            buttonIconTextClass="text-pacific-blue"
          />

          <PeptideFeatureSection
            imageSrc={Images.landingPage.PeptideTherapy}
            marqueeSlot={<MarqueeCard />}
            title="Peptide Therapy"
            description="Peptides are signaling molecules that tell your body what to do—and when to do it. We offer physician-prescribed peptides for:"
            bullets={[
              { label: "Fat loss & metabolic optimization" },
              { label: "Injury recovery & tissue repair" },
              { label: "Sleep & recovery" },
              { label: "Cognitive enhancement" },
              { label: "Longevity & cellular health" },
            ]}
            buttonLabel="Start Peptide Assessment"
            onButtonClick={() => router.push("/products")}
            containerBgClass="bg-linear-to-b from-french-pass to-white"
            bulletIconBgClass="bg-radial from-white from-40% to-periwinkle-blue"
            bulletIconTextClass="text-periwinkle-blue"
            buttonBgClass="bg-periwinkle-blue"
            buttonIconBgClass="bg-white"
            buttonIconTextClass="text-periwinkle-blue"
          />

          <TreatmentFeatureSection
            imageSrc={Images.landingPage.Vitamins2}
            title="Vitamins & Micronutrients"
            paragraphs={[
              "Most deficiencies go undiagnosed. Most supplements are underdosed.We deliver pharmaceutical-grade vitamins, prescribed based on labs—not trends.",
            ]}
            bullets={[
              { label: "Injectable & oral options" },
              { label: "High-bioavailability compounds" },
              { label: "Clinically appropriate dosing" },
            ]}
            buttonLabel="Check Vitamin Programs"
            onButtonClick={() => router.push("/products")}
            containerBgClass="bg-linear-to-b from-linen to-white"
            bulletIconBgClass="bg-radial from-white from-40% to-light-taupe"
            bulletIconTextClass="text-light-taupe"
            buttonBgClass="bg-light-taupe"
            buttonIconBgClass="bg-white"
            buttonIconTextClass="text-light-taupe"
          />

          <TreatmentFeatureSection
            imageSrc={Images.landingPage.energy}
            title="Energy, Focus & Cognitive Performance"
            paragraphs={[
              "Mental clarity and sustained energy are foundational to daily performance. Paramount HealthRx provides physician-guided therapies designed to support brain health, focus, and fatigue resistance—without stimulants or guesswork.",
            ]}
            bullets={[
              { label: "Cognitive optimization protocol" },
              { label: "Focus & attention support" },
              { label: "Mental fatigue & burnout recovery" },
              { label: "Mood & motivation balance" },
              { label: "Brain-health supportive compounds" },
            ]}
            buttonLabel="Check Cognitive Programs"
            onButtonClick={() => router.push("/products")}
            containerBgClass="bg-linear-to-b from-soft-peach to-white"
            bulletIconBgClass="bg-radial from-white from-40% to-sunset-orange"
            bulletIconTextClass="text-sunset-orange"
            buttonBgClass="bg-sunset-orange"
            buttonIconBgClass="bg-white"
            buttonIconTextClass="text-sunset-orange"
            direction="right"
          />

          <TreatmentFeatureSection
            imageSrc={Images.landingPage.metabolic}
            title="Metabolic Health"
            paragraphs={[
              "Metabolic efficiency impacts weight regulation, energy levels, insulin response, and long-term disease risk. Our approach focuses on restoring metabolic balance—not short-term fixes.",
            ]}
            bullets={[
              { label: "Weight management & fat-loss support" },
              { label: "Insulin sensitivity optimization" },
              { label: "Metabolic hormone evaluation" },
              { label: "Appetite & energy regulation protocols" },
              { label: "Cardiometabolic health support" },
            ]}
            buttonLabel="Check Metabolic Programs"
            onButtonClick={() => router.push("/products")}
            containerBgClass="bg-linear-to-b from-mint to-white"
            bulletIconBgClass="bg-radial from-white from-40% to-jungle-green"
            bulletIconTextClass="text-jungle-green"
            buttonBgClass="bg-jungle-green"
            buttonIconBgClass="bg-white"
            buttonIconTextClass="text-jungle-green"
          />

          <TreatmentFeatureSection
            imageSrc={Images.landingPage.recovery}
            title="Recovery & Anti-Aging"
            paragraphs={[
              "Recovery is where progress happens. Paramount HealthRx delivers science-backed therapies to support tissue repair, inflammation control, and cellular longevity—helping you recover faster and age better.",
            ]}
            bullets={[
              { label: "Cellular repair & longevity support" },
              { label: "Inflammation & oxidative stress reduction" },
              { label: "Muscle recovery optimization" },
              { label: "Sleep-quality enhancement" },
              { label: "Healthy aging & resilience protocols" },
            ]}
            buttonLabel="Explore Recovery Programs"
            onButtonClick={() => router.push("/products")}
            containerBgClass="bg-linear-to-b from-pearl to-white"
            bulletIconBgClass="bg-radial from-white from-40% to-dusty-purple"
            bulletIconTextClass="text-dusty-purple"
            buttonBgClass="bg-dusty-purple"
            buttonIconBgClass="bg-white"
            buttonIconTextClass="text-dusty-purple"
            direction="right"
          />
        </div>
      </section>
    </>
  );
};

export default Page;
