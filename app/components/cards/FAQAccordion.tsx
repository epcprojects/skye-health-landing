// "use client";

// import { ArrowRightIcon } from "@/public/icons";
// import * as Accordion from "@radix-ui/react-accordion";

// const faqs = [
//   {
//     question: "What is SKYE RESEARCH?",
//     answer:
//       "SKYE RESEARCH is a longevity-focused wellness platform offering access to clinical guidance and therapies.",
//   },
//   {
//     question: "Is this a supplement or wellness platform?",
//     answer:
//       "It is a wellness platform, not just a supplement product.",
//   },
//   {
//     question: "How does the process work?",
//     answer:
//       "You sign up, receive guidance, and get access to consultation-based recommendations.",
//   },
//   {
//     question: "Are therapies approved by a doctor?",
//     answer:
//       "Therapies are reviewed through the clinical consultation process.",
//   },
//   {
//     question: "Where do the therapies come from?",
//     answer:
//       "Therapies are sourced through vetted clinical and wellness providers.",
//   },
//   {
//     question: "What types of therapies are available?",
//     answer:
//       "Available therapies may include longevity, recovery, metabolic, and wellness-focused options.",
//   },
// ];

// export default function FAQAccordion() {
//   return (
//     <section >
//       <Accordion.Root
//         type="single"
//         collapsible
//         className="flex flex-col gap-2 lg:gap-4"
//       >
//         {faqs.map((faq, index) => (
//           <Accordion.Item
//             key={index}
//             value={`item-${index}`}
//             className="overflow-hidden rounded-xl lg:rounded-4xl bg-[#F3F4F6]"
//           >
//             <Accordion.Header>
//               <Accordion.Trigger className="group flex w-full items-center justify-between px-4 lg:px-7 py-3 text-left text-lg lg:text-xl font-medium text-black outline-none md:text-2xl">
//                 <span>{faq.question}</span>

//                 <span className="flex lg:w-12.5 lg:h-12.5 w-8 h-8 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 group-data-[state=open]:rotate-90">
//                   <ArrowRightIcon fill="black" />
//                 </span>
//               </Accordion.Trigger>
//             </Accordion.Header>

//             <Accordion.Content className="overflow-hidden accordion-content ">
//               <div className="px-7 py-3 text-base leading-7 text-black/70  md:text-lg">
//                 {faq.answer}
//               </div>
//             </Accordion.Content>
//           </Accordion.Item>
//         ))}
//       </Accordion.Root>
//     </section>
//   );
// }

"use client";

import { ArrowRightIcon } from "@/public/icons";
import * as Accordion from "@radix-ui/react-accordion";

type FaqItem = {
  question: string;
  answer: string;
};

const NEWFAQ: React.FC = () => {
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

  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue="item-0"
      className="space-y-3"
    >
      {faqItems.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className=" group p-7 bg-[#F3F4F6] rounded-[32px]"
        >
          <Accordion.Trigger className="w-full  cursor-pointer">
            <Accordion.Header>
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium md:text-2xl text-black">
                  {item.question}
                </h4>

                <span className="relative  rtl:pb-3 ltr:pt-0.5 shrink-0 bg-white w-12.5 h-12.5 flex items-center justify-center rounded-full transition-transform duration-300 group-data-[state=open]:rotate-90">
                  <span className="faq-arrow ">
                    <ArrowRightIcon width="18" height="18" fill="#1F252E" />
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

export default NEWFAQ;

