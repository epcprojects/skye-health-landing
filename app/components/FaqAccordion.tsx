"use client";

import { ArrowIcon } from "@/public/icons";
import { Transition } from "@headlessui/react";
import { useState } from "react";
type FaqItem = {
  question: string;
  answer: string;
};

const FaqAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqItems: FaqItem[] = [
    {
      question: "Is this legal?",
      answer:
        "Yes. All treatments are prescribed by licensed providers and fulfilled by U.S. pharmacies.",
    },
    {
      question: "Do I need labs?",
      answer:
        "Yes. Hormones and many peptides require lab work to ensure safety and efficacy.",
    },
    {
      question: "Is there a membership?",
      answer: "No mandatory membership. Pay only for what you need.",
    },
    {
      question: "Is this discreet?",
      answer: "Absolutely. All shipments are discreet and confidential.",
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="p-3 md:p-5 last:border-b-0 border-b border-b-gray-200"
          onClick={() => handleToggle(index)}
        >
          <div className="flex items-center justify-between cursor-pointer">
            <h4 className="text-base font-medium md:text-3xl text-black">
              {item.question}
            </h4>
            <span className="relative flex items-center justify-center rtl:pb-3 ltr:pt-0.5 shrink-0 w-5 h-5">
              <span className="absolute block">
                {activeIndex === index ? (
                  <span className="inline-flex -rotate-45">
                    <ArrowIcon width="18" height="18" fill="#1F252E" />
                  </span>
                ) : (
                  <span className="rotate-45 block">
                    <ArrowIcon width="18" height="18" fill="#1F252E" />
                  </span>
                )}
              </span>
            </span>
          </div>
          
          {activeIndex === index && (
  <Transition
    appear
    show
    enter="transition ease-out duration-300"
    enterFrom="opacity-0 -translate-y-1"
    enterTo="opacity-100 translate-y-0"
    leave="transition ease-in duration-200"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 -translate-y-1"
  >
    <p className="mt-2 text-base lg:text-xl text-neutral-700">
      {item.answer}
    </p>
  </Transition>
)}

          {/* {activeIndex === index && (
            <p className="mt-2 text-base lg:text-xl text-neutral-700">{item.answer}</p>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
