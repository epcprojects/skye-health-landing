"use client";

import { menuItems } from "@/app/constants/constants";
import { images } from "@/app/ui";
import { CartIcon, CrossIcon, DownArrow, HeartIcon, SearchIcon } from "@/public/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeButton from "../Button/ThemeButton";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  showCart?: boolean;
};

const MobileMenu = ({ isOpen, onClose, showCart = false }: MobileMenuProps) => {
  const [openParent, setOpenParent] = useState<string | null>(null);

  const handleParentClick = (label: string) => {
    setOpenParent((current) => (current === label ? null : label));
  };

  return (
    <div
      className={`fixed inset-0 z-50 2xl:hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        className={`absolute left-0 top-0 h-full w-[85%] max-w-90 bg-primary px-4 py-6 shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <Image
            src={images.landingpageimages.HeaderLogo}
            alt="skyhealth logo"
            className="h-5 w-auto shrink-0"
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
          >
            <CrossIcon />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isParentOpen = openParent === item.label;

            if (hasChildren) {
              return (
                <div key={item.label} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => handleParentClick(item.label)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-base text-white hover:bg-white/10"
                  >
                    {item.label}

                    <span
                      className={`transition-transform duration-300 ${
                        isParentOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <DownArrow />
                    </span>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-out ${
                      isParentOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0">
                      <div className="ml-4 flex flex-col border-l border-white/20 pl-3">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={onClose}
                            className="rounded-lg px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base text-white hover:bg-white/10"
              >
                {item.label}
              </Link>
            );
          })}

          <div className="mt-4 flex flex-col gap-3 md:hidden">
            <button
              type="button"
              onClick={() => {
                "";
              }}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/33 text-white"
            >
              <SearchIcon />
              Search
            </button>
            {showCart && (
              <button
                type="button"
                onClick={() => {}}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/33 text-white"
                aria-label="Cart"
              >
                <CartIcon />
                Cart
              </button>
            )}
            <ThemeButton
              label="Login"
              onClick={onClose}
              iconPosition="end"
              icon={showCart ? <HeartIcon /> : undefined}
            />
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default MobileMenu;
