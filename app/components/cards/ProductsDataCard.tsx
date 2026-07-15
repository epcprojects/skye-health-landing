"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { InfoIcon, PlusIcon } from "@/public/icons";
import ThemeButton from "../Button/ThemeButton";

type ProductsDataCardProps = {
  stockStatus: "in_stock" | "out_of_stock";
  image: string | StaticImageData;
  name: string;
  info: string;
  tags: readonly string[];
  price: number;
  onAddToCart: () => void;
};

const ProductsDataCard = ({
  stockStatus,
  image,
  name,
  info,
  tags,
  price,
  onAddToCart,
}: ProductsDataCardProps) => {
  const [showInfo, setShowInfo] = useState(false);

  const isInStock = stockStatus === "in_stock";

  return (
    <div className="rounded-3xl border border-neutral-200 px-2 pb-2 flex flex-col gap-6.25 bg-white">
      <div className="flex flex-col gap-2.5 px-4 py-4">
        <div className="flex flex-row items-center gap-2.5">
          <div
            className={[
              "w-2.75 h-2.75 rounded-full",
              isInStock ? "bg-[#2CDD41]" : "bg-[#EA5D5D]",
            ].join(" ")}
          />

          <div className="text-base font-semibold text-neutral-900">
            {isInStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        <div className="self-center">
          <Image
            src={image}
            alt={name}
            width={323}
            height={230}
            className="w-80.75 h-57.5 object-cover"
          />
        </div>
      </div>

      <div className="bg-[#F7F9F9] rounded-[20px] p-5 flex flex-col gap-6.25">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between gap-3">
            <p className="text-[22px] flex-1 text-neutral-800 font-medium">
              {name}
            </p>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowInfo((prev) => !prev)}
                className="flex items-center justify-center"
                aria-label="Product info"
              >
                <InfoIcon />
              </button>

              {showInfo && (
                <div className="absolute right-0 top-8 z-20 w-64 rounded-xl border border-neutral-200 bg-white p-3 text-sm leading-5 text-neutral-700 shadow-lg">
                  {info}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="bg-white border border-neutral-200 py-1 px-3 rounded-full text-sm font-medium text-neutral-700"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center  gap-3 lg:gap-6.25">
          <div className="lg:flex-1">
            <ThemeButton
              onClick={onAddToCart}
              variant="outlinedBluish"
              className="rounded-full!"
              label={"Learn More"}
              icon={<PlusIcon />}
              disabled={!isInStock}
            />
          </div>

          <p className="text-[28px] font-bold text-neutral-900">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsDataCard;
