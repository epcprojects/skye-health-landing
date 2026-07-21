"use client";

import { StaticImageData } from "next/image";
import { useState } from "react";
import { images } from "@/app/ui";
import "swiper/css";
import { TreatmentFilterValue } from "@/app/components/cards/TreatmentFilters";
import { FAQItem } from "@/app/components/FaqAccordion";
import HeroSection from "@/app/components/sections/HeroSection";
import TreatmentCardsSection from "@/app/components/sections/TreatmentCardsSection";
import ExploreOptionsSection, {
  ExploreOptionProduct,
} from "@/app/components/sections/ExploreOptionsSection";
import PeptideExpertsSection from "@/app/components/sections/PeptideExpertsSection";
import TreatmentSliderSection from "@/app/components/sections/TreatmentSliderSection";
import PeptideTreatmentSliderSection from "@/app/components/sections/PeptideTreatmentSliderSection";
import OptimizeTreatmentSliderSection from "@/app/components/sections/OptimizeTreatmentSliderSection";
import HormoneTreatmentSliderSection from "@/app/components/sections/HormoneTreatmentSliderSection";
import BetterTreatmentSection from "@/app/components/sections/BetterTreatmentSection";
import SkyDifferenceSection from "@/app/components/sections/SkyDifferenceSection";
import FAQSection from "@/app/components/sections/FAQSection";
import { useRouter } from "next/navigation";
import WeightLossProgramModal from "@/app/components/modals/WeightLossProgramModal";
import HormoneProgramModal from "@/app/components/modals/HormoneProgramModal";

import {
  addProductToCart,
  selectCartItems,
  setQty,
} from "@/app/Redux/slices/cart/cartSlice";

import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import { toastAlert } from "@/app/components/ToastAlert";

import {
  canAddProductWithCartRules,
  WEIGHT_LOSS_PROGRAM_PRODUCT_ID,
} from "@/app/lib/cartRules";

import {
  ALL_PRODUCTS,
  AllProductsType,
  AllProductsVariables,
  ProductStatusEnum,
  ProductType,
} from "@/app/graphql/queries/products";
import { useQuery } from "@apollo/client/react";
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
const WEIGHT_LOSS_PROGRAM_STORAGE_KEY = "skye-weight-loss-program";

const WEIGHT_LOSS_PROGRAM_PREFILL_SOURCE_KEY =
  "skye-weight-loss-program-prefill-source";

const HORMONE_PROGRAM_PREFILL_SOURCE_KEY =
  "skye-hormone-program-prefill-source";

type SavedProgramAnswer = {
  question: string;
  answer: string;
};

type SavedProgramPayload = {
  program?: string;
  answers?: SavedProgramAnswer[];
};

const WEIGHT_LOSS_PROGRAM_PRODUCT: ProductType = {
  id: WEIGHT_LOSS_PROGRAM_PRODUCT_ID,
  sku: "WL-PROGRAM",
  name: "Weight Loss Program",
  description: "",
  category: "Weight Loss Program",
  brand: "",
  price: 199,
  quantity: 999,
  inStock: true,
  primaryImage: "",
  status: ProductStatusEnum.IN_STOCK,
  form: "",
  strength: "",
  vendor: "Greenwich",
  productUnitPricings: [
    {
      id: WEIGHT_LOSS_PROGRAM_PRODUCT_ID,
      sku: "WL-PROGRAM",
      quantity: 999,
      strength: "",
      unitQuantity: "",
      cost: 199,
    },
  ],
};

const HORMONE_PROGRAM_PRODUCT: ProductType = {
  id: "bf59d40c-6813-402d-ac73-49a0e2f3565a",
  sku: "HRT-PROGRAM",
  name: "Hormone Program",
  description: "",
  category: "Hormone Program",
  brand: "",
  price: 0,
  quantity: 999,
  inStock: true,
  primaryImage: "",
  status: ProductStatusEnum.IN_STOCK,
  form: "",
  strength: "",
  vendor: "Integrity",
  productUnitPricings: [
    {
      id: "bf59d40c-6813-402d-ac73-49a0e2f3565a",
      sku: "HRT-PROGRAM",
      quantity: 999,
      strength: "",
      unitQuantity: "",
      cost: 0,
    },
  ],
};

const getWeightLossProgramMonths = () => {
  if (typeof window === "undefined") return 1;

  try {
    const rawSavedProgram = window.localStorage.getItem(
      WEIGHT_LOSS_PROGRAM_STORAGE_KEY,
    );

    if (!rawSavedProgram) return 1;

    const parsedSavedProgram = JSON.parse(
      rawSavedProgram,
    ) as SavedProgramPayload;

    const monthsAnswer = parsedSavedProgram.answers?.find(
      (entry) => entry.question === "How many months?",
    )?.answer;

    const parsedMonths = Number.parseInt(monthsAnswer ?? "1", 10);

    return Number.isFinite(parsedMonths) && parsedMonths > 0 ? parsedMonths : 1;
  } catch (error) {
    console.error("Failed to read saved weight-loss program months:", error);

    return 1;
  }
};

export default function Home() {
  const [selectedFilter, setSelectedFilter] =
    useState<TreatmentFilterValue>("all");
  const hero = heroSlides[0];
  const router = useRouter();
  const [isWeightLossModalOpen, setIsWeightLossModalOpen] = useState(false);
  const [isHormoneModalOpen, setIsHormoneModalOpen] = useState(false);

  const [pendingWeightLossProduct, setPendingWeightLossProduct] =
    useState<ProductType | null>(null);

  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const normalizeText = (value?: string | null) => value?.trim().toLowerCase();
  const isWeightLossModalProduct = (product?: ProductType | null) =>
    normalizeText(product?.category) === "weight loss program" ||
    (normalizeText(product?.category) === "weight loss" &&
      normalizeText(product?.subCategory) === "glp-1");
  const selectedCategory =
    selectedFilter === "all" ? undefined : selectedFilter;

  const {
    data: exploreProductsData,
    loading: exploreProductsLoading,
    error: exploreProductsError,
  } = useQuery<AllProductsType, AllProductsVariables>(ALL_PRODUCTS, {
    variables: {
      category: selectedCategory,
      page: 1,
      perPage: 4,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const handleProductAction = (product: ProductType) => {
    const cartGuard = canAddProductWithCartRules(cartItems, product.id);

    if (!cartGuard.allowed) {
      toastAlert(cartGuard.message ?? "Unable to add product to cart.", false);
      return;
    }

    if (isWeightLossModalProduct(product)) {
      setPendingWeightLossProduct(product);
      setIsWeightLossModalOpen(true);
      return;
    }

    dispatch(
      addProductToCart({
        product,
      }),
    );

    toastAlert("Added to Cart Successfully", true);
  };
  const backendProducts = exploreProductsData?.allProducts?.allData ?? [];

  const exploreProducts: ExploreOptionProduct[] = backendProducts.map(
    (product) => {
      const soldOut =
        !product.inStock || product.status === ProductStatusEnum.OUT_OF_STOCK;

      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(product.price);

      return {
        id: product.id,
        title: product.name,
        image: product.primaryImage || images.landingpageimages.ProductImage,
        description: product.description,
        price: `${formattedPrice}/month`,
        inStock: product.inStock && !soldOut,
        newIn: false,
        soldOut,

        onGetStarted: () => {
          handleProductAction(product);
        },

        onLearnMore: () => {
          handleProductAction(product);
        },
      };
    },
  );
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
        setPendingWeightLossProduct(null);
        setIsWeightLossModalOpen(true);
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
        //   router.push("/products?category=Peptides");
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
        setIsHormoneModalOpen(true);
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
        //   router.push("/products?category=Optimize%20Everything");
      },
    },
  ];
  return (
    <>
      <WeightLossProgramModal
        isOpen={isWeightLossModalOpen}
        onClose={() => {
          setIsWeightLossModalOpen(false);
          setPendingWeightLossProduct(null);
        }}
        onStartQuestionnaire={() => {
          const selectedMonths = getWeightLossProgramMonths();
          const targetProductId =
            pendingWeightLossProduct?.id ?? WEIGHT_LOSS_PROGRAM_PRODUCT_ID;
          const cartGuard = canAddProductWithCartRules(
            cartItems,
            targetProductId,
          );

          if (!cartGuard.allowed) {
            toastAlert(
              cartGuard.message ?? "Unable to add product to cart.",
              false,
            );
            return;
          }

          if (pendingWeightLossProduct) {
            const existingCartItem = cartItems.find(
              (item) => item.productId === pendingWeightLossProduct.id,
            );

            if (!existingCartItem) {
              dispatch(
                addProductToCart({
                  product: pendingWeightLossProduct,
                  qty: selectedMonths,
                }),
              );
            } else {
              dispatch(
                setQty({
                  cartItemId: existingCartItem.cartItemId,
                  qty: selectedMonths,
                }),
              );
            }
          } else {
            const hasWeightLossProgramInCart = cartItems.some(
              (item) => item.productId === WEIGHT_LOSS_PROGRAM_PRODUCT.id,
            );

            if (!hasWeightLossProgramInCart) {
              dispatch(
                addProductToCart({
                  product: WEIGHT_LOSS_PROGRAM_PRODUCT,
                  qty: selectedMonths,
                }),
              );
            } else {
              dispatch(
                setQty({
                  productId: WEIGHT_LOSS_PROGRAM_PRODUCT.id,
                  qty: selectedMonths,
                }),
              );
            }

            if (typeof window !== "undefined") {
              window.localStorage.setItem(
                WEIGHT_LOSS_PROGRAM_PREFILL_SOURCE_KEY,
                "card-flow",
              );
            }
          }

          setIsWeightLossModalOpen(false);
          setPendingWeightLossProduct(null);
          router.push("/surveys?step=1");
        }}
      />
      <HormoneProgramModal
        isOpen={isHormoneModalOpen}
        onClose={() => setIsHormoneModalOpen(false)}
        onStartQuestionnaire={() => {
          const hasHormoneProgramInCart = cartItems.some(
            (item) => item.productId === HORMONE_PROGRAM_PRODUCT.id,
          );

          if (!hasHormoneProgramInCart) {
            dispatch(
              addProductToCart({
                product: HORMONE_PROGRAM_PRODUCT,
                qty: 1,
              }),
            );
          } else {
            dispatch(
              setQty({
                productId: HORMONE_PROGRAM_PRODUCT.id,
                qty: 1,
              }),
            );
          }

          if (typeof window !== "undefined") {
            window.localStorage.setItem(
              HORMONE_PROGRAM_PREFILL_SOURCE_KEY,
              "card-flow",
            );
          }

          setIsHormoneModalOpen(false);
          router.push("/surveys?step=1");
        }}
      />
      <HeroSection
        hero={hero}
        onGetStarted={() => router.push("/products")}
        onViewTreatments={() => router.push("/products")}
      />
      <TreatmentCardsSection cards={treatmentCards} />
      <ExploreOptionsSection
        products={exploreProducts}
        loading={exploreProductsLoading}
        error={Boolean(exploreProductsError)}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        onGetStarted={() => {
          router.push("/products");
        }}
        onViewTreatments={() => {
          router.push("/products");
        }}
      />
      <PeptideExpertsSection />
      <TreatmentSliderSection hoverTreatmentCards={hoverTreatmentCards} />
      <PeptideTreatmentSliderSection
        peptideTreatmentCards={peptideTreatmentCards}
      />
      <OptimizeTreatmentSliderSection
        OptimizeeverythingCards={OptimizeeverythingCards}
      />
      <HormoneTreatmentSliderSection Hormonescards={Hormonescards} />
      <BetterTreatmentSection
        onGetStarted={() => {
          console.log("Get started");
        }}
        onExploreOptions={() => {
          console.log("Explore options");
        }}
      />
      <SkyDifferenceSection differenceCards={differenceCards} />
      <FAQSection faqItems={faqItems} />
    </>
  );
}
