"use client";

import { Images } from "@/app/images";
import {
  ArrowIcon,
  FBIcon,
  InstaIcon,
  LinkEdinIcon,
  MailIcon,
  PhoneIcon,
} from "@/public/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface MenuItemType {
  label: string;
  href: string;
}

interface FooterProps {
  menuItems: MenuItemType[];
}

const Footer: React.FC<FooterProps> = ({ menuItems }) => {
  return (
    <footer className="sm:px-4 xl:px-0 mt-auto mb-0 pt-16 lg:pt-8 py-4 lg:py-8">
      <div className="container mx-auto max-w-7xl px:4 xl:px-8">
        <div className="grid px-4 lg:px-0 grid-cols-1 lg:grid-cols-3 gap gap-x-0 gap-y-4 lg:gap-y-7.5 lg:gap-x-7.5">
          <div className="col-span-2 px-6  lg:order-0 order-2 sm:px-12 pt-6 bg-linear-to-b rounded-3xl from-[#FDFDFD] to-[#E9EAEB] sm:pt-12 gap-5 lg:gap-10 grid grid-cols-1 lg:grid-cols-3">
            <div className="space-y-7.5 order-2 lg:order-1 lg:col-span-2">
              <div className=" space-y-5">
                <Image
                  alt="logo"
                  src={Images.layout.logo}
                  className="w-62.5 lg:block hidden"
                />
                <p className="text-base lg:text-lg font-medium text-neutral-900">
                  Precision health optimization backed by science and delivered
                  with care.
                </p>
              </div>

              <Link
                href={"/products"}
                className="text-base w-fit relative  lg:justify-start justify-center font-medium text-neutral-900 flex items-center gap-2.5 rounded-full group py-3 lg:py-2.5 px-3 shadow ps-5 bg-white"
              >
                Get Started Now
                <span className="flex items-center justify-center h-6.5 lg:h-7.5 group-hover:rotate-0 transition-all duration-500 ease-in-out -rotate-45 w-6.5 lg:w-7.5 rounded-full bg-secondary">
                  <ArrowIcon fill="white" />
                </span>
              </Link>

              <div className="flex flex-col   gap-6">
                <a
                  href="mailto:info@paramounthealthrx.com"
                  className="text-neutral-800 font-medium text-base flex items-center gap-4 group hover:underline underline-offset-2 hover:text-secondary cursor-pointer"
                >
                  <span className="w-8 h-8 border border-neutral-800 text-neutral-800 group-hover:text-secondary group-hover:border-secondary rounded-full flex items-center justify-center">
                    <MailIcon fill="currentColor" />
                  </span>
                  info@paramounthealthrx.com
                </a>

                <a
                  href="tel:1-800-555-0199"
                  className="text-neutral-800 font-medium text-base flex items-center gap-4 group hover:underline underline-offset-2 hover:text-secondary cursor-pointer"
                >
                  <span className="w-8 h-8 border border-neutral-800 text-neutral-800 group-hover:text-secondary group-hover:border-secondary rounded-full flex items-center justify-center">
                    <PhoneIcon fill="currentColor" />
                  </span>
                  1-800-555-0199
                </a>
              </div>
            </div>
            <div className=" space-y-3.5 lg:space-y-7.5 order-1 lg:order-2">
              <Image
                alt="logo"
                src={Images.layout.logo}
                className="w-62.5 lg:hidden block"
              />

              <h2 className="font-bold text-base text-neutral-900">
                Paramount HealthRx
              </h2>

              <ul className="lg:space-y-4 flex-wrap lg:flex-col flex gap-3 lg:gap-0">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="text-neutral-800 hover:underline underline-offset-2 font-medium text-base"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <li className="text-neutral-800 hover:underline underline-offset-2 font-medium text-base">
                  <Link href={"/faqs"}>FAQs</Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-3 pb-3 lg:py-6 order-3 flex flex-col-reverse gap-4 lg:flex-row items-center justify-between ">
              <h2 className="text-neutral-700 text-center lg:text-start text-base font-normal flex-1 w-full">
                &copy; {new Date().getFullYear()} Paramount HealthRx. All rights
                reserved.
              </h2>

              <div className="flex items-center gap-2">
                <a href="#" className="group">
                  <span className="drop-shadow bg-white h-10 w-10 flex items-center justify-center rounded-full text-primary transition-colors duration-500 ease-in-out group-hover:bg-secondary group-hover:text-white">
                    <FBIcon fill="currentColor" />
                  </span>
                </a>

                <a href="#" className="group">
                  <span className="drop-shadow bg-white h-10 w-10 flex items-center justify-center rounded-full text-primary transition-colors duration-500 ease-in-out group-hover:bg-secondary group-hover:text-white">
                    <InstaIcon fill="currentColor" />
                  </span>
                </a>
                <a href="#" className="group">
                  <span className="drop-shadow bg-white h-10 w-10 flex items-center justify-center rounded-full text-primary transition-colors duration-500 ease-in-out group-hover:bg-secondary group-hover:text-white">
                    <LinkEdinIcon fill="currentColor" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-t   lg:order-1 order-0 from-[#6A85B6] to-[#BAC8E0] rounded-3xl relative">
            <Image
              alt=""
              src={Images.layout.footerCouple}
              className="absolute bottom-0 z-20"
            />
            <Image
              alt=""
              src={Images.layout.servicesBadges}
              className="animate-pulse z-10"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
