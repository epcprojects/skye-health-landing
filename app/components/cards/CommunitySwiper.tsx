"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { images } from "@/app/ui";

import "swiper/css";

const communityImages = [
  images.landingpageimages.CommunityImageOne,

    images.landingpageimages.CommunityImageSix,
  images.landingpageimages.CommunityImageThree,
  images.landingpageimages.CommunityImageFour,
  images.landingpageimages.CommunityImageFive,
images.landingpageimages.CommunityImageTwo,
];

const CommunitySwiper = () => {
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        loop
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        allowTouchMove={false}
        slidesPerView="auto"
        spaceBetween={0}
        className="community-swiper"
      >
        {[...communityImages, ...communityImages].map((image, index) => (
          <SwiperSlide
            key={index}
            className="!w-[280px] md:!w-[380px] lg:!w-[480px]"
          >
            <Image
              src={image}
              alt="Community"
              className="h-auto w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CommunitySwiper;
