"use client";

import { useIsMobile } from "@/app/hooks/useIsMobile";
import { NewPlusIcon } from "@/public/icons";

import * as Accordion from "@radix-ui/react-accordion";
import { StaticImageData } from "next/image";
import Image from "next/image";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  faqs: FAQItem[];
};

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const isMobile = useIsMobile();
  return (
    <section>
      <Accordion.Root
        type="single"
        collapsible
        defaultValue="item-0"
        className="flex flex-col gap-2 lg:gap-3"
      >
        {faqs.map((faq, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="overflow-hidden rounded-xl  bg-[#F5F8FE] data-[state=open]:bg-[#0F1D3A]"
          >
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full cursor-pointer items-center gap-1 justify-between text-start rounded-xl data-[state=open]:rounded-b-none bg-[#F5F8FE] xl:pt-6 xl:pb-6 pt-4 pb-4 xl:data-[state=open]:pb-3 data-[state=open]:pb-2 px-3 xl:px-10 text-[#0F1D3A] outline-none data-[state=open]:bg-[#0F1D3A] data-[state=open]:text-white">
                <span className="text-base font-medium">{faq.question}</span>

                <span className="inline-flex text-[#3D74E9] transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:text-white">
                  <NewPlusIcon fill="currentColor" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="data-[state=open]:-mt-px overflow-hidden accordion-content bg-[#0F1D3A]  data-[state=closed]:bg-transparent   px-3 xl:px-10">
                <p className="text-sm font-light text-[#E2EAFC]  pb-4 xl:pb-6">
                  {faq.answer}
                </p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
