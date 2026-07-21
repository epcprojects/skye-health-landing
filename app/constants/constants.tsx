import {
  BookMarkIcon,
  DeliveredIcon,
  DiscreteDeliveryHoveredIcon,
  DiscreteDileveryIcon,
  DoctorHoveredIcon,
  DoctorIcon,
  FacebookIcon,
  FingerprintHoveredIcon,
  FingerprintIcon,
  InfinityHoveredIcon,
  InfinityIcon,
  InstagramIcon,
  LinkEdinIcon,
  LockHoveredIcon,
  LockIcon,
  MouseIcon,
  SupportHoveredIcon,
  SupportIcon,
  XIcon,
} from "@/public/icons";
import { images } from "../ui";

export type MenuItem = {
  label: string;
  href: string;
  children?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    label: "Peptide Therapy",
    href: "/products?category=Peptides",
  },
  {
    label: "Hormones",
    href: "/products?category=Hormones",
  },
  {
    label: "Longevity",
    href: "/products?category=all",
  },
  {
    label: "Sleep",
    href: "/products?category=General Health",
  },
  {
    label: "Hair Regrowth",
    href: "/products?category=all",
  },
  {
    label: "Weight Loss",
    href: "/products?category=Weight Loss",
  },
  {
    label: "More",
    href: "/products?category=all",
    children: [
      {
        label: "All Products",
        href: "/products",
      },
    ],
  },
];

export const US_STATES = [
  { value: "Alabama", label: "Alabama" },
  { value: "Alaska", label: "Alaska" },
  { value: "Arizona", label: "Arizona" },
  { value: "Arkansas", label: "Arkansas" },
  { value: "California", label: "California" },
  { value: "Colorado", label: "Colorado" },
  { value: "Connecticut", label: "Connecticut" },
  { value: "Delaware", label: "Delaware" },
  { value: "District of Columbia", label: "District of Columbia" },
  { value: "Florida", label: "Florida" },
  { value: "Georgia", label: "Georgia" },
  { value: "Hawaii", label: "Hawaii" },
  { value: "Idaho", label: "Idaho" },
  { value: "Illinois", label: "Illinois" },
  { value: "Indiana", label: "Indiana" },
  { value: "Iowa", label: "Iowa" },
  { value: "Kansas", label: "Kansas" },
  { value: "Kentucky", label: "Kentucky" },
  { value: "Louisiana", label: "Louisiana" },
  { value: "Maine", label: "Maine" },
  { value: "Maryland", label: "Maryland" },
  { value: "Massachusetts", label: "Massachusetts" },
  { value: "Michigan", label: "Michigan" },
  { value: "Minnesota", label: "Minnesota" },
  { value: "Mississippi", label: "Mississippi" },
  { value: "Missouri", label: "Missouri" },
  { value: "Montana", label: "Montana" },
  { value: "Nebraska", label: "Nebraska" },
  { value: "Nevada", label: "Nevada" },
  { value: "New Hampshire", label: "New Hampshire" },
  { value: "New Jersey", label: "New Jersey" },
  { value: "New Mexico", label: "New Mexico" },
  { value: "New York", label: "New York" },
  { value: "North Carolina", label: "North Carolina" },
  { value: "North Dakota", label: "North Dakota" },
  { value: "Ohio", label: "Ohio" },
  { value: "Oklahoma", label: "Oklahoma" },
  { value: "Oregon", label: "Oregon" },
  { value: "Pennsylvania", label: "Pennsylvania" },
  { value: "Puerto Rico", label: "Puerto Rico" },
  { value: "Rhode Island", label: "Rhode Island" },
  { value: "South Carolina", label: "South Carolina" },
  { value: "South Dakota", label: "South Dakota" },
  { value: "Tennessee", label: "Tennessee" },
  { value: "Texas", label: "Texas" },
  { value: "Utah", label: "Utah" },
  { value: "Vermont", label: "Vermont" },
  { value: "Virginia", label: "Virginia" },
  { value: "Washington", label: "Washington" },
  { value: "West Virginia", label: "West Virginia" },
  { value: "Wisconsin", label: "Wisconsin" },
  { value: "Wyoming", label: "Wyoming" },
];

export const therapyCards = [
  {
    id: "lose-weight",
    label: "Lose Weight",
    image: images.landingpageimages.LoseWeightImage,
  },
  {
    id: "hormones-therapy",
    label: "Hormones ",
    image: images.landingpageimages.LiveLongerImage,
  },
  {
    id: "better-sex",
    label: "Better Sex",
    image: images.landingpageimages.BetterSexImage,
  },
  {
    id: "sleep-better",
    label: "Sleep Better",
    image: images.landingpageimages.SleepBetterImage,
  },
  {
    id: "regrow-hair",
    label: "Regrow Hair",
    image: images.landingpageimages.RegrowHairImage,
  },
  {
    id: "younger-skin",
    label: "Younger Skin",
    image: images.landingpageimages.YoungerSkinImage,
  },
  {
    id: "heal-joints",
    label: "Heal Joints",
    image: images.landingpageimages.HealJointsImage,
  },
  {
    id: "sharp-focus",
    label: "Sharp Focus",
    image: images.landingpageimages.SharpFocusImage,
  },
  // {
  //   id: "live-longer",
  //   label: "Live Longer",
  //   image: images.landingpageimages.LiveLongerImage,
  // },
] as const;

export type TherapyCardId = (typeof therapyCards)[number]["id"];

export const footerLinkSections = [
  {
    title: "Quick Links",
    links: [
      {
        label: "Home",
        href: "/products",
      },
      {
        label: "Products",
        href: "/products",
      },
      {
        label: "Science",
        href: "/products",
      },
      {
        label: "FAQs",
        href: "/faqs",
      },
      {
        label: "Contact",
        href: "/products",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Terms of Service",
        href: "/products",
      },
      {
        label: "Privacy Policy",
        href: "/products",
      },
      {
        label: "Lab Certifications",
        href: "/products",
      },
      {
        label: "Returns Policy",
        href: "/products",
      },
    ],
  },
];

export const socialLinks = [
  {
    label: "X",
    href: "https://x.com",
    Icon: XIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    Icon: LinkEdinIcon,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    Icon: InstagramIcon,
  },
];

export const products = [
  {
    id: "ghk-cu-1",
    title: "GHK-Cu (Copper Peptide)",
    image: images.landingpageimages.PeptideProduct,
  },
  {
    id: "ghk-cu-2",
    title:
      "GHK-Cu (Copper Peptide) GHK-Cu (Copper Peptide) GHK-Cu (Copper Peptide) GHK-Cu (Copper Peptide)",
    image: images.landingpageimages.PeptideProduct,
  },
  {
    id: "ghk-cu-3",
    title:
      "GHK-Cu (Copper Peptide) GHK-Cu (Copper Peptide)GHK-Cu (Copper Peptide)GHK-Cu (Copper Peptide)GHK-Cu (Copper Peptide)GHK-Cu (Copper Peptide)GHK-Cu (Copper Peptide)",
    image: images.landingpageimages.PeptideProduct,
  },
  {
    id: "ghk-cu-4",
    title: "GHK-Cu (Copper Peptide)",
    image: images.landingpageimages.PeptideProduct,
  },
  {
    id: "ghk-cu-5",
    title: "GHK-Cu (Copper Peptide)",
    image: images.landingpageimages.PeptideProduct,
  },
  {
    id: "ghk-cu-6",
    title: "GHK-Cu (Copper Peptide)",
    image: images.landingpageimages.PeptideProduct,
  },
  {
    id: "ghk-cu-7",
    title: "GHK-Cu (Copper Peptide)",
    image: images.landingpageimages.PeptideProduct,
  },
  {
    id: "ghk-cu-8",
    title: "GHK-Cu (Copper Peptide)",
    image: images.landingpageimages.PeptideProduct,
  },
  {
    id: "ghk-cu-9",
    title: "GHK-Cu (Copper Peptide)",
    image: images.landingpageimages.PeptideProduct,
  },
  {
    id: "ghk-cu-10",
    title: "GHK-Cu (Copper Peptide)",
    image: images.landingpageimages.PeptideProduct,
  },
];

export const processCards = [
  {
    id: "set-your-goal",
    step: "01",
    title: "Set Your Goal",
    description: (
      <>
        We gather data on your lifestyle,
        <br /> biomarkers and health history
      </>
    ),
    image: images.landingpageimages.BodyCardsImageOne,
    imageAlt: "set your goal",
    theme: "primary",
  },
  {
    id: "expert-review",
    step: "02",
    title: "Expert Review",
    description: (
      <>
        A licensed clinical reviews your
        <br />
        goals to ensure safety and efficiency.
      </>
    ),
    image: images.landingpageimages.ExpertImage,
    imageAlt: "Expert",
    theme: "light",
  },
  {
    id: "the-protocol",
    step: "03",
    title: "The Protocol",
    description: (
      <>
        We build a custom regimen-pills, peptides,
        <br />
        or plans-just for you.
      </>
    ),
    image: images.landingpageimages.ProtocolImage,
    imageAlt: "Expert",
    theme: "light",
  },
  {
    id: "direct-to-door",
    step: "04",
    title: "Direct to Door",
    description: (
      <>
        Shipped fast and free directly to your door in plain,
        <br />
        unbranded packaging. Your privacy is our priority.
      </>
    ),
    // image: images.landingpageimages.DirectDoorImage,
    image: images.landingpageimages.ProtocolImage,
    imageAlt: "direct to door",
    theme: "primary",
  },
] as const;

export const wellnessCards = [
  // {
  //   id: "healthy-aging",
  //   title: "Healthy Aging",
  //   description:
  //     "Begin with a structured intake designed to capture relevant health data, goals, and baseline indicators.",
  //   image: images.landingpageimages.DirectDoorImage,
  // },
  {
    id: "immune-support",
    title: "Immune Support",
    description:
      "Begin with a structured intake designed to capture relevant health data, goals, and baseline indicators.",
    image: images.landingpageimages.ImmuneSupportImage,
  },
  {
    id: "better-skin",
    title: "Better Skin",
    description:
      "Begin with a structured intake designed to capture relevant health data, goals, and baseline indicators.",
    image: images.landingpageimages.BetterSkinImage,
  },
  {
    id: "performance",
    title: "Performance",
    description:
      "Support energy, focus, recovery, and physical performance with targeted wellness options designed around your goals.",
    image: images.landingpageimages.PerformanceImage,
  },
  {
    id: "recovery",
    title: "Recovery",
    description:
      "Support muscle repair, daily recovery, and overall wellness with targeted options designed around your lifestyle and goals.",
    image: images.landingpageimages.RecoveryImage,
  },
  {
    id: "weightmanagement",
    title: "Weight Management",
    description:
      "Support healthy weight goals with personalized wellness options designed to improve balance, consistency, and long-term progress.",
    image: images.landingpageimages.WeightManagementImage,
  },
] as const;

export type WellnessCardId = (typeof wellnessCards)[number]["id"];

export const doctorSlides = [
  {
    id: "barry-sanchez",
    image: images.landingpageimages.DrBarryImage,
    imageAlt: "dr barry",
    heading:
      "Advancing healthcare through precision, science, and clinical leadership",
    name: "Dr. Barry Sanchez",
    description:
      "Dr. Barry Sanchez is a Stanford fellowship-trained, board-certified surgeon and Chief Medical Officer of Skye Health. With expertise in metabolic health, hormone optimization, and peptide therapy, he leads the development of modern, research-driven care focused on longevity and real-world outcomes.",
  },
  {
    id: "doctor-two",
    image: images.landingpageimages.DrBarryImage,
    imageAlt: "doctor two",
    heading:
      "Personalized care built around measurable outcomes and medical oversight",
    name: "Dr. Amanda Lee",
    description:
      "Dr. Amanda Lee brings clinical expertise in preventive health, hormone balance, and personalized treatment planning. Her work focuses on safe protocols, patient education, and long-term wellness outcomes.",
  },
  {
    id: "doctor-three",
    image: images.landingpageimages.DrBarryImage,
    imageAlt: "doctor three",
    heading: "Research-led treatment plans guided by real clinical experience",
    name: "Dr. Michael Chen",
    description:
      "Dr. Michael Chen specializes in metabolic optimization and evidence-informed wellness programs. He helps shape care pathways that combine science, monitoring, and practical patient support.",
  },
] as const;

export const steps = [
  {
    id: "choose",
    title: "1. Choose",
    description: "Pick your protocol",
    Icon: MouseIcon,
  },
  {
    id: "assess",
    title: "2. Assess",
    description: "Quick Clinical intake",
    Icon: BookMarkIcon,
  },
  {
    id: "delivered",
    title: "3. Delivered",
    description: "Deliver to your door",
    Icon: DeliveredIcon,
  },
];

export const featureCards = [
  {
    id: "real-doctors",
    title: "Real doctors. Real Results.",
    description:
      "Every treatment plan is reviewed and prescribed by a US-licensed medical provider. We analyze your medical history to ensure safety and suitability before you ever spend a dollar.",
    Icon: DoctorIcon,
    HoverIcon: DoctorHoveredIcon,
  },
  {
    id: "precision",
    title: "Precision, not guesswork.",
    description:
      "Biology isn’t one-size-fits-all. We utilize compounding pharmacies to customize dosages and combine active ingredients, creating protocols that standard pharmacies can’t offer.",
    Icon: FingerprintIcon,
    HoverIcon: FingerprintHoveredIcon,
  },
  {
    id: "pharmacy-grade",
    title: "Pharmacy grade. Always.",
    description:
      "Quality is non-negotiable. We partner exclusively with FDA-regulated 503A and 503B pharmacies in the USA to ensure the highest standards of purity, potency, and safety.",
    Icon: LockIcon,
    HoverIcon: LockHoveredIcon,
  },
  {
    id: "support",
    title: "Support on your schedule.",
    description:
      "Your care doesn’t end at checkout. Message your clinical team anytime to adjust dosages, ask questions, or manage side effects. No appointment necessary.",
    Icon: SupportIcon,
    HoverIcon: SupportHoveredIcon,
  },
  {
    id: "discrete-delivery",
    title: "Discrete delivery.",
    description:
      "Your privacy matters. All treatments are shipped fast and free in unbranded, minimalist packaging. No loud logos. Your business stays your business.",
    Icon: DiscreteDileveryIcon,
    HoverIcon: DiscreteDeliveryHoveredIcon,
  },
  {
    id: "flexible",
    title: "Flexible by design.",
    description:
      "You are in control. Pause, cancel, or adjust your delivery frequency at any time directly from your dashboard. No hidden fees or locked-in contracts.",
    Icon: InfinityIcon,
    HoverIcon: InfinityHoveredIcon,
  },
];

export const productsdata = [
  {
    id: 1,
    stockStatus: "in_stock",
    image: images.landingpageimages.PeptideProduct,
    name: "5-AMINO-1-MQ",
    info: "Supports metabolic health and body composition goals.",
    tags: ["50MG", "TROCHE", "ORAL", "Morning", "50 mg PO once daily"],
    price: 39.99,
  },
  {
    id: 2,
    stockStatus: "out_of_stock",
    image: images.landingpageimages.PeptideProduct,
    name: "Tesamorelin",
    info: "Growth hormone releasing hormone analog used in targeted therapy protocols.",
    tags: ["2MG", "VIAL", "INJECTABLE", "Evening", "Inject as directed"],
    price: 149.99,
  },
  {
    id: 3,
    stockStatus: "in_stock",
    image: images.landingpageimages.PeptideProduct,
    name: "Sermorelin",
    info: "Supports natural growth hormone production through prescribed protocols.",
    tags: ["9MG", "VIAL", "INJECTABLE", "Night", "Once daily"],
    price: 119.99,
  },
  {
    id: 4,
    stockStatus: "in_stock",
    image: images.landingpageimages.PeptideProduct,
    name: "NAD+",
    info: "Supports cellular energy, recovery, and longevity-focused wellness plans.",
    tags: ["500MG", "VIAL", "INJECTABLE", "Weekly", "Use as prescribed"],
    price: 89.99,
  },
  {
    id: 5,
    stockStatus: "out_of_stock",
    image: images.landingpageimages.PeptideProduct,
    name: "BPC-157",
    info: "Commonly used in recovery-focused peptide therapy protocols.",
    tags: ["5MG", "VIAL", "INJECTABLE", "Daily", "Inject as directed"],
    price: 74.99,
  },
  {
    id: 6,
    stockStatus: "in_stock",
    image: images.landingpageimages.PeptideProduct,
    name: "Ipamorelin",
    info: "Peptide therapy option commonly paired with sleep and recovery goals.",
    tags: ["5MG", "VIAL", "INJECTABLE", "Bedtime", "Once daily"],
    price: 99.99,
  },
] as const;
