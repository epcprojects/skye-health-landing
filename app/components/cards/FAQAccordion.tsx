"use client";

import { ArrowRightIcon } from "@/public/icons";
import * as Accordion from "@radix-ui/react-accordion";

const faqs = [
  {
    question: "What is SKYE RESEARCH?",
    answer:
      "SKYE RESEARCH is a longevity-focused wellness platform offering access to clinical guidance and therapies.",
  },
  {
    question: "Is this a supplement or wellness platform?",
    answer:
      "It is a wellness platform, not just a supplement product.",
  },
  {
    question: "How does the process work?",
    answer:
      "You sign up, receive guidance, and get access to consultation-based recommendations.",
  },
  {
    question: "Are therapies approved by a doctor?",
    answer:
      "Therapies are reviewed through the clinical consultation process.",
  },
  {
    question: "Where do the therapies come from?",
    answer:
      "Therapies are sourced through vetted clinical and wellness providers.",
  },
  {
    question: "What types of therapies are available?",
    answer:
      "Available therapies may include longevity, recovery, metabolic, and wellness-focused options.",
  },
];

export default function FAQAccordion() {
  return (
    <section >
      <Accordion.Root
        type="single"
        collapsible
        className="flex flex-col gap-2 lg:gap-4"
      >
        {faqs.map((faq, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="overflow-hidden rounded-xl lg:rounded-4xl bg-[#F3F4F6]"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between p-4 lg:p-7 text-left text-lg lg:text-xl font-medium text-black outline-none md:text-2xl">
                <span>{faq.question}</span>

                <span className="flex lg:w-12.5 lg:h-12.5 w-8 h-8 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 group-data-[state=open]:rotate-90">
                  <ArrowRightIcon fill="black" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="overflow-hidden accordion-content ">
              <div className="p-7 border-t border-black/10 text-base leading-7 text-black/70  md:text-lg">
                {faq.answer}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
