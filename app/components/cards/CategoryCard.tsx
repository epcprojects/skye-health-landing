import Image from "next/image";
import { images } from "@/app/ui";
import React from "react";

type CategoryCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const CategoryCard = ({ icon, title, description }: CategoryCardProps) => {
  return (
    <div className="lg:py-6 py-4 px-4  lg:px-7.5 bg-white rounded-[20px] gap-15 overflow-hidden flex flex-col justify-between relative shadow-[0_14px_54px_0_rgb(0_0_0/12%)]">
      <Image
        src={images.innerImages.CardImage}
        alt={"card image"}
        className="absolute top-0 right-0"
      />

      <div className="flex flex-col gap-4">
        {icon}

        <p className="text-2xl lg:text-[32px] font-semibold text-black leading-[140%]">
          {title}
        </p>
      </div>

      <p className="text-lg lg:text-xl text-neutral-800 leading-[160%]">{description}</p>
    </div>
  );
};

export default CategoryCard;
