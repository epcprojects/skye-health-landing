"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import ThemeButton from "../Button/ThemeButton";
import { Images } from "@/app/images";

type ProductCardProps = {
  image: string | StaticImageData;
  title: string;
  onBuyClick: () => void;
  isInDemand?: boolean;
  bgImage?: string | StaticImageData;
};

const ProductCard = ({
  image,
  title,
  onBuyClick,
  isInDemand,
  bgImage,
}: ProductCardProps) => {
  const showDemandHover = isInDemand && bgImage;
  return (
    <div className="rounded-xl relative p-4 flex flex-col group justify-between overflow-hidden lg:p-5  gap-4 bg-[#F7F9F9] group border-transparent border hover:border-[#EFEFEF]">
      {showDemandHover && (
        <Image
          src={bgImage}
          alt=""
          fill
          className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        />
      )}

      {showDemandHover && (
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <div className="flex flex-col items-center gap-12 relative">
        <div className=" h-[194px] w-[242px] ">
          <Image
            src={image ? image : Images.landingPage.product}
            alt={title}
            width={300}
            height={300}
            className={
              showDemandHover
                ? "transition-opacity duration-300 group-hover:opacity-0"
                : "transition-transform duration-500 ease-out group-hover:scale-105"
            }
          />
        </div>
        <p
          className={`
             text-lg text-center font-medium break-all  line-clamp-2 text-[#2E2E2E] 
              ${showDemandHover ? "text-gunmetal group-hover:text-white" : "text-gunmetal"}
            `}
        >
          {title}
        </p>
      </div>

      <div className="relative">
        <ThemeButton
          label="Buy Product"
          variant="outlinedBluish"
          className="w-full"
          onClick={onBuyClick}
        />
      </div>
    </div>
  );
};

export default ProductCard;
