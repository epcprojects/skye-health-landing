"use client";

import React, { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRightIcon } from "@/public/icons";
import WellnessCard from "./WellnessCard";
import { WellnessCardId, wellnessCards } from "@/app/constants/constants";

import "swiper/css";

const WellnessCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardActions: Record<WellnessCardId, () => void> = {
    "healthy-aging": () => {
      console.log("Healthy Aging clicked");
    },
    "immune-support": () => {
      console.log("Immune Support clicked");
    },
    "better-skin": () => {
      console.log("Better Skin clicked");
    },
    "healthy-aging-2": () => {
      console.log("Healthy Aging 2 clicked");
    },
  };

  const progress = ((activeIndex + 1) / wellnessCards.length) * 100;

 return (
  <div className="flex flex-col gap-8">
    <div className="pl-4 lg:pl-8 2xl:pl-[calc((100vw-1440px)/2+32px)]">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        slidesPerView="auto"
        spaceBetween={12}
        className="!overflow-visible"
      >
        {wellnessCards.map((card) => (
          <SwiperSlide key={card.id} className="lg:w-112.75!">
            <WellnessCard
              image={card.image}
              title={card.title}
              description={card.description}
              onClick={cardActions[card.id]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <div className="container max-w-360 mx-auto px-8">
      <div className="flex flex-row items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={activeIndex === 0}
          className="w-12.5 h-12.5 bg-black/17 rounded-full items-center justify-center flex rotate-180 disabled:opacity-40"
        >
          <ArrowRightIcon />
        </button>

        <div className="h-12.5 w-26.5 rounded-full bg-black/17 flex items-center justify-center px-4">
          <div className="h-1 w-full rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-white transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={activeIndex === wellnessCards.length - 1}
          className="w-12.5 h-12.5 bg-black/17 rounded-full items-center justify-center flex disabled:opacity-40"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  </div>
);

};

export default WellnessCarousel;
