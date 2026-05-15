import React, { ReactNode } from "react";
import { Header } from "../components";
import Footer from "../components/layout/Footer";
import HeaderNew from "../components/layout/headernew";
import FooterNew from "../components/layout/FooterNew";

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

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="">
      <div className="fixed  z-50 w-full">
        <HeaderNew menuItems={menuItems}/>
        {/* <Header menuItems={menuItems} /> */}
      </div>
      {children}
      <FooterNew menuItems={menuItems}/>
      {/* <Footer menuItems={menuItems} /> */}
    </div>
  );
}
