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

interface PeptideTreatmentSliderSectionProps {
  peptideTreatmentCards: TreatmentSliderItem[];
}

const PeptideTreatmentSliderSection = ({
  peptideTreatmentCards,
}: PeptideTreatmentSliderSectionProps) => {
  const peptideCardsSwiperRef = useRef<SwiperType | null>(null);
  const [activePeptideCardSlide, setActivePeptideCardSlide] = useState(0);
  const [isPeptideBeginning, setIsPeptideBeginning] = useState(true);
  const [isPeptideEnd, setIsPeptideEnd] = useState(false);

  const featuredPeptideCard = peptideTreatmentCards[0];
  const standardPeptideCards = peptideTreatmentCards.slice(1);

  const updatePeptideSwiperState = (swiper: SwiperType) => {
    setActivePeptideCardSlide(swiper.activeIndex);
    setIsPeptideBeginning(swiper.isBeginning);
    setIsPeptideEnd(swiper.isEnd);
  };

  const totalPeptideDots = Math.ceil(peptideTreatmentCards.length / 2);

  const activePeptideDot = isPeptideEnd
    ? totalPeptideDots - 1
    : Math.min(
        Math.floor(activePeptideCardSlide / 2),
        totalPeptideDots - 1,
      );

  return (
    <section className="flex flex-col gap-6 overflow-hidden bg-[#F5F8FE] pb-6 xl:gap-13 xl:pb-27">
        <div className="flex w-full flex-col gap-4 px-4 xl:px-8 2xl:px-83">
          {/* Mobile featured card */}
          {featuredPeptideCard && (
            <div className="block xl:hidden">
              <FeaturedTreatmentCard
                image={featuredPeptideCard.hoverImage}
                badge={featuredPeptideCard.hoverBadge}
                title={featuredPeptideCard.hoverTitle}
                actionLabel={featuredPeptideCard.hoverActionLabel}
                backgroundColor={featuredPeptideCard.hoverCardBg}
                badgeBackgroundColor={featuredPeptideCard.hoverBadgeBg}
                onGetStarted={featuredPeptideCard.onHoverGetStarted}
                onAction={featuredPeptideCard.onHoverAction}
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
              peptideCardsSwiperRef.current = swiper;

              window.requestAnimationFrame(() => {
                swiper.update();
                updatePeptideSwiperState(swiper);
              });
            }}
            onSlideChange={updatePeptideSwiperState}
            onReachBeginning={updatePeptideSwiperState}
            onReachEnd={updatePeptideSwiperState}
            onFromEdge={updatePeptideSwiperState}
            className="h-full w-full overflow-visible! [&_.swiper-wrapper]:items-stretch"
          >
            {/* Desktop featured slide */}
            {featuredPeptideCard && (
              <SwiperSlide className="hidden! h-auto! w-auto xl:block! xl:w-206!">
                <FeaturedTreatmentCard
                  image={featuredPeptideCard.hoverImage}
                  badge={featuredPeptideCard.hoverBadge}
                  title={featuredPeptideCard.hoverTitle}
                  actionLabel={featuredPeptideCard.hoverActionLabel}
                  backgroundColor={featuredPeptideCard.hoverCardBg}
                  badgeBackgroundColor={featuredPeptideCard.hoverBadgeBg}
                  onGetStarted={featuredPeptideCard.onHoverGetStarted}
                  onAction={featuredPeptideCard.onHoverAction}
                />
              </SwiperSlide>
            )}

            {standardPeptideCards.map((card) => (
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
              aria-label="Previous peptide"
              disabled={isPeptideBeginning}
              onClick={() => {
                peptideCardsSwiperRef.current?.slidePrev();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex rotate-180">
                <NewArrowIcon fill="#0F1D3A" />
              </span>
            </button>

            <div className="hidden items-center gap-2 rounded-full bg-white p-4 xl:flex">
              {Array.from({ length: totalPeptideDots }).map((_, index) => {
                const isLastDot = index === totalPeptideDots - 1;

                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to peptide group ${index + 1}`}
                    aria-current={
                      activePeptideDot === index ? "true" : undefined
                    }
                    onClick={() => {
                      if (isLastDot) {
                        peptideCardsSwiperRef.current?.slideTo(
                          peptideTreatmentCards.length - 1,
                        );
                      } else {
                        peptideCardsSwiperRef.current?.slideTo(index * 2);
                      }
                    }}
                    className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                      activePeptideDot === index
                        ? "bg-[#0F1D3A]"
                        : "bg-[#CEDCF9]"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next peptide"
              disabled={isPeptideEnd}
              onClick={() => {
                peptideCardsSwiperRef.current?.slideNext();
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

export default PeptideTreatmentSliderSection;