"use client";

import React, { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { ArrowRightIcon } from "@/public/icons";
import WellnessCard from "./WellnessCard";
import { WellnessCardId, wellnessCards } from "@/app/constants/constants";

import "swiper/css";

const WellnessCarousel = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
    performance: () => {
      console.log("Better Skin clicked");
    },
    recovery: () => {
      console.log("Better Skin clicked");
    },
    weightmanagement: () => {
      console.log("Better Skin clicked");
    },
  };

  const updateSwiperState = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    setProgress(swiper.progress * 100);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="pl-4 lg:pl-8 2xl:pl-[calc((100vw-1440px)/2+32px)]">
        <Swiper
          modules={[Mousewheel]}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.7,
            thresholdDelta: 5,
            thresholdTime: 300,
            releaseOnEdges: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateSwiperState(swiper);
          }}
          onSlideChange={(swiper) => {
            updateSwiperState(swiper);
          }}
          onProgress={(swiper) => {
            updateSwiperState(swiper);
          }}
          slidesPerView="auto"
          grabCursor={true}
          simulateTouch={true}
          allowTouchMove={true}
          spaceBetween={12}
          className="!overflow-visible "
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
            disabled={isBeginning}
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
            disabled={isEnd}
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
