"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NewArrowIcon } from "@/public/icons";
import FeaturedTreatmentCard from "../cards/FeaturedTreatmentCard";
import TreatmentSliderCard from "../cards/TreatmentSliderCard";
import type { TreatmentSliderItem } from "./TreatmentSliderSection";

import "swiper/css";

interface OptimizeTreatmentSliderSectionProps {
  OptimizeeverythingCards: TreatmentSliderItem[];
}

const OptimizeTreatmentSliderSection = ({
  OptimizeeverythingCards,
}: OptimizeTreatmentSliderSectionProps) => {
  const optimizeSwiperRef = useRef<SwiperType | null>(null);
  const [activeOptimizeSlide, setActiveOptimizeSlide] = useState(0);
  const [isOptimizeBeginning, setIsOptimizeBeginning] = useState(true);
  const [isOptimizeEnd, setIsOptimizeEnd] = useState(false);

  const featuredOptimizeCard = OptimizeeverythingCards[0];
  const standardOptimizeCards = OptimizeeverythingCards.slice(1);

  const updateOptimizeSwiperState = (swiper: SwiperType) => {
    setActiveOptimizeSlide(swiper.activeIndex);
    setIsOptimizeBeginning(swiper.isBeginning);
    setIsOptimizeEnd(swiper.isEnd);
  };

  const totalOptimizeDots = Math.ceil(OptimizeeverythingCards.length / 2);

  const activeOptimizeDot = isOptimizeEnd
    ? totalOptimizeDots - 1
    : Math.min(
        Math.floor(activeOptimizeSlide / 2),
        totalOptimizeDots - 1,
      );

  return (
    <section className="flex flex-col gap-6 overflow-hidden bg-[#F5F8FE] pb-6 xl:gap-13 xl:pb-27">
        <div className="flex w-full flex-col gap-4 px-4 xl:px-8 2xl:px-83">
          {/* Mobile featured card */}
          {featuredOptimizeCard && (
            <div className="block xl:hidden">
              <FeaturedTreatmentCard
                image={featuredOptimizeCard.hoverImage}
                badge={featuredOptimizeCard.hoverBadge}
                title={featuredOptimizeCard.hoverTitle}
                actionLabel={featuredOptimizeCard.hoverActionLabel}
                backgroundColor={featuredOptimizeCard.hoverCardBg}
                badgeBackgroundColor={featuredOptimizeCard.hoverBadgeBg}
                onGetStarted={featuredOptimizeCard.onHoverGetStarted}
                onAction={featuredOptimizeCard.onHoverAction}
              />
            </div>
          )}

          <Swiper
            slidesPerView="auto"
            spaceBetween={24}
            modules={[Mousewheel]}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.7,
              thresholdDelta: 5,
              thresholdTime: 300,
              releaseOnEdges: true,
            }}
            loop={false}
            rewind={false}
            speed={500}
            grabCursor
            simulateTouch
            allowTouchMove
            observer
            observeParents
            watchOverflow
            onSwiper={(swiper) => {
              optimizeSwiperRef.current = swiper;

              window.requestAnimationFrame(() => {
                swiper.update();
                updateOptimizeSwiperState(swiper);
              });
            }}
            onSlideChange={updateOptimizeSwiperState}
            onReachBeginning={updateOptimizeSwiperState}
            onReachEnd={updateOptimizeSwiperState}
            onFromEdge={updateOptimizeSwiperState}
            className="h-full w-full overflow-visible! [&_.swiper-wrapper]:items-stretch"
          >
            {/* Desktop featured slide */}
            {featuredOptimizeCard && (
              <SwiperSlide className="hidden! h-auto! w-auto xl:block! xl:w-206!">
                <FeaturedTreatmentCard
                  image={featuredOptimizeCard.hoverImage}
                  badge={featuredOptimizeCard.hoverBadge}
                  title={featuredOptimizeCard.hoverTitle}
                  actionLabel={featuredOptimizeCard.hoverActionLabel}
                  backgroundColor={featuredOptimizeCard.hoverCardBg}
                  badgeBackgroundColor={featuredOptimizeCard.hoverBadgeBg}
                  onGetStarted={featuredOptimizeCard.onHoverGetStarted}
                  onAction={featuredOptimizeCard.onHoverAction}
                />
              </SwiperSlide>
            )}

            {standardOptimizeCards.map((card) => (
              <SwiperSlide key={card.id} className="h-auto! w-auto xl:w-110!">
                <TreatmentSliderCard
                  productImage={card.productImage}
                  productTitle={card.productTitle}
                  productDescription={card.productDescription}
                  productPrice={card.productPrice}
                  productImageBg={card.productImageBg}
                  onGetStarted={card.onGetStarted}
                  onShopNow={card.onShopNow}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="self-center">
          <div className="flex flex-row items-center gap-4">
            <button
              type="button"
              aria-label="Previous optimization treatment"
              disabled={isOptimizeBeginning}
              onClick={() => {
                optimizeSwiperRef.current?.slidePrev();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex rotate-180">
                <NewArrowIcon fill="#0F1D3A" />
              </span>
            </button>

            <div className="hidden items-center gap-2 rounded-full bg-white p-4 xl:flex">
              {Array.from({ length: totalOptimizeDots }).map((_, index) => {
                const isLastDot = index === totalOptimizeDots - 1;

                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to optimization group ${index + 1}`}
                    aria-current={
                      activeOptimizeDot === index ? "true" : undefined
                    }
                    onClick={() => {
                      if (isLastDot) {
                        optimizeSwiperRef.current?.slideTo(
                          OptimizeeverythingCards.length - 1,
                        );
                      } else {
                        optimizeSwiperRef.current?.slideTo(index * 2);
                      }
                    }}
                    className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                      activeOptimizeDot === index
                        ? "bg-[#0F1D3A]"
                        : "bg-[#CEDCF9]"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next optimization treatment"
              disabled={isOptimizeEnd}
              onClick={() => {
                optimizeSwiperRef.current?.slideNext();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NewArrowIcon fill="white" />
            </button>
          </div>
        </div>
      </section>
  );
};

export default OptimizeTreatmentSliderSection;