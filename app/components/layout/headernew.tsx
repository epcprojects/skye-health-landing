"use client";

import React, { MouseEvent, useEffect, useState } from "react";
import HeaderMenuNavItems from "./HeaderMenuNavItems";
import Image from "next/image";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Images } from "@/app/images";
import {
  ArrowRightIcon,
  NewShoppingCartIcon,
  ShoppingCartIcon,
} from "@/public/icons";
import CartPopover, { formatMoney } from "../CartPopover";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
  setCartItemPricing,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
} from "@/app/Redux/slices/cart/cartSlice";
import AppModal from "../modals/AppModal";
import { QuantityStepper } from "../QuantityStepper";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/app/hooks/useIsMobile";

interface MenuItemType {
  label: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>;
}

interface HeaderProps {
  menuItems: MenuItemType[];
}

const HeaderNew: React.FC<HeaderProps> = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [cartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartSubtotal);
  const count = useAppSelector(selectCartCount);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const toggleMenu = (): void => setIsMenuOpen((prev) => !prev);
  const closeMenu = (): void => setIsMenuOpen(false);

  const handleMenuButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    toggleMenu();
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    closeMenu();
  };

  const handleCloseButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("page-hero");

      if (hero) {
        const heroScrollThreshold = hero.offsetTop + hero.offsetHeight * 0.2;
        setIsScrolled(window.scrollY >= heroScrollThreshold);
        return;
      }

      const doc = document.documentElement;
      const scrollableHeight = doc.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        setIsScrolled(false);
        return;
      }

      setIsScrolled(window.scrollY >= scrollableHeight * 0.1);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);
  const IsMobile = useIsMobile();
  return (
    <>
      <header
        className={`fixed top-0 left-0 z-[9997] w-full transition-all duration-300 ${
          isScrolled
            ? "bg-black/50 shadow-lg shadow-black/10 backdrop-blur-[30px]"
            : "bg-transparent"
        }`}
      >
        <div className="bg-[#080808B2]/70 backdrop-blur-[20px] p-4 lg:p-2.5 hidden md:flex flex-col items-center lg:flex-row justify-center gap-2.5">
          <p className="text-sm text-center text-white">
            No gimmicks. No guesswork. Just precision health, made accessible.
          </p>
          <button
            onClick={() => {
              "";
            }}
            className="bg-white cursor-pointer py-1 px-2.75 rounded-full flex flex-row items-center gap-2.5"
          >
            <span className="text-xs text-black font-bold">Start Now</span>
            <ArrowRightIcon />
          </button>
        </div>

        <nav className="px-6 py-5 flex flex-row justify-between">
          <Link href={"/"} className="relative order-0">
            <Image
              alt=""
              src={Images.layout.NewLogo}
              className="w-30 lg:w-auto h-auto"
            />
          </Link>

          <div className="flex-1 xl:flex hidden">
            <HeaderMenuNavItems items={menuItems} />
          </div>

          <div className="flex items-center flex-row-reverse xl:flex-row gap-2">
            <div className="flex md:hidden relative">
              <button
                type="button"
                className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-[5px]"
                onClick={handleMenuButtonClick}
                aria-label="Open main menu"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.16724 3.66345C2.16724 3.38731 2.39109 3.16345 2.66724 3.16345H10.6672C10.9434 3.16345 11.1672 3.38731 11.1672 3.66345C11.1672 3.9396 10.9434 4.16345 10.6672 4.16345L2.66724 4.16345C2.39109 4.16345 2.16724 3.93959 2.16724 3.66345Z"
                    fill="black"
                  />
                  <path
                    d="M2.16724 8.33012C2.16724 8.05398 2.39109 7.83012 2.66724 7.83012L13.3339 7.83012C13.61 7.83012 13.8339 8.05398 13.8339 8.33012C13.8339 8.60626 13.61 8.83012 13.3339 8.83012L2.66724 8.83012C2.39109 8.83012 2.16724 8.60626 2.16724 8.33012Z"
                    fill="black"
                  />
                  <path
                    d="M2.66724 12.4968C2.39109 12.4968 2.16724 12.7206 2.16724 12.9968C2.16724 13.2729 2.39109 13.4968 2.66724 13.4968H8.00057C8.27671 13.4968 8.50057 13.2729 8.50057 12.9968C8.50057 12.7206 8.27671 12.4968 8.00057 12.4968H2.66724Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>

            <Link
              href={"/products"}
              className="rounded-[5px] hidden bg-white hover:bg-primary hover:text-white py-2 px-5 group font-medium text-sm text-black xl:flex items-center gap-3"
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
              <NewShoppingCartIcon />
              {count > 0 ? (
                <span className="absolute -right-1.5 md:-right-3 md:-top-2 -top-2 inline-flex lg:h-6 h-4 w-4 lg:min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] lg:text-xs font-semibold text-white">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[99999] xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleBackdropClick}
          />

          <div className="absolute inset-y-0 left-0 z-[100000] gap-4 flex flex-col min-w-xs p-4 px-4 overflow-y-auto bg-white md:px-6 md:py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between pt-1.5">
              <Link href="/" onClick={closeMenu}>
                <span className="sr-only">Your Company</span>
                <Image
                  alt="Company Logo"
                  className="h-12 w-fit"
                  src={Images.layout.logo}
                  width={208}
                  height={32}
                />
              </Link>

              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={handleCloseButtonClick}
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#A4A7AE"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flow-root">
              <div className="divide-y divide-gray-500/10">
                <div className="border-b-0 flex flex-col gap-1">
                  <Link
                    onClick={closeMenu}
                    href={"/"}
                    className="flex items-center gap-1.5 p-1.5 text-base font-normal leading-7 text-neutral-800 hover:bg-gray-100"
                  >
                    Home
                  </Link>

                  {menuItems.map((item) => (
                    <Link
                      onClick={closeMenu}
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-1.5 p-1.5 text-base font-normal leading-7 text-neutral-800 hover:bg-gray-100"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href={"/products"}
              onClick={closeMenu}
              className="rounded-[5px] bg-black text-center py-2 px-5 group font-medium text-sm text-white flex justify-center items-center gap-3"
            >
              Get Started{" "}
            </Link>
          </div>
        </div>
      )}

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
        <div className="z-50 w-full bg-white focus:outline-none h-full">
          <div className="flex items-center justify-between border-b border-b-gray-200 p-4">
            <p className="text-base font-semibold text-gray-900">Products</p>
            <p className="text-xl font-bold text-secondary">
              {formatMoney(total)}
            </p>
          </div>

          <div className="overflow-auto p-5 h-full">
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

                  return (
                    <div
                      key={(item.cartItemId, index)}
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

                            {(item.pricingOptions?.length ?? 0) > 1 && (
                              <div className="md:max-w-36 w-full md:min-w-30">
                                <Menu as="div" className="relative w-full">
                                  <MenuButton className="w-full text-xs px-2.5 py-2 border border-slate-200 justify-between flex gap-1 md:gap-2 items-center rounded-full outline-none text-slate-900 bg-white">
                                    <span className="text-gray-700 truncate text-start">
                                      {(() => {
                                        const selected =
                                          item.pricingOptions?.find(
                                            (pricing) =>
                                              pricing.id ===
                                              item.selectedPricingId,
                                          );
                                        return selected
                                          ? [
                                              selected.strength,
                                              selected.unitQuantity,
                                            ]
                                              .filter(Boolean)
                                              .join(" - ")
                                          : "Select option";
                                      })()}
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
                                                      cartItemId:
                                                        item.cartItemId,
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
                                                <span>
                                                  {[
                                                    pricing.strength,
                                                    pricing.unitQuantity,
                                                  ]
                                                    .filter(Boolean)
                                                    .join(" - ")}
                                                </span>
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
                                  cartItemId: item.cartItemId,
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

export default HeaderNew;
