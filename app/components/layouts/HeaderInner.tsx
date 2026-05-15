"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { images } from "@/app/ui";
import DesktopMenu from "./DesktopMenu";
import { CartIcon, HamBurgerIcon, HeartIcon, SearchIcon } from "@/public/icons";
import ThemeButton from "../Button/ThemeButton";
import { usePathname } from "next/navigation";
import InnerMobileMenu from "./InnerMobileMenu";
const HeaderInner = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasHeroPassed, setHasHeroPassed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("page-hero");

      if (!hero) {
        setHasHeroPassed(true);
        return;
      }

      const headerHeight = 92;
      const heroBottom = hero.getBoundingClientRect().bottom;

      setHasHeroPassed(heroBottom <= headerHeight);
    };

    const frameId = window.requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 flex flex-col transition-all duration-300 ${
        hasHeroPassed
          ? "bg-black/50 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="py-4 lg:px-8 px-4 flex flex-row gap-2.5 items-center justify-between">
        <div className="lg:px-5  flex flex-row items-center gap-8 xl:gap-19.5">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex h-7 w-7 items-center justify-center bg-white md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <HamBurgerIcon />
          </button>
          <Image
            src={images.landingpageimages.HeaderLogo}
            alt={"skyhealth logo"}
            className="shrink-0 md:w-auto md:h-40 h-10 w-50"
          />
          <div className="md:block hidden">
            <DesktopMenu />
          </div>
        </div>
        <div className="hidden md:flex flex-row  gap-3">
          <button
            onClick={() => {
              "search";
            }}
            className="w-15 cursor-pointer rounded-full h-15 flex items-center border border-white/33 backdrop-blur-sm justify-center"
          >
            <SearchIcon />
          </button>
          <ThemeButton
            label="Login"
            onClick={() => {
              console.log("clicked");
            }}
            iconPosition="end"
            icon={<HeartIcon />}
          />
        </div>
        <InnerMobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default HeaderInner;
