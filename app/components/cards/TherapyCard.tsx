import React from "react";
import Image, { StaticImageData } from "next/image";
import { KeyRightIcon } from "@/public/icons";

type TherapyCardProps = {
  image: StaticImageData;
  label: string;
  onClick?: () => void;
};

const TherapyCard = ({ image, label, onClick }: TherapyCardProps) => {
  return (
    <div
      onClick={onClick}
      className="rounded-xl bg-white/10  backdrop-blur-2xl flex flex-row "
    >
      <div className="bg-white p-4 rounded-xl w-full">
        <Image src={image} alt={label} />
      </div>

      <div className="p-3 flex flex-col justify-between w-full">
        <p className="text-xl font-medium text-white">{label}</p>

        <div className="w-8 h-8 flex items-center justify-center bg-white/10 self-end rounded-full">
          <KeyRightIcon />
        </div>
      </div>
    </div>
  );
};

export default TherapyCard;
