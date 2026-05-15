import React from "react";

type MobileCardProps = {
  num: string;
  title: string;
  description: string;
  index: number;
};

const bgByIndex = (index: number) => {
  switch (index) {
    case 0:
      return "to-[#D0F2F8]";
    case 1:
      return "to-french-pass";
    case 2:
      return "to-linen";
    case 3:
      return "to-[#BBFFB2]";
    default:
      return "to-[#D0F2F8]";
  }
};

const MobileCard: React.FC<MobileCardProps> = ({
  num,
  title,
  description,
  index,
}) => {

  

  return (
    <div
      className={`relative p-6 sm:p-8 flex flex-col justify-between min-h-55
      rounded-3xl bg-radial from-white ${bgByIndex(index)} to-95%
      backdrop-blur-xl border border-black/5`}
    >
      <div className="noise absolute inset-0 w-full pointer-events-none" />

      <div className="text-6xl sm:text-[72px] font-extralight text-black">
        {num}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-black">
          {title}
        </h2>
        <p className="text-neutral-600 font-normal text-base sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MobileCard;
