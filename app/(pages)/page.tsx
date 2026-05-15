"use client";
import Image from "next/image";
import { ArrowRightIcon } from "@/public/icons";
import { useState } from "react";

import Link from "next/link";
import ProcessCard from "@/app/components/cards/ProcessCard";
import CommunitySwiper from "@/app/components/cards/CommunitySwiper";
import NEWFAQ from "@/app/components/cards/FAQAccordion";
import CharRollText from "../components/Animations/CharRollText";
import TherapyCard from "../components/cards/TherapyCard";
import {
  featureCards,
  processCards,
  products,
  steps,
  TherapyCardId,
  therapyCards,
} from "../constants/constants";
import { images } from "../ui";
import ProductCard from "../components/cards/ProductCard";
import ThemeButton from "../components/Button/ThemeButton";
import WellnessCarousel from "../components/cards/WelnessCarousel";
import DoctorSwiper from "../components/cards/DoctorSlider";
import StepCard from "../components/cards/StepCard";
import FeatureCard from "../components/cards/FeatureCard";

export default function Home() {
  const cardActions: Record<TherapyCardId, () => void> = {
    "lose-weight": () => {
      console.log("Lose Weight clicked");
    },
    "better-sex": () => {
      console.log("Better Sex clicked");
    },
    "sleep-better": () => {
      console.log("Sleep Better clicked");
    },
    "regrow-hair": () => {
      console.log("Regrow Hair clicked");
    },
    "younger-skin": () => {
      console.log("Younger Skin clicked");
    },
    "heal-joints": () => {
      console.log("Heal Joints clicked");
    },
    "sharp-focus": () => {
      console.log("Sharp Focus clicked");
    },
    "live-longer": () => {
      console.log("Live Longer clicked");
    },
  };

  const processCardActions: Record<string, () => void> = {
    "set-your-goal": () => {
      console.log("Set Your Goal clicked");
    },
    "expert-review": () => {
      console.log("Expert Review clicked");
    },
    "the-protocol": () => {
      console.log("The Protocol clicked");
    },
    "direct-to-door": () => {
      console.log("Direct to Door clicked");
    },
  };

  const categories = [
    "Peptide Therapy",
    "Hormones",
    "Longevity",
    "Sleep",
    "Hair Regrowth",
    "Weight Loss",
  ];
  const [selectedCategory, setSelectedCategory] = useState("Peptide Therapy");

  return (
    <>
      <section className="bg-primary pt-44 lg:pt-59 pb-12 lg:pb-24 relative">
        <Image
          src={images.landingpageimages.SkyHealthBgLogoImage}
          alt={"sky health bg logo"}
          className="absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
        />
        <div className="container max-w-360 mx-auto px-4 lg:px-8  flex flex-col gap-8 lg:gap-25">
          <div className="flex flex-col gap-4 lg:gap-7.5">
            <p className="text-4xl xl:text-[90px] font-semibold text-center lg:text-start text-white">
              Your Health.{" "}
              <span className="text-white/40">
                <CharRollText as="span" text="Elevated." auto />
              </span>
            </p>
            <p className="text-xl xl:text-2xl text-center lg:text-start text-white">
              Experience a new standard of personalized care.
              <br />
              From longevity to daily wellness, we bring expert-led treatments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-8">
            {therapyCards.map((card) => (
              <TherapyCard
                key={card.id}
                image={card.image}
                label={card.label}
                onClick={cardActions[card.id]}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-24 flex flex-col gap-12">
        <div className="container max-w-360 mx-auto flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-5">
            <p className="text-4xl text-center px-4 lg:px-0 lg:text-start lg:text-[64px] font-semibold text-black tracking-[-2%]">
              Discover Our Products
            </p>
            <div className="w-full overflow-x-auto px-4 scrollbar-hide lg:overflow-visible">
              <div className="flex w-max flex-row gap-3 lg:w-full lg:justify-center">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`shrink-0 rounded-full px-6.5 py-4 text-lg font-medium  cursor-pointer  ${
                        isSelected
                          ? "bg-[#F3F4F6] border border-[#F3F4F6] text-neutral-900"
                          : "text-neutral-700 border border-[#E3E3E3] bg-white hover:bg-[#F9FAFB] hover:border hover:border-[#F3F4F6]"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="container max-w-390 mx-auto grid grid-cols-1 md:grid-cols-2   px-4 2xl:px-0 2xl:grid-cols-5 gap-x-2 gap-y-4 lg:gap-y-10">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                onBuyClick={() => {
                  console.log(`${product.title} clicked`);
                }}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="pb-24">
        <div className="container max-w-360 mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center px-4 lg:px-0 gap-4">
              <p className=" text-center leading-[120%] font-semibold text-4xl lg:text-[64px] text-black tracking-[-2%]">
                Your Body is a System
                <br />
                <span className="text-[#009FFF]">We Just Optimize It.</span>
              </p>
              <p className="text-lg lg:text-[22px] text-center text-gray-800">
                No waiting rooms. No awkward questions. Just a simple,
                <br /> secure digital intake to understand your unique biology.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5.5">
              <ThemeButton
                variant="blackFilled"
                size="lg"
                onClick={() => {}}
                label="Start Assessment"
                className="w-full"
              />

              <ThemeButton
                variant="outlined"
                size="lg"
                minWidth
                onClick={() => {}}
                label="Join SKYE"
                className="w-full"
              />
            </div>
          </div>
          <div className="px-4 2xl:px-8 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {processCards.map((card) => (
              <ProcessCard
                key={card.id}
                step={card.step}
                title={card.title}
                description={card.description}
                image={card.image}
                imageAlt={card.imageAlt}
                theme={card.theme}
                onClick={processCardActions[card.id]}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-32 bg-[radial-gradient(circle,#08387A_0%,#06224C_100%)]">
        <div className="overflow-x-clip flex flex-col gap-8 lg:gap-24">
          <div className="container max-w-360 mx-auto px-4 lg:px-8 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="text-xl lg:text-2xl text-white/50">
                A Different Standard
              </p>
              <p className="text-4xl lg:text-[64px] font-semibold text-white">
                Pharmacy Quality, Physician Backed
              </p>
            </div>
          </div>
          <WellnessCarousel />
        </div>
      </section>
      <DoctorSwiper />
      <section className="py-8 lg:py-30 relative">
        <Image
          src={images.landingpageimages.SkyeHealthMobile}
          alt={"Mobile App"}
          className="hidden 2xl:block 2xl:absolute bottom-0 right-0"
        />
        <div className="container max-w-360 mx-auto px-4 lg:px-8 flex flex-col gap-6 lg:gap-16">
          <div className="flex flex-col gap-4 ">
            <p className="text-3xl lg:text-[54px] font-semibold text-black">
              Get Started in 3 Simple Steps
            </p>
            <p className="text-gray-800 text-base lg:text-[22px]">
              SKYE HEALTH provides access to therapies commonly
              <br /> evaluated in clinical and performance settings
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-212.5">
            {steps.map((step) => (
              <StepCard
                key={step.id}
                Icon={step.Icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>

          <div>
            <ThemeButton
              onClick={() => {
                "";
              }}
              label={"Get Your Products"}
              variant="primaryFilled"
              size="xl"
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-12 py-37.5 bg-[url('/images/LookBetterImage.png')] bg-cover bg-center bg-no-repeat md:h-210.5 relative ">
        <Image
          src={images.landingpageimages.HeartLogo}
          alt={"heart bg"}
          className="absolute top-30 lg:right-30 right-0  mix-blend-overlay"
        />
        <div className="container max-w-360 mx-auto px-4 lg:px-8 ">
          <div className="max-w-165.25 flex flex-col gap-12 lg:gap-32">
            <div className="flex flex-col gap-2">
              <p className="text-3xl lg:text-[64px] font-semibold text-white leading-[140%] tracking-[-2%]">
                Feel better. Look better. Perform better.
              </p>
              <p className="text-xl lg:text-[28px] text-white">
                Browse. Consult. Ship. ENJOY!
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-5.5">
              <ThemeButton
                onClick={() => {
                  "";
                }}
                size="xxl"
                className="font-semibold!"
                label={"Pick Your Products"}
              />
              <ThemeButton
                onClick={() => {
                  "";
                }}
                size="xxl"
                variant="whiteOutlined"
                className="font-semibold!"
                label={"Join SKYE"}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 lg:pt-24">
        <div className="container max-w-360 mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4 px-4 lg:px-0">
              <p className="text-center text-3xl lg:text-[64px] font-semibold leading-[120%] tracking-[-2%] text-[#009FFF]">
                Clinical Care.
                <br />
                <span className="text-black">Without the Clinic.</span>
              </p>
              <p className="text-base lg:text-[22px] text-gray-800 text-center">
                We’ve stripped away the inefficiencies of traditional
                healthcare—the waiting rooms,
                <br /> the awkward conversations, and the pharmacy lines. What
                remains is a seamless,
                <br /> data-driven system designed to fit into your life, not
                disrupt it.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5.5">
              <ThemeButton
                onClick={() => {
                  "";
                }}
                size="sm"
                variant="blackFilled"
                label={"Start Assessment"}
              />
              <ThemeButton
                onClick={() => {
                  "";
                }}
                size="sm"
                variant="outlined"
                label={"Join SKYE"}
              />
            </div>
          </div>
          <Image src={images.landingpageimages.VideoImage} alt={"Video"} />
        </div>
      </section>
      <section className="pb-12 lg:pb-24">
        <div className="container max-w-341.5 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10 px-4 lg:px-8 2xl:px-0">
          {featureCards.map((feature) => (
            <FeatureCard
              key={feature.id}
              Icon={feature.Icon}
              title={feature.title}
              description={feature.description}
              HoverIcon={feature.HoverIcon}
            />
          ))}
        </div>
      </section>
      <section className="py-12 lg:py-32 bg-[radial-gradient(circle,#08387A_0%,#06224C_100%)] relative overflow-hidden">
        <Image
          src={images.landingpageimages.InvestFutureImage}
          alt={"invest in future"}
          className="absolute z-5 -bottom-10 right-0"
        />
        <div className="container max-w-360 mx-auto flex flex-col gap-12 lg:gap-32 px-4 lg:px-8 relative z-20">
          <div className="flex flex-col gap-3">
            <p className="text-xl lg:text-2xl text-white/70">Get Started</p>
            <div className="flex flex-col gap-2">
              <p className="text-3xl lg:text-[64px] font-semibold  tracking-[-2%] text-white">
                Invest in your
                <br /> future self.
              </p>
              <p className="text-xl lg:text-2xl text-white">
                Sign up today to receive our comprehensive guide to “The
                <br /> Science of Longevity” and get priority access to clinical
                <br /> consultations.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6.25">
            <div className="flex flex-col gap-3">
              <p className="text-xl lg:text-2xl text-white/70">Email*</p>
              <div>
                <input
                  type="text"
                  placeholder="example@email.com"
                  className="lg:py-5 lg:px-7.5 px-4 py-4 placeholder:text-white/40 text-base lg:text-xl hover:border-white/40  border border-white/20 text-white hover:bg-primary-dark bg-primary-dark/70 lg:w-125 rounded-full outline-none "
                />
              </div>
            </div>
            <div>
              <ThemeButton
                onClick={() => {
                  "";
                }}
                variant="blacktexted"
                size="extralarge"
                label={"Unlock Access"}
                className="font-semibold!"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-24">
        <div className="flex flex-col gap-10 ">
          <div className="flex flex-col items-center gap-2 px-4 lg:px-0">
            <p className="text-black text-xl lg:text-2xl">Community Feedback</p>
            <p className="text-3xl lg:text-[54px] text-center lg:text-start font-semibold text-neutral-900">
              Empowering Thousands of Users.
            </p>
          </div>
          <CommunitySwiper />
          <div className="self-center flex flex-col md:flex-row gap-3">
            <ThemeButton
              onClick={() => {
                "";
              }}
              size="xxl"
              variant="outlined"
              label={"Learn More"}
            />
            <ThemeButton
              onClick={() => {
                "";
              }}
              size="xxl"
              variant="outlined"
              label={"Get Started"}
            />
          </div>
        </div>
      </section>
      <section className="pb-12 lg:pb-24">
        <div className="container max-w-7xl mx-auto px-4 lg:px-8 flex flex-col gap-6 lg:gap-13.5">
          <div className="flex flex-col items-center gap-2">
            <p className="text-3xl lg:text-[54px] text-center lg:text-start font-semibold text-neutral-900 tracking-[-2%]">
              Frequently Asked Questions?
            </p>
            <p className="text-gray-800 text-lg lg:text-[22px] text-center">
              Everything you need to know about our peptides and process.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex flex-col gap-4 lg:gap-9">
              {/* <FAQAccordion /> */}
              <NEWFAQ />
              <p className=" text-center text-lg lg:text-xl text-black">
                Still have questions?{" "}
                <Link href={""} className="font-semibold ">
                  Contact our support team
                </Link>
              </p>
            </div>
            <button
              onClick={() => {
                "";
              }}
              className="self-center cursor-pointer group pl-6 py-4 pr-4 rounded-full bg-[#00578C] flex flex-row gap-2.5"
            >
              <span className="text-lg font-semibold text-white">
                View Full FAQs
              </span>
              <span className="h-7.5 w-11.25 bg-white flex items-center justify-center  rounded-full">
                <span className="transition-transform duration-300 ease-out group-hover:-rotate-45">
                  <ArrowRightIcon fill="black" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
