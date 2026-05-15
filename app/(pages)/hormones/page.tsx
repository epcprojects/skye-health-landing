"use client";

import { Images } from "@/app/images";
import {
  ArrowIcon,
  BrainIcon,
  CheckCircleIcon,
  EnergyIcon,
  RefreshIcon,
  SmileIcon,
  DumbbleIcon,
  WhiteArrow,
} from "@/public/icons";

import Image from "next/image";
import { Swiper as SwiperType } from "swiper/types";
import { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderIndicator from "@/app/components/SliderIndicator";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import Link from "next/link";

import { StaticImageData } from "next/image";
import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import {
  ALL_PRODUCTS,
  AllProductsType,
  AllProductsVariables,
  ProductType,
} from "@/app/graphql/queries/products";
import { addProductToCart } from "@/app/Redux/slices/cart/cartSlice";
import { useAppDispatch } from "@/app/Redux/store";
import { toastAlert } from "@/app/components/ToastAlert";
import HomePageProductCard from "@/app/components/HomePageProductsCard";
import { ArrowRightIcon } from "@/public/icons";

import CapsuleImage from "@/public/images/capsule.png";
import CreamImage from "@/public/images/cream.png";
import InjectableImage from "@/public/images/injectable.png";
import InsertImage from "@/public/images/insert.png";
import NailPolishImage from "@/public/images/Nail Polish.png";
import NasalSprayImage from "@/public/images/Nasal Spray.png";
import OintmentImage from "@/public/images/Ointment.png";
import PatchImage from "@/public/images/Patch.png";
import PrefillesSyringeImage from "@/public/images/Pre-filles Syringe.png";
import ScalpOilImage from "@/public/images/Scalp OIl.png";
import SolutionImage from "@/public/images/Solution.png";
import SuppositoryImage from "@/public/images/Suppository.png";
import TabletImage from "@/public/images/Tablet.png";
import TrichosolSolutionImage from "@/public/images/Trichosol Solution.png";
import TrocheImage from "@/public/images/Troche.png";
import VialImage from "@/public/images/Vial.png";

const PER_PAGE = 20;
const MAX_PRODUCTS = 20;

const Page = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperRef2 = useRef<SwiperType | null>(null);
  const swiperRef3 = useRef<SwiperType | null>(null);
  const isMobile = useIsMobile();

  const productsSwiperRef = useRef<SwiperType | null>(null);
  const dispatch = useAppDispatch();

  const {
    data,
    loading,
    error: appolloError,
  } = useQuery<AllProductsType, AllProductsVariables>(ALL_PRODUCTS, {
    variables: {
      search: undefined,
      category: "Hormones",
      page: 1,
      perPage: PER_PAGE,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const firstPageProducts = data?.allProducts?.allData ?? [];

  const allProducts = useMemo(() => {
    const existingIds = new Set<string>();

    return firstPageProducts
      .filter((product) => {
        if (existingIds.has(product.id)) return false;
        existingIds.add(product.id);
        return true;
      })
      .slice(0, MAX_PRODUCTS);
  }, [firstPageProducts]);

  const normalizeForm = (form?: string | null) => form?.trim().toLowerCase();

  const formImageMap: Record<string, StaticImageData> = {
    capsule: CapsuleImage,
    cream: CreamImage,
    injectable: InjectableImage,
    insert: InsertImage,
    "nail polish": NailPolishImage,
    "nasal spray": NasalSprayImage,
    ointment: OintmentImage,
    patch: PatchImage,
    "pre-filled syringe": PrefillesSyringeImage,
    "pre-filles syringe": PrefillesSyringeImage,
    "scalp oil": ScalpOilImage,
    solution: SolutionImage,
    suppository: SuppositoryImage,
    tablet: TabletImage,
    "trichosol solution": TrichosolSolutionImage,
    troche: TrocheImage,
    vial: VialImage,
  };

  const getProductImage = (product: ProductType) => {
    if (product.primaryImage) return product.primaryImage;

    const form = normalizeForm(product.form);
    if (!form) return "";

    return formImageMap[form] || "";
  };

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
                  Hormones
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-neutral-900 text-4xl  lg:text-start text-center xl:text-[54px] leading-none tracking-tighter font-extrabold">
                  Balance your biology. Upgrade your output.
                </h1>
              </div>
            </div>

            <p className="text-gray-800  lg:text-start text-center text-lg xl:text-xl font-normal">
              Hormones run everything — energy, recovery, focus, metabolism,
              sleep, and longevity. When they’re optimized, life feels
              effortless. When they’re off, everything gets harder. At Paramount
              Rx, we help performance-driven individuals take control of their
              hormonal baseline with modern, precision-focused solutions built
              for real results — not outdated clinic experiences.
            </p>

            <h2 className="text-base italic text-gray-800">
              This is hormone optimization, rebuilt for the modern era.
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
              src={Images.landingPage.harmoneUpdateMockup}
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
          className={`bg-[url('/images/cleanRoutine9.png')] bg-cover bg-no-repeat lg:pt-28 pt-24 flex items-center justify-center bg-center px-4 xl:px-8 min-h-[85dvh] h-full space-y-2 md:space-y-10 py-6 md:py-24`}
        >
          <div className="container px-4 md:px-8 relative mx-auto max-w-7xl">
            <div className="  grid grid-cols-1 md:grid-cols-3 gap-8 ">
              <div className="space-y-5 md:col-span-2  md:space-y-12">
                <div className="space-y-3">
                  <h2 className="text-white font-extrabold capitalize  md:leading-20 text-3xl md:text-7xl">
                    For People Who <br /> Expect More.
                  </h2>

                  <p className="text-neutral-200 text-xl md:leading-9 md:text-2xl">
                    Paramount HealthRx isn’t built for casual health <br />{" "}
                    consumers.
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
              <div className="rounded-3xl col-span-1 bg-black/40 backdrop-blur space-y-3 md:space-y-6 p-4 md:p-8">
                <h2 className="text-lg md:text-2xl font-semibold text-neutral-100">
                  It’s built for people who:
                </h2>
                <div className="space-y-3">
                  <div>
                    <ul className="space-y-3.5">
                      {[
                        "Track their performance",
                        "Care about long-term vitality",
                        "Think in decades, not weeks",
                        "Invest in themselves intentionally",
                      ].map((b, i) => (
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
                    If that resonates, you’re in the right place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 xl:py-24 overflow-x-hidden">
        <div className="container max-w-7xl mx-auto flex flex-col gap-6 lg:gap-12 px-4 2xl:px-0">
          <div className="flex flex-col gap-4 lg:gap-6">
            <p className="text-[28px] lg:text-[48px] font-medium text-neutral-900">
              Hormones
            </p>
          </div>

          <div className="w-full">
            {loading && allProducts.length === 0 && (
              <p className="text-neutral-600">Loading products...</p>
            )}

            {appolloError && (
              <p className="text-red-600">Failed to load products.</p>
            )}

            {!loading && !appolloError && allProducts.length === 0 && (
              <div className="text-neutral-600 text-center">
                No Product Found
              </div>
            )}

            {allProducts.length > 0 && (
              <Swiper
                onSwiper={(swiper) => {
                  productsSwiperRef.current = swiper;
                }}
                loop={allProducts.length > 1}
                slidesPerView="auto"
                spaceBetween={20}
                grabCursor
                className="!overflow-visible"
              >
                {allProducts.map((product: ProductType) => (
                  <SwiperSlide key={product.id} className="!w-auto !h-auto">
                    <div className="h-full flex">
                      <HomePageProductCard
                        category={product.category}
                        title={product.name}
                        image={getProductImage(product)}
                        tags={[product.category, product.strength].filter(
                          (tag): tag is string => Boolean(tag),
                        )}
                        price={
                          Number(product.retailPrice || product.price) % 1 === 0
                            ? `$${Number(product.retailPrice || product.price)}`
                            : `$${Number(product.retailPrice || product.price).toFixed(2)}`
                        }
                        onAddToCart={() => {
                          dispatch(addProductToCart({ product }));
                          toastAlert("Added to Cart Successfully", true);
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <div className="flex flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => productsSwiperRef.current?.slidePrev()}
              className="lg:w-12.5 w-12 h-12 cursor-pointer lg:h-12.5 rounded-full flex items-center justify-center border border-neutral-300 rotate-180"
            >
              <ArrowRightIcon />
            </button>

            <Link
              href="/products?category=HRT%20(hormone%20replacement%20therapy)"
              className="p-3.5 lg:p-4 rounded-full text-base font-medium text-neutral-900 flex items-center justify-center border border-neutral-300"
            >
              View All Products
            </Link>

            <button
              onClick={() => productsSwiperRef.current?.slideNext()}
              className="lg:w-12.5 w-12 h-12 cursor-pointer lg:h-12.5 rounded-full flex items-center justify-center border border-neutral-300"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-18 w-full h-full ">
        <div className="container mx-auto max-w-7xl space-y-5 md:space-y-12 px-4 xl:px-8">
          <Image
            alt=""
            src={Images.landingPage.howItWorksVector}
            className="absolute right-0 w-full z-10 top-0"
          />
          <div className="flex flex-col gap-4">
            <h2 className="font-extrabold md:leading-20 whitespace-nowrap text-3xl md:text-6xl text-black">
              Why Hormones Matter
            </h2>

            <p className="text-lg md:text-xl text-neutral-700">
              Hormones are the body’s command signals — chemical messengers that
              regulate everything from metabolism and mood to muscle growth and
              cognitive performance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-12">
            <div className="bg-linear-to-b from-white to-[#BBEBF250] rounded-4xl">
              <Image
                alt=""
                src={Images.landingPage.harmoneMockup2}
                className=""
              />
            </div>
            <div className="space-y-5 text-neutral-700 text-lg md:text-xl">
              <div className="space-y-4">
                <p className="font-semibold text-xl md:text-2xl text-neutral-900">
                  Even small imbalances can cascade into noticeable declines in:
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                    <CheckCircleIcon />
                    Energy and drive
                  </li>
                  <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                    <CheckCircleIcon />
                    Body composition
                  </li>
                  <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                    <CheckCircleIcon />
                    Mental clarity
                  </li>
                  <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                    <CheckCircleIcon />
                    Libido and confidence
                  </li>
                  <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                    <CheckCircleIcon />
                    Sleep quality
                  </li>
                  <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                    <CheckCircleIcon />
                    Long-term vitality
                  </li>
                </ul>
                <p className="text-lg md:text-xl text-gray-800">
                  The problem? Most people don’t realize their baseline is
                  slipping — they just adapt to feeling{" "}
                  <span className="font-semibold">“not quite right.”</span>
                </p>
                <p>We believe you shouldn’t have to settle for that.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className=" rounded-3xl bg-linear-0 from-[#FFF1EB] to-[#ACE0F9]  overflow-hidden">
          <div className="py-8  md:py-24  bg-[url('/images/logoWhite.svg')]   bg-no-repeat! bg-bottom">
            <div className="container space-y-4 md:space-y-8 mx-auto max-w-7xl lg:px-8 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                <div className="bg-white/70 space-y-3 md:space-y-4 rounded-4xl p-5 md:p-10">
                  <h2 className="text-xl md:text-42 font-extrabold text-neutral-900 md:leading-12">
                    The Modern Hormone Problem
                  </h2>
                  <h2 className="text-base md:text-xl font-semibold text-gray-800">
                    Today’s environment works against hormonal health:
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon /> Chronic stress
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      Poor sleep cycles
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      Endocrine disruptors
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      Sedentary lifestyles
                    </li>
                    <li className="flex gap-2 items-center text-gray-800 text-base md:text-lg">
                      <CheckCircleIcon />
                      Aging physiology
                    </li>
                  </ul>

                  <h2 className="text-base md:text-lg text-gray-800">
                    Hormone decline isn’t just age — it’s environment,
                    lifestyle, and biology interacting in real time.
                  </h2>

                  <h2>
                    That’s why modern optimization requires modern solutions.
                  </h2>
                </div>
                <div>
                  <Image
                    alt="mobile"
                    src={Images.aboutpageimages.harmoneProblem}
                    className="rounded-4xl h-auto lg:h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 pb-8   md:py-12 px-4 md:px-0 relative">
        <div className="relative space-y-5 md:space-y-10">
          <div className="container mx-auto max-w-7xl  xl:px-8">
            <div className="md:col-span-2 mt-12 flex gap-8 items-center flex-col md:flex-row justify-between">
              <div className="space-y-5">
                <h2 className="text-neutral-900 font-extrabold text-3xl md:text-6xl">
                  What Hormone <br /> Optimization Can Support
                </h2>

                <p className="text-base md:text-lg text-neutral-900">
                  When properly managed, hormone optimization can dramatically
                  impact both short-term performance and long-term resilience.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3 lg:pe-20">
                <button
                  onClick={() => swiperRef.current?.slideNext()}
                  className="cursor-pointer"
                >
                  <Image
                    alt=""
                    className="md:w-auto md:h-auto h-12 w-12"
                    src={Images.landingPage.modernSliderBtn}
                  />
                </button>
                <button
                  onClick={() => swiperRef.current?.slidePrev()}
                  className=" cursor-pointer"
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
          <Swiper
            pagination={{ clickable: true }}
            autoplay={false}
            loop={true}
            slidesPerView={"auto"}
            // centeredSlides={true}
            // speed={0}
            spaceBetween={30}
            modules={[Autoplay]}
            className="relative  px-8  container mx-auto "
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {[
              {
                title: "Energy & Drive",
                desc: "Restore consistent daily output without relying on stimulants or crash cycles.",
                icon: <EnergyIcon />,
              },
              {
                title: "Body Composition",
                desc: "Support lean muscle retention, fat metabolism, and improved nutrient partitioning.",
                icon: <DumbbleIcon />,
              },
              {
                title: "Cognitive Performance",
                desc: "Sharper focus, better motivation, and improved mental stamina.",
                icon: <BrainIcon fill="#D03030" />,
              },
              {
                title: "Mood & Confidence",
                desc: "Balanced hormones often translate to improved emotional stability and overall well-being.",
                icon: <SmileIcon />,
              },
              {
                title: "Recovery & Longevity",
                desc: "Hormones play a foundational role in cellular repair, inflammation regulation, and aging trajectories.",
                icon: <RefreshIcon />,
              },
            ].map((slide, index) => (
              <SwiperSlide key={index} className="px-0! max-w-100">
                <div
                  className={`rounded-4xl flex flex-col relative justify-between p-5 md:p-8 bg-radial from-white ${index === 0 ? "to-[#D0F2F8]" : index === 1 ? "to-french-pass" : index === 2 ? "to-linen" : index === 3 ? "to-[#BBFFB2]" : "to-[#E9DEFA]"} min-h-64 md:min-h-98 `}
                >
                  <div className="noise absolute! inset-0 w-full" />
                  <div className="flex items-center w-fit justify-center drop-shadow">
                    <Image alt="" src={Images.landingPage.iconBg} />
                    <span className="absolute">{slide.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-black font-bold text-2xl">
                      {slide.title}
                    </h2>
                    <p className="text-neutral-800 text-base md:text-lg font-normal">
                      {slide.desc}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="md:hidden flex items-center justify-center gap-3 lg:pe-20">
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
              onClick={() => swiperRef.current?.slidePrev()}
              className=" cursor-pointer"
            >
              <Image
                alt=""
                className="md:w-auto md:h-auto h-12 w-12"
                src={Images.landingPage.modernSliderBtn2}
              />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <span className="italic rounded-2xl md:rounded-full text-sm md:text-base text-center drop-shadow bg-white py-2 px-5">
              This isn’t just about aesthetics — it’s about biological leverage.
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white  px-4 md:px-0 relative  py-12 md:py-24">
        <Image
          alt=""
          src={Images.landingPage.howItWorksVector}
          className="absolute right-0 w-full z-1 top-0"
        />
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
            className="relative  px-8 container max-w-7xl mx-auto "
            onSwiper={(swiper) => {
              swiperRef2.current = swiper;
            }}
          >
            {[
              {
                title: (
                  <>
                    Built For High-
                    <br /> performing Humans
                  </>
                ),
                desc: "Hormone optimization isn’t just for aging demographics anymore.",
                info: "Our clients include:",
                bullets: [
                  "Founders and executives",
                  "Athletes and lifters",
                  "High-output professionals",
                  "Longevity-focused individuals",
                  "People who simply refuse to operate below baseline",
                ],
                // h2: "We built Paramount HealthRx to sit in the middle:",
                p1: "If you measure performance in outputs — not trends — this is for you.",
                imageSrc: Images.landingPage.slideClient,
              },
              {
                title: (
                  <>
                    The Paramount <br /> Rx Approach
                  </>
                ),
                desc: "Hormone care should feel modern, precise, and frictionless.",
                info: "We built Paramount HealthRx around one idea:",
                bullets: [
                  "No outdated clinic vibes.",
                  "No confusing workflows.",
                  "No unnecessary barriers.",
                ],

                p1: "Just streamlined access to high-quality hormone support designed for real life.",
                imageSrc: Images.landingPage.slideApproach,
              },
              {
                title: (
                  <>
                    Precision <br /> Over Guesswork
                  </>
                ),
                desc: "Old-school hormone care relied on broad protocols and generic dosing.",
                info: "We believe in a different model:",
                bullets: [
                  "Precision-driven protocols",
                  "Modern telehealth workflows",
                  "Streamlined fulfillment",
                  "Performance-oriented outcomes",
                ],

                p1: "Because optimization shouldn’t feel experimental — it should feel engineered.",
                imageSrc: Images.landingPage.slideGuessWork,
              },
            ].map((slide, index) => (
              <SwiperSlide
                key={index}
                className="max-w-7xl container  xl:px-8 space-y-5 md:space-y-10"
              >
                <div className="container bg-transparent  z-50 relative mx-auto max-w-7xl">
                  <div className="md:col-span-2  flex gap-8 items-center flex-col md:flex-row justify-between">
                    <div className="space-y-3 md:space-y-5">
                      <h2 className="text-neutral-900 font-extrabold md:leading-20 text-3xl md:text-6xl">
                        {slide.title}
                      </h2>

                      <p>{slide.desc}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-3 lg:pe-20">
                      <button
                        onClick={() => swiperRef2.current?.slidePrev()}
                        className="cursor-pointer"
                      >
                        <Image
                          alt=""
                          className="md:w-auto md:h-auto h-12 w-12"
                          src={Images.landingPage.modernSliderBtn}
                        />
                      </button>
                      <button
                        onClick={() => swiperRef2.current?.slideNext()}
                        className=" cursor-pointer"
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
                <div
                  className={`rounded-4xl flex  flex-col  justify-between p-6 md:p-8 bg-linear-to-b from-[#ACE0F9] to-[#FFF1EB] md:py-14.5 min-h-105 md:px-12 `}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800">
                          {slide.info}
                        </h2>

                        <div>
                          <ul key={index} className="space-y-2">
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
                      </div>

                      <div className="space-y-2">
                        <p className="text-lg font-normal text-gray-800">
                          {slide.p1}
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <Image
                        className={`absolute bottom-10 end-32`}
                        alt=""
                        src={slide.imageSrc}
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-12 md:bottom-0  flex items-center justify-center w-full">
                  <SliderIndicator
                    total={3}
                    activeIndex={index}
                    onChange={(i) => {}}
                    secondaryClr="bg-[#EAEAEA]"
                  />
                </div>

                {isMobile && (
                  <div className="flex  pt-6 md:pt-0 justify-center items-center gap-3 lg:pe-20">
                    <button
                      onClick={() => swiperRef2.current?.slidePrev()}
                      className="cursor-pointer"
                    >
                      <Image
                        alt=""
                        className="md:w-auto md:h-auto h-12 w-12"
                        src={Images.landingPage.modernSliderBtn}
                      />
                    </button>
                    <button
                      onClick={() => swiperRef2.current?.slideNext()}
                      className=" cursor-pointer"
                    >
                      <Image
                        alt=""
                        className="md:w-auto md:h-auto h-12 w-12"
                        src={Images.landingPage.modernSliderBtn2}
                      />
                    </button>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className=" px-0 relative ">
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
              swiperRef3.current = swiper;
            }}
          >
            {[
              {
                title: (
                  <>
                    Designed For <br /> Real life
                  </>
                ),
                desc: (
                  <>
                    Most hormone clinics are built around <br /> inconvenience —
                    appointments, <br /> gatekeeping, friction. We built
                    Paramount <br /> Rx to eliminate all of that.
                  </>
                ),
                info: "Our experience is designed to be:",
                bullets: ["Efficient", "Private", "Modern", "Reliable"],

                p1: "Because performance infrastructure should match modern lifestyles.",
                imageSrc: "cleanRoutine7.png",
              },

              {
                title: (
                  <>
                    Not A Wellness <br /> Trend.
                  </>
                ),
                desc: (
                  <>
                    Hormone optimization isn’t a fad. It’s a <br /> category
                    shift.
                  </>
                ),
                info: "More people are realizing that:",
                bullets: [
                  "Aging isn’t binary",
                  "Decline isn’t inevitable",
                  "Baselines are adjustable",
                ],

                p1: "We’re entering an era where biology is something you actively manage — not passively experience. Hormones are at the center of that shift.",
                imageSrc: "cleanRoutine9.png",
              },
              {
                title: (
                  <>
                    For People Who <br /> Expect More.
                  </>
                ),
                desc: (
                  <>
                    Paramount HealthRx isn’t built for casual health <br />{" "}
                    consumers.
                  </>
                ),
                info: "It’s built for people who:",
                bullets: [
                  "Track their performance",
                  "Care about long-term vitality",
                  "Think in decades, not weeks",
                  "Invest in themselves intentionally",
                ],

                p1: "If that resonates, you’re in the right place.",
                imageSrc: "cleanRoutine8.png",
              },
              {
                title: (
                  <>
                    Modern Care. <br /> Zero Noise.
                  </>
                ),
                desc: (
                  <>
                    We removed everything that makes <br /> traditional hormone
                    care frustrating:
                  </>
                ),
                // info: "We exist for people who want:",
                bullets: [
                  "Endless clinic visits",
                  "Outdated processes",
                  "Overcomplicated onboarding",
                  "Inconsistent supply",
                ],

                p1: "And replaced it with a clean, modern ecosystem built around clarity and execution.",
                imageSrc: "cleanRoutine10.png",
              },
              {
                title: (
                  <>
                    Stackable With <br />
                    Your Lifestyle.
                  </>
                ),
                desc: (
                  <>
                    Hormone optimization doesn’t exist in <br /> isolation — it
                    compounds with:
                  </>
                ),
                // info: "Vitamins support the chemistry behind everything:",
                bullets: [
                  "Training discipline",
                  "Sleep quality",
                  "Peptide protocols",
                  "Nutrition strategy",
                  "Stress management",
                ],

                p1: "When the foundation is strong, everything else scales. That’s the difference between guessing and optimizing.",
                imageSrc: "cleanRoutine11.png",
              },
              {
                title: (
                  <>
                    Why <br /> Paramount HealthRx
                  </>
                ),
                desc: (
                  <>
                    Because you shouldn’t have to navigate <br /> hormone
                    optimization through outdated <br /> systems.
                  </>
                ),
                info: "We exist for people who want:",
                bullets: [
                  "Elevated baselines",
                  "Cleaner execution",
                  "Premium infrastructure",
                  "Long-term performance",
                ],

                p1: "No hype. No fluff. Just modern hormone optimization done right.",
                imageSrc: "cleanRoutine12.png",
              },
            ].map((slide, index) => (
              <SwiperSlide
                key={index}
                className={` ${index === 0 ? "bg-[url('/images/cleanRoutine7.png')]" : index === 1 ? "bg-[url('/images/cleanRoutine8.png')]" : index === 2 ? "bg-[url('/images/cleanRoutine9.png')]" : index === 3 ? "bg-[url('/images/cleanRoutine10.png')]" : index === 4 ? "bg-[url('/images/cleanRoutine11.png')]" : "bg-[url('/images/cleanRoutine12.png')]"} bg-cover bg-no-repeat bg-center px-4 xl:px-8 min-h-[90dvh] h-full space-y-2 md:space-y-10 py-6 md:py-24`}
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
                          onClick={() => swiperRef3.current?.slidePrev()}
                          className="cursor-pointer"
                        >
                          <span className="w-17 h-17 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                        <button
                          onClick={() => swiperRef3.current?.slideNext()}
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
                          onClick={() => swiperRef3.current?.slidePrev()}
                          className="cursor-pointer"
                        >
                          <span className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                        <button
                          onClick={() => swiperRef3.current?.slideNext()}
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

      <div className="container mx-auto px-4 xl:px-8 md:py-24 max-w-7xl space-y-10 md:space-y-18">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <h2 className="text-3xl md:text-6xl font-bold">
            The Next Era of Human Optimization
          </h2>

          <p className="text-lg text-slate-700 md:text-2xl md:ps-12">
            We’re entering a new phase of personal performance — one where
            biology becomes programmable.
          </p>
        </div>
        <div className=" rounded-3xl bg-linear-0 from-[#FFF1EB] to-[#ACE0F9] relative flex items-center justify-end ">
          <div className="py-8 lg:px-8 px-4 sm:p-16 grid grid-cols-12 gap-4 bg-[url('/images/logoWhite.svg')] bg-size-[800px] bg-no-repeat! bg-center">
            <div className="col-span-12 lg:col-span-8 space-y-4 md:space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl text-start lg:text-4xl text-neutral-900 font-extrabold  ">
                  Peptides are at the center of that shift.
                </h2>
                <p className="text-slate-700 text-lg md:text-2xl">
                  They represent a move away from generic supplementation toward
                  precision biological signaling — targeted, intentional, and
                  evolving rapidly with modern science.
                </p>
              </div>

              <ul className="space-y-3.5">
                <li className="flex gap-2 items-center text-gray-800 md:text-xl text-lg">
                  <CheckCircleIcon /> This isn’t a trend.
                </li>
                <li className="flex gap-2 items-center text-gray-800 md:text-xl text-lg">
                  <CheckCircleIcon /> It’s a category shift.
                </li>
              </ul>
            </div>
          </div>
          <Image
            alt="pills"
            src={Images.landingPage.dnaSpiral}
            className=" absolute  lg:block hidden "
          />
        </div>
      </div>
    </>
  );
};

export default Page;
