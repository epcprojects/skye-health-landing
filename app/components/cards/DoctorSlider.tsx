"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRightIcon } from "@/public/icons";
import { doctorSlides } from "@/app/constants/constants";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

const DoctorSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const activeSlide = doctorSlides[activeIndex];

  const updateSwiperState = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    setProgress(swiper.progress * 100);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="pt-8 2xl:pt-24 container max-w-360 mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-2">
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
          slidesPerView={1}
          spaceBetween={0}
          className="w-full h-full"
        >
          {doctorSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                draggable={false}
                className=" select-none"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex w-full flex-col justify-between  gap-8 lg:gap-14.5  bg-[#F7F9F9] p-4 lg:p-15">
          <div className="flex flex-col gap-4 lg:gap-14.5">
            <p className="text-2xl font-semibold text-black md:text-xl lg:text-4xl">
              {activeSlide.heading}
            </p>

            <div className="flex flex-col gap-2 lg:gap-4.25">
              <p className="text-base font-bold text-primary-light md:text-xl lg:text-2xl">
                {activeSlide.name}
              </p>

              <p className="text-lg text-neutral-800 md:text-xl">
                {activeSlide.description}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-center lg:justify-start gap-3.75">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className="flex h-12.5 w-12.5 cursor-pointer rotate-180 items-center justify-center rounded-full bg-white disabled:opacity-40"
            >
              <ArrowRightIcon fill="black" />
            </button>

            <div className="flex h-12.5 w-26.5 items-center rounded-full bg-white px-4 py-1">
              <div className="h-1 w-full overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full rounded-full bg-black transition-all duration-300"
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
              className="flex h-12.5 w-12.5 cursor-pointer items-center justify-center rounded-full bg-white disabled:opacity-40"
            >
              <ArrowRightIcon fill="black" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorSwiper;
