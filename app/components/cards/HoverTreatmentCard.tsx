"use client";

import Image, { type StaticImageData } from "next/image";
import { NewArrowIcon } from "@/public/icons";

interface ExpandableTreatmentCardProps {
  productImage: StaticImageData | string;
  productTitle: string;
  productDescription: string;
  productPrice: string;

  hoverImage: StaticImageData | string;
  hoverBadge: string;
  hoverTitle: string;
  hoverActionLabel: string;

  productImageBg?: string;
  hoverCardBg?: string;
  hoverBadgeBg?: string;

  onGetStarted: () => void;
  onShopNow: () => void;
  onHoverGetStarted: () => void;
  onHoverAction: () => void;
}

const ExpandableTreatmentCard = ({
  productImage,
  productTitle,
  productDescription,
  productPrice,
  hoverImage,
  hoverBadge,
  hoverTitle,
  hoverActionLabel,
  onGetStarted,
  onShopNow,
  onHoverGetStarted,
  onHoverAction,
  productImageBg = "#CEDCF9",
  hoverCardBg = "#AFC6E5",
  hoverBadgeBg = "#87A3CA",
}: ExpandableTreatmentCardProps) => {
  return (
    <article className="group relative h-[681px] w-[440px] shrink-0 overflow-hidden rounded-[36px] transition-[width] duration-500 ease-in-out hover:w-[824px]">
      <div className="absolute inset-0 z-10 flex w-[440px] flex-col justify-between gap-18 rounded-[36px] bg-white p-6 opacity-100 transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-0">
        <div
          style={{ backgroundColor: productImageBg }}
          className="flex min-h-87.25 items-center justify-center rounded-[36px]"
        >
          <Image
            src={productImage}
            alt={productTitle}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-6 px-3">
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

          <div className="flex flex-row gap-3">
            <button
              type="button"
              onClick={onGetStarted}
              className="cursor-pointer rounded-full bg-[#3D74E9] px-8 py-5 text-base font-medium leading-[100%] whitespace-nowrap text-white"
            >
              Lets get started
            </button>

            <button
              type="button"
              onClick={onShopNow}
              className="flex cursor-pointer items-center gap-2.5 rounded-full border border-[#0F1D3A] px-8 py-5 whitespace-nowrap"
            >
              <span className="text-base font-medium leading-[100%] text-[#0F1D3A]">
                Shop now
              </span>

              <NewArrowIcon fill="#0F1D3A" />
            </button>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundColor: hoverCardBg }}
        className="absolute inset-0 z-20 h-170.25 w-206 translate-x-4 overflow-hidden rounded-[36px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
      >
        <Image
          src={hoverImage}
          alt={hoverTitle}
          width={824}
          height={681}
          className="absolute bottom-0 right-0 z-0 h-full w-auto max-w-none object-contain object-right"
        />

        <div className="absolute inset-0 z-10 flex flex-col items-start justify-between p-10">
          <div
            style={{ backgroundColor: hoverBadgeBg }}
            className="rounded-full px-8 py-5 text-base font-medium text-white"
          >
            {hoverBadge}
          </div>

          <div className="flex flex-col gap-10">
            <h3 className="whitespace-pre-line text-5xl font-semibold text-white">
              {hoverTitle}
            </h3>

            <div className="flex flex-row gap-4">
              <button
                type="button"
                onClick={onHoverGetStarted}
                className="cursor-pointer whitespace-nowrap rounded-full bg-[#3D74E9] px-8 py-5 text-base font-medium leading-[100%] text-white"
              >
                Get started now
              </button>

              <button
                type="button"
                onClick={onHoverAction}
                className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full border border-white px-8 py-5"
              >
                <span className="text-base font-medium leading-[100%] text-white">
                  {hoverActionLabel}
                </span>

                <NewArrowIcon fill="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ExpandableTreatmentCard;
