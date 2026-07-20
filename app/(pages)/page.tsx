"use client";

import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { images } from "../ui";
import { NewArrowIcon, NewPlusIcon } from "@/public/icons";
import { Mousewheel } from "swiper/modules";

import "swiper/css";
import TreatmentCard from "../components/cards/TreatmentCard";
import TreatmentFilters, {
  TreatmentFilterValue,
} from "../components/cards/TreatmentFilters";
import TreatmentProductCard from "../components/cards/TreatmentProductCard";
import ExpandableTreatmentCard from "../components/cards/HoverTreatmentCard";
import SkyDifferenceCard from "../components/cards/SkyDifferenceCard";
import FAQAccordion, { FAQItem } from "../components/FaqAccordion";
import TreatmentSliderCard from "../components/cards/TreatmentSliderCard";
import FeaturedTreatmentCard from "../components/cards/FeaturedTreatmentCard";
type TreatmentCardData = {
  id: number;

  productImage: StaticImageData | string;
  productTitle: string;
  productDescription: string;
  productPrice: string;
  productImageBg: string;

  hoverImage: StaticImageData | string;
  hoverBadge: string;
  hoverTitle: string;
  hoverActionLabel: string;
  hoverCardBg: string;
  hoverBadgeBg: string;

  onGetStarted: () => void;
  onShopNow: () => void;
  onHoverGetStarted: () => void;
  onHoverAction: () => void;
};

const cardColors = {
  productImageBg: "#CEDCF9",
  hoverCardBg: "#AFC6E5",
  hoverBadgeBg: "#87A3CA",
};
const optimizeEverythingConfig = {
  productImageBg: "#0F1D3A",
  hoverCardBg: "#0F1D3A",
  hoverBadgeBg: "#3D74E9",
  hoverImage: images.landingpageimages.OptimizeEverythingImage,
  hoverBadge: "Optimize everything",
};
const hormoneCardColors = {
  productImageBg: "#BDE0E3",
  hoverCardBg: "radial-gradient(circle at center, #93CBCF 0%, #CCE8EA 100%)",
  hoverBadgeBg: "#8FC0C2",
};
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
const hoverTreatmentCards: TreatmentCardData[] = [
  {
    id: 1,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "GLP-1s Vial",
    productDescription:
      "Can help relax blood vessels, supporting sexual function, and vascular health.",
    productPrice: "$199.00/month",

    ...cardColors,

    hoverImage: images.landingpageimages.LossWeightCardImage,
    hoverBadge: "Weight Loss",
    hoverTitle: "Lose Weight with Skye",
    hoverActionLabel: "Lose weight with Skye",

    onGetStarted: () => {
      console.log("Card 1 get started");
    },
    onShopNow: () => {
      console.log("Card 1 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Card 1 hover get started");
    },
    onHoverAction: () => {
      console.log("Card 1 hover action");
    },
  },
  {
    id: 2,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Peptide Therapy",
    productDescription:
      "Premium peptide support for recovery, energy, and overall performance.",
    productPrice: "$249.00/month",

    ...cardColors,

    hoverImage: images.landingpageimages.BetterSkinImage,
    hoverBadge: "Peptides",
    hoverTitle: "Feel Better with Skye",
    hoverActionLabel: "Explore peptides",

    onGetStarted: () => {
      console.log("Card 2 get started");
    },
    onShopNow: () => {
      console.log("Card 2 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Card 2 hover get started");
    },
    onHoverAction: () => {
      console.log("Card 2 hover action");
    },
  },
  {
    id: 3,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Hormone Support",
    productDescription:
      "Personalized hormone support designed around your health and goals.",
    productPrice: "$299.00/month",

    ...cardColors,

    hoverImage: images.landingpageimages.LossWeightCardImage,
    hoverBadge: "Hormones",
    hoverTitle: "Optimize with Skye",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Card 3 get started");
    },
    onShopNow: () => {
      console.log("Card 3 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Card 3 hover get started");
    },
    onHoverAction: () => {
      console.log("Card 3 hover action");
    },
  },
  {
    id: 4,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Recovery Support",
    productDescription:
      "Designed to support recovery, mobility, and everyday physical performance.",
    productPrice: "$189.00/month",

    ...cardColors,

    hoverImage: images.landingpageimages.BetterSkinImage,
    hoverBadge: "Recovery",
    hoverTitle: "Recover Faster with Skye",
    hoverActionLabel: "Explore recovery",

    onGetStarted: () => {
      console.log("Card 4 get started");
    },
    onShopNow: () => {
      console.log("Card 4 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Card 4 hover get started");
    },
    onHoverAction: () => {
      console.log("Card 4 hover action");
    },
  },
  {
    id: 5,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Energy Support",
    productDescription:
      "Personalized support for consistent energy, focus, and daily performance.",
    productPrice: "$159.00/month",

    ...cardColors,

    hoverImage: images.landingpageimages.LossWeightCardImage,
    hoverBadge: "Energy",
    hoverTitle: "Boost Energy with Skye",
    hoverActionLabel: "Explore energy",

    onGetStarted: () => {
      console.log("Card 5 get started");
    },
    onShopNow: () => {
      console.log("Card 5 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Card 5 hover get started");
    },
    onHoverAction: () => {
      console.log("Card 5 hover action");
    },
  },
  {
    id: 6,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Sleep Support",
    productDescription:
      "Supports better sleep quality, relaxation, and overnight recovery.",
    productPrice: "$149.00/month",

    ...cardColors,

    hoverImage: images.landingpageimages.BetterSkinImage,
    hoverBadge: "Sleep",
    hoverTitle: "Sleep Better with Skye",
    hoverActionLabel: "Explore sleep support",

    onGetStarted: () => {
      console.log("Card 6 get started");
    },
    onShopNow: () => {
      console.log("Card 6 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Card 6 hover get started");
    },
    onHoverAction: () => {
      console.log("Card 6 hover action");
    },
  },
  {
    id: 7,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Skin Health",
    productDescription:
      "Advanced support for healthier-looking skin and healthy aging.",
    productPrice: "$179.00/month",

    ...cardColors,

    hoverImage: images.landingpageimages.BetterSkinImage,
    hoverBadge: "Skin Health",
    hoverTitle: "Look Better with Skye",
    hoverActionLabel: "Explore skin health",

    onGetStarted: () => {
      console.log("Card 7 get started");
    },
    onShopNow: () => {
      console.log("Card 7 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Card 7 hover get started");
    },
    onHoverAction: () => {
      console.log("Card 7 hover action");
    },
  },
  {
    id: 8,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Focus Support",
    productDescription:
      "Designed to support mental clarity, concentration, and productivity.",
    productPrice: "$169.00/month",

    ...cardColors,

    hoverImage: images.landingpageimages.LossWeightCardImage,
    hoverBadge: "Focus",
    hoverTitle: "Think Sharper with Skye",
    hoverActionLabel: "Explore focus support",

    onGetStarted: () => {
      console.log("Card 8 get started");
    },
    onShopNow: () => {
      console.log("Card 8 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Card 8 hover get started");
    },
    onHoverAction: () => {
      console.log("Card 8 hover action");
    },
  },
  {
    id: 9,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Longevity Support",
    productDescription:
      "Personalized care designed to support long-term health and performance.",
    productPrice: "$329.00/month",

    ...cardColors,

    hoverImage: images.landingpageimages.BetterSkinImage,
    hoverBadge: "Longevity",
    hoverTitle: "Live Longer with Skye",
    hoverActionLabel: "Explore longevity",

    onGetStarted: () => {
      console.log("Card 9 get started");
    },
    onShopNow: () => {
      console.log("Card 9 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Card 9 hover get started");
    },
    onHoverAction: () => {
      console.log("Card 9 hover action");
    },
  },
  {
    id: 10,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Complete Optimization",
    productDescription:
      "A complete physician-guided plan built around your personal health goals.",
    productPrice: "$399.00/month",

    ...cardColors,

    hoverImage: images.landingpageimages.LossWeightCardImage,
    hoverBadge: "Optimization",
    hoverTitle: "Optimize Everything with Skye",
    hoverActionLabel: "Explore optimization",

    onGetStarted: () => {
      console.log("Card 10 get started");
    },
    onShopNow: () => {
      console.log("Card 10 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Card 10 hover get started");
    },
    onHoverAction: () => {
      console.log("Card 10 hover action");
    },
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
    hoverCardBg: "linear-gradient(to right, #F4B59F 0%, #F2A38B 100%)",
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
    hoverCardBg: "linear-gradient(to right, #F4B59F 0%, #F2A38B 100%)",
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
    hoverCardBg: "linear-gradient(to right, #F4B59F 0%, #F2A38B 100%)",
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
    hoverCardBg: "linear-gradient(to right, #F4B59F 0%, #F2A38B 100%)",
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
    hoverCardBg: "linear-gradient(to right, #F4B59F 0%, #F2A38B 100%)",
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
    hoverCardBg: "linear-gradient(to right, #F4B59F 0%, #F2A38B 100%)",
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
    hoverCardBg: "linear-gradient(to right, #F4B59F 0%, #F2A38B 100%)",
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
    hoverCardBg: "linear-gradient(to right, #F4B59F 0%, #F2A38B 100%)",
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
    hoverCardBg: "linear-gradient(to right, #F4B59F 0%, #F2A38B 100%)",
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
    hoverCardBg: "linear-gradient(to right, #F4B59F 0%, #F2A38B 100%)",
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
const OptimizeeverythingCards: TreatmentCardData[] = [
  {
    id: 1,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "BPC-157",
    productDescription:
      "Supports recovery, tissue repair, mobility, and overall physical performance.",
    productPrice: "$199.00/month",

    ...optimizeEverythingConfig,

    hoverTitle: "Recover Better with Skye",
    hoverActionLabel: "Optimize with Skye",

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

    ...optimizeEverythingConfig,

    hoverTitle: "Perform Better with Skye",
    hoverActionLabel: "Optimize with Skye",

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

    ...optimizeEverythingConfig,

    hoverTitle: "Sleep Better with Skye",
    hoverActionLabel: "Optimize with Skye",

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

    ...optimizeEverythingConfig,

    hoverTitle: "Move Better with Skye",
    hoverActionLabel: "Optimize with Skye",

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

    ...optimizeEverythingConfig,

    hoverTitle: "Feel Younger with Skye",
    hoverActionLabel: "Optimize with Skye",

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

    ...optimizeEverythingConfig,

    hoverTitle: "Look Better with Skye",
    hoverActionLabel: "Optimize with Skye",

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

    ...optimizeEverythingConfig,

    hoverTitle: "Feel Confident with Skye",
    hoverActionLabel: "Optimize with Skye",

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

    ...optimizeEverythingConfig,

    hoverTitle: "Restore Energy with Skye",
    hoverActionLabel: "Optimize with Skye",

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

    ...optimizeEverythingConfig,

    hoverTitle: "Transform with Skye",
    hoverActionLabel: "Optimize with Skye",

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
      "A personalized plan designed around your complete health and performance goals.",
    productPrice: "$399.00/month",

    ...optimizeEverythingConfig,

    hoverTitle: "Optimize Everything with Skye",
    hoverActionLabel: "Optimize with Skye",

    onGetStarted: () => console.log("Card 10 get started"),
    onShopNow: () => console.log("Card 10 shop now"),
    onHoverGetStarted: () => console.log("Card 10 hover get started"),
    onHoverAction: () => console.log("Card 10 hover action"),
  },
];
const Hormonescards: TreatmentCardData[] = [
  {
    id: 1,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Testosterone Support",
    productDescription:
      "Personalized hormone support designed around your symptoms, health history, and goals.",
    productPrice: "$199.00/month",

    ...hormoneCardColors,

    hoverImage: images.landingpageimages.HormonesImage,
    hoverBadge: "Hormones",
    hoverTitle: "Feel Stronger with Skye",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Hormone card 1 get started");
    },
    onShopNow: () => {
      console.log("Hormone card 1 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Hormone card 1 hover get started");
    },
    onHoverAction: () => {
      console.log("Hormone card 1 hover action");
    },
  },
  {
    id: 2,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Testosterone Cream",
    productDescription:
      "Topical hormone support prescribed according to your individual medical needs.",
    productPrice: "$219.00/month",

    ...hormoneCardColors,

    hoverImage: images.landingpageimages.HormonesImage,
    hoverBadge: "Hormones",
    hoverTitle: "Restore Balance with Skye",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Hormone card 2 get started");
    },
    onShopNow: () => {
      console.log("Hormone card 2 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Hormone card 2 hover get started");
    },
    onHoverAction: () => {
      console.log("Hormone card 2 hover action");
    },
  },
  {
    id: 3,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Enclomiphene",
    productDescription:
      "Physician-guided support designed around hormone health and personal wellness goals.",
    productPrice: "$189.00/month",

    ...hormoneCardColors,

    hoverImage: images.landingpageimages.HormonesImage,
    hoverBadge: "Hormones",
    hoverTitle: "Optimize Hormones with Skye",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Hormone card 3 get started");
    },
    onShopNow: () => {
      console.log("Hormone card 3 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Hormone card 3 hover get started");
    },
    onHoverAction: () => {
      console.log("Hormone card 3 hover action");
    },
  },
  {
    id: 4,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "HCG Support",
    productDescription:
      "Personalized treatment support prescribed and monitored by an experienced provider.",
    productPrice: "$249.00/month",

    ...hormoneCardColors,

    hoverImage: images.landingpageimages.HormonesImage,
    hoverBadge: "Hormones",
    hoverTitle: "Feel Better with Skye",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Hormone card 4 get started");
    },
    onShopNow: () => {
      console.log("Hormone card 4 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Hormone card 4 hover get started");
    },
    onHoverAction: () => {
      console.log("Hormone card 4 hover action");
    },
  },
  {
    id: 5,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Estradiol Support",
    productDescription:
      "Individualized hormone care designed to support balance and overall well-being.",
    productPrice: "$179.00/month",

    ...hormoneCardColors,

    hoverImage: images.landingpageimages.HormonesImage,
    hoverBadge: "Hormones",
    hoverTitle: "Find Balance with Skye",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Hormone card 5 get started");
    },
    onShopNow: () => {
      console.log("Hormone card 5 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Hormone card 5 hover get started");
    },
    onHoverAction: () => {
      console.log("Hormone card 5 hover action");
    },
  },
  {
    id: 6,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Progesterone Support",
    productDescription:
      "Provider-guided hormone support personalized to your health history and symptoms.",
    productPrice: "$169.00/month",

    ...hormoneCardColors,

    hoverImage: images.landingpageimages.HormonesImage,
    hoverBadge: "Hormones",
    hoverTitle: "Feel Like You Again",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Hormone card 6 get started");
    },
    onShopNow: () => {
      console.log("Hormone card 6 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Hormone card 6 hover get started");
    },
    onHoverAction: () => {
      console.log("Hormone card 6 hover action");
    },
  },
  {
    id: 7,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Thyroid Support",
    productDescription:
      "Personalized thyroid care designed around laboratory results and provider evaluation.",
    productPrice: "$199.00/month",

    ...hormoneCardColors,

    hoverImage: images.landingpageimages.HormonesImage,
    hoverBadge: "Hormones",
    hoverTitle: "Restore Energy with Skye",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Hormone card 7 get started");
    },
    onShopNow: () => {
      console.log("Hormone card 7 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Hormone card 7 hover get started");
    },
    onHoverAction: () => {
      console.log("Hormone card 7 hover action");
    },
  },
  {
    id: 8,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "DHEA Support",
    productDescription:
      "Physician-guided support designed around hormone balance and healthy aging goals.",
    productPrice: "$159.00/month",

    ...hormoneCardColors,

    hoverImage: images.landingpageimages.HormonesImage,
    hoverBadge: "Hormones",
    hoverTitle: "Age Better with Skye",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Hormone card 8 get started");
    },
    onShopNow: () => {
      console.log("Hormone card 8 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Hormone card 8 hover get started");
    },
    onHoverAction: () => {
      console.log("Hormone card 8 hover action");
    },
  },
  {
    id: 9,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Menopause Support",
    productDescription:
      "Personalized care designed to support comfort, balance, and quality of life.",
    productPrice: "$229.00/month",

    ...hormoneCardColors,

    hoverImage: images.landingpageimages.HormonesImage,
    hoverBadge: "Hormones",
    hoverTitle: "Navigate Change with Skye",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Hormone card 9 get started");
    },
    onShopNow: () => {
      console.log("Hormone card 9 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Hormone card 9 hover get started");
    },
    onHoverAction: () => {
      console.log("Hormone card 9 hover action");
    },
  },
  {
    id: 10,
    productImage: images.landingpageimages.ProductImage,
    productTitle: "Hormone Optimization",
    productDescription:
      "A complete physician-guided hormone plan personalized around your health goals.",
    productPrice: "$299.00/month",

    ...hormoneCardColors,

    hoverImage: images.landingpageimages.HormonesImage,
    hoverBadge: "Hormones",
    hoverTitle: "Optimize Hormones with Skye",
    hoverActionLabel: "Explore hormones",

    onGetStarted: () => {
      console.log("Hormone card 10 get started");
    },
    onShopNow: () => {
      console.log("Hormone card 10 shop now");
    },
    onHoverGetStarted: () => {
      console.log("Hormone card 10 hover get started");
    },
    onHoverAction: () => {
      console.log("Hormone card 10 hover action");
    },
  },
];
const differenceCards = [
  {
    id: 1,
    title: "Pharmacy Quality",
    description:
      "Your treatment comes from accredited pharmacies, held to the highest standards of safety and purity.",
    image: images.landingpageimages.PharmacyImage,
    hoverTitle: "Real Doctors",
    hoverDescription:
      "Our providers are trained in peptide therapy, hormone optimization and longevity protocols. Appointments are same day when available. Quick turn around time on shipping after prescription approval.",
    hoverImage: images.landingpageimages.SkyDifferenceCardImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",
    onClick: () => {
      console.log("Pharmacy quality card clicked");
    },
  },
  {
    id: 2,
    title: "Personalized Care",
    description:
      "Every treatment plan is designed around your health history, goals, and physician recommendations.",
    image: images.landingpageimages.PharmacyImage,
    hoverTitle: "Built Around You",
    hoverDescription:
      "Your care begins with a medical consultation and continues with a treatment plan personalized to your individual needs.",
    hoverImage: images.landingpageimages.SkyDifferenceCardImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",
    onClick: () => {
      console.log("Personalized care card clicked");
    },
  },
  {
    id: 3,
    title: "Direct Delivery",
    description:
      "Your prescribed treatment is prepared carefully and delivered directly to your door.",
    image: images.landingpageimages.PharmacyImage,
    hoverTitle: "Simple and Convenient",
    hoverDescription:
      "From physician consultation to prescription delivery, your complete care experience happens from the comfort of home.",
    hoverImage: images.landingpageimages.SkyDifferenceCardImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",
    onClick: () => {
      console.log("Direct delivery card clicked");
    },
  },
  {
    id: 4,
    title: "Ongoing Support",
    description:
      "Your care continues after treatment begins with guidance, follow-ups, and ongoing medical support.",
    image: images.landingpageimages.PharmacyImage,
    hoverTitle: "Here When You Need Us",
    hoverDescription:
      "Our care team remains available throughout your treatment journey to answer questions and review your progress.",
    hoverImage: images.landingpageimages.SkyDifferenceCardImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",
    onClick: () => {
      console.log("Ongoing support card clicked");
    },
  },
  {
    id: 5,
    title: "Trusted Treatments",
    description:
      "Every treatment is selected carefully and prescribed according to your individual medical needs.",
    image: images.landingpageimages.PharmacyImage,
    hoverTitle: "Quality You Can Trust",
    hoverDescription:
      "Our physicians recommend treatments using medical expertise, current research, and established safety standards.",
    hoverImage: images.landingpageimages.SkyDifferenceCardImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",
    onClick: () => {
      console.log("Trusted treatments card clicked");
    },
  },
  {
    id: 6,
    title: "Fast Appointments",
    description:
      "Connect with an experienced medical provider without waiting weeks for an appointment.",
    image: images.landingpageimages.PharmacyImage,
    hoverTitle: "Care Without the Wait",
    hoverDescription:
      "Same-day appointments may be available, helping you begin your personalized care journey sooner.",
    hoverImage: images.landingpageimages.SkyDifferenceCardImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",
    onClick: () => {
      console.log("Fast appointments card clicked");
    },
  },
  {
    id: 7,
    title: "Private and Secure",
    description:
      "Your health information and treatment experience are handled with privacy, security, and discretion.",
    image: images.landingpageimages.PharmacyImage,
    hoverTitle: "Your Privacy Matters",
    hoverDescription:
      "Our secure platform protects your information throughout consultations, treatment planning, and ongoing care.",
    hoverImage: images.landingpageimages.SkyDifferenceCardImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",
    onClick: () => {
      console.log("Private and secure card clicked");
    },
  },
  {
    id: 8,
    title: "Expert Guidance",
    description:
      "Receive clear medical guidance to help you understand your treatment and make informed health decisions.",
    image: images.landingpageimages.PharmacyImage,
    hoverTitle: "Guidance at Every Step",
    hoverDescription:
      "Our providers explain your options clearly and help you select a treatment plan aligned with your goals.",
    hoverImage: images.landingpageimages.SkyDifferenceCardImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",
    onClick: () => {
      console.log("Expert guidance card clicked");
    },
  },
];
const faqItems: FAQItem[] = [
  {
    question: "What does the $199/month include?",
    answer:
      "Your monthly plan includes physician-guided care, a personalized treatment plan, ongoing support, and regular progress reviews. Medication costs may vary depending on your prescription.",
  },
  {
    question: "Do I need insurance?",
    answer:
      "No. Skye works entirely without insurance, so there are no claims, no prior authorizations, and no coverage surprises. You pay one flat monthly price.",
  },
  {
    question: "How do I know if I'm eligible?",
    answer:
      "You will complete a brief medical questionnaire and consult with a licensed provider. Your provider will review your health history and determine whether treatment is appropriate for you.",
  },
  {
    question: "How fast will I get my treatment?",
    answer:
      "Once your provider approves the prescription, it is sent to an accredited pharmacy for fulfillment. Delivery times may vary, but most treatments are shipped shortly after approval.",
  },
  {
    question: "I'm already on a GLP-1. Can I switch to Skye?",
    answer:
      "Yes, you may be able to switch to Skye. Your provider will review your current medication, dosage, treatment history, and health goals before recommending the next step.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel your membership at any time. Contact our support team before your next billing or prescription processing date to avoid additional charges.",
  },
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] =
    useState<TreatmentFilterValue>("all");

  const cardsSwiperRef = useRef<SwiperType | null>(null);
  const [activeCardSlide, setActiveCardSlide] = useState(0);
  const differenceSwiperRef = useRef<SwiperType | null>(null);
  const [activeDifferenceSlide, setActiveDifferenceSlide] = useState(0);
  const hero = heroSlides[0];
  const featuredTreatmentCard = hoverTreatmentCards[0];
  const standardTreatmentCards = hoverTreatmentCards.slice(1);
  const featuredPeptideCard = peptideTreatmentCards[0];
  const standardPeptideCards = peptideTreatmentCards.slice(1);
  const peptideCardsSwiperRef = useRef<SwiperType | null>(null);
  const [activePeptideCardSlide, setActivePeptideCardSlide] = useState(0);
  const optimizeSwiperRef = useRef<SwiperType | null>(null);
  const [activeOptimizeSlide, setActiveOptimizeSlide] = useState(0);
  const featuredOptimizeCard = OptimizeeverythingCards[0];
  const standardOptimizeCards = OptimizeeverythingCards.slice(1);
  const featuredHormoneCard = Hormonescards[0];
  const standardHormoneCards = Hormonescards.slice(1);
  const hormonesSwiperRef = useRef<SwiperType | null>(null);
  const [activeHormoneSlide, setActiveHormoneSlide] = useState(0);

  const [isCardsBeginning, setIsCardsBeginning] = useState(true);
  const [isCardsEnd, setIsCardsEnd] = useState(false);
  const updateCardsSwiperState = (swiper: SwiperType) => {
    setActiveCardSlide(swiper.activeIndex);
    setIsCardsBeginning(swiper.isBeginning);
    setIsCardsEnd(swiper.isEnd);
  };
  const totalCardDots = Math.ceil(hoverTreatmentCards.length / 2);

  const activeCardDot = isCardsEnd
    ? totalCardDots - 1
    : Math.min(Math.floor(activeCardSlide / 2), totalCardDots - 1);
  const [isPeptideBeginning, setIsPeptideBeginning] = useState(true);
  const [isPeptideEnd, setIsPeptideEnd] = useState(false);

  const updatePeptideSwiperState = (swiper: SwiperType) => {
    setActivePeptideCardSlide(swiper.activeIndex);
    setIsPeptideBeginning(swiper.isBeginning);
    setIsPeptideEnd(swiper.isEnd);
  };

  const totalPeptideDots = Math.ceil(peptideTreatmentCards.length / 2);

  const activePeptideDot = isPeptideEnd
    ? totalPeptideDots - 1
    : Math.min(Math.floor(activePeptideCardSlide / 2), totalPeptideDots - 1);
  const [isOptimizeBeginning, setIsOptimizeBeginning] = useState(true);
  const [isOptimizeEnd, setIsOptimizeEnd] = useState(false);

  const updateOptimizeSwiperState = (swiper: SwiperType) => {
    setActiveOptimizeSlide(swiper.activeIndex);
    setIsOptimizeBeginning(swiper.isBeginning);
    setIsOptimizeEnd(swiper.isEnd);
  };

  const totalOptimizeDots = Math.ceil(OptimizeeverythingCards.length / 2);

  const activeOptimizeDot = isOptimizeEnd
    ? totalOptimizeDots - 1
    : Math.min(Math.floor(activeOptimizeSlide / 2), totalOptimizeDots - 1);
  const [isHormoneBeginning, setIsHormoneBeginning] = useState(true);
  const [isHormoneEnd, setIsHormoneEnd] = useState(false);

  const updateHormoneSwiperState = (swiper: SwiperType) => {
    setActiveHormoneSlide(swiper.activeIndex);
    setIsHormoneBeginning(swiper.isBeginning);
    setIsHormoneEnd(swiper.isEnd);
  };

  const totalHormoneDots = Math.ceil(Hormonescards.length / 2);

  const activeHormoneDot = isHormoneEnd
    ? totalHormoneDots - 1
    : Math.min(Math.floor(activeHormoneSlide / 2), totalHormoneDots - 1);
  const [isDifferenceBeginning, setIsDifferenceBeginning] = useState(true);
  const [isDifferenceEnd, setIsDifferenceEnd] = useState(false);

  const updateDifferenceSwiperState = (swiper: SwiperType) => {
    setActiveDifferenceSlide(swiper.activeIndex);
    setIsDifferenceBeginning(swiper.isBeginning);
    setIsDifferenceEnd(swiper.isEnd);
  };

  const totalDifferenceDots = Math.ceil(differenceCards.length / 2);

  const activeDifferenceDot = isDifferenceEnd
    ? totalDifferenceDots - 1
    : Math.min(Math.floor(activeDifferenceSlide / 2), totalDifferenceDots - 1);
  return (
    <>
      <section
        style={{
          backgroundImage: `url("${hero.backgroundImage}")`,
        }}
        className="bg-cover bg-center bg-no-repeat pt-15 xl:pt-73.5 pb-20 relative overflow-hidden "
      >
        <div className="container mx-auto grid max-w-7xl grid-cols-1 xl:grid-cols-2 items-center relative z-20 px-4 xl:px-8">
          <div className="flex flex-col gap-4 xl:gap-10">
            <Image
              src={hero.logo}
              alt="Skye Health"
              className="xl:w-fit w-50 h-auto"
            />

            <div className="flex flex-col gap-4">
              <h1 className="text-2xl xl:text-5xl font-semibold text-white">
                {hero.title}
              </h1>

              <p className="text-lg xl:text-xl font-light text-white">
                {hero.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="cursor-pointer rounded-full bg-[#0F1D3A] py-3 px-5  xl:py-5 xl:px-8  text-sm xl:text-base font-medium text-white"
              >
                Get started now
              </button>

              <button
                type="button"
                className="flex cursor-pointer items-center gap-2.5 rounded-full border border-white py-3 px-5  xl:py-5 xl:px-8"
              >
                <span className="text-sm xl:text-base font-medium text-white">
                  View all treatments
                </span>

                <NewArrowIcon width="16" height="16" fill="white" />
              </button>
            </div>
          </div>
        </div>
        <div className="xl:block hidden w-full">
          <Image
            src={hero.ringImage}
            alt=""
            aria-hidden="true"
            className="  absolute right-0 bottom-0"
          />

          <Image
            src={hero.heroImage}
            alt={hero.title}
            className="absolute -right-6 z-10   bottom-0"
          />
        </div>
      </section>
      <section className="pt-10 xl:pt-20 pb-10 xl:pb-27 bg-[#F5F8FE] ">
        <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 px-4 xl:px-8">
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
      <section className="pb-10 xl:pb-27 bg-[#F5F8FE]">
        <div className="container max-w-7xl mx-auto flex flex-col gap-6 xl:gap-14.5 px-4 xl:px-8">
          <div className="flex flex-col gap-2 xl:gap-4">
            <p className="text-xl xl:text-[40px] font-semibold text-[#22252B]">
              Explore your options
            </p>
            <TreatmentFilters
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
          <div className="flex flex-wrap gap-4.5 items-center self-center">
            <button
              onClick={() => {
                "";
              }}
              className="xl:py-5 xl:px-8 py-3 px-5 bg-[#3D74E9] rounded-full text-sm xl:text-base font-medium text-white "
            >
              Get started now
            </button>
            <button
              onClick={() => {
                "";
              }}
              className="xl:py-5 xl:px-8 py-3 px-5 border border-[#0F1D3A] rounded-full flex flex-row items-center gap-2.5 "
            >
              <p className="text-sm xl:text-base font-medium text-[#0F1D3A]">
                View all treatments
              </p>
              <NewArrowIcon fill="#0F1D3A" />
            </button>
          </div>
        </div>
      </section>
      <section className="pb-10 xl:pb-27 bg-[#F5F8FE]">
        <div className="container max-w-7xl mx-auto px-4 xl:px-8">
          <div className="rounded-2xl xl:rounded-4xl bg-[url('/images/PeptideExpertBgImage.png')] pl-4 pt-4 xl:pt-0 xl:pl-16 bg-cover bg-no-repeat h-full min-h-150 xl:min-h-146.5 grid xl:grid-cols-2 grid-cols-1  xl:items-center">
            <div className="flex flex-col  gap-3 xl:gap-6">
              <p className=" text-2xl xl:text-5xl font-medium  text-white">
                Your Peptide Experts
              </p>
              <p className="text-xl xl:text-[32px] font-medium  text-white">
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
              <div className="flex flex-wrap gap-4 ">
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
            <div className="w-full xl:h-full xl:self-stretch">
              <Image
                src={images.landingpageimages.DoctorImage}
                alt="Doctor"
                className="block h-auto w-full rounded-4xl xl:hidden"
              />
              <div className="relative hidden h-full min-h-146.5 w-full xl:block">
                <Image
                  src={images.landingpageimages.SkyWhiteBg}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="z-0 rounded-4xl object-fill"
                />

                <Image
                  src={images.landingpageimages.DoctorImage}
                  alt="Doctor"
                  fill
                  className="z-10 rounded-4xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 xl:gap-13 overflow-hidden bg-[#F5F8FE] pb-10 xl:pb-27">
        <div className="w-full px-4 xl:px-8 2xl:px-65 flex flex-col gap-4">
          <div className="block xl:hidden">
            <FeaturedTreatmentCard
              image={featuredTreatmentCard.hoverImage}
              badge={featuredTreatmentCard.hoverBadge}
              title={featuredTreatmentCard.hoverTitle}
              actionLabel={featuredTreatmentCard.hoverActionLabel}
              backgroundColor={featuredTreatmentCard.hoverCardBg}
              badgeBackgroundColor={featuredTreatmentCard.hoverBadgeBg}
              onGetStarted={featuredTreatmentCard.onHoverGetStarted}
              onAction={featuredTreatmentCard.onHoverAction}
            />
          </div>
          <Swiper
            slidesPerView="auto"
            modules={[Mousewheel]}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.7,
              thresholdDelta: 5,
              thresholdTime: 300,
              releaseOnEdges: true,
            }}
            spaceBetween={24}
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
              updateCardsSwiperState(swiper);
            }}
            onSlideChange={updateCardsSwiperState}
            onReachBeginning={updateCardsSwiperState}
            onReachEnd={updateCardsSwiperState}
            onFromEdge={updateCardsSwiperState}
            className="w-full h-full overflow-visible! [&_.swiper-wrapper]:items-stretch"
          >
            <SwiperSlide className="xl:w-206! w-auto h-auto! xl:block! hidden!">
              <FeaturedTreatmentCard
                image={featuredTreatmentCard.hoverImage}
                badge={featuredTreatmentCard.hoverBadge}
                title={featuredTreatmentCard.hoverTitle}
                actionLabel={featuredTreatmentCard.hoverActionLabel}
                backgroundColor={featuredTreatmentCard.hoverCardBg}
                badgeBackgroundColor={featuredTreatmentCard.hoverBadgeBg}
                onGetStarted={featuredTreatmentCard.onHoverGetStarted}
                onAction={featuredTreatmentCard.onHoverAction}
              />
            </SwiperSlide>

            {standardTreatmentCards.map((card) => (
              <SwiperSlide key={card.id} className="xl:w-110! h-auto!">
                <TreatmentSliderCard
                  productImage={card.productImage}
                  productTitle={card.productTitle}
                  productDescription={card.productDescription}
                  productPrice={card.productPrice}
                  productImageBg={card.productImageBg}
                  onGetStarted={card.onGetStarted}
                  onShopNow={card.onShopNow}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

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

            <div className="hidden items-center gap-2 rounded-full bg-white p-4 xl:flex">
              {Array.from({ length: totalCardDots }).map((_, index) => {
                const isLastDot = index === totalCardDots - 1;

                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to card group ${index + 1}`}
                    aria-current={activeCardDot === index ? "true" : undefined}
                    onClick={() => {
                      if (isLastDot) {
                        cardsSwiperRef.current?.slideTo(
                          hoverTreatmentCards.length - 1,
                        );
                      } else {
                        cardsSwiperRef.current?.slideTo(index * 2);
                      }
                    }}
                    className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                      activeCardDot === index ? "bg-[#0F1D3A]" : "bg-[#CEDCF9]"
                    }`}
                  />
                );
              })}
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
      <section className="flex flex-col gap-6 overflow-hidden bg-[#F5F8FE] pb-10 xl:gap-13 xl:pb-27">
        <div className="flex w-full flex-col gap-4 px-4 xl:px-8 2xl:px-65">
          {/* Mobile featured card */}
          {featuredPeptideCard && (
            <div className="block xl:hidden">
              <FeaturedTreatmentCard
                image={featuredPeptideCard.hoverImage}
                badge={featuredPeptideCard.hoverBadge}
                title={featuredPeptideCard.hoverTitle}
                actionLabel={featuredPeptideCard.hoverActionLabel}
                backgroundColor={featuredPeptideCard.hoverCardBg}
                badgeBackgroundColor={featuredPeptideCard.hoverBadgeBg}
                onGetStarted={featuredPeptideCard.onHoverGetStarted}
                onAction={featuredPeptideCard.onHoverAction}
              />
            </div>
          )}

          <Swiper
            slidesPerView="auto"
            spaceBetween={24}
            modules={[Mousewheel]}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.7,
              thresholdDelta: 5,
              thresholdTime: 300,
              releaseOnEdges: true,
            }}
            loop={false}
            rewind={false}
            speed={500}
            grabCursor
            simulateTouch
            allowTouchMove
            observer
            observeParents
            watchOverflow
            onSwiper={(swiper) => {
              peptideCardsSwiperRef.current = swiper;

              window.requestAnimationFrame(() => {
                swiper.update();
                updatePeptideSwiperState(swiper);
              });
            }}
            onSlideChange={updatePeptideSwiperState}
            onReachBeginning={updatePeptideSwiperState}
            onReachEnd={updatePeptideSwiperState}
            onFromEdge={updatePeptideSwiperState}
            className="h-full w-full overflow-visible! [&_.swiper-wrapper]:items-stretch"
          >
            {/* Desktop featured slide */}
            {featuredPeptideCard && (
              <SwiperSlide className="hidden! h-auto! w-auto xl:block! xl:w-206!">
                <FeaturedTreatmentCard
                  image={featuredPeptideCard.hoverImage}
                  badge={featuredPeptideCard.hoverBadge}
                  title={featuredPeptideCard.hoverTitle}
                  actionLabel={featuredPeptideCard.hoverActionLabel}
                  backgroundColor={featuredPeptideCard.hoverCardBg}
                  badgeBackgroundColor={featuredPeptideCard.hoverBadgeBg}
                  onGetStarted={featuredPeptideCard.onHoverGetStarted}
                  onAction={featuredPeptideCard.onHoverAction}
                />
              </SwiperSlide>
            )}

            {standardPeptideCards.map((card) => (
              <SwiperSlide key={card.id} className="h-auto! w-auto xl:w-110!">
                <TreatmentSliderCard
                  productImage={card.productImage}
                  productTitle={card.productTitle}
                  productDescription={card.productDescription}
                  productPrice={card.productPrice}
                  productImageBg={card.productImageBg}
                  onGetStarted={card.onGetStarted}
                  onShopNow={card.onShopNow}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="self-center">
          <div className="flex flex-row items-center gap-4">
            <button
              type="button"
              aria-label="Previous peptide"
              disabled={isPeptideBeginning}
              onClick={() => {
                peptideCardsSwiperRef.current?.slidePrev();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex rotate-180">
                <NewArrowIcon fill="#0F1D3A" />
              </span>
            </button>

            <div className="hidden items-center gap-2 rounded-full bg-white p-4 xl:flex">
              {Array.from({ length: totalPeptideDots }).map((_, index) => {
                const isLastDot = index === totalPeptideDots - 1;

                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to peptide group ${index + 1}`}
                    aria-current={
                      activePeptideDot === index ? "true" : undefined
                    }
                    onClick={() => {
                      if (isLastDot) {
                        peptideCardsSwiperRef.current?.slideTo(
                          peptideTreatmentCards.length - 1,
                        );
                      } else {
                        peptideCardsSwiperRef.current?.slideTo(index * 2);
                      }
                    }}
                    className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                      activePeptideDot === index
                        ? "bg-[#0F1D3A]"
                        : "bg-[#CEDCF9]"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next peptide"
              disabled={isPeptideEnd}
              onClick={() => {
                peptideCardsSwiperRef.current?.slideNext();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NewArrowIcon fill="white" />
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 overflow-hidden bg-[#F5F8FE] pb-10 xl:gap-13 xl:pb-27">
        <div className="flex w-full flex-col gap-4 px-4 xl:px-8 2xl:px-65">
          {/* Mobile featured card */}
          {featuredOptimizeCard && (
            <div className="block xl:hidden">
              <FeaturedTreatmentCard
                image={featuredOptimizeCard.hoverImage}
                badge={featuredOptimizeCard.hoverBadge}
                title={featuredOptimizeCard.hoverTitle}
                actionLabel={featuredOptimizeCard.hoverActionLabel}
                backgroundColor={featuredOptimizeCard.hoverCardBg}
                badgeBackgroundColor={featuredOptimizeCard.hoverBadgeBg}
                onGetStarted={featuredOptimizeCard.onHoverGetStarted}
                onAction={featuredOptimizeCard.onHoverAction}
              />
            </div>
          )}

          <Swiper
            slidesPerView="auto"
            spaceBetween={24}
            modules={[Mousewheel]}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.7,
              thresholdDelta: 5,
              thresholdTime: 300,
              releaseOnEdges: true,
            }}
            loop={false}
            rewind={false}
            speed={500}
            grabCursor
            simulateTouch
            allowTouchMove
            observer
            observeParents
            watchOverflow
            onSwiper={(swiper) => {
              optimizeSwiperRef.current = swiper;

              window.requestAnimationFrame(() => {
                swiper.update();
                updateOptimizeSwiperState(swiper);
              });
            }}
            onSlideChange={updateOptimizeSwiperState}
            onReachBeginning={updateOptimizeSwiperState}
            onReachEnd={updateOptimizeSwiperState}
            onFromEdge={updateOptimizeSwiperState}
            className="h-full w-full overflow-visible! [&_.swiper-wrapper]:items-stretch"
          >
            {/* Desktop featured slide */}
            {featuredOptimizeCard && (
              <SwiperSlide className="hidden! h-auto! w-auto xl:block! xl:w-206!">
                <FeaturedTreatmentCard
                  image={featuredOptimizeCard.hoverImage}
                  badge={featuredOptimizeCard.hoverBadge}
                  title={featuredOptimizeCard.hoverTitle}
                  actionLabel={featuredOptimizeCard.hoverActionLabel}
                  backgroundColor={featuredOptimizeCard.hoverCardBg}
                  badgeBackgroundColor={featuredOptimizeCard.hoverBadgeBg}
                  onGetStarted={featuredOptimizeCard.onHoverGetStarted}
                  onAction={featuredOptimizeCard.onHoverAction}
                />
              </SwiperSlide>
            )}

            {standardOptimizeCards.map((card) => (
              <SwiperSlide key={card.id} className="h-auto! w-auto xl:w-110!">
                <TreatmentSliderCard
                  productImage={card.productImage}
                  productTitle={card.productTitle}
                  productDescription={card.productDescription}
                  productPrice={card.productPrice}
                  productImageBg={card.productImageBg}
                  onGetStarted={card.onGetStarted}
                  onShopNow={card.onShopNow}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="self-center">
          <div className="flex flex-row items-center gap-4">
            <button
              type="button"
              aria-label="Previous optimization treatment"
              disabled={isOptimizeBeginning}
              onClick={() => {
                optimizeSwiperRef.current?.slidePrev();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex rotate-180">
                <NewArrowIcon fill="#0F1D3A" />
              </span>
            </button>

            <div className="hidden items-center gap-2 rounded-full bg-white p-4 xl:flex">
              {Array.from({ length: totalOptimizeDots }).map((_, index) => {
                const isLastDot = index === totalOptimizeDots - 1;

                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to optimization group ${index + 1}`}
                    aria-current={
                      activeOptimizeDot === index ? "true" : undefined
                    }
                    onClick={() => {
                      if (isLastDot) {
                        optimizeSwiperRef.current?.slideTo(
                          OptimizeeverythingCards.length - 1,
                        );
                      } else {
                        optimizeSwiperRef.current?.slideTo(index * 2);
                      }
                    }}
                    className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                      activeOptimizeDot === index
                        ? "bg-[#0F1D3A]"
                        : "bg-[#CEDCF9]"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next optimization treatment"
              disabled={isOptimizeEnd}
              onClick={() => {
                optimizeSwiperRef.current?.slideNext();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NewArrowIcon fill="white" />
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-6 overflow-hidden bg-[#F5F8FE] pb-10 xl:gap-13 xl:pb-27">
        <div className="flex w-full flex-col gap-4 px-4 xl:px-8 2xl:px-65">
          {/* Mobile featured card */}
          {featuredHormoneCard && (
            <div className="block xl:hidden">
              <FeaturedTreatmentCard
                image={featuredHormoneCard.hoverImage}
                badge={featuredHormoneCard.hoverBadge}
                title={featuredHormoneCard.hoverTitle}
                actionLabel={featuredHormoneCard.hoverActionLabel}
                backgroundColor={featuredHormoneCard.hoverCardBg}
                badgeBackgroundColor={featuredHormoneCard.hoverBadgeBg}
                onGetStarted={featuredHormoneCard.onHoverGetStarted}
                onAction={featuredHormoneCard.onHoverAction}
              />
            </div>
          )}

          <Swiper
            slidesPerView="auto"
            spaceBetween={24}
            modules={[Mousewheel]}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.7,
              thresholdDelta: 5,
              thresholdTime: 300,
              releaseOnEdges: true,
            }}
            loop={false}
            rewind={false}
            speed={500}
            grabCursor
            simulateTouch
            allowTouchMove
            observer
            observeParents
            watchOverflow
            onSwiper={(swiper) => {
              hormonesSwiperRef.current = swiper;

              window.requestAnimationFrame(() => {
                swiper.update();
                updateHormoneSwiperState(swiper);
              });
            }}
            onSlideChange={updateHormoneSwiperState}
            onReachBeginning={updateHormoneSwiperState}
            onReachEnd={updateHormoneSwiperState}
            onFromEdge={updateHormoneSwiperState}
            className="h-full w-full overflow-visible! [&_.swiper-wrapper]:items-stretch"
          >
            {/* Desktop featured slide */}
            {featuredHormoneCard && (
              <SwiperSlide className="hidden! h-auto! w-auto xl:block! xl:w-206!">
                <FeaturedTreatmentCard
                  image={featuredHormoneCard.hoverImage}
                  badge={featuredHormoneCard.hoverBadge}
                  title={featuredHormoneCard.hoverTitle}
                  actionLabel={featuredHormoneCard.hoverActionLabel}
                  backgroundColor={featuredHormoneCard.hoverCardBg}
                  badgeBackgroundColor={featuredHormoneCard.hoverBadgeBg}
                  onGetStarted={featuredHormoneCard.onHoverGetStarted}
                  onAction={featuredHormoneCard.onHoverAction}
                />
              </SwiperSlide>
            )}

            {standardHormoneCards.map((card) => (
              <SwiperSlide key={card.id} className="h-auto! w-auto xl:w-110!">
                <TreatmentSliderCard
                  productImage={card.productImage}
                  productTitle={card.productTitle}
                  productDescription={card.productDescription}
                  productPrice={card.productPrice}
                  productImageBg={card.productImageBg}
                  onGetStarted={card.onGetStarted}
                  onShopNow={card.onShopNow}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="self-center">
          <div className="flex flex-row items-center gap-4">
            <button
              type="button"
              aria-label="Previous hormone treatment"
              disabled={isHormoneBeginning}
              onClick={() => {
                hormonesSwiperRef.current?.slidePrev();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex rotate-180">
                <NewArrowIcon fill="#0F1D3A" />
              </span>
            </button>

            <div className="hidden items-center gap-2 rounded-full bg-white p-4 xl:flex">
              {Array.from({ length: totalHormoneDots }).map((_, index) => {
                const isLastDot = index === totalHormoneDots - 1;

                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to hormone group ${index + 1}`}
                    aria-current={
                      activeHormoneDot === index ? "true" : undefined
                    }
                    onClick={() => {
                      if (isLastDot) {
                        hormonesSwiperRef.current?.slideTo(
                          Hormonescards.length - 1,
                        );
                      } else {
                        hormonesSwiperRef.current?.slideTo(index * 2);
                      }
                    }}
                    className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                      activeHormoneDot === index
                        ? "bg-[#0F1D3A]"
                        : "bg-[#CEDCF9]"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next hormone treatment"
              disabled={isHormoneEnd}
              onClick={() => {
                hormonesSwiperRef.current?.slideNext();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NewArrowIcon fill="white" />
            </button>
          </div>
        </div>
      </section>
      <section className=" bg-[url('/images/BetterTreatmentBgImage.png')] px-4 xl:px-8 xl:pt-16 bg-[#F5F8FE] bg-contain bg-center bg-no-repeat xl:min-h-266.75 flex flex-col items-center  justify-between">
        <p className="text-2xl xl:text-[40px] font-semibold text-[#0F1D3A] ">
          Better treatment. Better price.{" "}
          <span className="text-[#3D74E9]">Better care.</span>
        </p>
        <div className="flex flex-col items-center gap-6">
          <p className="text-base xl:text-[32px] font-semibold text-[#0F1D3A]">
            Everything you need. Nothing you don&apos;t. $199 flat.
          </p>
          <p className="text-sm xl:text-base text-[#1F3A75] text-center">
            Licensed physicians, clinically proven treatment, and ongoing care.
            <br />
            All for $199 a month, all built around you.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                "";
              }}
              className=" cursor-pointer py-3 xl:py-5 px-5 xl:px-8 rounded-full bg-[#3D74E9] text-white text-sm xl:text-base leading-[100%] font-medium"
            >
              Get started now
            </button>
            <button
              onClick={() => {
                "";
              }}
              className=" cursor-pointer py-3 xl:py-5 px-5 xl:px-8 rounded-full border border-[#0F1D3A] flex flex-row items-center gap-2.5 "
            >
              <p className="text-[#0F1D3A] text-sm xl:text-base leading-[100%] font-medium">
                Explore your options
              </p>
              <NewArrowIcon fill="#0F1D3A" />
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-8 xl:gap-20 bg-[#F5F8FE] pt-10 xl:pt-40 ">
        <div className="container mx-auto flex max-w-7xl flex-col xl:flex-row xl:items-end justify-between xl:gap-0 gap-4 px-4 xl:px-8">
          <p className="text-2xl xl:text-[40px] font-medium text-[#22252B]">
            The Skye difference
          </p>
          <button
            type="button"
            className="flex flex-row items-center gap-2.5 pr-2.5 xl:pl-4"
          >
            <span className="text-base text-[#3D74E9]">Explore products</span>

            <span className="flex items-center justify-center rounded-full bg-[#3D74E9] py-1.5 px-3">
              <NewArrowIcon fill="white" />
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-6 overflow-hidden xl:gap-13">
          <div className="w-full px-4 xl:px-8 2xl:px-63">
            <Swiper
              slidesPerView="auto"
              spaceBetween={12}
              loop={false}
              rewind={false}
              modules={[Mousewheel]}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 0.7,
                thresholdDelta: 5,
                thresholdTime: 300,
                releaseOnEdges: true,
              }}
              grabCursor
              simulateTouch
              allowTouchMove
              observer
              observeParents
              watchOverflow
              onSwiper={(swiper) => {
                differenceSwiperRef.current = swiper;
                updateDifferenceSwiperState(swiper);
              }}
              onSlideChange={updateDifferenceSwiperState}
              onReachBeginning={updateDifferenceSwiperState}
              onReachEnd={updateDifferenceSwiperState}
              onFromEdge={updateDifferenceSwiperState}
              className="w-full overflow-visible! [&_.swiper-wrapper]:items-stretch"
            >
              {differenceCards.map((card) => (
                <SwiperSlide
                  key={card.id}
                  className="h-auto! w-[calc(100vw-32px)]! sm:w-89.25!"
                >
                  <div className="h-full">
                    <SkyDifferenceCard
                      title={card.title}
                      description={card.description}
                      image={card.image}
                      hoverTitle={card.hoverTitle}
                      hoverDescription={card.hoverDescription}
                      hoverImage={card.hoverImage}
                      hoverBackgroundImage={card.hoverBackgroundImage}
                      onClick={card.onClick}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="self-center">
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous difference card"
                disabled={isDifferenceBeginning}
                onClick={() => {
                  differenceSwiperRef.current?.slidePrev();
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="inline-flex rotate-180">
                  <NewArrowIcon fill="#0F1D3A" />
                </span>
              </button>

              <div className="flex items-center gap-2 rounded-full bg-white p-4">
                {Array.from({ length: totalDifferenceDots }).map((_, index) => {
                  const isLastDot = index === totalDifferenceDots - 1;

                  return (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to difference card group ${index + 1}`}
                      aria-current={
                        activeDifferenceDot === index ? "true" : undefined
                      }
                      onClick={() => {
                        if (isLastDot) {
                          differenceSwiperRef.current?.slideTo(
                            differenceCards.length - 1,
                          );
                        } else {
                          differenceSwiperRef.current?.slideTo(index * 2);
                        }
                      }}
                      className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                        activeDifferenceDot === index
                          ? "bg-[#0F1D3A]"
                          : "bg-[#CEDCF9]"
                      }`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                aria-label="Next difference card"
                disabled={isDifferenceEnd}
                onClick={() => {
                  differenceSwiperRef.current?.slideNext();
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <NewArrowIcon fill="white" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F5F8FE] py-10 xl:py-30 ">
        <div className="container  max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-32.5 justify-between px-4 xl:px-8">
          <div className="flex flex-col gap-4 xl:gap-6">
            <p className="text-2xl xl:text-5xl  font-semibold text-[#22252B] leading-[100%]">
              Frequently Asked Questions?
            </p>
            <p className="text-lg xl:text-xl text-[#737780] leading-[100%]">
              Everything you need to know about our peptides and process.
            </p>
            <FAQAccordion faqs={faqItems} />
          </div>
          <div className="bg-[#E2EAFC]  rounded-4xl">
            <Image
              src={images.landingpageimages.FaqsImage}
              alt={"faqs"}
              className="rounded-4xl w-full h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
