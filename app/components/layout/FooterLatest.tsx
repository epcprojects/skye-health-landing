import React from "react";
import Link from "next/link";
import { NewArrowIcon, NewPlusIcon } from "@/public/icons";

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
const FooterLatest = () => {
  return (
    <footer className="bg-[#0F1D3A] py-10 px-20 flex flex-col gap-2.5 ">
      <div className="py-8 px-20 flex flex-row gap-30">
        <div className="flex flex-col gap-4 ">
          <p className="font-medium text-base uppercase leading-[100%] tracking-[3px] text-[#CEDCF9]">
            Stay Informed
          </p>
          <p className="text-base text-[#E2EAFC]">
            Premium Peptides • Performance Forward. Delivering purity you can
            trust to high-performance individuals globally.
          </p>
        </div>
        {footerLinkSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4 min-w-34">
            <p className="text-base font-medium uppercase leading-[100%] tracking-[3px] text-[#CEDCF9]">
              {section.title}
            </p>

            <div className="flex flex-col gap-4">
              {section.links.map((link) => (
                <Link
                  key={`${section.title}-${link.label}`}
                  href={link.href}
                  className="text-base text-[#E2EAFC]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-4">
          <p className="text-base font-medium text-[#CEDCF9] uppercase leading-[100%] tracking-[3px] ">
            Stay Informed
          </p>
          <p className="text-base text-[#E2EAFC] ">
            Join our HEALTH newsletter for technical updates and batch release
            alerts.
          </p>
          <div className="group cursor-pointer bg-white/25 flex flex-row justify-between border border-[#ECEDDD30] backdrop-blur-[90px] py-3 pr-3 pl-6 rounded-full">
            <input
              type="email"
              placeholder="Your email address"
              className="text-white text-sm placeholder:text-white bg-transparent outline-none"
            />

            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <NewArrowIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-t-white py-8 px-20 flex flex-row justify-between items-center">
        <p className="text-base font-medium text-[#CEDCF9] ">
          © {new Date().getFullYear()} SKYE HEALTH. All rights reserved.
        </p>
        <div className="flex flex-row gap-4 ">
          <div className="w-8.75 h-8.75 bg-[#3D74E9] rounded-full flex items-center justify-center">
            <NewPlusIcon />
          </div>
          <div className="w-8.75 h-8.75 bg-[#3D74E9] rounded-full flex items-center justify-center">
            <NewPlusIcon />
          </div>
          <div className="w-8.75 h-8.75 bg-[#3D74E9] rounded-full flex items-center justify-center">
            <NewPlusIcon />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLatest;
