"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRightIcon } from "@/public/icons";
import { doctorSlides } from "@/app/constants/constants";

import "swiper/css";

const DoctorSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = doctorSlides[activeIndex];
  const progress = ((activeIndex + 1) / doctorSlides.length) * 100;

  return (
    <section className="pt-8 2xl:pt-24">
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
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
                className="w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex w-full flex-col justify-between  gap-8 lg:gap-14.5 min-h-143.75 2xl:min-h-0 bg-[#F7F9F9] p-4 lg:p-30">
          <div className="flex flex-col gap-4 lg:gap-14.5">
            <p className="text-2xl font-semibold text-black md:text-3xl lg:text-5xl">
              {activeSlide.heading}
            </p>

            <div className="flex flex-col gap-4.25">
              <p className="text-base font-bold text-primarylight md:text-xl lg:text-2xl">
                {activeSlide.name}
              </p>

              <p className="text-xl text-neutral-800 md:text-2xl lg:text-[28px]">
                {activeSlide.description}
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-center lg:justify-start gap-3.75">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={activeIndex === 0}
              className="flex h-12.5 w-12.5 rotate-180 items-center justify-center rounded-full bg-white disabled:opacity-40"
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
              disabled={activeIndex === doctorSlides.length - 1}
              className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-white disabled:opacity-40"
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
