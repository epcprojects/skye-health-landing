"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/app/ui";
import { OutlineShoppingIcon } from "@/public/icons";
const navItems = [
  { label: "Weight Loss", href: "/weight-loss" },
  { label: "Hormones", href: "/hormones" },
  { label: "Peptides", href: "/peptides" },
  { label: "Optimize Everything", href: "/optimize-everything" },
  { label: "Who We Are", href: "/who-we-are" },
];
const HeaderLatest = () => {
  return (
    <header className="flex flex-col w-full">
      <div className="bg-[#0F1D3A] py-4">
        <p className="text-white text-sm text-center">
          Early Access Friends & Family with free month of Healthcare
        </p>
      </div>
      <div className="bg-white py-5  px-8 flex flex-row items-center w-full justify-between">
        <Image src={images.landingpageimages.NewSkyLogo} alt={"Sky Health"} />
        <div className="flex flex-row gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#0F1D3A] text-base font-light"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-row gap-2">
               <button onClick={()=>{""}} className="bg-[#3D74E9] py-4 px-6 rounded-full text-sm font-medium text-white">
                Get started
               </button>
               <button onClick={()=>{""}} className="w-12.25 h-12.25 bg-[#0F1D3A] rounded-full flex items-center justify-center">
                      <OutlineShoppingIcon/>
               </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderLatest;
