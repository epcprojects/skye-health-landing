"use client";
import React, { useState } from "react";
import Image from "next/image";
import { images } from "@/app/ui";
import DesktopMenu from "./DesktopMenu";
import { ArrowRightIcon, CartIcon, HamBurgerIcon, HeartIcon, SearchIcon } from "@/public/icons";
import ThemeButton from "../Button/ThemeButton";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
 const showCart = pathname === "/product" || pathname.startsWith("/product/");
  return (
    <header className="flex flex-col fixed left-0 right-0 top-0 z-50">
      <div className="bg-neutral-900 py-2.5 flex  justify-center">
        <div className="flex  items-center md:flex-row flex-col gap-2.5 px-4 lg:px-0">
          <p className="text-sm text-center text-white/70">
            Clinically guided therapies. Pharmacy-grade quality.{" "}
          </p>
          <button
            onClick={() => {
              "";
            }}
            className="text-sm cursor-pointer text-white py-1 px-3 rounded-full bg-white/10 flex flex-row items-center gap-2.5"
          >
            Start Now
            <ArrowRightIcon />
          </button>
        </div>
      </div>
      <div className="py-4 lg:px-8 px-4 flex flex-row gap-2.5 items-center justify-between bg-primary">
        <div className="lg:px-5  flex flex-row items-center gap-8 xl:gap-19.5">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-7 w-7 items-center justify-center bg-white 2xl:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <HamBurgerIcon />
          </button>
          <Image
            src={images.landingpageimages.HeaderLogo}
            alt={"skyhealth logo"}
            className="shrink-0 md:w-auto md:h-auto h-10 w-50"
          />
          <div className="2xl:block hidden">
            <DesktopMenu />
          </div>
        </div>
        <div className="hidden md:flex flex-row  gap-3">
          <button
            onClick={() => {
              "search";
            }}
            className="w-15 hover:bg-black/20 hover:border-white/60 cursor-pointer rounded-full h-15 flex items-center border border-white/33 backdrop-blur-sm justify-center"
          >
            <SearchIcon />
          </button>
          {showCart && (
            <button
              type="button"
              onClick={() => {}}
              className="w-15 cursor-pointer rounded-full h-15 flex items-center border border-white/33 backdrop-blur-sm justify-center"
              aria-label="Cart"
            >
              <CartIcon/>
            </button>
          )}
          <ThemeButton
            label="Login"
            onClick={() => {
              console.log("clicked");
            }}
            minWidth
            iconPosition="end"
            icon= {showCart ?<HeartIcon/>:undefined}
          />
        </div>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          showCart={showCart}
        />
      </div>
    </header>
  );
};

export default Header;
