"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { images } from "../ui";
import { NewArrowIcon } from "@/public/icons";

import "swiper/css";
import TreatmentCard from "../components/cards/TreatmentCard";
import TreatmentFilters, {
  TreatmentFilterValue,
} from "../components/cards/TreatmentFilters";
import TreatmentProductCard from "../components/cards/TreatmentProductCard";
import ExpandableTreatmentCard from "../components/cards/HoverTreatmentCard";

const heroSlides = [
  {
    id: 1,
    backgroundImage: "/images/HeroBgImage.png",
    title: "Your Health. Elevated.",
    description:
      "Built on years of peptide expertise. Delivered through personalized physician care",
    logo: images.landingpageimages.WhiteSkyLogo,
    ringImage: images.landingpageimages.HeroRingImage,
    heroImage: images.landingpageimages.HeroRightImage,
  },
  {
    id: 2,
    backgroundImage: "/images/HeroBgImage.png",
    title: "Modern Medicine. Personalized.",
    description:
      "Personalized treatments designed around your individual health goals.",
    logo: images.landingpageimages.WhiteSkyLogo,
    ringImage: images.landingpageimages.HeroRingImage,
    heroImage: images.landingpageimages.HeroRightImage,
  },
  {
    id: 3,
    backgroundImage: "/images/HeroBgImage.png",
    title: "Feel Better. Perform Better.",
    description:
      "Physician-guided care to help you feel stronger and perform at your best.",
    logo: images.landingpageimages.WhiteSkyLogo,
    ringImage: images.landingpageimages.HeroRingImage,
    heroImage: images.landingpageimages.HeroRightImage,
  },
  {
    id: 4,
    backgroundImage: "/images/HeroBgImage.png",
    title: "Healthcare. Reimagined.",
    description:
      "Premium healthcare backed by expertise and delivered directly to you.",
    logo: images.landingpageimages.WhiteSkyLogo,
    ringImage: images.landingpageimages.HeroRingImage,
    heroImage: images.landingpageimages.HeroRightImage,
  },
];
const treatmentCards = [
  {
    id: 1,
    title: "Weight loss",
    buttonLabel: "Start losing weight",
    backgroundImage: "/images/WeightLossCardImage.png",
    backgroundColor: "#AFC6E5",
    hoverText: "$199 per month",
    hoverBackgroundColor: "#1F3A75",
    onClick: () => {
      console.log("Weight loss card clicked");
    },
    onButtonClick: () => {
      console.log("Start losing weight clicked");
    },
  },
  {
    id: 2,
    title: "Peptides",
    buttonLabel: "Shop peptides",
    backgroundImage: "/images/PeptidesCardBgImage.png",
    backgroundColor: "#AFC6E5",
    hoverText: "$199 per month",
    hoverBackgroundColor: "#1F3A75",
    onClick: () => {
      console.log("Peptides card clicked");
    },
    onButtonClick: () => {
      console.log("Shop peptides clicked");
    },
  },
  {
    id: 3,
    title: "Hormones",
    buttonLabel: "Reserve your spot",
    backgroundImage: "/images/HormonesCardImage.png",
    backgroundColor: "#AFC6E5",
    hoverText: "Coming soon",
    hoverBackgroundColor: "#8FC0C2",
    onClick: () => {
      console.log("Hormones card clicked");
    },
    onButtonClick: () => {
      console.log("Reserve your spot clicked");
    },
  },
  {
    id: 4,
    title: "Optimize everything",
    buttonLabel: "Start your journey",
    backgroundImage: "/images/OptimizeCardImage.png",
    backgroundColor: "#AFC6E5",
    hoverText: "Coming soon",
    hoverBackgroundColor: "#8FC0C2",
    onClick: () => {
      console.log("Optimize card clicked");
    },
    onButtonClick: () => {
      console.log("Start your journey clicked");
    },
  },
];
const products = [
  {
    id: 1,
    title: "GLP-1s Vial",
    image: images.landingpageimages.HormonesProductImage,
    description:
      "Can help relax blood vessels, supporting sexual function, and vascular health.",
    price: "$199.00/month",
    inStock: true,
    newIn: true,
    soldOut: false,
    onGetStarted: () => {
      console.log("GLP-1s Vial get started");
    },
    onLearnMore: () => {
      console.log("GLP-1s Vial learn more");
    },
  },
  {
    id: 2,
    title: "GLP-1s Pen",
    image: images.landingpageimages.HormonesProductImage,
    description:
      "Supports healthy weight management through personalized physician care.",
    price: "$249.00/month",
    inStock: true,
    newIn: false,
    soldOut: false,
    onGetStarted: () => {
      console.log("GLP-1s Pen get started");
    },
    onLearnMore: () => {
      console.log("GLP-1s Pen learn more");
    },
  },
  {
    id: 3,
    title: "Hormone Support",
    image: images.landingpageimages.HormonesProductImage,
    description:
      "Personalized hormone support designed around your individual health needs.",
    price: "$179.00/month",
    inStock: false,
    newIn: true,
    soldOut: false,
    onGetStarted: () => {
      console.log("Hormone Support get started");
    },
    onLearnMore: () => {
      console.log("Hormone Support learn more");
    },
  },
  {
    id: 4,
    title: "Peptide Therapy",
    image: images.landingpageimages.HormonesProductImage,
    description:
      "Premium peptide therapy supporting recovery, energy, and performance.",
    price: "$299.00/month",
    inStock: false,
    newIn: false,
    soldOut: true,
    onGetStarted: () => {
      console.log("Peptide Therapy get started");
    },
    onLearnMore: () => {
      console.log("Peptide Therapy learn more");
    },
  },
];
const hoverTreatmentCards = [
  {
    id: 1,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "GLP-1s Vial",
    productDescription:
      "Can help relax blood vessels, supporting sexual function, and vascular health.",
    productPrice: "$199.00/month",
    hoverImage: images.landingpageimages.LossWeightCardImage,
    hoverBadge: "Weight Loss",
    hoverTitle: "Lose Weight with Skye",
    hoverActionLabel: "Lose weight with Skye",
    onGetStarted: () => console.log("Card 1 get started"),
    onShopNow: () => console.log("Card 1 shop now"),
    onHoverGetStarted: () => console.log("Card 1 hover get started"),
    onHoverAction: () => console.log("Card 1 hover action"),
  },
  {
    id: 2,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Peptide Therapy",
    productDescription:
      "Premium peptide support for recovery, energy, and overall performance.",
    productPrice: "$249.00/month",
    hoverImage: images.landingpageimages.BetterSkinImage,
    hoverBadge: "Peptides",
    hoverTitle: "Feel Better with Skye",
    hoverActionLabel: "Explore peptides",
    onGetStarted: () => console.log("Card 2 get started"),
    onShopNow: () => console.log("Card 2 shop now"),
    onHoverGetStarted: () => console.log("Card 2 hover get started"),
    onHoverAction: () => console.log("Card 2 hover action"),
  },
  {
    id: 3,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Hormone Support",
    productDescription:
      "Personalized hormone support designed around your health and goals.",
    productPrice: "$299.00/month",
    hoverImage: images.landingpageimages.LossWeightCardImage,
    hoverBadge: "Hormones",
    hoverTitle: "Optimize with Skye",
    hoverActionLabel: "Explore hormones",
    onGetStarted: () => console.log("Card 3 get started"),
    onShopNow: () => console.log("Card 3 shop now"),
    onHoverGetStarted: () => console.log("Card 3 hover get started"),
    onHoverAction: () => console.log("Card 3 hover action"),
  },
  {
    id: 4,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Recovery Support",
    productDescription:
      "Designed to support recovery, mobility, and everyday physical performance.",
    productPrice: "$189.00/month",
    hoverImage: images.landingpageimages.BetterSkinImage,
    hoverBadge: "Recovery",
    hoverTitle: "Recover Faster with Skye",
    hoverActionLabel: "Explore recovery",
    onGetStarted: () => console.log("Card 4 get started"),
    onShopNow: () => console.log("Card 4 shop now"),
    onHoverGetStarted: () => console.log("Card 4 hover get started"),
    onHoverAction: () => console.log("Card 4 hover action"),
  },
  {
    id: 5,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Energy Support",
    productDescription:
      "Personalized support for consistent energy, focus, and daily performance.",
    productPrice: "$159.00/month",
    hoverImage: images.landingpageimages.LossWeightCardImage,
    hoverBadge: "Energy",
    hoverTitle: "Boost Energy with Skye",
    hoverActionLabel: "Explore energy",
    onGetStarted: () => console.log("Card 5 get started"),
    onShopNow: () => console.log("Card 5 shop now"),
    onHoverGetStarted: () => console.log("Card 5 hover get started"),
    onHoverAction: () => console.log("Card 5 hover action"),
  },
  {
    id: 6,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Sleep Support",
    productDescription:
      "Supports better sleep quality, relaxation, and overnight recovery.",
    productPrice: "$149.00/month",
    hoverImage: images.landingpageimages.BetterSkinImage,
    hoverBadge: "Sleep",
    hoverTitle: "Sleep Better with Skye",
    hoverActionLabel: "Explore sleep support",
    onGetStarted: () => console.log("Card 6 get started"),
    onShopNow: () => console.log("Card 6 shop now"),
    onHoverGetStarted: () => console.log("Card 6 hover get started"),
    onHoverAction: () => console.log("Card 6 hover action"),
  },
  {
    id: 7,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Skin Health",
    productDescription:
      "Advanced support for healthier-looking skin and healthy aging.",
    productPrice: "$179.00/month",
    hoverImage: images.landingpageimages.BetterSkinImage,
    hoverBadge: "Skin Health",
    hoverTitle: "Look Better with Skye",
    hoverActionLabel: "Explore skin health",
    onGetStarted: () => console.log("Card 7 get started"),
    onShopNow: () => console.log("Card 7 shop now"),
    onHoverGetStarted: () => console.log("Card 7 hover get started"),
    onHoverAction: () => console.log("Card 7 hover action"),
  },
  {
    id: 8,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Focus Support",
    productDescription:
      "Designed to support mental clarity, concentration, and productivity.",
    productPrice: "$169.00/month",
    hoverImage: images.landingpageimages.LossWeightCardImage,
    hoverBadge: "Focus",
    hoverTitle: "Think Sharper with Skye",
    hoverActionLabel: "Explore focus support",
    onGetStarted: () => console.log("Card 8 get started"),
    onShopNow: () => console.log("Card 8 shop now"),
    onHoverGetStarted: () => console.log("Card 8 hover get started"),
    onHoverAction: () => console.log("Card 8 hover action"),
  },
  {
    id: 9,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Longevity Support",
    productDescription:
      "Personalized care designed to support long-term health and performance.",
    productPrice: "$329.00/month",
    hoverImage: images.landingpageimages.BetterSkinImage,
    hoverBadge: "Longevity",
    hoverTitle: "Live Longer with Skye",
    hoverActionLabel: "Explore longevity",
    onGetStarted: () => console.log("Card 9 get started"),
    onShopNow: () => console.log("Card 9 shop now"),
    onHoverGetStarted: () => console.log("Card 9 hover get started"),
    onHoverAction: () => console.log("Card 9 hover action"),
  },
  {
    id: 10,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Complete Optimization",
    productDescription:
      "A complete physician-guided plan built around your personal health goals.",
    productPrice: "$399.00/month",
    hoverImage: images.landingpageimages.LossWeightCardImage,
    hoverBadge: "Optimization",
    hoverTitle: "Optimize Everything with Skye",
    hoverActionLabel: "Explore optimization",
    onGetStarted: () => console.log("Card 10 get started"),
    onShopNow: () => console.log("Card 10 shop now"),
    onHoverGetStarted: () => console.log("Card 10 hover get started"),
    onHoverAction: () => console.log("Card 10 hover action"),
  },
];
const peptideTreatmentCards = [
  {
    id: 1,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "BPC-157",
    productDescription:
      "Supports recovery, tissue repair, mobility, and overall physical performance.",
    productPrice: "$199.00/month",

    productImageBg: "#FFD6C9",
    hoverCardBg: "#EF7A5C",
    hoverBadgeBg: "#DC907A",

    hoverImage: images.landingpageimages.PeptideCardImage,
    hoverBadge: "Peptides",
    hoverTitle: "Recover Better with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => console.log("Card 1 get started"),
    onShopNow: () => console.log("Card 1 shop now"),
    onHoverGetStarted: () => console.log("Card 1 hover get started"),
    onHoverAction: () => console.log("Card 1 hover action"),
  },
  {
    id: 2,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "CJC-1295",
    productDescription:
      "Designed to support recovery, sleep quality, energy, and body composition.",
    productPrice: "$249.00/month",

    productImageBg: "#FFD6C9",
    hoverCardBg: "#EF7A5C",
    hoverBadgeBg: "#DC907A",

    hoverImage: images.landingpageimages.PeptideCardImage,
    hoverBadge: "Peptides",
    hoverTitle: "Perform Better with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => console.log("Card 2 get started"),
    onShopNow: () => console.log("Card 2 shop now"),
    onHoverGetStarted: () => console.log("Card 2 hover get started"),
    onHoverAction: () => console.log("Card 2 hover action"),
  },
  {
    id: 3,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Ipamorelin",
    productDescription:
      "Supports restful sleep, physical recovery, and healthy body composition.",
    productPrice: "$229.00/month",

    productImageBg: "#FFD6C9",
    hoverCardBg: "#EF7A5C",
    hoverBadgeBg: "#DC907A",

    hoverImage: images.landingpageimages.PeptideCardImage,
    hoverBadge: "Peptides",
    hoverTitle: "Sleep Better with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => console.log("Card 3 get started"),
    onShopNow: () => console.log("Card 3 shop now"),
    onHoverGetStarted: () => console.log("Card 3 hover get started"),
    onHoverAction: () => console.log("Card 3 hover action"),
  },
  {
    id: 4,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "TB-500",
    productDescription:
      "Designed to support mobility, flexibility, recovery, and tissue health.",
    productPrice: "$279.00/month",

    productImageBg: "#FFD6C9",
    hoverCardBg: "#EF7A5C",
    hoverBadgeBg: "#DC907A",

    hoverImage: images.landingpageimages.PeptideCardImage,
    hoverBadge: "Peptides",
    hoverTitle: "Move Better with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => console.log("Card 4 get started"),
    onShopNow: () => console.log("Card 4 shop now"),
    onHoverGetStarted: () => console.log("Card 4 hover get started"),
    onHoverAction: () => console.log("Card 4 hover action"),
  },
  {
    id: 5,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Sermorelin",
    productDescription:
      "Supports natural hormone signaling, recovery, energy, and healthy aging.",
    productPrice: "$259.00/month",

    productImageBg: "#FFD6C9",
    hoverCardBg: "#EF7A5C",
    hoverBadgeBg: "#DC907A",

    hoverImage: images.landingpageimages.PeptideCardImage,
    hoverBadge: "Peptides",
    hoverTitle: "Feel Younger with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => console.log("Card 5 get started"),
    onShopNow: () => console.log("Card 5 shop now"),
    onHoverGetStarted: () => console.log("Card 5 hover get started"),
    onHoverAction: () => console.log("Card 5 hover action"),
  },
  {
    id: 6,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "GHK-Cu",
    productDescription:
      "Supports healthier-looking skin, hair, tissue repair, and healthy aging.",
    productPrice: "$189.00/month",

    productImageBg: "#FFD6C9",
    hoverCardBg: "#EF7A5C",
    hoverBadgeBg: "#DC907A",

    hoverImage: images.landingpageimages.PeptideCardImage,
    hoverBadge: "Peptides",
    hoverTitle: "Look Better with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => console.log("Card 6 get started"),
    onShopNow: () => console.log("Card 6 shop now"),
    onHoverGetStarted: () => console.log("Card 6 hover get started"),
    onHoverAction: () => console.log("Card 6 hover action"),
  },
  {
    id: 7,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "PT-141",
    productDescription:
      "Designed to support intimacy, sexual wellness, and personal confidence.",
    productPrice: "$179.00/month",

    productImageBg: "#FFD6C9",
    hoverCardBg: "#EF7A5C",
    hoverBadgeBg: "#DC907A",

    hoverImage: images.landingpageimages.PeptideCardImage,
    hoverBadge: "Peptides",
    hoverTitle: "Feel Confident with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => console.log("Card 7 get started"),
    onShopNow: () => console.log("Card 7 shop now"),
    onHoverGetStarted: () => console.log("Card 7 hover get started"),
    onHoverAction: () => console.log("Card 7 hover action"),
  },
  {
    id: 8,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "NAD+",
    productDescription:
      "Supports cellular energy, mental clarity, recovery, and healthy longevity.",
    productPrice: "$299.00/month",

    productImageBg: "#FFD6C9",
    hoverCardBg: "#EF7A5C",
    hoverBadgeBg: "#DC907A",

    hoverImage: images.landingpageimages.PeptideCardImage,
    hoverBadge: "Peptides",
    hoverTitle: "Restore Energy with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => console.log("Card 8 get started"),
    onShopNow: () => console.log("Card 8 shop now"),
    onHoverGetStarted: () => console.log("Card 8 hover get started"),
    onHoverAction: () => console.log("Card 8 hover action"),
  },
  {
    id: 9,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Tesamorelin",
    productDescription:
      "Designed to support body composition, metabolic health, and recovery.",
    productPrice: "$329.00/month",

    productImageBg: "#FFD6C9",
    hoverCardBg: "#EF7A5C",
    hoverBadgeBg: "#DC907A",

    hoverImage: images.landingpageimages.PeptideCardImage,
    hoverBadge: "Peptides",
    hoverTitle: "Transform with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => console.log("Card 9 get started"),
    onShopNow: () => console.log("Card 9 shop now"),
    onHoverGetStarted: () => console.log("Card 9 hover get started"),
    onHoverAction: () => console.log("Card 9 hover action"),
  },
  {
    id: 10,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Peptide Optimization",
    productDescription:
      "A personalized peptide plan designed around your individual health goals.",
    productPrice: "$399.00/month",

    productImageBg: "#FFD6C9",
    hoverCardBg: "#EF7A5C",
    hoverBadgeBg: "#DC907A",

    hoverImage: images.landingpageimages.PeptideCardImage,
    hoverBadge: "Peptides",
    hoverTitle: "Optimize Everything with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => console.log("Card 10 get started"),
    onShopNow: () => console.log("Card 10 shop now"),
    onHoverGetStarted: () => console.log("Card 10 hover get started"),
    onHoverAction: () => console.log("Card 10 hover action"),
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const goToSlide = (index: number) => {
    swiperRef.current?.slideToLoop(index);
  };
  const [selectedFilter, setSelectedFilter] =
    useState<TreatmentFilterValue>("all");

  const cardsSwiperRef = useRef<SwiperType | null>(null);
  const [activeCardSlide, setActiveCardSlide] = useState(0);

  const updateCardsSwiper = () => {
    window.setTimeout(() => {
      cardsSwiperRef.current?.update();
    }, 550);
  };
  const peptideSwiperRef = useRef<SwiperType | null>(null);
  const [activePeptideSlide, setActivePeptideSlide] = useState(0);

  const updatePeptideSwiper = () => {
    window.setTimeout(() => {
      peptideSwiperRef.current?.update();
    }, 550);
  };
  return (
    <>
      <div className="relative w-full">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop
          speed={700}
          grabCursor
          simulateTouch
          allowTouchMove
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.realIndex);
          }}
          className="w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <section
                style={{
                  backgroundImage: `url("${slide.backgroundImage}")`,
                }}
                className="bg-cover bg-center bg-no-repeat pt-73.5 pb-20"
              >
                <div className="container max-w-7xl mx-auto grid grid-cols-2 items-center">
                  <div className="flex flex-col gap-10">
                    <Image src={slide.logo} alt="Skye Health" />

                    <div className="flex flex-col gap-4">
                      <h1 className="text-5xl font-semibold text-white">
                        {slide.title}
                      </h1>

                      <p className="text-white font-light text-xl">
                        {slide.description}
                      </p>
                    </div>

                    <div className="flex flex-row gap-3">
                      <button
                        type="button"
                        className="py-5 px-8 cursor-pointer bg-[#0F1D3A] rounded-full text-base font-medium text-white"
                      >
                        Get started now
                      </button>

                      <button
                        type="button"
                        className="border cursor-pointer border-white py-5 px-8 rounded-full flex items-center gap-2.5"
                      >
                        <span className="text-base font-medium text-white">
                          View all treatments
                        </span>

                        <NewArrowIcon width="16" height="16" fill="white" />
                      </button>
                    </div>
                  </div>

                  <div className="relative w-full">
                    <Image
                      src={slide.ringImage}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-auto object-contain"
                    />

                    <Image
                      src={slide.heroImage}
                      alt={slide.title}
                      className="absolute inset-0 z-10 w-full h-full object-contain"
                    />
                  </div>
                </div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 border border-white bg-white/30 p-4 rounded-full flex items-center gap-2.5 backdrop-blur-sm">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                activeSlide === index
                  ? "bg-[#0F1D3A] scale-125"
                  : "bg-[#CEDCF9] hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
      <section className="py-20 bg-[#F5F8FE] ">
        <div className="container max-w-7xl mx-auto grid grid-cols-2 gap-3">
          {treatmentCards.map((card) => (
            <TreatmentCard
              key={card.id}
              title={card.title}
              buttonLabel={card.buttonLabel}
              backgroundImage={card.backgroundImage}
              backgroundColor={card.backgroundColor}
              hoverText={card.hoverText}
              hoverBackgroundColor={card.hoverBackgroundColor}
              onClick={card.onClick}
              onButtonClick={card.onButtonClick}
            />
          ))}
        </div>
      </section>
      <section className="pb-27 bg-[#F5F8FE]">
        <div className="container max-w-7xl mx-auto flex flex-col gap-14.5">
          <div className="flex flex-col gap-4">
            <p className="text-[40px] font-semibold text-[#22252B]">
              Explore your options
            </p>
            <TreatmentFilters
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <TreatmentProductCard
                key={product.id}
                title={product.title}
                image={product.image}
                description={product.description}
                price={product.price}
                inStock={product.inStock}
                newIn={product.newIn}
                soldOut={product.soldOut}
                onGetStarted={product.onGetStarted}
                onLearnMore={product.onLearnMore}
              />
            ))}
          </div>
          <div className="flex flex-row gap-4.5 items-center self-center">
            <button
              onClick={() => {
                "";
              }}
              className="py-5 px-8 bg-[#3D74E9] rounded-full text-base font-medium text-white "
            >
              Get started now
            </button>
            <button
              onClick={() => {
                "";
              }}
              className="py-5 px-8 border border-[#0F1D3A] rounded-full flex flex-row items-center gap-2.5 "
            >
              <p className="text-base font-medium text-[#0F1D3A]">
                View all treatments
              </p>
              <NewArrowIcon fill="#0F1D3A" />
            </button>
          </div>
        </div>
      </section>
      <section className="pb-27 bg-[#F5F8FE]">
        <div className="container max-w-7xl mx-auto ">
          <div className="rounded-4xl bg-[url('/images/PeptideExpertBgImage.png')] pl-16 bg-cover bg-no-repeat min-h-146.5 grid grid-cols-2  items-center">
            <div className="flex flex-col  gap-6">
              <p className="text-5xl font-medium  text-white">
                Your Peptide Experts
              </p>
              <p className="text-[32px] font-medium  text-white">
                Dr. Barry Sanchez{" "}
              </p>
              <p className="text-base font-light  text-white">
                Stanford fellowship-trained, board certified bariatric surgeon
                and Chief Medical Officer of Skye Health. With expertise in
                metabolic health, hormone optimization and peptide therapy, he
                leads the team of physicians providing modern, research-driven
                care focused on personalization, longevity and real-world
                outcomes.
              </p>
              <div className="flex flex-row gap-4 ">
                <div className="py-2 px-4 bg-white/8 rounded-full  flex flex-row items-center gap-2.5 ">
                  <Image
                    src={images.landingpageimages.StanfordImage}
                    alt={"stanford"}
                  />
                  <p className="text-base font-medium text-white">
                    Stanford University
                  </p>
                </div>
                <div className="py-2 px-4 bg-white/8 rounded-full  flex flex-row items-center gap-2.5 ">
                  <Image
                    src={images.landingpageimages.SkyHeartImage}
                    alt={"Sky"}
                  />
                  <p className="text-base font-medium text-white">
                    Chief Medical Officer
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-full w-full">
              <Image
                src={images.landingpageimages.SkyWhiteBg}
                alt={"sky"}
                fill
                className="z-0 object-fill "
              />
              <Image
                src={images.landingpageimages.DoctorImage}
                alt={"doctor"}
                fill
                className="z-10 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-13 overflow-hidden bg-[#F5F8FE] py-20">
        <Swiper
          slidesPerView="auto"
          spaceBetween={24}
          slidesOffsetBefore={320}
          slidesOffsetAfter={320}
          loop={false}
          rewind={false}
          grabCursor
          simulateTouch
          allowTouchMove
          observer
          observeParents
          watchOverflow
          onSwiper={(swiper) => {
            cardsSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveCardSlide(swiper.activeIndex);
          }}
          className="w-full"
        >
          {hoverTreatmentCards.map((card) => (
            <SwiperSlide key={card.id} className="!w-auto">
              <div
                onMouseEnter={updateCardsSwiper}
                onMouseLeave={updateCardsSwiper}
              >
                <ExpandableTreatmentCard
                  productImage={card.productImage}
                  productTitle={card.productTitle}
                  productDescription={card.productDescription}
                  productPrice={card.productPrice}
                  hoverImage={card.hoverImage}
                  hoverBadge={card.hoverBadge}
                  hoverTitle={card.hoverTitle}
                  hoverActionLabel={card.hoverActionLabel}
                  onGetStarted={card.onGetStarted}
                  onShopNow={card.onShopNow}
                  onHoverGetStarted={card.onHoverGetStarted}
                  onHoverAction={card.onHoverAction}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="self-center">
          <div className="flex flex-row items-center gap-4">
            <button
              type="button"
              aria-label="Previous card"
              disabled={activeCardSlide === 0}
              onClick={() => cardsSwiperRef.current?.slidePrev()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex rotate-180">
                <NewArrowIcon fill="#0F1D3A" />
              </span>
            </button>

            <div className="flex items-center gap-2 rounded-full bg-white p-4">
              {hoverTreatmentCards.map((card, index) => (
                <button
                  key={card.id}
                  type="button"
                  aria-label={`Go to card ${index + 1}`}
                  aria-current={activeCardSlide === index ? "true" : undefined}
                  onClick={() => cardsSwiperRef.current?.slideTo(index)}
                  className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                    activeCardSlide === index ? "bg-[#0F1D3A]" : "bg-[#CEDCF9]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next card"
              disabled={activeCardSlide === hoverTreatmentCards.length - 1}
              onClick={() => cardsSwiperRef.current?.slideNext()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NewArrowIcon fill="white" />
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-13 overflow-hidden bg-[#F5F8FE] pb-20">
        <Swiper
          slidesPerView="auto"
          spaceBetween={24}
          slidesOffsetBefore={320}
          slidesOffsetAfter={320}
          loop={false}
          rewind={false}
          speed={500}
          grabCursor
          simulateTouch
          allowTouchMove
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          mousewheel={{
            enabled: true,
            forceToAxis: false,
            releaseOnEdges: true,
            sensitivity: 1,
            thresholdDelta: 20,
            thresholdTime: 400,
          }}
          observer
          observeParents
          watchOverflow
          onSwiper={(swiper) => {
            peptideSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActivePeptideSlide(swiper.activeIndex);
          }}
          className="w-full"
        >
          {peptideTreatmentCards.map((card) => (
            <SwiperSlide key={card.id} className="!w-auto">
              <div
                onMouseEnter={updatePeptideSwiper}
                onMouseLeave={updatePeptideSwiper}
              >
                <ExpandableTreatmentCard
                  productImage={card.productImage}
                  productTitle={card.productTitle}
                  productDescription={card.productDescription}
                  productPrice={card.productPrice}
                  productImageBg={card.productImageBg}
                  hoverCardBg={card.hoverCardBg}
                  hoverBadgeBg={card.hoverBadgeBg}
                  hoverImage={card.hoverImage}
                  hoverBadge={card.hoverBadge}
                  hoverTitle={card.hoverTitle}
                  hoverActionLabel={card.hoverActionLabel}
                  onGetStarted={card.onGetStarted}
                  onShopNow={card.onShopNow}
                  onHoverGetStarted={card.onHoverGetStarted}
                  onHoverAction={card.onHoverAction}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="self-center">
          <div className="flex flex-row items-center gap-4">
            <button
              type="button"
              aria-label="Previous peptide"
              disabled={activePeptideSlide === 0}
              onClick={() => peptideSwiperRef.current?.slidePrev()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex rotate-180">
                <NewArrowIcon fill="#0F1D3A" />
              </span>
            </button>

            <div className="flex items-center gap-2 rounded-full bg-white p-4">
              {peptideTreatmentCards.map((card, index) => (
                <button
                  key={card.id}
                  type="button"
                  aria-label={`Go to peptide ${index + 1}`}
                  aria-current={
                    activePeptideSlide === index ? "true" : undefined
                  }
                  onClick={() => peptideSwiperRef.current?.slideTo(index)}
                  className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                    activePeptideSlide === index
                      ? "bg-[#0F1D3A]"
                      : "bg-[#CEDCF9]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next peptide"
              disabled={activePeptideSlide === peptideTreatmentCards.length - 1}
              onClick={() => peptideSwiperRef.current?.slideNext()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NewArrowIcon fill="white" />
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-13 overflow-hidden bg-[#F5F8FE] pb-20">
        <Swiper
          slidesPerView="auto"
          spaceBetween={24}
          slidesOffsetBefore={320}
          slidesOffsetAfter={320}
          loop={false}
          rewind={false}
          speed={500}
          grabCursor
          simulateTouch
          allowTouchMove
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          mousewheel={{
            enabled: true,
            forceToAxis: false,
            releaseOnEdges: true,
            sensitivity: 1,
            thresholdDelta: 20,
            thresholdTime: 400,
          }}
          observer
          observeParents
          watchOverflow
          onSwiper={(swiper) => {
            peptideSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActivePeptideSlide(swiper.activeIndex);
          }}
          className="w-full"
        >
          {peptideTreatmentCards.map((card) => (
            <SwiperSlide key={card.id} className="!w-auto">
              <div
                onMouseEnter={updatePeptideSwiper}
                onMouseLeave={updatePeptideSwiper}
              >
                <ExpandableTreatmentCard
                  productImage={card.productImage}
                  productTitle={card.productTitle}
                  productDescription={card.productDescription}
                  productPrice={card.productPrice}
                  productImageBg={card.productImageBg}
                  hoverCardBg={card.hoverCardBg}
                  hoverBadgeBg={card.hoverBadgeBg}
                  hoverImage={card.hoverImage}
                  hoverBadge={card.hoverBadge}
                  hoverTitle={card.hoverTitle}
                  hoverActionLabel={card.hoverActionLabel}
                  onGetStarted={card.onGetStarted}
                  onShopNow={card.onShopNow}
                  onHoverGetStarted={card.onHoverGetStarted}
                  onHoverAction={card.onHoverAction}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="self-center">
          <div className="flex flex-row items-center gap-4">
            <button
              type="button"
              aria-label="Previous peptide"
              disabled={activePeptideSlide === 0}
              onClick={() => peptideSwiperRef.current?.slidePrev()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex rotate-180">
                <NewArrowIcon fill="#0F1D3A" />
              </span>
            </button>

            <div className="flex items-center gap-2 rounded-full bg-white p-4">
              {peptideTreatmentCards.map((card, index) => (
                <button
                  key={card.id}
                  type="button"
                  aria-label={`Go to peptide ${index + 1}`}
                  aria-current={
                    activePeptideSlide === index ? "true" : undefined
                  }
                  onClick={() => peptideSwiperRef.current?.slideTo(index)}
                  className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                    activePeptideSlide === index
                      ? "bg-[#0F1D3A]"
                      : "bg-[#CEDCF9]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next peptide"
              disabled={activePeptideSlide === peptideTreatmentCards.length - 1}
              onClick={() => peptideSwiperRef.current?.slideNext()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NewArrowIcon fill="white" />
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-13 overflow-hidden bg-[#F5F8FE] pb-20">
        <Swiper
          slidesPerView="auto"
          spaceBetween={24}
          slidesOffsetBefore={320}
          slidesOffsetAfter={320}
          loop={false}
          rewind={false}
          speed={500}
          grabCursor
          simulateTouch
          allowTouchMove
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          mousewheel={{
            enabled: true,
            forceToAxis: false,
            releaseOnEdges: true,
            sensitivity: 1,
            thresholdDelta: 20,
            thresholdTime: 400,
          }}
          observer
          observeParents
          watchOverflow
          onSwiper={(swiper) => {
            peptideSwiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActivePeptideSlide(swiper.activeIndex);
          }}
          className="w-full"
        >
          {peptideTreatmentCards.map((card) => (
            <SwiperSlide key={card.id} className="!w-auto">
              <div
                onMouseEnter={updatePeptideSwiper}
                onMouseLeave={updatePeptideSwiper}
              >
                <ExpandableTreatmentCard
                  productImage={card.productImage}
                  productTitle={card.productTitle}
                  productDescription={card.productDescription}
                  productPrice={card.productPrice}
                  productImageBg={card.productImageBg}
                  hoverCardBg={card.hoverCardBg}
                  hoverBadgeBg={card.hoverBadgeBg}
                  hoverImage={card.hoverImage}
                  hoverBadge={card.hoverBadge}
                  hoverTitle={card.hoverTitle}
                  hoverActionLabel={card.hoverActionLabel}
                  onGetStarted={card.onGetStarted}
                  onShopNow={card.onShopNow}
                  onHoverGetStarted={card.onHoverGetStarted}
                  onHoverAction={card.onHoverAction}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="self-center">
          <div className="flex flex-row items-center gap-4">
            <button
              type="button"
              aria-label="Previous peptide"
              disabled={activePeptideSlide === 0}
              onClick={() => peptideSwiperRef.current?.slidePrev()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex rotate-180">
                <NewArrowIcon fill="#0F1D3A" />
              </span>
            </button>

            <div className="flex items-center gap-2 rounded-full bg-white p-4">
              {peptideTreatmentCards.map((card, index) => (
                <button
                  key={card.id}
                  type="button"
                  aria-label={`Go to peptide ${index + 1}`}
                  aria-current={
                    activePeptideSlide === index ? "true" : undefined
                  }
                  onClick={() => peptideSwiperRef.current?.slideTo(index)}
                  className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                    activePeptideSlide === index
                      ? "bg-[#0F1D3A]"
                      : "bg-[#CEDCF9]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next peptide"
              disabled={activePeptideSlide === peptideTreatmentCards.length - 1}
              onClick={() => peptideSwiperRef.current?.slideNext()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NewArrowIcon fill="white" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
