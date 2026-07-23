// "use client";

// import Image, { type StaticImageData } from "next/image";
// import { NewPlusIcon } from "@/public/icons";

// interface SkyDifferenceCardProps {
//   title: string;
//   description: string;
//   image: StaticImageData;

//   hoverTitle: string;
//   hoverDescription: string;
//   hoverImage: StaticImageData;
//   hoverBackgroundImage?: string;

//   onClick: () => void;
// }

// const SkyDifferenceCard = ({
//   title,
//   description,
//   image,
//   hoverTitle,
//   hoverDescription,
//   hoverImage,
//   hoverBackgroundImage = "/images/SkyDifferenceBg.png",
//   onClick,
// }: SkyDifferenceCardProps) => {
//   return (
//     <article className="group relative  w-full max-w-89.25 overflow-hidden rounded-[18px] h-full xl:rounded-[28px]">
//       {/* Normal card */}
//       <div className="relative flex h-full flex-col justify-between  gap-10 bg-white opacity-100 transition-all duration-500 group-hover:pointer-events-none group-hover:scale-95 group-hover:opacity-0">
//         <div className="flex flex-col gap-3 px-4 pt-5 xl:gap-4 xl:p-10">
//           <h3 className="text-xl font-semibold leading-[100%] text-[#0F1D3A] xl:text-[32px]">
//             {title}
//           </h3>

//           <p className="text-sm text-[#1F3A75] xl:text-base">
//             {description}
//           </p>
//         </div>

//         <Image
//           src={image}
//           alt={title}
//           className=" h-auto w-full rounded-b-[18px] object-cover mt-auto xl:rounded-b-[28px]"
//         />

//         <button
//           type="button"
//           onClick={onClick}
//           aria-label={`Learn more about ${title}`}
//           className="absolute right-4 bottom-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] xl:right-6 xl:bottom-6 xl:h-12 xl:w-12"
//         >
//           <NewPlusIcon fill="white" />
//         </button>
//       </div>

//       {/* Hover card */}
//       <div
//         style={{
//           backgroundImage: `url("${hoverBackgroundImage}")`,
//         }}
//         className="pointer-events-none absolute inset-0 z-10 flex flex-col bg-cover bg-center bg-no-repeat opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:opacity-100"
//       >
//         <div className="flex flex-col gap-3 p-6 xl:gap-4 xl:p-12">
//           <h3 className="text-xl font-semibold leading-[100%] text-white xl:text-[32px]">
//             {hoverTitle}
//           </h3>

//           <p className="text-sm text-[#F5F8FE] xl:text-base">
//             {hoverDescription}
//           </p>
//         </div>

//         <Image
//           src={hoverImage}
//           alt={hoverTitle}
//           className="mt-auto h-auto w-full object-cover"
//         />

//         <button
//           type="button"
//           onClick={onClick}
//           aria-label={`Learn more about ${hoverTitle}`}
//           className="absolute right-4 bottom-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] xl:right-6 xl:bottom-6 xl:h-12 xl:w-12"
//         >
//           <NewPlusIcon fill="white" />
//         </button>
//       </div>
//     </article>
//   );
// };

// export default SkyDifferenceCard;



"use client";

import Image, { type StaticImageData } from "next/image";
import { NewPlusIcon } from "@/public/icons";

interface SkyDifferenceCardProps {
  title: string;
  description: string;
  image: StaticImageData | string;
  hoverBackgroundImage?: string;
  onClick: () => void;
}

const SkyDifferenceCard = ({
  title,
  description,
  image,
  hoverBackgroundImage = "/images/SkyDifferenceBg.png",
  onClick,
}: SkyDifferenceCardProps) => {
  return (
    <article className="group relative flex h-full w-full max-w-89.25 overflow-hidden rounded-[18px] bg-white xl:rounded-[28px]">
      <div
        style={{
          backgroundImage: `url("${hoverBackgroundImage}")`,
        }}
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-between">

        <div className="flex origin-top-left flex-col gap-3 px-4 pt-5 transition-transform duration-500 group-hover:scale-[1.02] xl:gap-4 xl:p-10">
          <h3 className="text-xl font-semibold leading-[100%] text-[#0F1D3A] transition-colors duration-500 group-hover:text-white xl:text-[32px]">
            {title}
          </h3>

          <p className="text-sm text-[#1F3A75] transition-colors duration-500 group-hover:text-[#F5F8FE] xl:text-base">
            {description}
          </p>
        </div>

        <Image
          src={image}
          alt={title}
          className=" h-auto w-full rounded-b-[18px] object-cover xl:rounded-b-[28px]"
        />

        <button
          type="button"
          onClick={onClick}
          aria-label={`Learn more about ${title}`}
          className="absolute right-4 bottom-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0F1D3A] transition-transform duration-500  group-hover:scale-105 xl:right-6 xl:bottom-6 xl:h-12 xl:w-12"
        >
          <NewPlusIcon fill="white" />
        </button>
      </div>
    </article>
  );
};

export default SkyDifferenceCard;