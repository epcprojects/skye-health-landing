import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FBIcon,
  InstaIcon,
  LinkEdinIcon,
  NewArrowIcon,
  NewPlusIcon,
} from "@/public/icons";
import { images } from "@/app/ui";

const footerLinkSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Science", href: "/science" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Lab Certifications", href: "/lab-certifications" },
      { label: "Returns Policy", href: "/returns-policy" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: <FBIcon fill="currentColor" />,
  },
  {
    label: "Instagram",
    href: "#",
    icon: <InstaIcon fill="currentColor" />,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: <LinkEdinIcon fill="currentColor" />,
  },
];

const FooterLatest = () => {
  return (
    <footer className="relative flex flex-col gap-2 xl:gap-2.5 bg-[#0F1D3A] pt-10  xl:py-10">
      <div className="relative z-20 xl:-mt-19 -mt-16  flex h-12 w-12 xl:h-18 xl:w-18 shrink-0 items-center justify-center self-center rounded-full bg-[#F5F8FE]">
        <Image
          src={images.landingpageimages.SkyHeartLogo}
          alt="Skye Health"
          className="xl:h-auto xl:w-auto w-8 h-8"
        />
      </div>

      <div className="container mx-auto flex max-w-7xl  flex-wrap gap-7.5 px-4 py-5 xl:py-8 sm:flex-row sm:px-6 xl:flex-nowrap xl:gap-30 xl:px-8">
        <div className="flex w-full flex-col gap-3 xl:gap-4 sm:w-[calc(50%-20px)] xl:w-auto">
          <p className="text-base font-medium uppercase leading-[100%] tracking-[3px] text-[#CEDCF9]">
            Stay Informed
          </p>

          <p className="text-sm xl:text-base text-[#E2EAFC]">
            Premium Peptides • Performance Forward. Delivering purity you can
            trust to high-performance individuals globally.
          </p>
        </div>

        {footerLinkSections.map((section) => (
          <div
            key={section.title}
            className="flex  flex-col gap-4  xl:min-w-34"
          >
            <p className="text-base font-medium uppercase leading-[100%] tracking-[3px] text-[#CEDCF9]">
              {section.title}
            </p>

            <div className="flex flex-col gap-2 xl:gap-4">
              {section.links.map((link) => (
                <Link
                  key={`${section.title}-${link.label}`}
                  href={link.href}
                  className="text-sm xl:text-base text-[#E2EAFC]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="flex w-full flex-col gap-3  xl:gap-4 sm:w-[calc(50%-20px)] xl:w-auto">
          <p className="text-base font-medium uppercase leading-[100%] tracking-[3px] text-[#CEDCF9]">
            Stay Informed
          </p>

          <p className="text-sm xl:text-base text-[#E2EAFC]">
            Join our HEALTH newsletter for technical updates and batch release
            alerts.
          </p>

          <div className="group flex w-full cursor-pointer flex-row items-center justify-between rounded-full border border-[#ECEDDD30] bg-white/25 xl:py-3 py-2 pr-2 xl:pr-3 pl-4 xl:pl-6 backdrop-blur-[90px]">
            <input
              type="email"
              placeholder="Your email address"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white"
            />

            <button
              type="button"
              aria-label="Submit email"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white"
            >
              <span className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-1">
                <NewArrowIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 xl:px-8">
        <div className="flex flex-col items-center justify-between gap-5 xl:gap-6 border-t border-white py-6 xl:py-8 sm:flex-row">
          <p className="text-center text-sm font-medium text-[#CEDCF9] sm:text-left sm:text-base">
            © {new Date().getFullYear()} SKYE HEALTH. All rights reserved.
          </p>

          <div className="flex flex-row gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8.75 w-8.75 items-center justify-center rounded-full bg-[#3D74E9] text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLatest;
