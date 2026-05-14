"use client";
import React from "react";
import Image from "next/image";
import { images } from "@/app/ui";
import { SendIcon } from "@/public/icons";
import Link from "next/link";
import { footerLinkSections, socialLinks } from "@/app/constants/constants";

const FooterInner = () => {
  return (
    <footer className="px-4 xl:px-8 pb-5">
      <section className="bg-primary-dark rounded-[48px] flex flex-col ">
        <div className="py-16 px-4 xl:px-12">
          <div className="container max-w-7xl mx-auto flex flex-col gap-24">
            <Image
              src={images.innerImages.InnerFooterLogo}
              alt={"sky health logo"}
              className="lg:w-full lg:h-full  w-80 h-auto"
            />
            <div className="flex flex-wrap gap-15">
              <p className="text-lg text-gray-100 text-center lg:text-start max-w-83.75">
                Premium Peptides • Performance Forward. Delivering purity you
                can trust to high-performance individuals globally.
              </p>
              {footerLinkSections.map((section) => (
                <div
                  key={section.title}
                  className="flex flex-col gap-4 lg:min-w-45"
                >
                  <p className="text-sm font-semibold text-[#AADFFF] leading-4.75 tracking-[3px] uppercase">
                    {section.title}
                  </p>

                  <div className="flex flex-col gap-4">
                    {section.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-base text-gray-100"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-5.75">
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-semibold text-[#AADFFF] leading-4.75 tracking-[3px] uppercase">
                    Stay Informed
                  </p>
                  <p className="text-base text-gray-100 leading-6.5">
                    Join our HEALTH newsletter for technical
                    <br /> updates and batch release alerts.
                  </p>
                </div>
                <div className="rounded-full bg-white/5  border border-white/20 backdrop-blur-[20px] flex flex-row py-2 pr-2 pl-5.5">
                  <input
                    type="text"
                    placeholder="Your Address"
                    className=" placeholder:text-base placeholder:text-neutral-300 outline-none flex-1"
                  />
                  <button
                    onClick={() => {
                      "";
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-[#009FFF]"
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
         <div className="container max-w-7xl mx-auto py-7.5 flex flex-col lg:flex-row justify-between  gap-2  items-center border-t border-t-white/20   px-4 lg:px-0">
            <p className="text-base text-white md:order-1 order-2">
              © {new Date().getFullYear()} SKYE HEALTH. All rights reserved.
            </p>
            <div className="flex flex-row gap-6 items-center order-1 md:order-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link key={label} href={href} aria-label={label}>
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
      </section>
    </footer>
  );
};

export default FooterInner;
