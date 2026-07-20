"use client";

import Image from "next/image";
import Link from "next/link";
import { images } from "@/app/ui";
import { CrossIcon, OutlineShoppingIcon } from "@/public/icons";

export interface MobileNavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navItems: MobileNavItem[];
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({
  navItems,
  isOpen,
  onClose,
}: MobileMenuProps) => {
  return (
    <div className="xl:hidden">
      <div
        aria-hidden={!isOpen}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-[#0F1D3A]/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={`fixed left-0 top-0 z-50 flex h-dvh w-[85%] max-w-sm flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#CEDCF9] pb-5">
          <Link
            href="/"
            onClick={onClose}
            aria-label="Skye Health home"
          >
            <Image
              src={images.landingpageimages.NewSkyLogo}
              alt="Skye Health"
              className="h-auto w-32"
            />
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0F1D3A]"
          >
            <CrossIcon fill="white" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 py-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-xl px-4 py-4 text-lg font-medium text-[#0F1D3A] transition-colors hover:bg-[#F5F8FE]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-[#CEDCF9] pt-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-[#3D74E9] px-6 py-4 text-sm font-medium text-white"
          >
            Get started
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-[#0F1D3A] px-6 py-4 text-sm font-medium text-white"
          >
            <OutlineShoppingIcon />
            View cart
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;