/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import {
  CheckCircleIcon,
  ClockIcon,
  GiveStarIcon,
  SecurityCheckIcon2,
  UserGroup,
} from "@/public/icons";
import { Images } from "../images";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { useIsMobile } from "../hooks/useIsMobile";

export const whoWeForConfig = [
  {
    id: 1,
    icon: UserGroup,
    image: Images.landingPage.iconBg,
    title: "Who We’re For",
    description:
      "Paramount HealthRx isn’t for everyone. And that’s intentional.",
    sectionTitle: "Most traditional systems were built around:",
    items: [
      "Insurance complexity",
      "Physical clinics",
      "Administrative friction",
      "One-size-fits-all protocols",
    ],
    footerText: "That model wasn’t designed for modern, high-output lives.",
  },
  {
    id: 2,
    icon: ClockIcon,
    image: Images.landingPage.iconBg,
    title: "Built for the Long Term",
    description: "We’re not chasing trends. We’re building infrastructure.",
    sectionTitle: "Healthcare is moving toward:",
    items: [
      "Streamlined telehealth workflows",
      "Licensed provider oversight",
      "Discreet fulfillment",
      "Premium infrastructure",
    ],
    footerText:
      "Paramount HealthRx is built to operate inside that future — not react to it.",
  },
  {
    id: 3,
    icon: GiveStarIcon,
    image: Images.landingPage.iconBg,
    title: "Experience Matters",
    description:
      "Anyone can sell products. Very few build real infrastructure.",
    sectionTitle: "We obsess over the details most platforms ignore:",
    items: [
      "Clean onboarding flows",
      "Clear communication",
      "Reliable fulfillment",
      "Elevated design",
      "Consistent experience",
    ],
    footerText:
      "Because trust isn’t built through marketing. It’s built through execution.",
  },
  {
    id: 4,
    icon: SecurityCheckIcon2,
    image: Images.landingPage.iconBg,
    title: "Privacy by Design",
    description:
      "Health is personal. And modern users expect discretion. That’s why Paramount HealthRx was built with privacy in mind from day one — from secure onboarding to discreet delivery.",
    sectionTitle: "Healthcare is moving toward:",
    items: [
      "No public pharmacy counters.",
      "No unnecessary exposure.",
      "No friction around confidentiality.",
    ],
    footerText: "Just a clean, private experience.",
  },
];

export default function WhoWeForCard() {
  const isMobile = useIsMobile();
  return (
    <>
      {whoWeForConfig.map((card: any) => {
        const Icon = card.icon;

        return (
          <div
            key={card.id}
            className={`rounded-4xl flex flex-col relative space-y-6 md:space-y-12 justify-between p-5 md:p-8 bg-radial from-white ${card.id === 1 ? "to-[#D0F2F8]" : card.id === 2 ? "to-french-pass" : card.id === 3 ? "to-[#BBFFB2]" : "to-linen"} `}
          >
            <div className="noise absolute! inset-0 w-full" />

            {/* Icon */}
            <div className="flex items-center w-fit justify-center drop-shadow">
              <Image
                alt=""
                src={card.image}
                width={isMobile ? 60 : 80}
                height={isMobile ? 60 : 80}
              />
              <span className="absolute">
                <Icon />
              </span>
            </div>

            <div className="space-y-7">
              <div className="space-y-2.5">
                <h2 className="font-bold text-black text-2xl md:text-3xl">
                  {card.title}
                </h2>

                <p className="text-base md:text-lg text-neutral-600">
                  {card.description}
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="space-y-2">
                  <h2 className="text-base md:text-lg font-medium text-gray-800">
                    {card.sectionTitle}
                  </h2>

                  <ul className="space-y-2">
                    {card.items.map(
                      (
                        item:
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | ReactPortal
                          | Promise<
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactPortal
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | null
                              | undefined
                            >
                          | null
                          | undefined,
                        index: Key | null | undefined,
                      ) => (
                        <li
                          key={index}
                          className="flex gap-2 items-center text-neutral-600 text-base md:text-lg"
                        >
                          <CheckCircleIcon />
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <h2 className="text-base md:text-lg text-neutral-600">
                  {card.footerText}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
