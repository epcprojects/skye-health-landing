"use client";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import React, { useState } from "react";
type IconProps = {
  width?: string;
  height?: string;
};
type FeatureCardProps = {
  Icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
  HoverIcon?: React.ComponentType<IconProps>;
};

const FeatureCard = ({
  Icon,
  title,
  description,
  HoverIcon,
}: FeatureCardProps) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const ActiveIcon = isHovered && HoverIcon ? HoverIcon : Icon;
  return (
    <div
      className="flex flex-col gap-4 lg:gap-10 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ActiveIcon width={isMobile ? "50" : "80"} height={isMobile ? "50" : "80"} />

      <div className="flex flex-col gap-1.5">
        <p className="text-xl lg:text-[28px] font-bold text-black">{title}</p>
        <p className="text-lg lg:text-[22px] text-neutral-800">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
