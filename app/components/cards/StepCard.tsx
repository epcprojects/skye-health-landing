"use client"
import { useIsMobile } from "@/app/hooks/useIsMobile";
import React from "react";
type IconProps = {
  width?: string;
  height?: string;
};
type StepCardProps = {
  Icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
};

const StepCard = ({ Icon, title, description }: StepCardProps) => {
  const isMobile = useIsMobile();
  return (
    <div className="lg:py-6 lg:px-7.5 px-4 py-4 bg-[#F7F9F9] rounded-[20px]">
      <div className="flex flex-col gap-6 lg:gap-14.75">
        <Icon width={isMobile?"50":"100"} height={isMobile?"50":"100"}/>

        <div className="flex flex-col gap-1.5">
          <p className="text-2xl lg:text-[33px] font-bold text-black">{title}</p>
          <p className="text-lg lg:text-[22px] text-neutral-800">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
