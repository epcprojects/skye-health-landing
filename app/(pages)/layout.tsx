import React, { ReactNode } from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import HeaderLatest from "../components/layout/HeaderLatest";
import FooterLatest from "../components/layout/FooterLatest";

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
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 xl:fixed  z-50 w-full">
        {/* <HeaderNew menuItems={menuItems}/> */}
        {/* <Header menuItems={menuItems} /> */}
        {/* <Header /> */}
        <HeaderLatest/>
      </div>
     <div className="flex-1"> {children}</div>
      {/* <Footer menuItems={menuItems} /> */}
      {/* <Footer /> */}
      <FooterLatest/>
    </div>
  );
}
