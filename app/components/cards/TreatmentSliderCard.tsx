"use client";

import Image, { type StaticImageData } from "next/image";
import { NewArrowIcon } from "@/public/icons";

interface TreatmentSliderCardProps {
  productImage: StaticImageData | string;
  productTitle: string;
  productDescription: string;
  productPrice: string;
  productImageBg?: string;
  onGetStarted: () => void;
  onShopNow: () => void;
}

const TreatmentSliderCard = ({
  productImage,
  productTitle,
  productDescription,
  productPrice,
  productImageBg = "#CEDCF9",
  onGetStarted,
  onShopNow,
}: TreatmentSliderCardProps) => {
  return (
    <article className="flex h-full  xl:max-w-110 shrink-0 flex-col justify-between gap-4 xl:gap-18 overflow-hidden rounded-[18px] xl:rounded-[36px] bg-white p-1 xl:p-6">
      <div
        style={{ backgroundColor: productImageBg }}
        className="relative min-h-87.25 overflow-hidden rounded-[18px] xl:rounded-[36px]"
      >
        <Image
          src={productImage}
          alt={productTitle}
          fill 
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-6 px-3 pb-3 xl:pb-0">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-medium leading-7 text-[#0F1D3A]">
            {productTitle}
          </h3>

          <p className="text-sm font-light leading-[100%] text-[#0F1D3A]">
            {productDescription}
          </p>

          <p className="text-sm font-medium leading-7 text-[#0F1D3A]">
            {productPrice}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onGetStarted}
            className="cursor-pointer whitespace-nowrap rounded-full bg-[#3D74E9] px-5 xl:px-8 py-3 xl:py-5 text-sm xl:text-base font-medium leading-[100%] text-white"
          >
            Lets get started
          </button>

          <button
            type="button"
            onClick={onShopNow}
            className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full border border-[#0F1D3A] px-5 xl:px-8 py-3 xl:py-5"
          >
            <span className="text-sm xl:text-base font-medium leading-[100%] text-[#0F1D3A]">
              Shop now
            </span>

            <NewArrowIcon fill="#0F1D3A" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TreatmentSliderCard;