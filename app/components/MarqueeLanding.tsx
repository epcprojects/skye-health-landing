"use client";

import Marquee from "react-fast-marquee";
import { Images } from "../images";
import Image from "next/image";

const PRODUCTS = [
  {
    name: "Board-Certified Medical Providers",
    image: Images.landingPage.Card,
  },
  { name: "U.S.-Based Pharmacies", image: Images.landingPage.USAPharma },
  { name: "Clinically Tested Compounds", image: Images.landingPage.Clinically },
  { name: "Discreet Delivery", image: Images.landingPage.Delivery },
  { name: "No Membership Required", image: Images.landingPage.License },
];

export default function MarqueeLanding() {
  return (
    <section className="py-3 lg:py-4 flex items-center gap-3 z-10">
      <h2 className="text-neutral-800 text-sm lg:text-base border-e border-gray-200 font-semibold whitespace-nowrap px-4 ">
        Why Paramount?
      </h2>
      <Marquee>
        <div className="flex items-center">
          {PRODUCTS.map((item) => (
            <div key={item.name} className="flex me-6 items-center gap-2">
              <Image alt={item.name} src={item.image} />
              <h2 className="text-neutral-600 font-medium text-sm">
                {item.name}
              </h2>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
