"use client";

import { useEffect, useState } from "react";
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
import TreatmentSliderSection, {
  TreatmentSliderItem,
} from "@/app/components/sections/TreatmentSliderSection";
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

import {
  type FeaturedTreatmentSliderCard,
  type TreatmentSliderProduct,
} from "@/app/components/sections/TreatmentSliderSection";
import { NewArrowIcon } from "@/public/icons";
import Image from "next/image";

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

const hoverTreatmentCards: TreatmentSliderItem[] = [
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
const peptideTreatmentCards: TreatmentSliderItem[] = [
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
    productImage: images.landingpageimages.peptideProductImage,
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
    productImage: images.landingpageimages.peptideProductImage,
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
    productImage: images.landingpageimages.peptideProductImage,
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
    productImage: images.landingpageimages.peptideProductImage,
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
    productImage: images.landingpageimages.peptideProductImage,
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
    productImage: images.landingpageimages.peptideProductImage,
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
    productImage: images.landingpageimages.peptideProductImage,
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
    productImage: images.landingpageimages.peptideProductImage,
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
    productImage: images.landingpageimages.peptideProductImage,
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
const OptimizeeverythingCards: TreatmentSliderItem[] = [
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
    productImage: images.landingpageimages.gplProductImage,
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
    productImage: images.landingpageimages.gplProductImage,
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
    productImage: images.landingpageimages.gplProductImage,
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
    productImage: images.landingpageimages.gplProductImage,
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
    productImage: images.landingpageimages.gplProductImage,
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
    productImage: images.landingpageimages.gplProductImage,
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
    productImage: images.landingpageimages.gplProductImage,
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
    productImage: images.landingpageimages.gplProductImage,
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
    productImage: images.landingpageimages.gplProductImage,
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
const Hormonescards: TreatmentSliderItem[] = [
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
// const differenceCards = [
//   {
//     id: 1,
//     title: "Real Doctors",
//     description:
//       "Our providers are trained in peptide therapy, hormone optimization and longevity protocols. Appointments are same day when available. Quick turn around time on shipping after prescription approval.",
//     image: images.landingpageimages.SkyDifferenceCardImage,
//     hoverTitle: "Real Doctors",
//     hoverDescription:
//       "Our providers are trained in peptide therapy, hormone optimization and longevity protocols. Appointments are same day when available. Quick turn around time on shipping after prescription approval.",
//     hoverImage: images.landingpageimages.SkyDifferenceCardImage,
//     hoverBackgroundImage: "/images/SkyDifferenceBg.png",
//     onClick: () => {
//       console.log("Pharmacy quality card clicked");
//     },
//   },
//   {
//     id: 2,
//     title: "Pharmacy Quality",
//     description:
//       "Your treatment comes from accredited pharmacies, held to the highest standards of safety and purity.",
//     image: images.landingpageimages.PharmacyImage,
//     hoverTitle: "Pharmacy Quality",
//     hoverDescription:
//       "Your treatment comes from accredited pharmacies, held to the highest standards of safety and purity.",
//     hoverImage: images.landingpageimages.PharmacyImage,
//     hoverBackgroundImage: "/images/SkyDifferenceBg.png",
//     onClick: () => {
//       console.log("Personalized care card clicked");
//     },
//   },
//   {
//     id: 3,
//     title: "No Guesswork",
//     description:
//       "No more researching alone. Your physician builds your plan with you and adjusts it as you go.",
//     image: images.landingpageimages.PharmacyImage,
//     hoverTitle: "No Guesswork",
//     hoverDescription:
//       "No more researching alone. Your physician builds your plan with you and adjusts it as you go.",
//     hoverImage: images.landingpageimages.NoGuessWorkImage,
//     hoverBackgroundImage: "/images/SkyDifferenceBg.png",
//     onClick: () => {
//       console.log("Direct delivery card clicked");
//     },
//   },
//   {
//     id: 4,
//     title: "Flexible access",
//     description:
//       "Connect with licensed professionals who understand your goals, answer your questions, and guide your care.",
//     image: images.landingpageimages.PharmacyImage,
//     hoverTitle: "Flexible access",
//     hoverDescription:
//       "Connect with licensed professionals who understand your goals, answer your questions, and guide your care.",
//     hoverImage: images.landingpageimages.PharmacyImage,
//     hoverBackgroundImage: "/images/SkyDifferenceBg.png",
//     onClick: () => {
//       console.log("Ongoing support card clicked");
//     },
//   },
// ];
const differenceCards = [
  {
    id: 1,
    title: "Real Doctors",
    description:
      "Our providers are trained in peptide therapy, hormone optimization and longevity protocols. Appointments are same day when available. Quick turn around time on shipping after prescription approval.",
    image: images.landingpageimages.SkyDifferenceCardImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",

    onClick: () => {
      console.log("Real Doctors card clicked");
    },
  },
  {
    id: 2,
    title: "Pharmacy Quality",
    description:
      "Your treatment comes from accredited pharmacies, held to the highest standards of safety and purity.",
    image: images.landingpageimages.PharmacyImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",

    onClick: () => {
      console.log("Pharmacy Quality card clicked");
    },
  },
  {
    id: 3,
    title: "No Guesswork",
    description:
      "No more researching alone. Your physician builds your plan with you and adjusts it as you go.",
    image: images.landingpageimages.NoGuessWorkImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",

    onClick: () => {
      console.log("No Guesswork card clicked");
    },
  },
  {
    id: 4,
    title: "Flexible access",
    description:
      "Connect with licensed professionals who understand your goals, answer your questions, and guide your care.",
    image: images.landingpageimages.PharmacyImage,
    hoverBackgroundImage: "/images/SkyDifferenceBg.png",

    onClick: () => {
      console.log("Flexible access card clicked");
    },
  },
];
export const faqItems: FAQItem[] = [
  {
    question: "Where is Skye Health available?",
    answer:
      "Skye Health currently provides care to patients in all 50 states, although some treatments may not be available everywhere.Because healthcare regulations vary by state, certain therapies may require a live physician visit or may not yet be offered where you live. If that's the case, we'll let you know before you begin treatment. Our goal is simple: provide the same personalized, physician-guided care—wherever you call home.",
  },
  {
    question: "Is lab testing available in my state?",
    answer:
      "For most patients, yes. Skye Health currently offers at-home blood collection kits for eligible lab testing. If your physician orders labs that can be completed at home, we'll ship everything you need directly to your door, along with simple collection instructions.",
  },
  {
    question: "What if my labs can't be collected at home?",
    answer:
      "Some laboratory tests require a traditional blood draw. As we continue expanding our services, Skye Health will be adding nationwide laboratory collection options for these tests. If your treatment requires a lab that isn't currently available through our at-home collection program, our Care Team will let you know before your order is placed and discuss the next steps with you.",
  },
  {
    question: "Is every state supported?",
    answer:
      "Availability depends on your state's regulations, and the specific laboratory tests your physician orders. While most patients can use our at-home collection kits, there may be a few exceptions based on where you live or the type of testing required. If we aren't able to offer your required labs in your state, we'll let you know before you begin care.",
  },
  {
    question: "How will I know if I need labs?",
    answer:
      "Not every treatment requires laboratory testing. If labs are recommended, your physician will explain which tests are needed and whether they can be completed with an at-home collection kit. If you have questions about lab availability, our Support Team is happy to help through your secure patient portal.",
  },
  {
    question: "Can I request a specific medication?",
    answer:
      "You're welcome to share your goals and preferences with your physician. However, treatment decisions are based on your medical history, current health, and clinical judgment. If a medication isn't appropriate for you, your physician will discuss alternative options. At Skye Health, every prescription is issued only after an independent medical evaluation by a licensed physician. Our goal is to recommend the treatment that's right for you—not a one-size-fits-all solution.",
  },
];
const WEIGHT_LOSS_PROGRAM_STORAGE_KEY = "skye-weight-loss-program";

const WEIGHT_LOSS_PROGRAM_PREFILL_SOURCE_KEY =
  "skye-weight-loss-program-prefill-source";
const OPEN_WEIGHT_LOSS_FLOW_EVENT = "skye-open-weight-loss-flow";
const OPEN_WEIGHT_LOSS_FLOW_PENDING_KEY = "skye-open-weight-loss-flow-pending";

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
  hideFromCustomer: false,
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
  hideFromCustomer: false,
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

const formatProductPrice = (price: number) => {
  return `${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)}/month`;
};

const createFeaturedCard = (
  card: TreatmentSliderItem,
  onGetStarted: () => void,
  onAction: () => void,
): FeaturedTreatmentSliderCard => {
  return {
    image: card.hoverImage,
    badge: card.hoverBadge,
    title: card.hoverTitle,
    actionLabel: card.hoverActionLabel,
    backgroundColor: card.hoverCardBg,
    badgeBackgroundColor: card.hoverBadgeBg,
    onGetStarted,
    onAction,
  };
};

const createStaticSliderProducts = (
  cards: TreatmentSliderItem[],
  onProductClick: () => void,
): TreatmentSliderProduct[] => {
  return cards.map((card) => ({
    id: card.id,
    productImage: card.productImage,
    productTitle: card.productTitle,
    productDescription: card.productDescription,
    productPrice: card.productPrice,
    productImageBg: card.productImageBg,

    onGetStarted: onProductClick,
    onShopNow: onProductClick,
  }));
};

const categoryMatches = (product: ProductType, categories: string[]) => {
  const productCategory = product.category?.trim().toLowerCase();

  return categories.some(
    (category) => productCategory === category.trim().toLowerCase(),
  );
};

const createBackendSliderProducts = (
  products: ProductType[],
  productImageBg: string,
  onProductClick: (product: ProductType) => void,
): TreatmentSliderProduct[] => {
  return products.map((product) => ({
    id: product.id,

    productImage:
      product.primaryImage || product.category.toLowerCase() === "weight loss"
        ? images.landingpageimages.weightLossProductImage
        : product.category.toLowerCase() === "weight loss program"
          ? images.landingpageimages.weightLossProductImage
          : product.category.toLowerCase() === "hormone program"
            ? images.landingpageimages.hormonsProductImage
            : product.category.toLowerCase() === "hormones"
              ? images.landingpageimages.hormonsProductImage
              : images.landingpageimages.ProductImage,

    productTitle: product.name,
    productDescription: product.description,
    productPrice: formatProductPrice(product.price),
    productImageBg,

    onGetStarted: () => onProductClick(product),
    onShopNow: () => onProductClick(product),
  }));
};
export default function Home() {
  const goToProducts = () => {
    router.push("/products");
  };
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
  const openWeightLossProgramModal = () => {
    setPendingWeightLossProduct(null);
    setIsWeightLossModalOpen(true);
  };

  useEffect(() => {
    const openWeightLossFlow = () => {
      openWeightLossProgramModal();
    };

    window.addEventListener(OPEN_WEIGHT_LOSS_FLOW_EVENT, openWeightLossFlow);

    if (
      window.sessionStorage.getItem(OPEN_WEIGHT_LOSS_FLOW_PENDING_KEY) ===
      "true"
    ) {
      window.sessionStorage.removeItem(OPEN_WEIGHT_LOSS_FLOW_PENDING_KEY);
      openWeightLossFlow();
    }

    return () => {
      window.removeEventListener(
        OPEN_WEIGHT_LOSS_FLOW_EVENT,
        openWeightLossFlow,
      );
    };
  }, []);

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
  const { data: sliderProductsData, loading: sliderProductsLoading } = useQuery<
    AllProductsType,
    AllProductsVariables
  >(ALL_PRODUCTS, {
    variables: {
      page: 1,
      perPage: 100,
    },
    fetchPolicy: "network-only",
  });

  const allSliderBackendProducts =
    sliderProductsData?.allProducts?.allData ?? [];

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
        image:
          product.primaryImage || images.landingpageimages.HormonesProductImage,
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
      hoverText: "Coming soon",
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
  const featuredWeightLossCard = createFeaturedCard(
    hoverTreatmentCards[0],
    openWeightLossProgramModal,
    openWeightLossProgramModal,
  );

  const featuredPeptideCard = createFeaturedCard(
    peptideTreatmentCards[0],
    goToProducts,
    () => {},
  );

  const featuredOptimizeCard = createFeaturedCard(
    OptimizeeverythingCards[0],
    goToProducts,
    () => {},
  );

  const featuredHormoneCard = createFeaturedCard(
    Hormonescards[0],
    goToProducts,
    () => {
      setIsHormoneModalOpen(true);
    },
  );
  const staticWeightLossProducts = createStaticSliderProducts(
    hoverTreatmentCards.slice(1),
    openWeightLossProgramModal,
  );

  const staticPeptideProducts = createStaticSliderProducts(
    peptideTreatmentCards.slice(1),
    goToProducts,
  );

  const staticOptimizeProducts = createStaticSliderProducts(
    OptimizeeverythingCards.slice(1),
    goToProducts,
  );

  const staticHormoneProducts = createStaticSliderProducts(
    Hormonescards.slice(1),
    goToProducts,
  );
  const weightLossBackendProducts = allSliderBackendProducts.filter((product) =>
    categoryMatches(product, ["Weight Loss", "Weight Loss Program"]),
  );

  const peptideBackendProducts = allSliderBackendProducts.filter((product) =>
    categoryMatches(product, ["Peptide", "Peptides"]),
  );

  const optimizeBackendProducts = allSliderBackendProducts.filter((product) =>
    categoryMatches(product, ["Optimize Everything", "Optimization"]),
  );

  const hormoneBackendProducts = allSliderBackendProducts.filter((product) =>
    categoryMatches(product, ["Hormone", "Hormones", "Hormone Program"]),
  );
  const mappedWeightLossProducts = createBackendSliderProducts(
    weightLossBackendProducts,
    "#CEDCF9",
    handleProductAction,
  );

  const mappedPeptideProducts = createBackendSliderProducts(
    peptideBackendProducts,
    "#FFD6C9",
    () => goToProducts(),
  );

  const mappedOptimizeProducts = createBackendSliderProducts(
    optimizeBackendProducts,
    "#0F1D3A",
    () => goToProducts(),
  );

  const mappedHormoneProducts = createBackendSliderProducts(
    hormoneBackendProducts,
    "#BDE0E3",
    () => goToProducts(),
  );
  const weightLossProductsToRender =
    !sliderProductsLoading && mappedWeightLossProducts.length > 0
      ? mappedWeightLossProducts
      : staticWeightLossProducts;

  const peptideProductsToRender =
    !sliderProductsLoading && mappedPeptideProducts.length > 0
      ? mappedPeptideProducts
      : staticPeptideProducts;

  const optimizeProductsToRender =
    !sliderProductsLoading && mappedOptimizeProducts.length > 0
      ? mappedOptimizeProducts
      : staticOptimizeProducts;

  const hormoneProductsToRender =
    !sliderProductsLoading && mappedHormoneProducts.length > 0
      ? mappedHormoneProducts
      : staticHormoneProducts;

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
        onGetStarted={openWeightLossProgramModal}
        onViewTreatments={() => router.push("/products")}
      />
      {/* <TreatmentCardsSection cards={treatmentCards} /> */}
      {/* <section className="bg-[#F5F8FE] pt-6 pb-6 xl:pt-20 xl:pb-27">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 lg:grid-cols-2 xl:px-8">
          <div className="relative grid min-h-50  rounded-2xl xl:rounded-4xl bg-[#AFC6E5]  pl-3 xl:pl-12 xl:min-h-88.5 overflow-hidden">
            <div className="col-start-1 row-start-1 block h-full w-full bg-[url('/images/WeightLossBgImage.png')] bg-cover bg-left bg-no-repeat" />

            <div className="relative z-10 col-start-1 row-start-1 flex flex-row items-center">
              <div className="flex flex-col gap-6 items-start">
                <div className="flex flex-col items-start gap-4">
                  <p className="text-xl xl:text-[32px] font-medium text-white">
                    Weight loss
                  </p>

                  <button
                    type="button"
                    className="bg-white cursor-pointer py-3 px-5 xl:py-5 xl:px-8 rounded-full flex items-center gap-2.5"
                  >
                    <span className="text-sm xl:text-base font-medium text-[#0F1D3A]">
                      Start losing weight
                    </span>
                    <NewArrowIcon fill="#0F1D3A" />
                  </button>
                </div>
                <div className="rounded-full px-4 p-2 md:p-4 flex items-center justify-center text-sm font-medium text-white bg-[#1F3A75]">
                  $ 199 per month
                </div>
              </div>
              <div>
                <Image
                  src={images.landingpageimages.WeightLossRowImage}
                  alt={"row image"}
                  className="xl:h-auto h-52 "
                />
              </div>
            </div>
          </div>
          <div className="relative xl:min-h-88.5 xl:rounded-4xl bg-linear-to-r from-[#F6D9C9] to-[#EF7A5C] overflow-hidden">
            <div className="absolute -right-60 top-0  bg-[url('/images/PeptideCardBgImage.png')] bg-contain bg-right bg-no-repeat w-full h-full"></div>
            <div className="absolute top-0 right-10">
              <Image
                src={images.landingpageimages.PeptideCardRowImage}
                alt={"row image"}
              />
            </div>
            <div className="flex flex-col gap-6 items-start px-14 py-18">
              <div className="flex flex-col items-start gap-4">
                <p className="text-xl xl:text-[32px] font-medium text-white">
                  Peptides
                </p>

                <button
                  type="button"
                  className="bg-white cursor-pointer py-3 px-5 xl:py-5 xl:px-8 rounded-full flex items-center gap-2.5"
                >
                  <span className="text-sm xl:text-base font-medium text-[#0F1D3A]">
                    Shop peptides
                  </span>
                  <NewArrowIcon fill="#0F1D3A" />
                </button>
              </div>
              <div className="rounded-full px-4 p-2 md:p-4 flex items-center justify-center text-sm font-medium text-white bg-[#1F3A75]">
                $ 199 per month
              </div>
            </div>
          </div>
            <div className="relative xl:min-88.5 xl:rounded-4xl bg-[url('/images/HormonesCardImage.png')]">
                  <div className="flex flex-col gap-6 items-start px-14 py-18">
              <div className="flex flex-col items-start gap-4">
                <p className="text-xl xl:text-[32px] font-medium text-white">
                 Hormones
                </p>

                <button
                  type="button"
                  className="bg-white cursor-pointer py-3 px-5 xl:py-5 xl:px-8 rounded-full flex items-center gap-2.5"
                >
                  <span className="text-sm xl:text-base font-medium text-[#0F1D3A]">
                   Reserve your spot
                  </span>
                  <NewArrowIcon fill="#0F1D3A" />
                </button>
              </div>
              <div className="rounded-full px-4 p-2 md:p-4 flex items-center justify-center text-sm font-medium text-white bg-[#8FC0C2]">
                Coming Soon
              </div>
            </div>   
            </div>
           <div className="relative xl:min-h-88.5 xl:rounded-4xl bg-[#0F1D3A] overflow-hidden">
            <div className="absolute right-0 top-0  bg-[url('/images/OptimizeEverythingBgImage.png')] bg-contain bg-right bg-no-repeat w-full h-full"></div>
            <div className="absolute top-0 right-0 z-10">
              <Image
                src={images.landingpageimages.OptimizeEverythingRowImage}
                alt={"row image"}
              />
            </div>
            <div className="flex flex-col gap-6 items-start px-14 py-18 relative z-30">
              <div className="flex flex-col items-start gap-4">
                <p className="text-xl xl:text-[32px] font-medium text-white">
                 Optimize everything
                </p>

                <button
                  type="button"
                  className="bg-white cursor-pointer py-3 px-5 xl:py-5 xl:px-8 rounded-full flex items-center gap-2.5"
                >
                  <span className="text-sm xl:text-base font-medium text-[#0F1D3A]">
                    Start your journey
                  </span>
                  <NewArrowIcon fill="#0F1D3A" />
                </button>
              </div>
                <div className="rounded-full px-4 p-2 md:p-4 flex items-center justify-center text-sm font-medium text-white bg-[#8FC0C2]">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="bg-[#F5F8FE] pt-6 pb-6 xl:pt-20 xl:pb-27">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 lg:grid-cols-2 xl:px-8">
          <div className="relative grid min-h-55 overflow-hidden rounded-2xl bg-[#AFC6E5] pl-4 xl:min-h-88.5 xl:rounded-4xl xl:pl-12">
            <div className="col-start-1 row-start-1 block h-full w-full bg-[url('/images/WeightLossBgImage.png')] bg-cover bg-left bg-no-repeat" />

            <div className="relative z-10 col-start-1 row-start-1 flex w-full flex-row items-center justify-between">
              <div className="relative z-20 flex shrink-0 flex-col items-start gap-4 xl:gap-6">
                <div className="flex flex-col items-start gap-3 xl:gap-4">
                  <p className="text-xl font-medium text-white xl:text-[32px]">
                    Weight loss
                  </p>

                  <button
                    type="button"
                    onClick={treatmentCards[0].onButtonClick}
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-white hover:bg-[#3D74E9] text-[#0F1D3A] hover:text-white transition-colors duration-300  px-4 py-3 sm:px-5 xl:gap-2.5 xl:px-8 xl:py-5"
                  >
                    <span className="whitespace-nowrap text-xs font-medium  sm:text-sm xl:text-base">
                      Start losing weight
                    </span>

                    <NewArrowIcon fill="currentColor" />
                  </button>
                </div>

                <div className="flex items-center justify-center rounded-full bg-[#1F3A75] px-3 py-2 text-xs font-medium whitespace-nowrap text-white sm:text-sm md:p-4 xl:px-4">
                  $199 per month
                </div>
              </div>

              <div className="flex h-full min-w-0 flex-1 items-end">
                <Image
                  src={images.landingpageimages.WeightLossRowImage}
                  alt="Weight loss"
                  className="h-60 w-auto max-w-none object-cover  sm:h-52 xl:h-auto"
                />
              </div>
            </div>
          </div>
          <div className="relative min-h-55 overflow-hidden rounded-2xl bg-linear-to-r from-[#F6D9C9] to-[#EF7A5C] xl:min-h-88.5 xl:rounded-4xl">
            <div className="pointer-events-none absolute inset-y-0 -right-24 xl:-right-60">
              <Image
                src="/images/PeptideCardBgImage.png"
                alt=""
                aria-hidden="true"
                width={824}
                height={354}
                className="block h-full w-auto max-w-none object-contain"
              />
            </div>

            {/* <div className="absolute top-0 -right-12 h-full sm:-right-6 xl:right-10">
              <Image
                src={images.landingpageimages.PeptideCardRowImage}
                alt="Peptides"
                className="h-full w-auto max-w-none object-contain object-right"
              />
            </div> */}

            <div className="relative z-20 flex min-h-55 flex-col items-start justify-center gap-4 px-4 py-6 xl:min-h-88.5 xl:gap-6 xl:px-14 xl:py-18">
              <div className="flex flex-col items-start gap-3 xl:gap-4">
                <p className="text-xl font-medium text-white xl:text-[32px]">
                  Peptides
                </p>

                <button
                  type="button"
                  onClick={treatmentCards[1].onButtonClick}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-white text-[#0F1D3A] hover:bg-[#3D74E9] hover:text-white transition-colors duration-300 px-4 py-3 sm:px-5 xl:gap-2.5 xl:px-8 xl:py-5"
                >
                  <span className="whitespace-nowrap text-xs font-medium  sm:text-sm xl:text-base">
                    Shop peptides
                  </span>

                  <NewArrowIcon fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center justify-center rounded-full bg-[#EF7A5C] px-3 py-2 text-xs font-medium whitespace-nowrap text-white sm:text-sm md:p-4 xl:px-4">
                Coming Soon
              </div>
            </div>
          </div>
          <div className="relative min-h-55 overflow-hidden rounded-2xl bg-[url('/images/HormonesCardImage.png')] bg-cover bg-center bg-no-repeat xl:min-h-88.5 xl:rounded-4xl">
            <div className="relative z-10 flex min-h-55 flex-col items-start justify-center gap-4 px-4 py-6 xl:min-h-88.5 xl:gap-6 xl:px-14 xl:py-18">
              <div className="flex flex-col items-start gap-3 xl:gap-4">
                <p className="text-xl font-medium text-white xl:text-[32px]">
                  Hormones
                </p>

                <button
                  type="button"
                  onClick={treatmentCards[2].onButtonClick}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-white hover:bg-[#3D74E9] text-[#0F1D3A] hover:text-white transition-colors duration-300 px-4 py-3 sm:px-5 xl:gap-2.5 xl:px-8 xl:py-5"
                >
                  <span className="whitespace-nowrap text-xs font-medium  sm:text-sm xl:text-base">
                    Reserve your spot
                  </span>

                  <NewArrowIcon fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center justify-center rounded-full bg-[#8FC0C2] px-3 py-2 text-xs font-medium whitespace-nowrap text-white sm:text-sm md:p-4 xl:px-4">
                Coming Soon
              </div>
            </div>
          </div>
          <div className="relative min-h-55 overflow-hidden rounded-2xl bg-[#0F1D3A] xl:min-h-88.5 xl:rounded-4xl">
            <div className="pointer-events-none absolute inset-y-0 right-0">
              <Image
                src="/images/OptimizeEverythingBgImage.png"
                alt=""
                aria-hidden="true"
                width={824}
                height={354}
                className="block h-full w-auto max-w-none object-contain object-right"
              />
            </div>

            <div className="absolute top-0 -right-14 z-10 h-full sm:-right-6 xl:right-0">
              <Image
                src={images.landingpageimages.OptimizeEverythingRowImage}
                alt="Optimize everything"
                className="h-full w-auto max-w-none object-contain object-right"
              />
            </div>

            <div className="relative z-30 flex min-h-55 flex-col items-start justify-center gap-4 px-4 py-6 xl:min-h-88.5 xl:gap-6 xl:px-14 xl:py-18">
              <div className="flex flex-col items-start gap-3 xl:gap-4">
                <p className="text-xl font-medium text-white xl:text-[32px]">
                  Optimize everything
                </p>

                <button
                  type="button"
                  onClick={treatmentCards[3].onButtonClick}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-white hover:bg-[#3D74E9] text-[#0F1D3A] hover:text-white transition-colors duration-300  px-4 py-3 sm:px-5 xl:gap-2.5 xl:px-8 xl:py-5"
                >
                  <span className="whitespace-nowrap text-xs font-medium  sm:text-sm xl:text-base">
                    Start your journey
                  </span>

                  <NewArrowIcon fill="currentColor" />
                </button>
              </div>

              <div className="flex items-center justify-center rounded-full bg-[#092865] px-3 py-2 text-xs font-medium whitespace-nowrap text-white sm:text-sm md:p-4 xl:px-4">
                Coming Soon
              </div>
            </div>s
          </div>
        </div>
      </section>

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
      <TreatmentSliderSection
        featuredCard={featuredWeightLossCard}
        products={weightLossProductsToRender}
      />

      {/* <TreatmentSliderSection
        featuredCard={featuredPeptideCard}
        products={peptideProductsToRender}
      />

      <TreatmentSliderSection
        featuredCard={featuredOptimizeCard}
        products={optimizeProductsToRender}
      />

      <TreatmentSliderSection
        featuredCard={featuredHormoneCard}
        products={hormoneProductsToRender}
      /> */}
      <BetterTreatmentSection
        onGetStarted={() => {
          goToProducts();
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
