"use client";

import { PlusIcon } from "@/public/icons";
import Image, { StaticImageData } from "next/image";
import { Images } from "../images";
import { useState } from "react";

export type Product = {
  id: string;
  title: string;
  category: string;
  stock: boolean;
  price: string | number;
  image: string | StaticImageData;
  // size: string;
  dosing: string;
  timing: string;
  // type: string;
  warnings: string;
};

interface ProductCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: Product;
  onAddToCart?: (id: string) => void;
  onCardClick?: (id: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onCardClick,
}: ProductCardProps) {
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

              {/* <Tooltip
                heading="Warning & Precautions"
                content={product.warnings}
              >
                <InformationIcon />
              </Tooltip> */}
            </div>

            <div className="flex items-center flex-wrap gap-2">
              {product.category && (
                <span className="block w-fit rounded-full bg-white border border-gray-200 py-1 px-3 text-gray-700 font-medium text-xs md:text-sm">
                  {product.category}
                </span>
              )}
              {product.dosing && (
                <span className="block w-fit rounded-full bg-white border border-gray-200 py-1 px-3 text-gray-700 font-medium text-xs md:text-sm">
                  {product.dosing}
                </span>
              )}
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
                  onAddToCart?.(product.id);
                }}
                className="text-sm md:text-lg font-medium text-black hover:bg-neutral-200 cursor-pointer flex items-center gap-3 p-3 bg-white border border-gray-300 rounded-full flex-1  justify-center"
              >
                <PlusIcon /> Add to Cart
              </button>

              <h2 className="text-gunmetal font-bold text-sm md:text-lg lg:text-[28px] min-w-16 text-end">
                ${product.price}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
