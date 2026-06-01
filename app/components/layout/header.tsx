"use client";
import React, { MouseEvent, useState } from "react";
import HeaderMenuNavItems from "./HeaderMenuNavItems";
import Image from "next/image";
import Link from "next/link";
import { Images } from "@/app/images";
import { ArrowIcon, ShoppingCartIcon } from "@/public/icons";
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
import AppModal from "../modals/AppModal";
import { QuantityStepper } from "../QuantityStepper";
import { usePathname, useRouter } from "next/navigation";

interface MenuItemType {
  label: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>;
}

interface HeaderProps {
  menuItems: MenuItemType[];
}

const Header: React.FC<HeaderProps> = ({ menuItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const toggleMenu = (): void => setIsMenuOpen((prev: boolean) => !prev);
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

  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartSubtotal);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [cartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      {" "}
      <div className="sm:px-4 xl:px-8 mx-auto">
        <nav className="flex relative container max-w-7xl   sm:mt-4  items-center px-4 sm:ps-6 backdrop-blur-md py-3 pe-4 bg-white/70  shadow-header md:rounded-full  mx-auto justify-between lg:flex-row flex-row-reverse w-full">
          {/* <div className="flex relative">
          <button
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 md:h-11 md:w-11  bg-black/40 rounded-full text-black"
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
                fill="white"
              />
              <path
                d="M2.16724 8.33012C2.16724 8.05398 2.39109 7.83012 2.66724 7.83012L13.3339 7.83012C13.61 7.83012 13.8339 8.05398 13.8339 8.33012C13.8339 8.60626 13.61 8.83012 13.3339 8.83012L2.66724 8.83012C2.39109 8.83012 2.16724 8.60626 2.16724 8.33012Z"
                fill="white"
              />
              <path
                d="M2.66724 12.4968C2.39109 12.4968 2.16724 12.7206 2.16724 12.9968C2.16724 13.2729 2.39109 13.4968 2.66724 13.4968H8.00057C8.27671 13.4968 8.50057 13.2729 8.50057 12.9968C8.50057 12.7206 8.27671 12.4968 8.00057 12.4968H2.66724Z"
                fill="white"
              />
            </svg>
          </button>
        </div> */}

          <Link href={"/"} className="relative order-1 lg:order-0">
            <Image alt="" src={Images.layout.logo} />
          </Link>
          <div className=" flex-1 xl:flex hidden ">
            <HeaderMenuNavItems items={menuItems} />
          </div>

          <div className="flex items-center flex-row-reverse xl:flex-row gap-3">
            <div className="flex md:hidden relative">
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 md:h-11 md:w-11  bg-black/40 rounded-full text-black"
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
                    fill="white"
                  />
                  <path
                    d="M2.16724 8.33012C2.16724 8.05398 2.39109 7.83012 2.66724 7.83012L13.3339 7.83012C13.61 7.83012 13.8339 8.05398 13.8339 8.33012C13.8339 8.60626 13.61 8.83012 13.3339 8.83012L2.66724 8.83012C2.39109 8.83012 2.16724 8.60626 2.16724 8.33012Z"
                    fill="white"
                  />
                  <path
                    d="M2.66724 12.4968C2.39109 12.4968 2.16724 12.7206 2.16724 12.9968C2.16724 13.2729 2.39109 13.4968 2.66724 13.4968H8.00057C8.27671 13.4968 8.50057 13.2729 8.50057 12.9968C8.50057 12.7206 8.27671 12.4968 8.00057 12.4968H2.66724Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden md:block">
              <CartPopover />
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative md:hidden flex items-center border border-neutral-200 cursor-pointer outline-0 order-2 xl:order-0 justify-center bg-white h-8 w-8 sm:h-11 rounded-full sm:w-11"
            >
              <ShoppingCartIcon classname="w-4.5 h-4.5 sm:w-6 sm:h-6" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex lg:h-6 h-4 w-4 lg:min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] lg:text-xs font-semibold text-white">
                  {count}
                </span>
              ) : null}
            </button>
            <Link
              href={"/products"}
              className="rounded-full hidden  bg-primary ps-5 p-3 group text-white font-medium text-base xl:flex items-center gap-3"
            >
              Get Started{" "}
              <span className="w-7.5 h-7.5 -rotate-45 group-hover:rotate-0 transition-all duration-500 rounded-full bg-white flex items-center justify-center">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </nav>
        <div
          className={`md:hidden relative ${isMenuOpen ? "block" : "hidden"}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div
            className={`fixed inset-0 z-10 bg-black opacity-50 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            onClick={handleBackdropClick}
          ></div>

          <div className="fixed inset-y-0 gap-4 flex flex-col left-0 z-20 min-w-xs p-4 px-4 overflow-y-auto bg-white  md:px-6 md:py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
                  className="w-4 h-4"
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
              <div className=" divide-y divide-gray-500/10">
                <div className=" border-b-0 flex flex-col gap-2.5">
                  <Link
                    onClick={closeMenu}
                    href={"/"}
                    className="flex items-center gap-1.5 p-1.5  text-base font-normal leading-7 text-neutral-800 hover:bg-gray-100"
                  >
                    Home
                  </Link>
                  {menuItems.map((item) => {
                    return (
                      <Link
                        onClick={closeMenu}
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-1.5 p-1.5  text-base font-normal leading-7 text-neutral-800 hover:bg-gray-100"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          {/* Header */}
          <div className="flex items-center justify-between border-b border-b-gray-200 p-4">
            <p className="text-base font-semibold text-gray-900">Products</p>
            <p className="text-xl font-bold text-secondary">
              {formatMoney(total)}
            </p>
          </div>

          {/* Items */}
          <div className="overflow-auto p-5 h-full">
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-600">
                  Your cart is empty.
                </div>
              ) : (
                items.map((item, index) => {
                  // item shape from cartSlice:
                  // { productId, qty, unitPrice, nameSnapshot?, imageSnapshot? }

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
                          <p className="text-sm w-full font-medium leading-snug text-gray-900 line-clamp-2">
                            {name}
                          </p>
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

                      <div className="text-right">
                        <p className="text-base font-semibold text-gray-900">
                          {formatMoney(item.unitPrice * item.qty)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer button */}
          {/* <div className="px-5 pb-5">
            <button
              type="button"
              className="w-full rounded-full flex items-center gap-2 justify-center bg-primary py-3 text-center text-base font-semibold text-white shadow-sm transition hover:primary/90 cursor-pointer disabled:opacity-60"
              disabled={items.length === 0}
              onClick={() => {
                close();
                router.push("/register");
              }}
            >
              {pathname === "/questions" && <BackArrowIcon />}
              {pathname === "/questions" ? "Back To Products" : "Continue"}
            </button>
          </div> */}
        </div>
      </AppModal>
    </>
  );
};

export default Header;
