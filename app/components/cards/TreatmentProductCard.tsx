"use client";

import Image, { type StaticImageData } from "next/image";

interface TreatmentProductCardProps {
  title: string;
  image: StaticImageData | string;
  description: string;
  price: string;
  inStock?: boolean;
  newIn?: boolean;
  soldOut?: boolean;
  onLearnMore: () => void;
  onGetStarted: () => void;
}

interface StatusBadgeProps {
  label: string;
  backgroundColor: string;
  textColor: string;
  dotColor: string;
}

const StatusBadge = ({
  label,
  backgroundColor,
  textColor,
  dotColor,
}: StatusBadgeProps) => {
  return (
    <div
      style={{ backgroundColor }}
      className="py-1 px-3 flex items-center gap-1.5 rounded-full"
    >
      <span
        style={{ backgroundColor: dotColor }}
        className="w-1 h-1 shrink-0 rounded-full"
      />

      <span
        style={{ color: textColor }}
        className="text-[10px] font-medium"
      >
        {label}
      </span>
    </div>
  );
};

const TreatmentProductCard = ({
  title,
  image,
  description,
  price,
  inStock = false,
  newIn = false,
  soldOut = false,
  onLearnMore,
  onGetStarted,
}: TreatmentProductCardProps) => {
  return (
    <article className="py-6 px-4 bg-white rounded-4xl flex flex-col gap-2.5">
      <div className="min-h-6 flex flex-row flex-wrap gap-2.5">
        {inStock && !soldOut && (
          <StatusBadge
            label="In stock"
            backgroundColor="#E2EAFC"
            textColor="#3D74E9"
            dotColor="#3D74E9"
          />
        )}

        {newIn && (
          <StatusBadge
            label="New In"
            backgroundColor="#DCEDE9"
            textColor="#0C5253"
            dotColor="#0C5253"
          />
        )}

        {soldOut && (
          <StatusBadge
            label="Sold out"
            backgroundColor="#ECEDEE"
            textColor="#22252B"
            dotColor="#22252B"
          />
        )}
      </div>

      <div className="relative w-full aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-base font-medium leading-7 text-[#0F1D3A]">
          {title}
        </h3>

        <p className="text-sm font-light leading-7 text-[#0F1D3A] text-center">
          {description}
        </p>

        <p className="text-sm font-medium leading-7 text-[#0F1D3A]">
          {price}
        </p>
      </div>

      <div className="flex flex-col gap-1 items-center">
        <button
          type="button"
          disabled={soldOut}
          onClick={onGetStarted}
          className={`py-4 px-6 rounded-full text-sm font-medium text-white transition-colors ${
            soldOut
              ? "bg-[#9CA3AF] cursor-not-allowed"
              : "bg-[#0F1D3A] cursor-pointer hover:bg-[#1B315D]"
          }`}
        >
          {soldOut ? "Sold out" : "Get started"}
        </button>

        <button
          type="button"
          onClick={onLearnMore}
          className="py-4 px-6 bg-white cursor-pointer"
        >
          <span className="text-sm font-medium underline underline-offset-2 text-[#0F1D3A]">
            Learn more
          </span>
        </button>
      </div>
    </article>
  );
};

export default TreatmentProductCard;