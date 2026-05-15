import React from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowRightIcon } from "@/public/icons";
import Link from "next/link";
type CategoryCardProps = {
  title: React.ReactNode;
  // image: StaticImageData | string;
  className?: string;
  imageClassName?: string;
  bgClassName: string;
  href: string;
};

const CategoryCard = ({
  title,
  // image,
  className = "",
  bgClassName,
  imageClassName = "bottom-0 ",
  href,
}: CategoryCardProps) => {
  return (
    <Link
      href={href}
      className={`relative bg-cover bg-center bg-no-repeat ${bgClassName} h-48 md:h-74 overflow-hidden rounded-xl   justify-between bg-linear-to-b from-[#FAFAFA] to-[#E9EAEB] flex gap-11.5 pt-7 px-6.5  cursor-pointer group ${className}`}
    >
      <div className="flex-1 justify-between flex flex-col pb-5 relative z-20">
        <div className="z-10 lg:max-w-77.5 ">
          <p className=" lg:max-w-56 text-xl white- lg:text-2xl font-medium leading-[130%] text-black">
            {title}
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="flex h-8 w-8 cursor-pointer lg:h-10 lg:w-10 items-center justify-center rounded-full border border-neutral-100 bg-white text-black transition-colors group-hover:bg-secondary group-hover:text-white"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      {/* <div
        className={`${imageClassName} absolute end-4 flex justify-end md:w-auto w-24 `}
      >
        <Image
          src={image}
          alt={"categories"}
          className={`object-cover top-0  z-0`}
        />
      </div> */}
    </Link>
  );
};

export default CategoryCard;
