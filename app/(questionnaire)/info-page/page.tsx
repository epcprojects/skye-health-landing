import { Images } from "@/app/images";
import { ArrowIcon } from "@/public/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="bg-primary-light min-h-dvh flex sm:items-center sm:justify-center">
      <div className="p-4 xl:p-0 max-w-4xl w-full flex flex-col gap-9">
        <Link href={"/"} className="relative">
          <Image alt="" src={Images.layout.logo} />
        </Link>

        <div className="space-y-4 sm:space-y-7.5">
          <div className="space-y-4 sm:space-y-9">
            <p className="text-lg sm:text-4xl text-neutral-900 font-normal">
              Factors such as age,{" "}
              <span className="font-semibold sm:py-0.5 rounded-lg sm:pb-1 px-2 bg-primary-light-active inline-flex">
                genetics, and stress
              </span>{" "}
              can impact metabolism and make managing weight more challenging.
              The good news? Prescription treatments can help target these
              underlying factors, helping you achieve noticeable weight loss
              results within 3 to 6 months.
            </p>

            <p className="text-lg sm:text-4xl text-neutral-900 font-normal">
              The good news?{" "}
              <span className="font-semibold sm:py-0.5 rounded-lg sm:pb-1 px-2 bg-primary-light-active inline-flex">
                Prescription treatments
              </span>{" "}
              can help target these underlying factors, helping you achieve
              noticeable weight loss results within 3 to 6 months.
            </p>
          </div>

          <div className="flex items-end justify-end">
            <Link
              href="/state-select"
              className="rounded-full  w-fit bg-secondary hover:bg-secondary-dark ps-5 p-2 sm:p-3 group text-white font-medium text-base flex items-center gap-3"
            >
              Get Started{" "}
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
