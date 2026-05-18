import Footer from "@/app/components/layouts/Footer";
import Header from "@/app/components/layouts/Header";
import React, { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const menuItems = [
  // {
  //   label: "Treatments",
  //   href: "/treatments",
  // },
  { label: "Peptides", href: "/peptides" },
  {
    label: "Hormones",
    href: "/hormones",
  },
  {
    label: "Vitamins",
    href: "/vitamins",
  },
  {
    label: "How it Works",
    href: "/how-it-works",
  },
  {
    label: "Products",
    href: "/products",
  },
  // {
  //   label: "About",
  //   href: "/about",
  // },
];

export default function LandingLayout({ children }: MainLayoutProps) {
  return (
    <div className="">
      <div className="fixed  z-50 w-full">
        {/* <HeaderNew menuItems={menuItems}/> */}
        {/* <Header menuItems={menuItems} /> */}
        <Header />
      </div>
      {children}
      {/* <Footer menuItems={menuItems} /> */}
      <Footer />
    </div>
  );
}
