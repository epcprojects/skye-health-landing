"use client";
import React from "react";
import Image from "next/image";
import { images } from "@/app/ui";
import Link from "next/link";
import { SendIcon } from "@/public/icons";
import { useEffect, useRef, useState } from "react";

import { footerLinkSections, socialLinks } from "@/app/constants/constants";
const Footer = () => {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowText(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="flex flex-col bg-[url('/images/FooterBgImage.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="container max-w-7xl mx-auto flex flex-col gap-8 lg:gap-24 py-8 lg:py-16 px-4 lg:px-8">
        <Image
          src={images.landingpageimages.FooterLogo}
          alt={"sky health logo"}
          className="lg:w-full lg:h-full  w-80 h-auto"
        />
        <div className="flex flex-wrap gap-15">
          <p
            ref={textRef}
            className={`text-lg text-gray-100 text-center lg:text-start max-w-83.75 ${
              showText
                ? "animate-[footer-text-up_700ms_ease-out_both]"
                : "opacity-0"
            }`}
          >
            Premium Peptides • Performance Forward. Delivering purity you can
            trust to high-performance individuals globally.
          </p>

          {footerLinkSections.map((section) => (
            <div
              key={section.title}
              className="flex flex-col gap-4 lg:min-w-45"
            >
              <p className="text-sm font-semibold text-white/50 leading-4.75 tracking-[3px] uppercase">
                {section.title}
              </p>

              <div className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative w-fit text-base text-gray-100 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gray-100 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-5.75">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-white/50 leading-4.75 tracking-[3px] uppercase">
                Stay Informed
              </p>
              <p className="text-base text-gray-100 leading-6.5">
                Join our HEALTH newsletter for technical
                <br /> updates and batch release alerts.
              </p>
            </div>
            <div className="group rounded-full bg-white/5 border border-white/20 hover:border-white/50 backdrop-blur-[20px] flex flex-row py-2 pr-2 pl-5.5">
              <input
                type="text"
                placeholder="Your email address"
                className="placeholder:text-base placeholder:text-neutral-400 outline-none flex-1"
              />
              <button
                onClick={() => {
                  "";
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#009FFF]  "
              >
                <span className=" transition-transform duration-300 group-hover:-rotate-20">
                 <SendIcon />
                </span>
                
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-7xl mx-auto py-7.5 flex flex-col lg:flex-row justify-between  gap-2  items-center border-t border-t-white/20   px-4 lg:px-8">
        <p className="text-base text-white md:order-1 order-2">
          © {new Date().getFullYear()} SKYE HEALTH. All rights reserved.
        </p>
        <div className="flex flex-row gap-2 items-center order-1 md:order-2">
          {socialLinks.map(({ label, href, Icon }) => (
            <Link key={label} className="hover:bg-black/20 rounded-full w-12.5 h-12.5  flex items-center justify-center" href={href} aria-label={label}>
              <Icon />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
