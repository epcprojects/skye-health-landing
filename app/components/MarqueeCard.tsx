"use client";

import Marquee from "react-fast-marquee";
import { Images } from "../images";
import Image from "next/image";

const PRODUCTS = [
  { name: "U.S.-Based Pharmacies", image: Images.landingPage.Frame1 },
  { name: "Clinically Tested Compounds", image: Images.landingPage.Frame2 },
  { name: "Discreet Delivery", image: Images.landingPage.Frame3 },
  { name: "No Membership Required", image: Images.landingPage.Frame4 },
];

export default function MarqueeCard() {
  return (
    <section className="py-4 flex items-center gap-3 z-10">
      <Marquee >
        <div className="flex items-center">
          {PRODUCTS.map((item, index) => (
            <Image
              key={index}
              className="me-5"
              alt={item.name}
              src={item.image}
            />
          ))}
        </div>
      </Marquee>
    </section>
  );
}
