"use client";

import { ArrowRightIcon } from "@/public/icons";
import * as Accordion from "@radix-ui/react-accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const InnerFAQ: React.FC = () => {
  const faqItems: FaqItem[] = [
    {
      question: "Are your peptides third-party tested?",
      answer:
        "Our focus on manufacturing discipline, batch consistency, and independent verification.",
    },
    {
      question: "Are products tested?",
      answer:
        "Yes. Hormones and many peptides require lab work to ensure safety and efficacy.",
    },
    {
      question: "Who are products intended for?",
      answer: "No mandatory membership. Pay only for what you need.",
    },
    {
      question: "Do you provide protocols?",
      answer: "Absolutely. All shipments are discreet and confidential.",
    },
     {
      question: "How should products be stored?",
      answer: "Absolutely. All shipments are discreet and confidential.",
    },
     {
      question: "Can lab results be reviewed?",
      answer: "Absolutely. All shipments are discreet and confidential.",
    },
  ];

  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue="item-0"
      className="space-y-3 w-full"
    >
      {faqItems.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className=" group px-4 py-4  lg:py-7 lg:px-7 bg-[#F3F4F6] rounded-[20px] lg:rounded-4xl"
        >
          <Accordion.Trigger className="w-full  cursor-pointer">
            <Accordion.Header>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium md:text-2xl text-black">
                  {item.question}
                </h4>

                <span className="w-12 h-12 flex items-center justify-center -rotate-45 transition-transform duration-300 group-data-[state=open]:rotate-45 ">
                    <span className="">
                          <ArrowRightIcon  fill="#000000" />
                    </span>
                </span>
              </div>
            </Accordion.Header>

            <Accordion.Content className="faq-anim">
              <p className="mt-2 text-base text-start lg:text-xl text-neutral-700">
                {item.answer}
              </p>
            </Accordion.Content>
          </Accordion.Trigger>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default InnerFAQ;

