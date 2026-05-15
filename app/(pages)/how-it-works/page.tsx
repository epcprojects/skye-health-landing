"use client";
import { StepContentSection } from "@/app/components/StepContentSection";
import { Images } from "@/app/images";
import {
  ArrowIcon,
  CheckCircleBlackIcon,
  CheckCircleIcon,
  WhiteArrow,
} from "@/public/icons";
import Image from "next/image";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SliderIndicator from "@/app/components/SliderIndicator";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import Link from "next/link";

const Page = () => {
  const swiperRef4 = useRef<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const isMobile = useIsMobile();
  return (
    <>
      <section className="bg-linear-[245deg] hidden  overflow-hidden from-[#86B7EF] pt-24 lg:pt-28 to-[#DCF0F7]  relative">
        <div className="noise absolute! inset-0 w-full" />
        <div className="container items-end lg:items-center  gap-6 lg:gap-10 mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-7xl px-4 xl:px-8 relative">
          <div className="space-y-2 lg:space-y-6 py-2">
            <div className="space-y-2 lg:space-y-4 flex flex-col lg:flex-none items-center lg:items-start">
              <div className="rounded-[10px]   border border-border-primary p-1 bg-white w-fit space-x-2">
                <span className="text-text-secondary-700  relative text-sm font-bold  bg-white px-2 py-0.5">
                  <div className="absolute left-3 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex h-3.5 w-3.5 animate-pulse items-center justify-center rounded-full bg-sky-300/35">
                      <div className="h-2 w-2 rounded-full animate-none bg-sky-500"></div>
                    </div>
                  </div>
                  {/* New */}
                </span>

                <span className="text-text-secondary-700 font-medium text-sm pe-3">
                  How it works
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-neutral-900 text-4xl  lg:text-start text-center xl:text-[54px] leading-none tracking-tighter font-extrabold">
                  Modern optimization. Built to be simple.
                </h1>
              </div>
            </div>

            <p className="text-gray-800  lg:text-start text-center text-lg xl:text-xl font-normal">
              Paramount HealthRx was designed to remove the friction from
              traditional healthcare and bring performance-grade optimization
              into a clean, modern experience.
            </p>

            <div>
              <p className="text-gray-800  lg:text-start text-center text-sm md:text-base font-normal">
                No waiting rooms - No outdated processes - No unnecessary
                complexity.
              </p>
              <p className="text-gray-800  lg:text-start text-center text-sm md:text-base font-normal">
                Just a streamlined path from curiosity to control — built for
                people who value clarity, privacy, and execution.
              </p>
            </div>
            <h2 className="text-base font-semibold text-gray-800">
              Here’s exactly how it works.
            </h2>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={"/products"}
                className="rounded-full w-full lg:w-auto lg:text-start text-center hover:bg-secondary-dark cursor-pointer text-base font-semibold lg:py-3.5 lg:px-6  p-2.5 text-white bg-secondary"
              >
                Start Your Assessment
              </Link>
              <Link
                href={"/products"}
                className="rounded-full  w-full lg:w-auto lg:text-start text-center   p-2.5 lg:p-3 lg:ps-6 bg-white text-neutral-900 font-semibold text-base group flex justify-center lg:justify-start items-center gap-2.5 cursor-pointer"
              >
                Explore Treatments
                <span className="flex items-center justify-center shrink-0 transition-all duration-500 bg-secondary w-6 h-6 xl:w-7.5 xl:h-7.5 rounded-full  -rotate-45 group-hover:rotate-0">
                  <ArrowIcon fill="white" />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative ">
            <Image
              alt=""
              src={Images.landingPage.howItWorksMockup}
              className="z-20 relative"
            />
            <Image
              alt=""
              src={Images.landingPage.heroBg}
              className="absolute bottom-0 right-0 z-10 animate-spin-dead-slow opacity-40"
            />
          </div>
        </div>
      </section>

      <section id="page-hero">
        <div
          className={`bg-[url('/images/hitMockup.png')] bg-cover bg-no-repeat lg:pt-28 pt-24 flex items-center justify-center bg-top  xl:px-8 min-h-[85dvh] h-full space-y-2 md:space-y-10 py-6 md:py-24`}
        >
          <div className="container px-4 md:px-8 relative mx-auto max-w-7xl">
            <div className="  grid grid-cols-1  md:grid-cols-3 gap-8 ">
              <div className="space-y-5 md:col-span-2  md:space-y-12">
                <div className="space-y-3">
                  <h2 className="text-white capitalize font-extrabold md:leading-20 text-3xl md:text-7xl">
                    Modern optimization. <br /> Built to be simple.
                  </h2>

                  <p className="text-neutral-200 text-xl md:leading-9 md:text-2xl">
                    Paramount HealthRx was designed to remove the friction from
                    traditional healthcare and bring performance-grade
                    optimization into a clean, modern experience.
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

      <section className="relative py-12 md:py-24 w-full h-full">
        <div className="container mx-auto max-w-7xl  px-4 xl:px-8">
          <Image
            alt=""
            src={Images.landingPage.howItWorksVector}
            className="absolute right-0 w-full z-10 top-0"
          />
          <div className="space-y-12 md:space-y-24 flex flex-col">
            <StepContentSection
              stepLabel="STEP 1"
              title="Create Your Account."
              rightTitle="Fast. Secure. Straightforward."
              content={[
                {
                  type: "paragraph",
                  text: "Start by creating your Paramount HealthRx account. The process is simple and designed to take minutes — not days.",
                },
                {
                  type: "paragraph",
                  text: "You’ll enter basic information and begin a guided onboarding flow that introduces you to the platform and sets the foundation for your experience.",
                },

                {
                  type: "paragraph",
                  text: "We keep everything clean, secure, and intuitive from the first click.",
                },
              ]}
            />
            <StepContentSection
              stepLabel="STEP 2"
              title="Complete Your Health Intake."
              rightTitle="Context creates precision."
              content={[
                {
                  type: "paragraph",
                  text: "Next, you’ll complete a short health intake so we can understand your baseline and goals.",
                },
                {
                  type: "paragraph",
                  text: "This includes information like:",
                },
                {
                  type: "list",
                  items: [
                    "General health background",
                    "Lifestyle inputs",
                    "Optimization priorities",
                    "Relevant medical history",
                  ],
                },
                {
                  type: "paragraph",
                  text: "This step allows us to personalize your experience and ensure any recommendations are thoughtful and appropriate.",
                },
                {
                  type: "paragraph",
                  text: (
                    <>
                      No guesswork. <br />
                      No one-size-fits-all protocols.
                    </>
                  ),
                },
              ]}
            />

            <StepContentSection
              stepLabel="STEP 3"
              title="Provider Review"
              rightTitle="Real clinicians. Real oversight."
              content={[
                {
                  type: "paragraph",
                  text: "If appropriate, your information is reviewed by a licensed medical provider experienced in modern optimization care.",
                },
                {
                  type: "paragraph",
                  text: "This ensures every recommendation is:",
                },
                {
                  type: "list",
                  items: [
                    "Responsible",
                    "Personalized",
                    "Medically grounded",
                    "Patient-focused",
                  ],
                },
                {
                  type: "paragraph",
                  text: "We believe optimization should feel modern — but still rooted in real clinical oversight.",
                },
                {
                  type: "paragraph",
                  text: "Because better systems shouldn’t sacrifice credibility.",
                },
              ]}
            />

            <StepContentSection
              stepLabel="STEP 4"
              title="Receive Your Personalized Plan"
              rightTitle="Clarity over complexity."
              content={[
                {
                  type: "paragraph",
                  text: "Once reviewed, you’ll receive a tailored care pathway aligned with your goals and baseline.",
                },
                {
                  type: "paragraph",
                  text: "Depending on your needs, this may include:",
                },
                {
                  type: "list",
                  items: [
                    "Hormone optimization",
                    "Peptide support",
                    "Foundational vitamins",
                    "Performance-focused stacks",
                  ],
                },
                {
                  type: "paragraph",
                  text: "Everything is presented clearly, so you understand what’s recommended and why — without overwhelming jargon or clinical noise.",
                },
                {
                  type: "paragraph",
                  text: (
                    <>
                      Intentional <br />
                      Transparent <br />
                      Built around you.
                    </>
                  ),
                },
              ]}
            />

            <StepContentSection
              stepLabel="STEP 5"
              title="Discreet Delivery"
              rightTitle="Direct to your door."
              content={[
                {
                  type: "paragraph",
                  text: "Once approved, your products are shipped directly to you in discreet packaging.",
                },

                {
                  type: "list",
                  items: [
                    "No pharmacy lines.",
                    "No in-person pickups.",
                    "No friction.",
                  ],
                },
                {
                  type: "paragraph",
                  text: "Just reliable fulfillment designed for modern lifestyles.",
                },
                {
                  type: "paragraph",
                  text: "Because healthcare should move at the same speed as everything else in your life.",
                },
              ]}
            />

            <StepContentSection
              stepLabel="STEP 6"
              title="Optimize And Evolve"
              rightTitle="Your baseline, upgraded."
              content={[
                {
                  type: "paragraph",
                  text: "Optimization isn’t a one-time decision — it’s an evolving process.",
                },
                {
                  type: "paragraph",
                  text: "With Paramount HealthRx, you can continue refining your approach over time:",
                },
                {
                  type: "list",
                  items: [
                    "Adjust protocols",
                    "Stay consistent",
                    "Build momentum",
                    "Level up intentionally",
                  ],
                },
                {
                  type: "paragraph",
                  text: "As your goals evolve, your strategy can too.",
                },
                {
                  type: "paragraph",
                  text: "That’s where real compounding happens.",
                },
              ]}
            />
          </div>
        </div>
      </section>
      <section className=" px-0 relative">
        <div className="relative z-20">
          <Swiper
            pagination={{ clickable: true }}
            autoplay={false}
            loop={true}
            slidesPerView={1}
            // centeredSlides={true}
            speed={isMobile ? 300 : 0}
            spaceBetween={0}
            modules={[Autoplay]}
            className="relative  px-8 "
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {[
              {
                title: (
                  <>
                    Built For Modern <br /> Lives
                  </>
                ),
                desc: (
                  <>
                    Traditional healthcare systems weren’t <br /> built for
                    high-output people.Paramount HealthRx <br />
                    was.
                  </>
                ),
                info: "Our platform is designed for individuals who:",
                bullets: [
                  "Value speed and simplicity",
                  "Prefer digital experiences",
                  "Expect premium infrastructure",
                  "Think long term about performance",
                ],

                p1: "You shouldn’t have to slow down your life to optimize your health.",
              },
              {
                title: (
                  <>
                    Private By <br /> Design
                  </>
                ),
                desc: (
                  <>
                    Your health is personal — and your <br /> experience should
                    reflect that. From secure <br /> onboarding to discreet
                    delivery, every part <br /> of Paramount HealthRx is built
                    with privacy in mind.
                  </>
                ),
                info: "Paramount HealthRx is built with privacy in mind",
                bullets: [
                  "No public pharmacy counters.",
                  "No awkward clinic visits.",
                  "No unnecessary exposure.",
                ],

                p1: "Just a clean, confidential experience from start to finish.",
              },
              {
                title: (
                  <>
                    No Waiting Rooms. <br />
                    No Friction.
                  </>
                ),
                desc: (
                  <>
                    We eliminated all of it. Paramount HealthRx gives you <br />{" "}
                    direct access to modern optimization <br /> infrastructure —
                    without the inefficiencies of <br /> legacy healthcare
                    systems. Because better access creates better outcomes.
                  </>
                ),
                info: "The traditional model is slow by design:",
                bullets: [
                  "Long appointment delays",
                  "Commuting to clinics",
                  "Fragmented follow-ups",
                ],

                p1: "Just a clean, confidential experience from start to finish.",
              },
              {
                title: (
                  <>
                    Designed For <br /> Clarity
                  </>
                ),
                info: "We believe health platforms should feel",
                bullets: ["Simple", "Direct", "Modern", "Elevated"],

                p1: "No confusing workflows. No medical maze. Just clear steps and clean execution.",
              },
              {
                title: (
                  <>
                    Built For <br /> Performance <br />
                    -minded Users
                  </>
                ),
                desc: (
                  <>
                    Paramount HealthRx isn’t built for everyone — and that’s
                    intentional.
                  </>
                ),
                info: "It’s built for people who:",
                bullets: [
                  "Track their inputs and outputs",
                  "Optimize intentionally",
                  "Care about long-term vitality",
                  "Expect better systems",
                ],

                p1: "If you value clarity and execution, you’ll feel the difference immediately.",
              },
            ].map((slide, index) => (
              <SwiperSlide
                key={index}
                className={` ${index === 0 ? "bg-[url('/images/hitSlide1.png')]" : index === 1 ? "bg-[url('/images/hitSlide2.png')]" : index === 2 ? "bg-[url('/images/hitSlide3.png')]" : index === 3 ? "bg-[url('/images/hitSlide4.png')]" : index === 4 ? "bg-[url('/images/hitSlide5.png')]" : "bg-[url('/images/cleanRoutine6.png')]"} bg-cover bg-no-repeat bg-center px-4 xl:px-8 min-h-[90dvh] h-full space-y-2 md:space-y-10 py-6 md:py-24`}
              >
                <div className="container  z-50 relative mx-auto max-w-7xl">
                  <div className="md:col-span-2  flex gap-8 items-start flex-col md:flex-row justify-between">
                    <div className="space-y-5 md:space-y-12">
                      <div className="space-y-3">
                        <h2 className="text-white font-extrabold text-3xl md:leading-20 md:text-6xl">
                          {slide.title}
                        </h2>

                        <p className="text-neutral-200 text-sm md:text-base">
                          {slide.desc}
                        </p>
                      </div>
                      <div className="hidden md:flex items-center gap-3 lg:pe-20">
                        <button
                          onClick={() => swiperRef.current?.slidePrev()}
                          className="cursor-pointer"
                        >
                          <span className="w-17 h-17 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                        <button
                          onClick={() => swiperRef.current?.slideNext()}
                          className=" cursor-pointer"
                        >
                          <span className="w-17 rotate-180 h-17 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-3 lg:pe-20">
                      <SliderIndicator
                        total={5}
                        activeIndex={index}
                        onChange={(i) => {}}
                        secondaryClr="bg-white/35"
                        primaryClr="bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid container max-w-7xl mx-auto grid-cols-1 md:grid-cols-2">
                  <div></div>
                  <div className="rounded-3xl bg-black/40 backdrop-blur space-y-3 md:space-y-6 p-4 md:p-8">
                    <h2 className="text-lg md:text-2xl font-semibold text-neutral-100">
                      {slide.info}
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <ul key={index} className="space-y-3.5">
                          {slide.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="flex gap-2 items-center text-neutral-200 md:text-xl text-lg"
                            >
                              <CheckCircleIcon /> {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-sm md:text-lg text-neutral-200 font-normal">
                        {slide.p1}
                      </p>
                    </div>
                  </div>

                  {isMobile && (
                    <div className="space-y-4 mt-4 flex flex-col justify-center items-center">
                      <div className="flex items-center gap-3 lg:pe-20">
                        <SliderIndicator
                          total={5}
                          activeIndex={index}
                          onChange={(i) => {}}
                          secondaryClr="bg-white/35"
                          primaryClr="bg-white"
                        />
                      </div>
                      <div className="flex items-center gap-3 lg:pe-20">
                        <button
                          onClick={() => swiperRef.current?.slidePrev()}
                          className="cursor-pointer"
                        >
                          <span className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                        <button
                          onClick={() => swiperRef.current?.slideNext()}
                          className=" cursor-pointer"
                        >
                          <span className="w-12 rotate-180 h-12 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="container mx-auto max-w-[1340] my-12 md:my-24 rounded-4xl bg-linear-30 from-[#E9DEFA] to-[#FFF6EB] pt-6 md:pt-16">
        <div className="container max-w-7xl  px-4 xl:px-8 mx-auto justify-center flex">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 ">
            <div className="bg-linear-to-b space-y-4 md:space-y-8  from-white to-transparent rounded-2xl p-4 md:p-10">
              <div className="space-y-2">
                <h2 className="font-bold text-2xl md:text-[40px] text-black">
                  The Paramount <br /> Difference
                </h2>

                <p className="text-base md:text-lg font-normal text-gray-800">
                  Anyone can offer products. Very few build real infrastructure.
                </p>
              </div>

              <div className="text-base md:text-lg space-y-4 text-gray-800">
                <div className="space-y-3">
                  <p className="font-medium">Paramount HealthRx focuses on:</p>
                  <ul className="space-y-2">
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon />
                      Elevated experience
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> Streamlined onboarding
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> Responsible oversight
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> Reliable fulfillment
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon />
                      Performance-forward positioning
                    </li>
                  </ul>
                </div>
                <p className="text-base md:text-lg text-gray-800">
                  Because optimization deserves better systems — not just better
                  marketing.
                </p>
              </div>
            </div>
            <div className="bg-linear-to-b space-y-4 md:space-y-8 from-white to-transparent rounded-2xl p-4 md:p-10">
              <div className="space-y-2">
                <h2 className="font-bold text-2xl md:text-[40px] text-black">
                  From Interest To <br /> Execution
                </h2>

                <p className="text-base md:text-lg font-normal text-gray-800">
                  Getting started shouldn’t feel complicated.
                </p>
              </div>

              <div className="text-base md:text-lg space-y-4 text-gray-800">
                <div className="space-y-3">
                  <p className="font-medium">
                    With Paramount HealthRx, the process is simple:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon />
                      Create your account.
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> Complete your intake.
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> Get reviewed.
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> Receive your plan.
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon />
                      Optimize consistently.
                    </li>
                  </ul>
                </div>
                <p className="text-lg text-gray-800">
                  That’s it. No friction. No confusion. No wasted time.
                </p>
              </div>
            </div>

            <div className="bg-linear-to-b md:col-span-2  grid gird-cols-1 md:grid-cols-2 from-white to-transparent rounded-2xl p-4 pb-0 md:p-10">
              <div className="space-y-4 md:space-y-10 ">
                <div className="space-y-2">
                  <h2 className="font-bold text-2xl md:text-[40px] text-black">
                    Ready When You Are
                  </h2>
                </div>

                <div className="text-base md:text-lg space-y-4 text-gray-800">
                  <div className="space-y-3">
                    <p className="font-medium">
                      Your baseline influences everything:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                        <CheckCircleBlackIcon />
                        Energy.
                      </li>
                      <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                        <CheckCircleBlackIcon /> Confidence.
                      </li>
                      <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                        <CheckCircleBlackIcon /> Recovery.
                      </li>
                      <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                        <CheckCircleBlackIcon />
                        Longevity.
                      </li>
                      <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                        <CheckCircleBlackIcon />
                        Output.
                      </li>
                    </ul>
                  </div>
                  <p className="text-base md:text-lg text-gray-800">
                    The difference between average and optimized is rarely
                    motivation.It’s execution. And now, the path is finally
                    simple.
                  </p>
                </div>
              </div>
              <div>
                <Image alt="" src={Images.landingPage.landingMockup2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" px-0 pb-8 md:pb-16 relative hidden">
        <div className="relative z-20">
          <Swiper
            pagination={{ clickable: true }}
            autoplay={false}
            loop={true}
            slidesPerView={1}
            // centeredSlides={true}
            speed={isMobile ? 300 : 0}
            spaceBetween={30}
            modules={[Autoplay]}
            className="relative  px-8 "
            onSwiper={(swiper) => {
              swiperRef4.current = swiper;
            }}
          >
            {[
              {
                title: (
                  <>
                    Designed For <br /> Clean Routines
                  </>
                ),
                desc: (
                  <>
                    Most hormone clinics are built around <br /> inconvenience —
                    appointments.
                  </>
                ),
                info: "We believe supplements should feel:",
                bullets: [
                  "Intentional",
                  "Minimal",
                  "Effective",
                  "Easy to integrate",
                ],

                p1: "No massive pill stacks. No chaotic protocols. Just clean support where it actually matters.",
                imageSrc: "cleanRoutine.png",
              },
              {
                title: (
                  <>
                    The Difference Is <br /> Execution
                  </>
                ),
                desc: (
                  <>
                    Anyone can sell vitamins. <br /> Very few build systems
                    around quality.
                  </>
                ),
                info: "Paramount HealthRx focuses on:",
                bullets: [
                  "Curated formulations",
                  "Consistent sourcing",
                  "Elevated standards",
                  "Modern fulfillment",
                ],

                p1: "Because execution matters as much as ingredients.",
                imageSrc: "cleanRoutine2.png",
              },
              {
                title: (
                  <>
                    For the <br /> performance-minded
                  </>
                ),
                desc: (
                  <>
                    This category isn’t built for casual wellness <br /> trends.
                  </>
                ),
                info: "It’s built for people who:",
                bullets: [
                  "Respect fundamentals",
                  "Optimize inputs and outputs",
                  "Care about long-term biology",
                  "Build systems around performance",
                ],

                p1: "You don’t skip the foundation if you’re serious about results.You reinforce it.",
                imageSrc: "cleanRoutine3.png",
              },
              {
                title: (
                  <>
                    Vitamins, <br /> Reimagined
                  </>
                ),
                desc: (
                  <>
                    We’re not trying to reinvent micronutrients. <br /> We’re
                    reinventing how they’re delivered.
                  </>
                ),
                info: "Paramount HealthRx focuses on:",
                bullets: ["Cleaner", "Smarter", "More intentional"],

                p1: "Built for people who understand that optimization starts with the basics — done properly.",
                imageSrc: "cleanRoutine4.png",
              },
              {
                title: (
                  <>
                    Why <br /> Paramount HealthRx
                  </>
                ),
                desc: (
                  <>
                    Because foundational health deserves <br /> better
                    infrastructure.
                  </>
                ),
                info: "We exist for people who want:",
                bullets: [
                  "Elevated quality",
                  "Cleaner inputs",
                  "Honest positioning",
                  "Modern delivery",
                ],

                p1: "No gimmicks. No mega-store chaos. No low-grade formulations. Just foundational health — executed at a higher standard.",
                imageSrc: "cleanRoutine5.png",
              },
              {
                title: (
                  <>
                    Build <br /> Your Baseline
                  </>
                ),
                desc: (
                  <>
                    You don’t build elite performance on weak <br />
                    foundations.
                  </>
                ),
                info: "Vitamins support the chemistry behind everything:",
                bullets: [
                  "How you think.",
                  "How you recover.",
                  "How you age.",
                  "How you perform.",
                ],

                p1: "They’re not the flashiest lever. But they’re one of the most important. And when done right, the compounding effect is undeniable.",
                imageSrc: "cleanRoutine6.png",
              },
            ].map((slide, index) => (
              <SwiperSlide
                key={index}
                className={` ${index === 0 ? "bg-[url('/images/cleanRoutine.png')]" : index === 1 ? "bg-[url('/images/cleanRoutine2.png')]" : index === 2 ? "bg-[url('/images/cleanRoutine3.png')]" : index === 3 ? "bg-[url('/images/cleanRoutine4.png')]" : index === 4 ? "bg-[url('/images/cleanRoutine5.png')]" : "bg-[url('/images/cleanRoutine6.png')]"} bg-cover bg-no-repeat bg-center px-4 xl:px-8 min-h-[90dvh] h-full space-y-2 md:space-y-10 py-6 md:py-24`}
              >
                <div className="container  z-50 relative mx-auto max-w-7xl">
                  <div className="md:col-span-2  flex gap-8 items-start flex-col md:flex-row justify-between">
                    <div className="space-y-5 md:space-y-12">
                      <div className="space-y-3">
                        <h2 className="text-white font-extrabold text-3xl md:leading-20 md:text-6xl">
                          {slide.title}
                        </h2>

                        <p className="text-neutral-200 text-sm md:text-base">
                          {slide.desc}
                        </p>
                      </div>
                      <div className="hidden md:flex items-center gap-3 lg:pe-20">
                        <button
                          onClick={() => swiperRef4.current?.slidePrev()}
                          className="cursor-pointer"
                        >
                          <span className="w-17 h-17 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                        <button
                          onClick={() => swiperRef4.current?.slideNext()}
                          className=" cursor-pointer"
                        >
                          <span className="w-17 rotate-180 h-17 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-3 lg:pe-20">
                      <SliderIndicator
                        total={6}
                        activeIndex={index}
                        onChange={(i) => {}}
                        secondaryClr="bg-white/35"
                        primaryClr="bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid container max-w-7xl mx-auto grid-cols-1 md:grid-cols-2">
                  <div></div>
                  <div className="rounded-3xl bg-black/40 backdrop-blur space-y-3 md:space-y-6 p-4 md:p-8">
                    <h2 className="text-lg md:text-2xl font-semibold text-neutral-100">
                      {slide.info}
                    </h2>
                    <div className="space-y-3">
                      <div>
                        <ul key={index} className="space-y-3.5">
                          {slide.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="flex gap-2 items-center text-neutral-200 md:text-xl text-lg"
                            >
                              <CheckCircleIcon /> {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-sm md:text-lg text-neutral-200 font-normal">
                        {slide.p1}
                      </p>
                    </div>
                  </div>

                  {isMobile && (
                    <div className="space-y-4 mt-4 flex flex-col justify-center items-center">
                      <div className="flex items-center gap-3 lg:pe-20">
                        <SliderIndicator
                          total={6}
                          activeIndex={index}
                          onChange={(i) => {}}
                          secondaryClr="bg-white/35"
                          primaryClr="bg-white"
                        />
                      </div>
                      <div className="flex items-center gap-3 lg:pe-20">
                        <button
                          onClick={() => swiperRef4.current?.slidePrev()}
                          className="cursor-pointer"
                        >
                          <span className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                        <button
                          onClick={() => swiperRef4.current?.slideNext()}
                          className=" cursor-pointer"
                        >
                          <span className="w-12 rotate-180 h-12 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Page;
