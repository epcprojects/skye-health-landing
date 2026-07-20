"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/app/ui";
import { HamBurgerIcon, OutlineShoppingIcon } from "@/public/icons";
import MobileMenu, { type MobileNavItem } from "./MobileMenu";

const navItems: MobileNavItem[] = [
  { label: "Weight Loss", href: "/weight-loss" },
  { label: "Hormones", href: "/hormones" },
  { label: "Peptides", href: "/peptides" },
  {
    label: "Optimize Everything",
    href: "/optimize-everything",
  },
  { label: "Who We Are", href: "/who-we-are" },
];

const HeaderLatest = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="flex flex-col w-full">
      <div className="bg-[#0F1D3A] py-4 px-4 xl:px-8">
        <p className="text-white text-sm text-center">
          Early Access Friends &amp; Family with free month of Healthcare
        </p>
      </div>

      <div className="bg-white py-5  w-full flex flex-row ">
        <button
          type="button"
          onClick={openMobileMenu}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          className="xl:hidden flex h-11.5 w-11.5 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full bg-white/64 backdrop-blur-[67px] border border-white"
        >
          <HamBurgerIcon />
        </button>

        <div className="container max-w-7xl mx-auto flex flex-row items-center w-full justify-between px-4 xl:px-8">
          <Image
            src={images.landingpageimages.NewSkyLogo}
            alt="Sky Health"
          />

          <div className="hidden xl:flex flex-row gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#0F1D3A] text-base font-light"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex flex-row gap-2">
            <button
              type="button"
              className="bg-[#3D74E9] py-4 px-6 rounded-full text-sm font-medium text-white"
            >
              Get started
            </button>

            <button
              type="button"
              aria-label="Open shopping cart"
              className="w-12.25 h-12.25 bg-[#0F1D3A] rounded-full flex items-center justify-center"
            >
              <OutlineShoppingIcon />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        navItems={navItems}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </header>
  );
};

export default HeaderLatest;