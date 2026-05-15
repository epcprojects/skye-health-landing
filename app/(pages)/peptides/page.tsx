"use client";
import SliderIndicator from "@/app/components/SliderIndicator";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { Images } from "@/app/images";
import {
  ArrowIcon,
  BrainIcon,
  CheckCircleIcon,
  CheckIcon,
  DNAIcon,
  SparkleIcon,
  TargetIcon,
  WhiteArrow,
} from "@/public/icons";
import ActivityIcon from "@/public/icons/ActivityIcon";
import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";


import { StaticImageData } from "next/image";
import { useMemo, useRef } from "react";
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
import "swiper/css";

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

const bulletIconBgClass = "bg-radial from-white from-40% to-pacific-blue";
const bulletIconTextClass = "text-pacific-blue";

const peptidesBuiltFor = [
  { label: "Track performance, not trends" },
  { label: "Care about recovery as much as training" },
  { label: "Optimize hormones and metabolism intelligently" },
  { label: "Invest in long-term longevity" },
  { label: "Want measurable biological leverage" },
];

const peptidesBenefits = [
  { label: "Pharmaceutical-grade synthesis standards" },
  { label: "Advanced purity validation methods" },
  { label: "Controlled cold-chain handling" },
  { label: "Strict supplier vetting" },
  { label: "Transparent batch sourcing" },
];

const paramountStandards = [
  { label: "No filler inventory" },
  { label: "No “me too” products" },
  { label: "No mystery sourcing" },
  { label: "No outdated compounds" },
];

const paramountBuiltFor = [
  { label: "High-performing professionals" },
  { label: "Gym-literate consumers" },
  { label: "Biohackers who value simplicity" },
  { label: "Founders and athletes who want signal, not noise" },
];

const paramountProtocols = [
  { label: "Stack-friendly compounds" },
  { label: "Consistent availability" },
  { label: "Clear dosing formats" },
  { label: "Reliable fulfillment" },
];
const Page = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperRef2 = useRef<SwiperType | null>(null);
  const isMobile = useIsMobile();

  const dispatch = useAppDispatch();
const productsSwiperRef = useRef<SwiperType | null>(null);

const { data, loading, error: appolloError } = useQuery<
  AllProductsType,
  AllProductsVariables
>(ALL_PRODUCTS, {
  variables: {
    search: undefined,
    category: "Peptides",
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
      <section className="bg-linear-[245deg] hidden overflow-hidden from-[#86B7EF] pt-30 lg:pt-28 to-[#DCF0F7]  relative">
        <div className="noise absolute! inset-0 w-full" />
        <div className="container items-end lg:items-center  gap-6 lg:gap-10 mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-7xl px-4 xl:px-8 relative">
          <div className="space-y-2 lg:space-y-6 py-2">
            <div className="space-y-2 lg:space-y-4 flex flex-col lg:flex-none items-center lg:items-start">
              <span className="rounded-[10px] text-text-secondary-700 ps-6 relative text-sm font-boldrounded-md bg-white px-2 py-0.5 w-fit space-x-2">
                <div className="absolute left-3 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-3.5 w-3.5 animate-pulse items-center justify-center rounded-full bg-sky-300/35">
                    <div className="h-2 w-2 rounded-full animate-none bg-green-500"></div>
                  </div>
                </div>
                Peptides
              </span>

              <div className="space-y-2">
                <h1 className="text-neutral-900 text-4xl  lg:text-start text-center xl:text-[54px] leading-none tracking-tighter font-extrabold">
                  Precision biology. Real results. No filler.
                </h1>
              </div>
            </div>

            <p className="text-gray-800  lg:text-start text-center text-lg xl:text-xl font-normal">
              Peptides are the next evolution of performance, longevity, and
              recovery optimization. At Paramount HealthRx, we curate
              high-purity compounds trusted by athletes, founders, clinicians,
              and performance-driven individuals who want more than generic
              supplements.
            </p>

            <p className="text-gray-800  lg:text-start text-center text-base xl:text-sm font-medium italic">
              This is not entry — level wellness. This is advanced biology —
              simplified.
            </p>

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
              src={Images.landingPage.heroMockup}
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
          className={`bg-[url('/images/slideExp.png')] bg-cover bg-no-repeat flex items-center justify-center lg:pt-28 pt-24 bg-top px-4 xl:px-8 min-h-[85dvh] h-full space-y-2 md:space-y-10 py-6 md:py-24`}
        >
          <div className="container px-4 md:px-8 relative mx-auto max-w-7xl">
            <div className="  grid grid-cols-1 md:grid-cols-3 gap-8 ">
              <div className="space-y-5 md:col-span-2  md:space-y-12">
                <div className="space-y-3">
                  <h2 className="text-white capitalize font-extrabold md:leading-20 text-3xl md:text-7xl">
                    A better peptide <br /> experience
                  </h2>

                  <p className="text-neutral-200 text-xl md:leading-9 md:text-2xl">
                    The peptide space has historically been <br /> fragmented —
                    confusing sites, inconsistent <br /> quality, and poor user
                    experience.
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
                  Paramount HealthRx delivers:
                </h2>
                <div className="space-y-3">
                  <div>
                    <ul className="space-y-3.5">
                      {[
                        "Premium compound selection",
                        "Streamlined ordering",
                        "Reliable shipping",
                        "Discreet packaging",
                        "Consistent inventory",
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
                    All backed by a brand built for modern performance culture.
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
        Peptides
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
        <div className="text-neutral-600 text-center">No Product Found</div>
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
        href="/products?category=Peptides"
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

      {/* bg-[url('/images/swirl.svg')] bg-no-repeat */}
      {/* What are peptides? */}
      <section className="bg-[url('/images/swirl.svg')] bg-no-repeat bg-contain">
        <div className="container mx-auto max-w-7xl px-4 xl:px-8 pt-8 xl:pt-12  pb-8 xl:pb-16">
          <div className="flex flex-col md:flex-row gap-4 md:my-10 lg-flex-row">
            <h2 className="text-4xl sm:text-5xl xl:text-[54px] font-extrabold text-neutral-900 mr-6 flex-1">
              What Are <p className="text-secondary">Peptides?</p>
            </h2>
            <p className="text-gray-800 flex-2 lg:text-start text-lg xl:text-xl font-normal">
              Peptides are short chains of amino acids that act as targeted
              biological signals inside the body. Instead of flooding your
              system with broad compounds, peptides communicate with specific
              receptors to drive precise outcomes — recovery, fat metabolism,
              skin health, cognitive clarity, and more.
            </p>
          </div>

          {/*  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            <div
              className="rounded-4xl bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(187,235,242,0.50)_100%)]
 p-4 lg:p-5 sm:p-10 sm:pb-0 pb-0"
            >
              <Image
                alt=""
                className="xl:-mt-14"
                src={Images.landingPage.PeptideTherapy}
              />
            </div>

            <div className="md:min-h-110 p-4 sm:p-7.5 rounded-4xl flex items-center justify-end bg-no-repeat bg-cover bg-center">
              <p className="text-gray-800 flex-2.5 lg:text-start text-lg xl:text-xl font-normal">
                Peptides are short chains of amino acids that act as targeted
                biological signals inside the body. Instead of flooding your
                system with broad compounds, peptides communicate with specific
                receptors to drive precise outcomes — recovery, fat metabolism,
                skin health, cognitive clarity, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-t from-[#FFF1EB] to-[#ACE0F9]">
        <div className="container grid lg:grid-cols-2 sm:grid-cols-1 mx-auto max-w-7xl px-4 xl:px-8 pt-8  pb-8 xl:py-16 gap-8">
          <div className="bg-white/50  rounded-3xl space-y-4.5 p-5 md:p-11 border border-white">
            <h2 className="text-3xl md:text-42 md:leading-12 font-extrabold text-neutral-900 md:mb-20 flex-1">
              Who{" "}
              <span className="text-secondary">
                Peptides <br />
                Are For.
              </span>
            </h2>

            <div className="mt-6">
              <p className="text-gray-800 text-lg md:text-2xl font-bold mb-5">
                Peptides aren’t for everyone - <br />
                and that’s intentional.
              </p>

              <p className="text-gray-800 text-base lg:text-lg my-2.5">
                They’re built for people who:
              </p>

              {/* Points */}
              <ul className="space-y-2 text-base lg:text-lg text-gray-800">
                {peptidesBuiltFor.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span
                      className={`
                                     w-4.5 h-4.5 lg:h-6 lg:w-6 rounded-full
                                    flex items-center justify-center
                                    ${bulletIconBgClass}
                                    ${bulletIconTextClass}
                                  `}
                    >
                      <CheckIcon
                        fill="currentColor"
                        width={"13"}
                        height={"9"}
                      />
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>

              {/*  */}
              <p className="text-gray-800 text-base lg:text-lg my-4">
                If you’re already dialed in on sleep, training, and nutrition,
                peptides are the <b>next layer of optimization.</b>
              </p>
            </div>
          </div>
          <div className="bg-white/50  rounded-3xl space-y-4.5 p-5 md:p-11 border border-white">
            <h2 className="text-3xl md:text-42 md:leading-12 font-extrabold text-neutral-900 md:mb-20 flex-1">
              Why High-Quality
              <p className="text-secondary">Peptides Matter.</p>
            </h2>

            <div className="mt-6">
              <p className="text-gray-800 text-lg md:text-2xl font-bold mb-5">
                Not all peptides are created
                <br />
                equal.
              </p>

              <p className="text-gray-800 text-base lg:text-lg my-2.5">
                Our approach prioritizes:
              </p>

              {/* Points */}
              <ul className="space-y-2 text-base lg:text-lg text-gray-800">
                {peptidesBenefits.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span
                      className={`
                                     w-4.5 h-4.5 lg:h-6 lg:w-6 rounded-full
                                    flex items-center justify-center
                                    ${bulletIconBgClass}
                                    ${bulletIconTextClass}
                                  `}
                    >
                      <CheckIcon
                        fill="currentColor"
                        width={"13"}
                        height={"9"}
                      />
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>

              {/*  */}
              <p className="text-gray-800 text-base lg:text-lg my-4">
                Because when you’re working with precision biology,
                <br />
                <b>quality isn’t a luxury — it’s the baseline.</b>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50    md:py-12 px-4 md:px-0  pb-16 relative">
        <div className="relative space-y-5 md:space-y-10">
          <div className="container mx-auto max-w-7xl px-4 xl:px-8">
            <div className="md:col-span-2 mt-12 flex gap-8 items-center flex-col md:flex-row justify-between">
              <div className="space-y-5">
                <h2 className="text-neutral-900 font-extrabold text-3xl md:text-6xl">
                  What Peptides Can Support
                </h2>

                <p className="text-base md:text-lg text-neutral-900">
                  When properly managed, hormone optimization can dramatically
                  impact both short-term performance and long-term resilience.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-3 lg:pe-20">
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
                title: "Recovery & Repair",
                desc: "Accelerate tissue recovery and support connective integrity so you can train harder and bounce back faster.",
                icon: <ActivityIcon />,
              },
              {
                title: "Body Composition",
                desc: "Target metabolic signaling pathways tied to fat oxidation, nutrient partitioning, and lean mass preservation.",
                icon: <TargetIcon />,
              },
              {
                title: "Longevity & Cellular Health",
                desc: "Support cellular resilience, mitochondrial signaling, and healthy aging pathways.",
                icon: <DNAIcon />,
              },
              {
                title: "Skin & Aesthetics",
                desc: "Enhance collagen signaling, skin elasticity, and overall dermal quality from the inside out.",
                icon: <SparkleIcon fill="#28C93B" />,
              },
              {
                title: "Cognitive Optimization",
                desc: "Select peptides are associated with neurotransmitter modulation and mental clarity support.",
                icon: <BrainIcon fill="#A23BFA" />,
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
              This is why peptides are increasingly used in performance clinics,
              regenerative protocols, and forward-thinking longevity stacks.
            </span>
          </div>
        </div>
      </section>

      {/*  */}
      <section>
        <div>
          <div className="bg-[linear-gradient(45deg,#E9DEFA_0%,#FFF6EB_100%)]">
            <div className="container grid lg:grid-cols-2 sm:grid-cols-1 mx-auto max-w-7xl px-4 xl:px-8 pt-8 xl:pt-12  pb-8 xl:pb-16 gap-8">
              <div
                className="bg-[linear-gradient(180deg,#FFF_41.57%,rgba(255,255,255,0)_91.09%)]
  rounded-3xl space-y-4.5 p-4 md:p-8"
              >
                <div className="space-y-2">
                  <h2 className="font-bold text-xl lg:text-[40px] text-black">
                    The Paramount HealthRx Standard
                  </h2>
                  <b className="text-[22px]">
                    We built Paramount HealthRx around a simple principle:
                  </b>

                  <div className="">
                    <p className="text-gray-800 text-base lg:text-lg">
                      If it&apos;s not elite, it doesn&apos;t ship. Our peptide
                      catalog is curated — not crowded. Every compound is
                      selected based on real demand, real protocols, and real
                      outcomes.
                    </p>

                    {/* Bullet Intro */}
                    <p className="text-gray-800 text-base lg:text-lg mt-8 mb-4">
                      <b>What that means for you:</b>
                    </p>

                    {/* Bullet List */}
                    <div className="flex">
                      <ul className="flex-[1.5] space-y-2 text-base lg:text-lg text-gray-800">
                        {paramountStandards.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <span
                              className={`
                                       w-4.5 h-4.5 lg:h-6 lg:w-6 rounded-full
                                      flex items-center justify-center
                                      ${bulletIconBgClass}
                                      ${bulletIconTextClass}
                                    `}
                            >
                              <CheckIcon
                                fill="currentColor"
                                width={"13"}
                                height={"9"}
                              />
                            </span>
                            {item.label}
                          </li>
                        ))}
                      </ul>
                      <div className="flex-1 relative">
                        <Image
                          src={Images.landingPage.HandAndPills}
                          alt="Pills"
                          className="absolute lg:-top-8 left-0 w-175"
                        />
                      </div>
                    </div>

                    {/* Footer Text */}
                    <p className="text-gray-800 text-base lg:text-lg mt-5">
                      Only peptides that matter.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="bg-[linear-gradient(180deg,#FFF_41.57%,rgba(255,255,255,0)_91.09%)]
  rounded-3xl space-y-4.5 md:p-8 p-4"
              >
                <div className="space-y-2">
                  <h2 className="font-bold text-xl lg:text-[40px] text-black">
                    Designed For Modern Optimizers
                  </h2>
                  <b className="text-[22px]">
                    Most peptide platforms feel clinical, outdated, or sketchy.
                  </b>

                  <div className="space-y-3 lg:space-y-6">
                    {/* Bullet Intro */}

                    <p className="text-gray-800 text-base lg:text-lg mt-8 mb-4">
                      <b>We built Paramount HealthRx for a different user:</b>
                    </p>

                    {/* Bullet List */}
                    <div className="flex">
                      <div className="flex-[1.5]">
                        <ul className="text-base lg:text-lg text-gray-800">
                          {paramountBuiltFor.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <span
                                className={`
                                       w-4.5 h-4.5 lg:h-6 lg:w-6 rounded-full
                                      flex items-center justify-center
                                      ${bulletIconBgClass}
                                      ${bulletIconTextClass}
                                    `}
                              >
                                <CheckIcon
                                  fill="currentColor"
                                  width={"13"}
                                  height={"9"}
                                />
                              </span>
                              {item.label}
                            </li>
                          ))}
                        </ul>
                        {/* Footer Text */}
                        <p className="text-gray-800 text-base lg:text-lg mt-6">
                          You shouldn’t need a medical degree to navigate
                          advanced compounds. You just need the right platform.
                        </p>
                      </div>
                      <div className="flex-1 relative">
                        <Image
                          src={Images.landingPage.HeartInHand}
                          alt="Pills"
                          className="absolute top-0 left-0 lg:w-125 w-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="lg:col-span-2 p-8 lg:p-10 bg-[linear-gradient(180deg,#FFF_41.57%,rgba(255,255,255,0)_91.09%)] rounded-[40px]
        grid gap-8 sm:gap-16 md:items-start items-center
        grid-cols-1 sm:grid-cols-2"
              >
                <div className="sm:order-2">
                  <Image src={Images.landingPage.recovery} alt={""} />
                </div>

                <div className="sm:order-1 space-y-3 lg:space-y-7">
                  <div className="space-y-2">
                    <h2 className="font-bold text-xl lg:text-[32px] text-black">
                      Built For Real Protocols
                    </h2>

                    <div className="space-y-3 lg:space-y-6">
                      <p className="text-gray-800 text-base lg:text-lg">
                        Peptides are rarely used in isolation. They’re part of
                        intentional stacks — layered with training, hormones,
                        nutrition, and recovery protocols.
                      </p>

                      {/* Bullet Intro */}
                      <p className="text-gray-800 text-base lg:text-lg">
                        That’s why our ecosystem is built around:
                      </p>

                      {/* Bullet List */}
                      <ul className="space-y-2 text-base lg:text-lg text-gray-800">
                        {paramountProtocols.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <span
                              className={`
                                       w-4.5 h-4.5 lg:h-6 lg:w-6 rounded-full
                                      flex items-center justify-center
                                      ${bulletIconBgClass}
                                      ${bulletIconTextClass}
                                    `}
                            >
                              <CheckIcon
                                fill="currentColor"
                                width={"13"}
                                height={"9"}
                              />
                            </span>
                            {item.label}
                          </li>
                        ))}
                      </ul>

                      {/* Footer Text */}
                      <p className="text-gray-800 text-base lg:text-lg">
                        Because optimization only works when execution is
                        frictionless.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              swiperRef2.current = swiper;
            }}
          >
            {[
              {
                title: (
                  <>
                    purity first. <br /> always.
                  </>
                ),
                desc: (
                  <>
                    <span className="max-w-105 block">
                      In peptide science, purity drives everything — stability,
                      consistency, and outcomes. High-purity synthesis and
                      validated manufacturing processes are critical for
                      producing reliable peptides that deliver reproducible
                      results.
                    </span>
                  </>
                ),
                info: "That’s why we obsess over:",
                bullets: [
                  "Batch integrity",
                  "Stability during transport",
                  "Storage protocols",
                  "Handling standards",
                ],

                p1: "This is performance chemistry — not commodity supplements.",
                imageSrc: "cleanRoutine7.png",
              },

              {
                title: (
                  <>
                    Trusted By <br /> Serious Users
                  </>
                ),
                desc: (
                  <>
                    <span className="max-w-105 block">
                      Paramount HealthRx is built for people who demand more
                      from their biology. Our customers aren’t casual shoppers.
                    </span>
                  </>
                ),
                info: "They’re:",
                bullets: [
                  "Competitive lifters",
                  "Longevity investors",
                  "Aesthetic optimizers",
                  "High-output entrepreneurs",
                  "Protocol-driven clinicians",
                ],

                p1: "They don’t want hype.They want leverage.",
                imageSrc: "cleanRoutine9.png",
              },
              {
                title: (
                  <>
                    A better peptide <br /> experience
                  </>
                ),
                desc: (
                  <>
                    <span className="max-w-105 block">
                      The peptide space has historically been fragmented —
                      confusing sites, inconsistent quality, and poor user
                      experience.
                    </span>
                  </>
                ),
                info: "Paramount HealthRx delivers:",
                bullets: [
                  "Premium compound selection",
                  "Streamlined ordering",
                  "Reliable shipping",
                  "Discreet packaging",
                  "Consistent inventory",
                ],

                p1: "All backed by a brand built for modern performance culture.",
                imageSrc: "cleanRoutine8.png",
              },
            ].map((slide, index) => (
              <SwiperSlide
                key={index}
                className={` ${index === 0 ? "bg-[url('/images/slidePurify.png')]" : index === 1 ? "bg-[url('/images/slideTrust.png')]" : index === 2 ? "bg-[url('/images/slideExp.png')]" : index === 3 ? "bg-[url('/images/cleanRoutine10.png')]" : index === 4 ? "bg-[url('/images/cleanRoutine11.png')]" : "bg-[url('/images/cleanRoutine12.png')]"} bg-cover bg-no-repeat bg-center px-4 xl:px-8 min-h-[90dvh] h-full space-y-2 md:space-y-10 py-6 md:py-24`}
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
                          onClick={() => swiperRef2.current?.slidePrev()}
                          className="cursor-pointer"
                        >
                          <span className="w-17 h-17 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                        <button
                          onClick={() => swiperRef2.current?.slideNext()}
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
                        total={3}
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
                          onClick={() => swiperRef2.current?.slidePrev()}
                          className="cursor-pointer"
                        >
                          <span className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center">
                            <WhiteArrow />
                          </span>
                        </button>
                        <button
                          onClick={() => swiperRef2.current?.slideNext()}
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

      <div className="container mx-auto px-4 xl:px-8 pb-12 pt-8 md:pt-24 max-w-7xl space-y-10 md:space-y-18">
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

      <section className="pt-8 xl:pt-24 pb-8 xl:pb-16 container mx-auto max-w-7xl px-4 xl:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <div className="bg-peace relative min-h-90 md:min-h-160 rounded-4xl flex flex-col justify-between items-center pt-4 md:pt-8 gap-8 md:gap-20 overflow-hidden">
            <div className="flex flex-col items-center gap-4 ">
              <p className="text-2xl md:text-4xl text-center font-extrabold text-neutral-900">
                Why Paramount HealthRx?
              </p>
            </div>
            <div className="absolute bottom-0 end-0">
              <Image
                alt="mobile"
                src={Images.landingPage.landingMockup3}
                className="-mb-8"
              />
            </div>
          </div>
          <div className="relative min-h-140 md:min-h-180  p-4 md:p-6 flex items-end justify-end rounded-4xl">
            <Image
              src={Images.vitaminpageimages.why}
              alt="background"
              fill
              className="object-cover rounded-4xl"
            />
            <div className="w-full">
              <h2 className="text-xl md:text-3xl font-extrabold text-white relative">
                We exist for people who:
              </h2>
              <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-4 w-full xl:w-auto">
                <div className="bg-white/75 border-2 border-white flex flex-row   items-center  gap-2 lg:gap-4 rounded-xl md:rounded-3xl  p-2 xl:p-6">
                  <Image
                    src={Images.vitaminpageimages.why1}
                    alt="Test Tube"
                    className="drop-shadow lg:w-11 lg:h-11 w-9 h-9"
                  />
                  <p className="text-sm  xl:text-xl">
                    Want elite compounds without noise
                  </p>
                </div>

                <div className="bg-white/75 border-2 border-white flex flex-row   items-center  gap-2 lg:gap-4 rounded-xl md:rounded-3xl  p-2 xl:p-6">
                  <Image
                    src={Images.vitaminpageimages.why2}
                    alt="Test Tube"
                    className="drop-shadow lg:w-11 lg:h-11 w-9 h-9"
                  />
                  <p className="text-sm xl:text-xl">
                    Value purity and precision
                  </p>
                </div>

                <div className="bg-white/75 border-2 border-white flex flex-row   items-center  gap-2 lg:gap-4 rounded-xl md:rounded-3xl  p-2 xl:p-6">
                  <Image
                    src={Images.vitaminpageimages.why3}
                    alt="Test Tube"
                    className="drop-shadow lg:w-11 lg:h-11 w-9 h-9"
                  />
                  <p className="text-sm  xl:text-xl">
                    Think long-term about performance
                  </p>
                </div>
                <div className="bg-white/75 border-2 border-white flex flex-row   items-center  gap-2 lg:gap-4 rounded-xl md:rounded-3xl  p-2 xl:p-6">
                  <Image
                    src={Images.vitaminpageimages.why4}
                    alt="Test Tube"
                    className="drop-shadow lg:w-11 lg:h-11 w-9 h-9"
                  />
                  <p className="text-sm  xl:text-xl">
                    Demand better than supplement-store quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
