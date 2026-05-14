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
    <div className="py-6 px-7.5 bg-white rounded-[20px] min-h-131 flex flex-col justify-between relative">
      <Image
        src={images.innerImages.CardImage}
        alt={"card image"}
        className="absolute top-0 right-0"
      />

      <div className="flex flex-col gap-4">
        {icon}

        <p className="text-[32px] font-semibold text-black leading-[140%]">
          {title}
        </p>
      </div>

      <p className="text-xl text-neutral-800 leading-[160%]">{description}</p>
    </div>
  );
};

export default CategoryCard;
