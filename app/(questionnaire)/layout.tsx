import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Images } from "../images";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="">
      <div className="container max-w-7xl bg-red-500 w-full mx-auto flex items-center justify-start">
        <div className="fixed container bg-white  mx-auto max-w-7xl px-4 md:px-8 top-0 py-4 md:py-8 md:top-0 z-50 w-full ">
          <Link href={"/"} className="relative order-1 w-fit  lg:order-0">
            <Image alt="" src={Images.layout.logo} className="max-w-56" />
          </Link>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
