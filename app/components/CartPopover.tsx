"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { BackArrowIcon, ShoppingCartIcon } from "@/public/icons";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import {
  decrementQty,
  incrementQty,
  removeFromCart,
  setCartItemPricing,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
} from "../Redux/slices/cart/cartSlice";
import { QuantityStepper } from "./QuantityStepper";

export function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function shouldHideCartItemPrice(name?: string) {
  return name?.trim().toLowerCase() === "hormone program";
}

export default function CartPopover() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // ✅ Redux cart data
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartSubtotal);

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          {/* Button */}
          <PopoverButton
            aria-label="Open cart"
            className="relative flex items-center rounded-[5px] border hover:bg-primary-light hover:border-primary-light hover:text-white border-neutral-200 cursor-pointer outline-0 order-2 xl:order-0 justify-center bg-white  h-9 w-9 "
          >
            <ShoppingCartIcon
              classname="w-4.5 h-4.5 sm:w-6 sm:h-6"
              fill="currentColor"
            />
            {count > 0 ? (
              <span className="absolute md:-right-3 md:-top-4 inline-flex lg:h-6 h-4 w-4 lg:min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] lg:text-xs font-semibold text-white">
                {count}
              </span>
            ) : null}
          </PopoverButton>

          {/* Panel */}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-2 scale-[0.98]"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition ease-in duration-120"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-2 scale-[0.98]"
          >
            {/* <PopoverPanel className="z-50 mt-3 w-95 rounded-xl border max-h-200 overflow-y-scroll  absolute right-0 top-12 border-gray-200 bg-white shadow-xl ring-1 ring-black/5 focus:outline-none"> */}
            <PopoverPanel className="z-50 mt-3 w-110 overflow-visible rounded-xl border absolute right-0 top-12 border-gray-200 bg-white shadow-xl ring-1 ring-black/5 focus:outline-none">
              <div className="flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-b-gray-200 p-4">
                  <p className="text-base font-semibold text-gray-900">
                    Products
                  </p>
                  <p className="text-xl font-bold text-secondary">
                    {formatMoney(total)}
                  </p>
                </div>

                {/* Items */}
                <div className="p-5  max-h-120 overflow-y-scroll ">
                  <div className="space-y-4">
                    {items.length === 0 ? (
                      <div className="rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-200 p-6 text-center text-sm text-gray-600">
                        Your cart is empty.
                        <button
                          onClick={() => {
                            router.push("/products");
                          }}
                          className="block text-primary-light cursor-pointer w-fit mt-2"
                        >
                          Add Products
                        </button>
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

                              <div className="min-w-0 flex-1 space-y-2.5 space-x-2">
                                <div className="flex gap-2 flex-wrap">
                                  <div>
                                    <p className="text-sm w-full break-all font-medium leading-snug text-gray-900 line-clamp-2">
                                      {name}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    {!shouldHideCartItemPrice(
                                      item.nameSnapshot,
                                    ) && (
                                      <p className="text-base font-semibold text-gray-900">
                                        {formatMoney(item.unitPrice * item.qty)}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <div className="flex flex-row items-center gap-2.5">
                                    {!shouldHideCartItemPrice(
                                      item.nameSnapshot,
                                    ) && (
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
                                    {(item.pricingOptions?.length ?? 0) > 1 && (
                                      <div className=" md:min-w-36 w-full md:max-w-36">
                                        <Menu
                                          as="div"
                                          className="relative w-full"
                                        >
                                          <MenuButton className="w-full text-xs px-2.5 py-2 border border-slate-200 justify-between flex gap-1 items-center rounded-full outline-none text-slate-900 bg-white">
                                            <span className="text-balck font-medium truncate text-start">
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
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  clipRule="evenodd"
                                                  d="M12.3531 6.35359L7.99958 10.7071L3.646 6.35362L4.3531 5.64651L7.99957 9.29293L11.646 5.64648L12.3531 6.35359Z"
                                                  fill="#262626"
                                                />
                                              </svg>
                                            </span>
                                          </MenuButton>

                                          <MenuItems
                                            anchor="bottom end"
                                            className="z-[120]  mt-2 w-fit bg-white border border-slate-200 rounded-xl shadow-[0px_14px_34px_rgba(0,0,0,0.1)] p-1 text-sm focus:outline-none"
                                          >
                                            <div className="space-y-1 max-h-60 overflow-auto">
                                              {item.pricingOptions?.map(
                                                (pricing) => {
                                                  const isSelected =
                                                    pricing.id ===
                                                    item.selectedPricingId;

                                                  return (
                                                    <MenuItem
                                                      key={pricing.id}
                                                      as={Fragment}
                                                    >
                                                      {({ focus }) => (
                                                        <button
                                                          onClick={() => {
                                                            dispatch(
                                                              setCartItemPricing(
                                                                {
                                                                  cartItemId:
                                                                    item.cartItemId,
                                                                  pricingId:
                                                                    pricing.id,
                                                                },
                                                              ),
                                                            );
                                                          }}
                                                          className={[
                                                            "flex w-full items-center font-medium cursor-pointer justify-between gap-2 rounded-md py-2 px-4 text-sm text-neutral-800",
                                                            focus
                                                              ? "bg-gray-100"
                                                              : "",
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
                                                },
                                              )}
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

                                {/* optional: show qty */}
                                {/* <p className="text-xs text-neutral-500">
                                Qty: {item.qty}
                              </p> */}
                              </div>
                            </div>

                            {/* <div className="text-right">
                              <p className="text-base font-semibold text-gray-900">
                                {formatMoney(item.unitPrice * item.qty)}
                              </p>
                            </div> */}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Footer button */}
                <div className="px-5 py-3">
                  <button
                    type="button"
                    className="w-full rounded-full flex items-center gap-2 justify-center bg-primary py-3 text-center text-base font-semibold text-white shadow-sm transition hover:primary/90 cursor-pointer disabled:opacity-60"
                    disabled={items.length === 0}
                    onClick={() => {
                      close();
                      router.push("/surveys");
                    }}
                  >
                    {pathname === "/questions" && <BackArrowIcon />}
                    {pathname === "/questions"
                      ? "Back To Products"
                      : "Continue"}
                  </button>
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
