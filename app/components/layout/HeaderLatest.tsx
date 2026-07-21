"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/app/ui";
import { HamBurgerIcon, OutlineShoppingIcon } from "@/public/icons";
import MobileMenu, { type MobileNavItem } from "./MobileMenu";
import CartPopover, { formatMoney } from "../CartPopover";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
} from "@/app/Redux/slices/cart/cartSlice";
import { useQuery } from "@apollo/client/react";
import { FETCH_CATEGORIES } from "@/app/graphql/queries/products";

import AppModal from "../modals/AppModal";
import { QuantityStepper } from "../QuantityStepper";
import { usePathname, useRouter } from "next/navigation";

const OPEN_WEIGHT_LOSS_FLOW_EVENT = "skye-open-weight-loss-flow";
const OPEN_WEIGHT_LOSS_FLOW_PENDING_KEY = "skye-open-weight-loss-flow-pending";

const navItemsConfig = [
  {
    label: "Weight Loss",
    category: "Weight Loss",
  },
  {
    label: "Hormones",
    category: "Hormone Program",
  },
  {
    label: "Peptides",
    category: "Peptides",
  },
  {
    label: "Optimize Everything",
    category: "Optimize Everything",
  },
  {
    label: "Who We Are",
    category: "Who We Are",
  },
] as const;

const HeaderLatest = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartSubtotal);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const { data: categoriesData } = useQuery<{
  productCategories: string[];
}>(FETCH_CATEGORIES);

const backendCategories = categoriesData?.productCategories ?? [];

const navItems: MobileNavItem[] = navItemsConfig.map((item) => {
  const matchingCategory = backendCategories.find(
    (category) =>
      category.trim().toLowerCase() ===
      item.category.trim().toLowerCase(),
  );

  return {
    label: item.label,
    href: matchingCategory
      ? `/products?category=${encodeURIComponent(matchingCategory)}`
      : "/products",
  };
});

  const openWeightLossFlow = () => {
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent(OPEN_WEIGHT_LOSS_FLOW_EVENT));
      return;
    }

    window.sessionStorage.setItem(OPEN_WEIGHT_LOSS_FLOW_PENDING_KEY, "true");
    router.push("/");
  };

  return (
    <>
      <header className="flex flex-col w-full">
        <div className="bg-[#0F1D3A] py-3 px-4 xl:px-8">
          <p className="text-white text-xs xl:text-sm text-center leading-[140%]">
            Early Access Friends &amp; Family with free month of Healthcare
          </p>
        </div>

        <div className="bg-white py-3 xl:py-5  w-full flex flex-row ">
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

          <div className="container max-w-7xl mx-auto flex flex-row items-center w-full justify-between pl-2 pr-4 xl:px-8">
            <Image src={images.landingpageimages.NewSkyLogo} alt="Sky Health" />

            <div className="hidden xl:flex flex-row gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
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
                onClick={openWeightLossFlow}
                className="rounded-full bg-[#3D74E9] px-6 py-4 text-sm font-medium text-white"
              >
                Get started
              </button>

              <CartPopover
                triggerClassName="relative w-12.25 h-12.25 bg-[#0F1D3A] rounded-full flex items-center justify-center cursor-pointer outline-none"
                triggerIcon={<OutlineShoppingIcon />}
              />
            </div>
          </div>
        </div>

        <MobileMenu
          navItems={navItems}
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          onOpenCart={() => {
            setIsCartOpen(true);
          }}
          cartCount={count}
        />
        <AppModal
          title="Your cart"
          isOpen={isCartOpen}
          onClose={() => {
            setIsCartOpen(false);
          }}
          confirmLabel="Continue"
          onConfirm={() => {
            setIsCartOpen(false);
            router.push("/surveys");
          }}
          cancelLabel="Close"
          bodyPaddingClasses="p-0"
        >
          <div className="z-50 h-full w-full bg-white focus:outline-none">
            <div className="flex items-center justify-between border-b border-b-gray-200 p-4">
              <p className="text-base font-semibold text-gray-900">Products</p>

              <p className="text-xl font-bold text-secondary">
                {formatMoney(total)}
              </p>
            </div>

            <div className="h-full overflow-auto p-5">
              <div className="space-y-4">
                {items.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-600">
                    Your cart is empty.
                  </div>
                ) : (
                  items.map((item, index) => {
                    const name = item.nameSnapshot ?? "Untitled Product";
                    const imageSrc =
                      item.imageSnapshot ||
                      "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=200&q=80";

                    const hidePrice =
                      item.nameSnapshot?.trim().toLowerCase() ===
                      "hormone program";

                    return (
                      <div
                        key={`${item.cartItemId}-${index}`}
                        className="flex w-full items-start gap-4"
                      >
                        <div className="flex w-full space-x-5">
                          <div className="relative h-17.5 w-17.5 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-gray-50">
                            <Image
                              src={imageSrc}
                              alt={name}
                              fill
                              sizes="70px"
                              className="object-cover"
                            />
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col items-start space-y-2.5">
                            <div className="flex flex-wrap">
                              <p className="line-clamp-2 w-full break-all text-sm font-medium leading-snug text-gray-900">
                                {name}
                              </p>

                              {!hidePrice && (
                                <p className="text-base font-semibold text-gray-900">
                                  {formatMoney(item.unitPrice * item.qty)}
                                </p>
                              )}
                            </div>

                            {!hidePrice && (
                              <QuantityStepper
                                value={item.qty}
                                showLabel={false}
                                onChange={(next) => {
                                  if (next > item.qty) {
                                    dispatch(
                                      incrementQty({
                                        cartItemId: item.cartItemId,
                                      }),
                                    );
                                  } else if (next < item.qty) {
                                    dispatch(
                                      decrementQty({
                                        cartItemId: item.cartItemId,
                                      }),
                                    );
                                  }
                                }}
                                min={1}
                                max={20}
                                variant="sm"
                              />
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                dispatch(
                                  removeFromCart({
                                    cartItemId: item.cartItemId,
                                  }),
                                );
                              }}
                              className="cursor-pointer text-sm font-medium text-red-500 underline underline-offset-2 hover:text-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </AppModal>
      </header>
    </>
  );
};

export default HeaderLatest;
