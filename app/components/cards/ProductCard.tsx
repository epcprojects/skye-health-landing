"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import ThemeButton from "../Button/ThemeButton";

type ProductCardProps = {
  image: string | StaticImageData;
  title: string;
  onBuyClick: () => void;
};

const ProductCard = ({ image, title, onBuyClick }: ProductCardProps) => {
  return (
    <div className="rounded-xl p-4 lg:p-5 flex flex-col gap-4 bg-[#F7F9F9]">
      <div className="flex flex-col items-center">
        <Image src={image} alt={title} />

        <p className="text-lg text-center font-medium text-[#2E2E2E]">
          {title}
        </p>
      </div>

      <div>
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
