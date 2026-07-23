import { Images } from "@/app/images";
import { ArrowIcon } from "@/public/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="bg-primary-light p-4 min-h-dvh flex items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col gap-9">
        <Link href={"/"} className="relative">
          <Image alt="" src={Images.layout.logo} />
        </Link>

        <div className="space-y-7.5 ">
          <div className="bg-linear-[245deg] relative overflow-hidden rounded-2xl sm:rounded-4xl from-[#86B7EF]  to-[#DCF0F7]">
            <div className="noise absolute! inset-0 w-full " />
            <div className="container  items-center gap-6 lg:gap-5 mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-7xl px-4 xl:px-16 relative">
              <div className="space-y-6">
                <div className="space-y-4 flex flex-col lg:flex-none items-center lg:items-start">
                  <div className="space-y-2">
                    <h1 className="text-neutral-900 text-4xl  lg:text-start text-center  leading-[130%] tracking-tighter font-extrabold">
                      Modern Medicine. Personalized. Delivered.
                    </h1>
                    <h2 className=" text-lg lg:text-2xl   lg:text-start text-center  text-neutral-800">
                      Peak performance isn&apos;t accidental. It&apos;s
                      engineered.
                    </h2>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  alt=""
                  src={Images.landingPage.heroMockup}
                  className="z-20 relative"
                />
                <Image
                  alt=""
                  src={Images.landingPage.heroBg}
                  className="absolute bottom-0 right-0 z-10 animate-spin-dead-slow opacity-40"
                />
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end">
            <Link
              href="/"
              className="rounded-full  w-fit bg-secondary hover:bg-secondary-dark transition-colors duration-300 ps-5 p-2 sm:p-3 group text-white font-medium text-base flex items-center gap-3"
            >
              Continue
              <span className="w-7.5 h-7.5 text-secondary -rotate-45 group-hover:rotate-0 transition-all duration-500 rounded-full bg-white flex items-center justify-center">
                <ArrowIcon fill="currentColor" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
