"use client";

import { useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NewArrowIcon } from "@/public/icons";
import SkyDifferenceCard from "../cards/SkyDifferenceCard";

import "swiper/css";

export interface SkyDifferenceItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
  hoverTitle: string;
  hoverDescription: string;
  hoverImage: StaticImageData;
  hoverBackgroundImage?: string;
  onClick: () => void;
}

interface SkyDifferenceSectionProps {
  differenceCards: SkyDifferenceItem[];
}

const SkyDifferenceSection = ({
  differenceCards,
}: SkyDifferenceSectionProps) => {
  const differenceSwiperRef = useRef<SwiperType | null>(null);
  const [activeDifferenceSlide, setActiveDifferenceSlide] = useState(0);
  const [isDifferenceBeginning, setIsDifferenceBeginning] = useState(true);
  const [isDifferenceEnd, setIsDifferenceEnd] = useState(false);

  const updateDifferenceSwiperState = (swiper: SwiperType) => {
    setActiveDifferenceSlide(swiper.activeIndex);
    setIsDifferenceBeginning(swiper.isBeginning);
    setIsDifferenceEnd(swiper.isEnd);
  };

  const totalDifferenceDots = Math.ceil(differenceCards.length / 2);

  const activeDifferenceDot = isDifferenceEnd
    ? totalDifferenceDots - 1
    : Math.min(
        Math.floor(activeDifferenceSlide / 2),
        totalDifferenceDots - 1,
      );

  return (
    <section className="flex flex-col gap-8 xl:gap-20 bg-[#F5F8FE] pt-6 xl:pt-40 ">
        <div className="container mx-auto flex max-w-7xl flex-col xl:flex-row xl:items-end justify-between xl:gap-0 gap-2 px-4 xl:px-8">
          <p className="text-2xl xl:text-[40px] font-medium text-[#22252B]">
            The Skye difference
          </p>
          <button
            type="button"
            className="flex flex-row items-center gap-2.5 pr-2.5 xl:pl-4"
          >
            <span className="text-base text-[#3D74E9]">Explore products</span>

            <span className="flex items-center justify-center rounded-full bg-[#3D74E9] py-1 xl:px-1.5 px-2 xl:px-3">
              <NewArrowIcon fill="white" />
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-6 overflow-hidden xl:gap-13">
          <div className="w-full px-4 xl:px-8 2xl:px-83">
            <Swiper
              slidesPerView="auto"
              spaceBetween={12}
              loop={false}
              rewind={false}
              modules={[Mousewheel]}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 0.7,
                thresholdDelta: 5,
                thresholdTime: 300,
                releaseOnEdges: true,
              }}
              grabCursor
              simulateTouch
              allowTouchMove
              observer
              observeParents
              watchOverflow
              onSwiper={(swiper) => {
                differenceSwiperRef.current = swiper;
                updateDifferenceSwiperState(swiper);
              }}
              onSlideChange={updateDifferenceSwiperState}
              onReachBeginning={updateDifferenceSwiperState}
              onReachEnd={updateDifferenceSwiperState}
              onFromEdge={updateDifferenceSwiperState}
              className="w-full overflow-visible! [&_.swiper-wrapper]:items-stretch"
            >
              {differenceCards.map((card) => (
                <SwiperSlide
                  key={card.id}
                  className="h-auto! w-[calc(100vw-32px)]! sm:w-89.25!"
                >
                  <div className="h-full">
                    <SkyDifferenceCard
                      title={card.title}
                      description={card.description}
                      image={card.image}
                      hoverTitle={card.hoverTitle}
                      hoverDescription={card.hoverDescription}
                      hoverImage={card.hoverImage}
                      hoverBackgroundImage={card.hoverBackgroundImage}
                      onClick={card.onClick}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="self-center">
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Previous difference card"
                disabled={isDifferenceBeginning}
                onClick={() => {
                  differenceSwiperRef.current?.slidePrev();
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span className="inline-flex rotate-180">
                  <NewArrowIcon fill="#0F1D3A" />
                </span>
              </button>

              <div className="hidden xl:flex items-center gap-2 rounded-full bg-white p-4">
                {Array.from({ length: totalDifferenceDots }).map((_, index) => {
                  const isLastDot = index === totalDifferenceDots - 1;

                  return (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to difference card group ${index + 1}`}
                      aria-current={
                        activeDifferenceDot === index ? "true" : undefined
                      }
                      onClick={() => {
                        if (isLastDot) {
                          differenceSwiperRef.current?.slideTo(
                            differenceCards.length - 1,
                          );
                        } else {
                          differenceSwiperRef.current?.slideTo(index * 2);
                        }
                      }}
                      className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                        activeDifferenceDot === index
                          ? "bg-[#0F1D3A]"
                          : "bg-[#CEDCF9]"
                      }`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                aria-label="Next difference card"
                disabled={isDifferenceEnd}
                onClick={() => {
                  differenceSwiperRef.current?.slideNext();
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <NewArrowIcon fill="white" />
              </button>
            </div>
          </div>
        </div>
      </section>
  );
};

export default SkyDifferenceSection;