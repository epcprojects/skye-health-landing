import { CartPopover, ProductQuestionnaire } from "@/app/components";
import { Images } from "@/app/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="pt-4 lg:pt-8 space-y-4 sm:space-y-9 px-4 lg:px-0 flex flex-col min-h-dvh pb-8 sm:pb-16 container mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href={"/"} className="relative ">
          <Image alt="" src={Images.layout.logo} />
        </Link>

        <CartPopover />
      </div>

      <ProductQuestionnaire />
      <div className="p-4 sm:p-6 w-full mt-auto mb-0 rounded-lg bg-neutral-100 space-y-1 sm:space-y-3">
        <h2 className="text-primary font-bold text-base sm:text-xl">
          Why we ask
        </h2>
        <p className="text-neutral-800 text-sm sm:text-base">
          The most common factor influencing weight gain is genetics. If close
          family members struggle with weight, you may be more likely to
          experience the same challenge.
        </p>

        <a
          href=""
          className="text-secondary hover:text-secondary-dark font-semibold text-sm sm:text-base hover:underline underline-offset-2 "
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default Page;
