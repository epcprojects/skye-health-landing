import React from "react";
import Image, { StaticImageData } from "next/image";
import ThemeButton from "../Button/ThemeButton";

type ProcessCardTheme = "primary" | "light";

type ProcessCardProps = {
  step: string;
  title: string;
  description: React.ReactNode;
  image: StaticImageData;
  imageAlt: string;
  theme: ProcessCardTheme;
  onClick: () => void;
};

const themeClasses: Record<
  ProcessCardTheme,
  {
    card: string;
    step: string;
    title: string;
    description: string;
    buttonVariant: "primaryblue" | "blackFilled";
  }
> = {
  primary: {
    card: "bg-primary",
    step: "text-white/7",
    title: "text-white",
    description: "text-white/70",
    buttonVariant: "primaryblue",
  },
  light: {
    card: "bg-lightblue",
    step: "text-black/5",
    title: "text-black",
    description: "text-gray-800",
    buttonVariant: "blackFilled",
  },
};

const ProcessCard = ({
  step,
  title,
  description,
  image,
  imageAlt,
  theme,
  onClick,
}: ProcessCardProps) => {
  const classes = themeClasses[theme];

  return (
    <div
      className={`pt-12.5 lg:pr-12.5 lg:pl-12.5 pl-4 pr-4  h-155 md:h-182.5 flex flex-col gap-10 rounded-[30px] relative ${classes.card}`}
    >
      <Image
        src={image}
        alt={imageAlt}
        className="absolute bottom-0 right-0"
      />

      <p
        className={`text-[261px] leading-[140%] font-semibold absolute -top-18 right-4 ${classes.step}`}
      >
        {step}
      </p>

      <div className="flex flex-col items-center gap-5.25">
        <div className="flex flex-col items-center gap-3">
          <p className={` text-2xl md:text-[40px] text-center lg:text-start font-bold ${classes.title}`}>
            {title}
          </p>

          <p className={`text-lg md:text-xl text-center ${classes.description}`}>
            {description}
          </p>
        </div>

        <div>
          <ThemeButton
            onClick={onClick}
            variant={classes.buttonVariant}
            size="lg"
            label="Discover More"
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessCard;
