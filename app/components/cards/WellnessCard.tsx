// import React from "react";
// import Image, { StaticImageData } from "next/image";
// import ThemeButton from "../Button/ThemeButton";
// import { useIsMobile } from "@/app/hooks/useIsMobile";

// type WellnessCardProps = {
//   image: StaticImageData | string;
//   title: string;
//   description: string;
//   onClick: () => void;
// };

// const WellnessCard = ({
//   image,
//   title,
//   description,
//   onClick,
// }: WellnessCardProps) => {
//   const isMobile = useIsMobile();
//   return (
//     <div className="pt-10 flex flex-col gap-10 relative  px-4 lg:px-10 bg-black/21 rounded-[30px] h-100 md:h-150  lg:min-w-112.75 backdrop-blur-[20px] overflow-hidden">
//       <Image
//         src={image}
//         alt={title}
//         width={isMobile?250:451}
//         height={isMobile?250:600}
//         className="absolute bottom-0 lg:right-0 right-15 md:right-33 pointer-events-none select-none"
//       />

//       <div className="flex flex-col gap-5 relative z-10">
//         <div className="flex flex-col gap-3">
//           <p className="text-2xl lg:text-4xl text-white">{title}</p>

//           <p className="text-white/60 text-base  lg:text-lg line-clamp-2">
//             {description}
//           </p>
//         </div>

//         <div>
//           <ThemeButton
//             onClick={onClick}
//             variant="primaryblue"
//             label="Discover More"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WellnessCard;

import React from "react";
import Image, { StaticImageData } from "next/image";
import ThemeButton from "../Button/ThemeButton";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { images } from "@/app/ui";

type WellnessCardProps = {
  image: StaticImageData | string;
  title: string;
  description: string;
  onClick: () => void;
};

const WellnessCard = ({
  image,
  title,
  description,
  onClick,
}: WellnessCardProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="group pt-10  flex flex-col gap-10 relative px-4 lg:px-10 bg-black/21 rounded-[30px] h-100 md:h-150 lg:min-w-112.75 backdrop-blur-[20px] overflow-hidden ">
      <Image
        src={image}
        alt={title}
        width={isMobile ? 250 : 451}
        height={isMobile ? 250 : 600}
        className="absolute z-1 bottom-0 lg:right-0 right-15 md:right-33 pointer-events-none select-none transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <Image
        src={images.landingpageimages.BgGlowImage}
        alt="glow"
        className="absolute bottom-0 left-0 right-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex flex-col gap-5 relative z-10">
        <div className="flex flex-col gap-3">
          <p className="text-2xl lg:text-4xl text-white">{title}</p>

          <p className="text-white/60 text-base lg:text-lg line-clamp-2">
            {description}
          </p>
        </div>

        <div>
          <ThemeButton
            onClick={onClick}
            variant="primaryblue"
            label="Discover More"
          />
        </div>
      </div>
    </div>
  );
};

export default WellnessCard;
