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
    <div className="rounded-xl  p-4 flex flex-col  justify-between  lg:p-5 min-h-[380px] max-h-[380px]  gap-4 bg-[#F7F9F9] group border-transparent border hover:border-[#EFEFEF]">
      <div className="flex flex-col items-center gap-4">
        <div className=" h-[194px] w-[242px]">
          <Image src={image} alt={title}  className="transition-transform duration-500 ease-out group-hover:scale-105"/>
        </div>
        <p className="text-lg text-center font-medium break-all  line-clamp-2 text-[#2E2E2E]">
          {title}
        </p>
      </div>

      <div >
        
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
