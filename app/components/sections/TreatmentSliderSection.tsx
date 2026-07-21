"use client";

import { useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { NewArrowIcon } from "@/public/icons";
import FeaturedTreatmentCard from "../cards/FeaturedTreatmentCard";
import TreatmentSliderCard from "../cards/TreatmentSliderCard";

import "swiper/css";

export interface TreatmentSliderItem {
  id: number;

  productImage: StaticImageData | string;
  productTitle: string;
  productDescription: string;
  productPrice: string;
  productImageBg: string;

  hoverImage: StaticImageData | string;
  hoverBadge: string;
  hoverTitle: string;
  hoverActionLabel: string;
  hoverCardBg: string;
  hoverBadgeBg: string;

  onGetStarted: () => void;
  onShopNow: () => void;
  onHoverGetStarted: () => void;
  onHoverAction: () => void;
}

interface TreatmentSliderSectionProps {
  hoverTreatmentCards: TreatmentSliderItem[];
}

const TreatmentSliderSection = ({
  hoverTreatmentCards,
}: TreatmentSliderSectionProps) => {
  const cardsSwiperRef = useRef<SwiperType | null>(null);
  const [activeCardSlide, setActiveCardSlide] = useState(0);
  const [isCardsEnd, setIsCardsEnd] = useState(false);

  const featuredTreatmentCard = hoverTreatmentCards[0];
  const standardTreatmentCards = hoverTreatmentCards.slice(1);

  const updateCardsSwiperState = (swiper: SwiperType) => {
    setActiveCardSlide(swiper.activeIndex);
    setIsCardsEnd(swiper.isEnd);
  };

  const totalCardDots = Math.ceil(hoverTreatmentCards.length / 2);

  const activeCardDot = isCardsEnd
    ? totalCardDots - 1
    : Math.min(Math.floor(activeCardSlide / 2), totalCardDots - 1);

  if (!featuredTreatmentCard) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6 xl:gap-13 overflow-hidden bg-[#F5F8FE] pb-6 xl:pb-27">
        <div className="w-full px-4 xl:px-8 2xl:px-83 flex flex-col gap-4">
          <div className="block xl:hidden">
            <FeaturedTreatmentCard
              image={featuredTreatmentCard.hoverImage}
              badge={featuredTreatmentCard.hoverBadge}
              title={featuredTreatmentCard.hoverTitle}
              actionLabel={featuredTreatmentCard.hoverActionLabel}
              backgroundColor={featuredTreatmentCard.hoverCardBg}
              badgeBackgroundColor={featuredTreatmentCard.hoverBadgeBg}
              onGetStarted={featuredTreatmentCard.onHoverGetStarted}
              onAction={featuredTreatmentCard.onHoverAction}
            />
          </div>
          <Swiper
            slidesPerView="auto"
            modules={[Mousewheel]}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 0.7,
              thresholdDelta: 5,
              thresholdTime: 300,
              releaseOnEdges: true,
            }}
            spaceBetween={24}
            loop={false}
            rewind={false}
            grabCursor
            simulateTouch
            allowTouchMove
            observer
            observeParents
            watchOverflow
            onSwiper={(swiper) => {
              cardsSwiperRef.current = swiper;
              updateCardsSwiperState(swiper);
            }}
            onSlideChange={updateCardsSwiperState}
            onReachBeginning={updateCardsSwiperState}
            onReachEnd={updateCardsSwiperState}
            onFromEdge={updateCardsSwiperState}
            className="w-full h-full overflow-visible! [&_.swiper-wrapper]:items-stretch"
          >
            <SwiperSlide className="xl:w-206! w-auto h-auto! xl:block! hidden!">
              <FeaturedTreatmentCard
                image={featuredTreatmentCard.hoverImage}
                badge={featuredTreatmentCard.hoverBadge}
                title={featuredTreatmentCard.hoverTitle}
                actionLabel={featuredTreatmentCard.hoverActionLabel}
                backgroundColor={featuredTreatmentCard.hoverCardBg}
                badgeBackgroundColor={featuredTreatmentCard.hoverBadgeBg}
                onGetStarted={featuredTreatmentCard.onHoverGetStarted}
                onAction={featuredTreatmentCard.onHoverAction}
              />
            </SwiperSlide>

            {standardTreatmentCards.map((card) => (
              <SwiperSlide key={card.id} className="xl:w-110! h-auto!">
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
              aria-label="Previous card"
              disabled={activeCardSlide === 0}
              onClick={() => cardsSwiperRef.current?.slidePrev()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="inline-flex rotate-180">
                <NewArrowIcon fill="#0F1D3A" />
              </span>
            </button>

            <div className="hidden items-center gap-2 rounded-full bg-white p-4 xl:flex">
              {Array.from({ length: totalCardDots }).map((_, index) => {
                const isLastDot = index === totalCardDots - 1;

                return (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to card group ${index + 1}`}
                    aria-current={activeCardDot === index ? "true" : undefined}
                    onClick={() => {
                      if (isLastDot) {
                        cardsSwiperRef.current?.slideTo(
                          hoverTreatmentCards.length - 1,
                        );
                      } else {
                        cardsSwiperRef.current?.slideTo(index * 2);
                      }
                    }}
                    className={`h-2 w-2 cursor-pointer rounded-full transition-colors duration-300 ${
                      activeCardDot === index ? "bg-[#0F1D3A]" : "bg-[#CEDCF9]"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next card"
              disabled={activeCardSlide === hoverTreatmentCards.length - 1}
              onClick={() => cardsSwiperRef.current?.slideNext()}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NewArrowIcon fill="white" />
            </button>
          </div>
        </div>
      </section>
  );
};

export default TreatmentSliderSection;