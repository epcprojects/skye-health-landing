"use client";
import React, { useState } from "react";
import Image from "next/image";
import { images } from "@/app/ui";
import DesktopMenu from "./DesktopMenu";
import {
  ArrowRightIcon,
  CartIcon,
  HamBurgerIcon,
  HeartIcon,
  NewShoppingCartIcon,
  SearchIcon,
} from "@/public/icons";
import ThemeButton from "../Button/ThemeButton";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CartPopover, { formatMoney } from "../CartPopover";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
  setCartItemPricing,
} from "@/app/Redux/slices/cart/cartSlice";
import AppModal from "../modals/AppModal";
import { useRouter } from "next/navigation";
import { QuantityStepper } from "../QuantityStepper";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const showCart = pathname === "/product" || pathname.startsWith("/product/");

  const [cartOpen, setIsCartOpen] = useState(false);

  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartSubtotal);
  const count = useAppSelector(selectCartCount);

  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <>
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
              className="flex h-9 w-9 items-center justify-center bg-white rounded-[5px] 2xl:hidden"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <HamBurgerIcon />
            </button>
            <Link href={"/"}>
              <Image
                src={images.landingpageimages.HeaderLogo}
                alt={"skyhealth logo"}
                className="shrink-0 md:w-auto md:h-auto h-10 w-50"
              />
            </Link>
            <div className="2xl:block hidden">
              <DesktopMenu />
            </div>
          </div>
          <div className="flex flex-row  gap-3">
            <Link
              href={"/products"}
              className="rounded-[5px] hidden bg-white hover:bg-secondary hover:text-white py-2 px-5 group font-medium text-sm text-black xl:flex items-center gap-3"
            >
              Get Started{" "}
            </Link>

            <div className="hidden md:block">
              <CartPopover />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative  flex md:hidden items-center rounded-[5px] border border-neutral-200 cursor-pointer outline-0 order-2 xl:order-0 justify-center bg-white  h-9 w-9 "
            >
              <NewShoppingCartIcon fill="currentColor" />
              {count > 0 ? (
                <span className="absolute -right-1.5 md:-right-3 md:-top-2 -top-2 inline-flex lg:h-6 h-4 w-4 lg:min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] lg:text-xs font-semibold text-white">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            showCart={showCart}
          />
        </div>
      </header>

      <AppModal
        title="Your cart"
        isOpen={cartOpen}
        onClose={() => {
          setIsCartOpen(false);
        }}
        confirmLabel="Continue"
        onConfirm={() => {
          router.push("/surveys");
        }}
        cancelLabel="Close"
        bodyPaddingClasses="p-0"
      >
        <div className="z-50 w-full bg-white focus:outline-none">
          <div className="flex items-center justify-between border-b border-b-gray-200 p-4">
            <p className="text-base font-semibold text-gray-900">Products</p>
            <p className="text-xl font-bold text-secondary">
              {formatMoney(total)}
            </p>
          </div>

          <div className="overflow-auto p-5">
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-600">
                  Your cart is empty.
                </div>
              ) : (
                items.map((item) => {
                  const name = item.nameSnapshot ?? "Untitled Product";
                  const imageSrc =
                    item.imageSnapshot ||
                    "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=200&q=80";

                  return (
                    <div
                      key={item.productId}
                      className="flex items-start gap-4 w-full"
                    >
                      <div className="space-x-5 flex w-full">
                        <div className="relative h-17.5 w-17.5 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-gray-50">
                          <Image
                            src={imageSrc}
                            alt={name}
                            fill
                            className="object-cover"
                            sizes="70px"
                          />
                        </div>

                        <div className="min-w-0 flex-1 flex flex-col items-start space-y-2.5">
                          <div className="flex flex-wrap">
                            <p className="text-sm w-full font-medium break-all leading-snug text-gray-900 line-clamp-2">
                              {name}
                            </p>
                            <div className="text-right">
                              <p className="text-base font-semibold text-gray-900">
                                {formatMoney(item.unitPrice * item.qty)}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-row items-center flex-wrap gap-2.5">
                            <QuantityStepper
                              value={item.qty}
                              showLabel={false}
                              onChange={(next) => {
                                if (next > item.qty) {
                                  dispatch(
                                    incrementQty({
                                      productId: item.productId,
                                    }),
                                  );
                                } else if (next < item.qty) {
                                  dispatch(
                                    decrementQty({
                                      productId: item.productId,
                                    }),
                                  );
                                }
                              }}
                              min={1}
                              max={20}
                              variant="sm"
                            />

                            {(item.pricingOptions?.length ?? 0) > 1 && (
                              <div className="max-w-36 min-w-30">
                                <Menu as="div" className="relative w-full">
                                  <MenuButton className="w-full text-xs px-2.5 py-2 border border-slate-200 justify-between flex gap-1 md:gap-2 items-center rounded-full outline-none text-slate-900 bg-white">
                                    <span className="text-gray-700 truncate text-start">
                                      {item.pricingOptions?.find(
                                        (pricing) =>
                                          pricing.id === item.selectedPricingId,
                                      )?.label || "Select option"}
                                    </span>
                                    <span>
                                      <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M10 13.9995C9.41668 13.9995 8.83335 13.7745 8.39168 13.3329L2.95835 7.89954C2.71668 7.65788 2.71668 7.25788 2.95835 7.01621C3.20002 6.77454 3.60002 6.77454 3.84168 7.01621L9.27502 12.4495C9.67502 12.8495 10.325 12.8495 10.725 12.4495L16.1583 7.01621C16.4 6.77454 16.8 6.77454 17.0417 7.01621C17.2833 7.25788 17.2833 7.65788 17.0417 7.89954L11.6083 13.3329C11.1667 13.7745 10.5833 13.9995 10 13.9995Z"
                                          fill="black"
                                        />
                                      </svg>
                                    </span>
                                  </MenuButton>

                                  <MenuItems className="z-[120] absolute mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-[0px_14px_34px_rgba(0,0,0,0.1)] p-1 text-sm focus:outline-none">
                                    <div className="space-y-1 max-h-60 overflow-auto">
                                      {item.pricingOptions?.map((pricing) => {
                                        const isSelected =
                                          pricing.id === item.selectedPricingId;

                                        return (
                                          <MenuItem key={pricing.id}>
                                            {({ focus }) => (
                                              <button
                                                onClick={() => {
                                                  dispatch(
                                                    setCartItemPricing({
                                                      productId: item.productId,
                                                      pricingId: pricing.id,
                                                    }),
                                                  );
                                                }}
                                                className={[
                                                  "flex w-full items-center font-medium cursor-pointer justify-between gap-2 rounded-md py-2.5 px-4 text-sm text-neutral-800",
                                                  focus ? "bg-gray-100" : "",
                                                  isSelected
                                                    ? "bg-slate-100"
                                                    : "",
                                                ].join(" ")}
                                              >
                                                <span>{pricing.label}</span>
                                                {isSelected && (
                                                  <span className="text-sky-500 text-base leading-none">
                                                    ✓
                                                  </span>
                                                )}
                                              </button>
                                            )}
                                          </MenuItem>
                                        );
                                      })}
                                    </div>
                                  </MenuItems>
                                </Menu>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  productId: item.productId,
                                }),
                              )
                            }
                            className="text-sm font-medium text-red-500 cursor-pointer underline underline-offset-2 hover:text-red-600"
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
    </>
  );
};

export default Header;
