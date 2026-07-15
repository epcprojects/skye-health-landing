"use client";

import { PlusIcon } from "@/public/icons";
import Image, { StaticImageData } from "next/image";
import { Images } from "../images";
import { Fragment, useMemo, useState } from "react";
import { ProductUnitPricingType } from "../graphql/queries/products";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export type Product = {
  id: string;
  title: string;
  category: string;
  stock: boolean;
  price: string | number;
  image: string | StaticImageData;
  dosing: string;
  timing: string;
  warnings: string;
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (selectedPricingId?: string) => void;
  onCardClick?: (id: string) => void;
  isInDemand?: boolean;
  bgImage?: string | StaticImageData;
  productUnitPricings?: ProductUnitPricingType[];
}

export default function ProductCard({
  product,
  onAddToCart,
  onCardClick,
  isInDemand = false,
  bgImage,
  productUnitPricings = [],
}: ProductCardProps) {
  const showDemandHover = isInDemand && bgImage;
  const [selectedPricingId, setSelectedPricingId] = useState<string>(
    productUnitPricings[0]?.id ?? "",
  );

  const selectedPricing = useMemo(
    () =>
      productUnitPricings.find((pricing) => pricing.id === selectedPricingId) ??
      productUnitPricings[0],
    [productUnitPricings, selectedPricingId],
  );

  const variantOptions = useMemo(
    () =>
      productUnitPricings.map((pricing) => ({
        value: pricing.id,
        label: [pricing.strength, pricing.unitQuantity]
          .filter(Boolean)
          .join(" - "),
      })),
    [productUnitPricings],
  );

  const displayPriceValue =
    selectedPricing?.retailPrice ?? selectedPricing?.cost ?? product.price;

  const displayPrice =
    typeof displayPriceValue === "number"
      ? `$${displayPriceValue.toFixed(2)}`
      : displayPriceValue;
  const shouldHidePrice =
    product.category?.trim().toLowerCase() === "hormone program";
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div
      onClick={() => onCardClick?.(product.id)}
      className="rounded-3xl cursor-pointer flex-col gap-6 bg-white shadow-table border relative border-gray-200 p-2 flex items-center justify-center"
    >
      <span
        className={`
          shrink-0
    absolute top-3 left-4
    text-gunmetal text-base font-semibold
    flex items-center gap-2.5
    before:content-['']
    before:h-2.5 before:w-2.5
    z-10
    before:rounded-full
    before:inline-block
    ${product.stock ? "before:bg-green-600" : "before:bg-red-400"}
  `}
      >
        {product.stock ? "In Stock" : "Out of Stock"}
      </span>
      <div className="bg-[url(/images/productBgPattern.png)] relative bg-cover h-55 md:h-60 pt-30 lg:pt-3 pb-25 lg:pb-2 bg-position-[0_20px] flex items-center justify-center ">
        {/* Skeleton */}
        {!imageLoaded && (
          <div className="absolute w-80 h-40 bottom-0 bg-gray-100 animate-pulse rounded-xl" />
        )}

        <Image
          alt=""
          width={240}
          height={240}
          src={product.image ? product.image : Images.landingPage.product}
          onLoad={() => setImageLoaded(true)}
          className={`transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="bg-neutral-100 border border-gray-100 p-2.5 md:p-5 h-full md:min-h-56 w-full rounded-2xl">
        <div className="flex flex-col h-full gap-3 lg:gap-6 justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-1">
              <h2 className="text-gunmetal font-medium line-clamp-2 text-lg md:text-xl">
                {product.title}
              </h2>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              {product.category && (
                <span className="block w-fit rounded-full bg-white border border-gray-200 py-1 px-3 text-gray-700 font-medium text-xs md:text-sm">
                  {product.category}
                </span>
              )}
              {variantOptions.length > 1 && (
                <div onClick={(e) => e.stopPropagation()}>
                  <Menu as="div" className="relative z-30">
                    <MenuButton
                      className={`text-sm px-2.5 py-1 border cursor-pointer  justify-between flex gap-1 items-center rounded-full outline-none transition-colors duration-300 ${
                        showDemandHover
                          ? "border-gray-200 bg-white text-gray-700 group-hover:bg-white/20 group-hover:text-white group-hover:border-white"
                          : "border-gray-200 bg-white text-gray-700"
                      }`}
                    >
                      <span className="font-medium truncate text-start max-w-38">
                        {variantOptions.find(
                          (option) => option.value === selectedPricing?.id,
                        )?.label || "Select option"}
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
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </MenuButton>

                    <MenuItems
                      anchor="bottom start"
                      className="z-[200] absolute left-0 top-full mt-2 min-w-32 bg-white border border-slate-200 rounded-xl shadow-[0px_14px_34px_rgba(0,0,0,0.1)] p-1 text-sm focus:outline-none"
                    >
                      <div className="space-y-1 max-h-60 overflow-auto">
                        {variantOptions.map((option) => {
                          const isSelected =
                            option.value === selectedPricing?.id;
                          return (
                            <MenuItem key={option.value} as={Fragment}>
                              {({ focus }) => (
                                <button
                                  onClick={() =>
                                    setSelectedPricingId(option.value)
                                  }
                                  className={[
                                    "flex w-full items-center font-medium whitespace-nowrap cursor-pointer justify-between gap-2 rounded-md py-2 px-4 text-sm text-neutral-800",
                                    focus ? "bg-gray-100" : "",
                                    isSelected ? "bg-slate-100" : "",
                                  ].join(" ")}
                                >
                                  <span>{option.label}</span>
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
              {variantOptions.length > 1 && (
                <div
                  className={`text-sm px-2.5 py-1 border justify-between flex gap-1 items-center rounded-full outline-none transition-colors duration-300 ${
                    showDemandHover
                      ? "border-gray-200 bg-white text-gray-700 group-hover:bg-white/20 group-hover:text-black group-hover:border-white"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  <span className="font-medium truncate text-start ">
                    {variantOptions[0]?.label}
                  </span>
                </div>
              )}
              {/* {product.dosing && (
                <span className="block w-fit rounded-full bg-white border border-gray-200 py-1 px-3 text-gray-700 font-medium text-xs md:text-sm">
                  {product.dosing}
                </span>
              )} */}
              {product.timing && (
                <span className="block w-fit rounded-full bg-white border border-gray-200 py-1 px-3 text-gray-700 font-medium text-xs md:text-sm">
                  {product.timing}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:gap-3">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(selectedPricing?.id);
                }}
                className="text-sm md:text-lg font-medium text-black hover:bg-neutral-200 cursor-pointer flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-full flex-1  justify-center"
              >
                <PlusIcon /> Learn More
              </button>

              {!shouldHidePrice && (
                <h2 className="text-gunmetal font-bold text-sm md:text-lg lg:text-[28px] min-w-16 text-end">
                  {displayPrice}
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
