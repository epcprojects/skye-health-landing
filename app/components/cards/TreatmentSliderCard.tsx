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
    <article className="flex h-full  xl:max-w-110 shrink-0 flex-col justify-between gap-4 xl:gap-18 overflow-hidden rounded-[18px] xl:rounded-[36px] bg-white p-2 xl:p-6">
      <div
        style={{ backgroundColor: productImageBg }}
        className="relative min-h-60 xl:min-h-87.25 overflow-hidden rounded-[10px] flex items-center justify-center xl:rounded-[36px]"
      >
        <Image
          src={productImage}
          alt={productTitle}
          className="object-contain w-53 h-53  xl:w-80 xl:h-80"
        />
      </div>

      <div className="flex flex-col gap-5 xl:gap-6 px-1 pb-3 xl:pb-0">
        <div className="flex flex-col xl:gap-2 gap-3">
          <div className="flex flex-col gap-0.5 xl:gap-2">
            <h3 className="text-xl xl:text-2xl font-medium xl:leading-7 text-[#0F1D3A]">
              {productTitle}
            </h3>

            <p className="text-sm font-light xl:leading-[100%] text-[#0F1D3A]">
              {productDescription}
            </p>
          </div>

          {productTitle === "Hormone Program" ? null : (
            <p className="text-sm font-medium xl:leading-7 text-[#0F1D3A]">
              {productPrice}
            </p>
          )}
        </div>

        <div className="flex flex-wrap xl:gap-3 gap-2">
          <button
            type="button"
            onClick={onGetStarted}
            className="cursor-pointer whitespace-nowrap rounded-full bg-[#3D74E9] hover:bg-[#2F61CC] px-5 xl:px-8 py-3 xl:py-5 text-sm xl:text-base font-medium xl:leading-[100%] text-white"
          >
            Lets get started
          </button>

          <button
            type="button"
            onClick={onShopNow}
            className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full bg-tranparent hover:bg-[#0F1D3A] ring ring-inset ring-[#0F1D3A] px-5 xl:px-8 py-3 xl:py-5 text-[#0F1D3A] hover:text-white"
          >
            <span className="text-sm xl:text-base font-medium xl:leading-[100%] ">
              Shop now
            </span>

            <NewArrowIcon fill="currentColor" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TreatmentSliderCard;
