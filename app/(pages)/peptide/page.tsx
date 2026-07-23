import React from "react";
import Image from "next/image";
import { images } from "@/app/ui";
const page = () => {
  return (
    <section className="bg-[#F5F8FE] flex items-center justify-center  xl:pt-34">
      <div className="max-w-132.5 flex flex-col items-center justify-center gap-4 xl:gap-9 px-4 xl:px-0 py-8 xl:py-21.5">
        <Image src={images.innerImages.ComingSoonImage} alt={"coming soon"} />
        <div className="flex flex-col items-center gap-3">
            <p className="text-3xl xl:text-[44px] font-semibold text-[#171717]">Coming Soon</p>
            <p className="text-base xl:text-lg text-[#525252] text-center">We&apos;re preparing something better for you. Stay connected and be the first to experience it when it launches.</p>
        </div>
      </div>
    </section>
  );
};

export default page;
