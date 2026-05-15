"use client";

import { WhoWeForCard } from "@/app/components";
import { Images } from "@/app/images";
import { Swiper as SwiperType } from "swiper/types";
import Image from "next/image";
import {
  ArrowIcon,
  CheckCircleBlackIcon,
  CheckCircleIcon,
  Eyeicon,
  SecurityCheck3Icon,
  WhiteArrow,
  ZapIcon,
} from "@/public/icons";
import { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SliderIndicator from "@/app/components/SliderIndicator";
import Link from "next/link";
import { useIsMobile } from "@/app/hooks/useIsMobile";

const Page = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const isMobile = useIsMobile();
  return (
    <>
      <section className="bg-linear-[245deg] hidden overflow-hidden from-[#86B7EF] pt-24 lg:pt-28 to-[#DCF0F7]  relative">
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
                  About Paramount HealthRx
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-neutral-900 text-4xl  lg:text-start text-center xl:text-[54px] leading-none tracking-tighter font-extrabold">
                  Modern healthcare. Rebuilt for performance.
                </h1>
              </div>
            </div>

            <p className="text-gray-800  lg:text-start text-center text-lg xl:text-xl font-normal">
              Paramount HealthRx was created around a simple idea: <br />{" "}
              Healthcare shouldn’t feel outdated.
            </p>

            <div>
              <p className="text-gray-800  lg:text-start text-center text-sm md:text-base font-normal">
                The world has evolved — faster, smarter, more efficient — but
                traditional healthcare systems are still slow, fragmented, and
                inconvenient.
              </p>
            </div>

            <div>
              <p className="text-gray-800  lg:text-start text-center text-sm md:text-base font-normal">
                We built Paramount HealthRx to change that. <br /> Not by
                reinventing medicine. <br /> By rebuilding the experience around
                it.
              </p>
            </div>

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
              src={Images.landingPage.aboutMockup}
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
          className={`bg-[url('/images/abtHeroMockup.png')] bg-cover bg-no-repeat lg:pt-28 pt-24 flex items-center justify-center bg-top  xl:px-8 min-h-[85dvh] h-full space-y-2 md:space-y-10 py-6 md:py-24`}
        >
          <div className="container px-4 md:px-8 relative mx-auto max-w-7xl">
            <div className="  grid grid-cols-1  md:grid-cols-3 gap-8 ">
              <div className="space-y-5 md:col-span-2  md:space-y-12">
                <div className="space-y-3">
                  <h2 className="text-white capitalize font-extrabold md:leading-20 text-3xl md:text-7xl">
                    Modern healthcare. <br /> Rebuilt for performance.
                  </h2>

                  <p className="text-neutral-200 text-xl md:leading-9 md:text-2xl">
                    Paramount HealthRx was created around a simple idea: <br />{" "}
                    Healthcare shouldn’t feel outdated.
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

      <section className="relative py-12 md:py-24 w-full h-full overflow-hidden">
        <div className="container mx-auto max-w-7xl space-y-5 md:space-y-12 px-4 xl:px-8">
          <Image
            alt=""
            src={Images.landingPage.howItWorksVector}
            className="absolute right-0 w-full z-10 top-0"
          />
          <h2 className="font-extrabold text-3xl md:text-6xl text-black">
            Built For A New{" "}
            <span className="text-secondary">Era Of Health</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-12">
            <div className="bg-linear-to-b from-white to-[#BBEBF250] rounded-4xl">
              <Image
                alt=""
                src={Images.landingPage.PeptideTherapy}
                className="md:h-123.5 md:w-148.5"
              />
            </div>
            <div className="space-y-5 text-neutral-700 text-lg md:text-xl">
              <p>
                We’re living through a major shift in how people access care.
              </p>
              <p>
                The rise of telehealth and direct-to-consumer healthcare has
                fundamentally changed expectations — people now expect faster
                access, digital convenience, and personalized experiences.
              </p>
              <p>
                But while infrastructure evolved, the experience often didn’t.
              </p>
              <p>Many platforms still feel clinical, cold, or transactional.</p>
              <p>
                Paramount HealthRx exists to bridge that gap — combining modern
                infrastructure with a premium, performance-focused experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className=" rounded-3xl bg-linear-0 from-[#FFF1EB] to-[#ACE0F9]  overflow-hidden">
          <div className="py-8  md:py-24  bg-[url('/images/logoWhite.svg')]   bg-no-repeat! bg-bottom">
            <div className="container space-y-4 md:space-y-8 mx-auto max-w-7xl lg:px-8 px-4">
              <div className="space-y-3">
                <h2 className="text-3xl text-center lg:text-6xl text-black font-extrabold  ">
                  Why We <span className="text-secondary">Exist</span>
                </h2>
                <p className="text-2xl font-semibold text-center text-gray-800">
                  Because healthcare shouldn’t slow you down.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                <div className="bg-white/70 space-y-3 md:space-y-4 rounded-4xl p-5 md:p-10">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Most traditional systems were built around:
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon /> Insurance complexity
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      Physical clinics
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      Administrative friction
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      One-size-fits-all protocols
                    </li>
                  </ul>

                  <h2 className="text-base md:text-lg text-gray-800">
                    That model wasn’t designed for modern, high-output lives.
                  </h2>
                </div>
                <div className="bg-white/70 space-y-3 md:space-y-4 rounded-4xl p-5 md:p-10">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    We built Paramount HealthRx for people who expect:
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      Speed
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      Clarity
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      Privacy
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      Control
                    </li>
                  </ul>

                  <h2 className="text-base md:text-lg text-gray-800">
                    Because optimization should feel seamless.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative container mx-auto max-w-7xl px-4 xl:px-8 py-12 md:py-24 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <WhoWeForCard />
      </section>
      {/* <section className="bg-linear-[245deg] overflow-hidden from-[#86B7EF] py-12 px-4 md:px-0 lg:py-28 to-[#DCF0F7]  relative">
        <div className="noise absolute! inset-0 w-full" />
        <div className="relative">
          <Swiper
            pagination={{ clickable: true }}
            autoplay={false}
            loop={true}
            // slidesPerView={}
            speed={isMobile ? 300 : 0}
            spaceBetween={30}
            modules={[Autoplay]}
            className="relative reviewSlider"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {[
              {
                title: "Modern Care, Simplified",
                desc: "At its core, Paramount HealthRx is about removing friction.",
                intro:
                  "We simplify access to modern health optimization through:",
                bullets: [
                  "Streamlined telehealth workflows",
                  "Licensed provider oversight",
                  "Discreet fulfillment",
                  "Premium infrastructure",
                ],
                footer:
                  "No waiting rooms. No unnecessary complexity. No outdated systems. Just modern care, executed cleanly.",
                image: Images.landingPage.slideModern2,
              },
              {
                title: "A Different Kind of Platform",
                intro:
                  "Most healthcare platforms fall into one of two categories:",
                bullets: ["Cold clinical systems"],
                intro2: "We sit in the middle. Paramount HealthRx combines:",
                bullets2: [
                  "Medical credibility",
                  "Modern execution",
                  "Premium experience",
                  "Performance-forward positioning",
                ],

                footer: "Serious infrastructure — without the friction.",
                image: Images.landingPage.slideModern21,
              },
              {
                title: "Built for Today’s Optimizers",
                desc: "Healthcare is no longer passive. More people are taking ownership of their biology — investing in longevity, recovery, cognitive performance, and metabolic health. This shift toward proactive, consumer-driven healthcare is reshaping the entire industry.",
                intro:
                  "Paramount HealthRx was built specifically for this new category of user. People who:",

                bullets: [
                  "Value speed and simplicity",
                  "Cold clinical systems",
                ],
                footer:
                  "You shouldn’t have to slow down your life to optimize your health.",
                image: Images.landingPage.slideModern22,
              },
              {
                title: "Experience Matters",
                desc: "Anyone can sell products. Very few build real infrastructure.",
                intro: "We obsess over the details most platforms ignore:",

                bullets: [
                  "Clean onboarding flows",
                  "Clear communication",
                  "Reliable fulfillment",
                  "Elevated design",
                  "Consistent experience",
                ],
                footer:
                  "Because trust isn’t built through marketing. It’s built through execution.",
                image: Images.landingPage.slideModern23,
              },
            ].map((slide, index) => (
              <SwiperSlide key={index} className="px-0! ">
                <div className="grid grid-cols-1 md:grid-cols-2 container xl:px-8 max-w-7xl mx-auto">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="font-bold text-4xl md:text-5xl ">
                        {slide.title}
                      </h2>
                      <p className="text-base md:text-lg font-normal text-gray-800">
                        {slide.desc}
                      </p>
                    </div>
                    <div className="space-y-5">
                      <div className="space-y-4">
                        <p className="text-lg md:text-2xl font-semibold text-gray-800">
                          {slide.intro}
                        </p>

                        <ul className="space-y-2">
                          {slide.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="flex gap-2 items-center text-gray-800 text-base md:text-lg"
                            >
                              <CheckCircleIcon /> {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <p className="text-lg md:text-2xl font-semibold text-gray-800">
                          {slide.intro2}
                        </p>

                        <ul className="space-y-2">
                          {slide.bullets2?.map((b, i) => (
                            <li
                              key={i}
                              className="flex gap-2 items-center text-gray-800 text-base md:text-lg"
                            >
                              <CheckCircleIcon /> {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-base md:text-lg text-gray-800">
                        {slide.footer}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center w-full justify-end">
                    <Image alt="" src={slide.image} />
                  </div>

                  <div className="md:col-span-2 mt-12 flex gap-8 items-center flex-col md:flex-row justify-between">
                    <SliderIndicator
                      total={4}
                      activeIndex={index}
                      onChange={(i) => {}}
                    />
                    <div className="flex items-center gap-3 lg:pe-20">
                      <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="cursor-pointer"
                      >
                        <Image
                          alt=""
                          className="md:w-auto md:h-auto h-12 w-12"
                          src={Images.landingPage.modernSliderBtn}
                        />
                      </button>
                      <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="cursor-pointer"
                      >
                        <Image
                          alt=""
                          className="md:w-auto md:h-auto h-12 w-12"
                          src={Images.landingPage.modernSliderBtn2}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section> */}
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
                    Modern Care, <br /> Simplified
                  </>
                ),
                desc: (
                  <>
                    At its core, Paramount HealthRx is about <br /> removing
                    friction.
                  </>
                ),
                info: "We simplify access to modern health optimization through:",
                bullets: [
                  "Streamlined telehealth workflows",
                  "Licensed provider oversight",
                  "Discreet fulfillment",
                  "Premium infrastructure",
                ],

                p1: "No waiting rooms. No unnecessary complexity. No outdated systems. Just modern care, executed cleanly.",
              },
              {
                title: (
                  <>
                    A Different Kind <br /> of Platform
                  </>
                ),
                desc: (
                  <>
                    Most healthcare platforms fall into one of <br /> two
                    categories:
                  </>
                ),
                info: "We sit in the middle. Paramount HealthRx combines:",
                bullets: [
                  "Medical credibility",
                  "Modern execution",
                  "Premium experience",
                  "Performance-forward positioning",
                ],

                p1: "Serious infrastructure — without the friction.",
              },
              {
                title: (
                  <>
                    Built for Today’s <br /> Optimizers
                  </>
                ),
                desc: (
                  <>
                    Healthcare is no longer passive. More people <br /> are
                    taking ownership of their biology — <br />
                    investing in longevity, recovery, cognitive <br />{" "}
                    performance, and metabolic health. This shift <br /> toward
                    proactive, consumer-driven <br /> healthcare is reshaping
                    the entire industry.
                  </>
                ),
                info: "Paramount HealthRx was built specifically for this new category of user. People who:",
                bullets: [
                  "Value speed and simplicity",
                  "Cold clinical systems",
                ],

                p1: "Serious infrastructure — without the friction.",
              },
              {
                title: (
                  <>
                    Experience <br /> Matters
                  </>
                ),
                desc: (
                  <>
                    Anyone can sell products. <br /> Very few build real
                    infrastructure.
                  </>
                ),
                info: "We obsess over the details most platforms ignore:",
                bullets: [
                  "Clean onboarding flows",
                  "Clear communication",
                  "Reliable fulfillment",
                  "Elevated design",
                  "Elevated design",
                ],

                p1: "Because trust isn’t built through marketing. It’s built through execution.",
              },
            ].map((slide, index) => (
              <SwiperSlide
                key={index}
                className={` ${index === 0 ? "bg-[url('/images/abtSlide1.png')] bg-top " : index === 1 ? "bg-[url('/images/abtSlide2.png')] bg-center " : index === 2 ? "bg-[url('/images/abtSlide3.png')] bg-center " : index === 3 ? "bg-[url('/images/abtSlide4.png')] bg-center " : "bg-[url('/images/cleanRoutine6.png')]"} bg-cover bg-no-repeat px-4 xl:px-8 min-h-[90dvh] h-full space-y-2 md:space-y-10 py-6 md:py-24`}
              >
                <div className="container  z-50 relative mx-auto max-w-7xl">
                  <div className="md:col-span-2  flex gap-8 items-start flex-col md:flex-row justify-between">
                    <div className="space-y-5 md:space-y-12">
                      <div className="space-y-3">
                        <h2 className="text-white font-extrabold md:leading-20 text-3xl md:text-6xl">
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
                        total={4}
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
                          total={4}
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

      <section className="container mx-auto max-w-[1340] mt-12 rounded-4xl bg-linear-30 from-[#E9DEFA] to-[#FFF6EB] pt-6 md:pt-16">
        <div className="container max-w-7xl  px-4 xl:px-8 mx-auto justify-center flex">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 ">
            <div className="bg-linear-to-b space-y-4 md:space-y-8  from-white to-transparent rounded-2xl p-4 md:p-10">
              <div className="space-y-2">
                <h2 className="font-bold text-2xl md:text-[40px] text-black">
                  Our Standard
                </h2>

                <p className="text-base md:text-lg font-normal text-gray-800">
                  Anyone can offer products. Very few build real infrastructure.
                </p>
              </div>

              <div className="text-base md:text-lg space-y-4 text-gray-800">
                <div className="space-y-3">
                  <p className="font-medium">
                    We believe modern healthcare should feel:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon />
                      Simple
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> Premium
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> Private
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> Intentional
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon />
                      Reliable
                    </li>
                  </ul>
                </div>
                <p className="text-base md:text-lg text-gray-800">
                  No chaos. No confusion. No compromises on experience. Just
                  clean, modern optimization infrastructure.
                </p>
              </div>
            </div>
            <div className="bg-linear-to-b space-y-4 md:space-y-8 from-white to-transparent rounded-2xl p-4 md:p-10">
              <div className="space-y-2">
                <h2 className="font-bold text-2xl md:text-[40px] text-black">
                  Looking Ahead
                </h2>
              </div>

              <div className="text-base md:text-lg space-y-4 text-gray-800">
                <div className="space-y-3">
                  <p className="font-medium">
                    We believe the future of healthcare is:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon />
                      More personalized
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> More proactive
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> More digital
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleBlackIcon /> More performance-driven
                    </li>
                  </ul>
                </div>
                <p className="text-lg text-gray-800">
                  And most importantly — more human. Paramount HealthRx exists
                  to help shape that future by delivering a better way to access
                  modern care. Not louder. Not trendier. Just better built.
                </p>
              </div>
            </div>

            <div className="bg-linear-to-b md:col-span-2  grid gird-cols-1 md:grid-cols-2 from-white to-transparent rounded-2xl p-4 pb-0 md:p-10">
              <div className="space-y-4 md:space-y-10 ">
                <div className="space-y-2">
                  <h2 className="font-bold text-2xl md:text-[40px] text-black">
                    The Paramount Difference
                  </h2>
                  <p className="text-base md:text-lg font-normal text-gray-800">
                    What makes Paramount HealthRx different isn’t just what we
                    offer — it’s how we build.
                  </p>
                </div>

                <div className="text-base md:text-lg space-y-4 text-gray-800">
                  <div className="space-y-3">
                    <p className="font-medium">We focus on:</p>
                    <ul className="space-y-2">
                      <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                        <CheckCircleBlackIcon />
                        Elevated experience
                      </li>
                      <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                        <CheckCircleBlackIcon /> Responsible oversight
                      </li>
                      <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                        <CheckCircleBlackIcon /> Clean execution
                      </li>
                      <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                        <CheckCircleBlackIcon />
                        Modern infrastructure
                      </li>
                      <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                        <CheckCircleBlackIcon />
                        Long-term thinking
                      </li>
                    </ul>
                  </div>
                  <p className="text-base md:text-lg text-gray-800">
                    Because better systems create better outcomes.
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

      <section className="xl:pt-24 xl:pb-16 pt-8 pb-8">
        <div className="container max-w-7xl mx-auto  px-4 xl:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-4 flex flex-col bg-linear-120 from-[#F5F7FA] to-[#C3CFE2] rounded-4xl p-5 md:p-10 justify-center">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-6xl font-extrabold text-neutral-900">
                This Is Paramount HealthRx
              </h2>
              <p className="text-lg lg:text-2xl text-slate-700">
                A modern platform built for people who expect more from their
                health infrastructure.
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-2.5 lg:gap-4">
                <div className="py-4 px-5 bg-white flex  items-center gap-4.5 rounded-2xl lg:rounded-3xl">
                  <div className="flex items-center justify-center relative opacity-100">
                    <Image
                      alt=""
                      src={Images.landingPage.iconBg}
                      className="drop-shadow shrink-0 lg:w-12 lg:h-12 w-10 h-10"
                    />
                    <span className="absolute">
                      <ZapIcon />
                    </span>
                  </div>
                  <p className="text-black text-base lg:text-lg">
                    Less Friction
                  </p>
                </div>
                <div className="py-4 px-5 bg-white flex  items-center gap-4.5 rounded-2xl lg:rounded-3xl">
                  <div className="flex items-center justify-center relative opacity-100">
                    <Image
                      alt=""
                      src={Images.landingPage.iconBg}
                      className="drop-shadow shrink-0 lg:w-12 lg:h-12 w-10 h-10"
                    />
                    <span className="absolute">
                      <Eyeicon />
                    </span>
                  </div>
                  <p className="text-black text-base lg:text-lg">
                    More Clarity
                  </p>
                </div>
                <div className="py-4 px-5 bg-white flex  items-center gap-4.5 rounded-2xl lg:rounded-3xl">
                  <div className="flex items-center justify-center relative opacity-100">
                    <Image
                      alt=""
                      src={Images.landingPage.iconBg}
                      className="drop-shadow shrink-0 lg:w-12 lg:h-12 w-10 h-10"
                    />
                    <span className="absolute">
                      <SecurityCheck3Icon />
                    </span>
                  </div>
                  <p className="text-black text-base lg:text-lg">
                    Higher Standards
                  </p>
                </div>
              </div>
              <p className="text-neutral-800 text-center italic lg:text-start text-base">
                Because when the experience improves, everything else follows.
              </p>
            </div>
          </div>
          <div>
            <Image
              alt="mobile"
              src={Images.aboutpageimages.aboutsecondsectionimage}
              className="rounded-4xl h-auto lg:h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
