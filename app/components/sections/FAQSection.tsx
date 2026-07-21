import Image from "next/image";
import { images } from "@/app/ui";
import FAQAccordion, { type FAQItem } from "../FaqAccordion";

interface FAQSectionProps {
  faqItems: FAQItem[];
}

const FAQSection = ({ faqItems }: FAQSectionProps) => {
  return (
    <section className="bg-[#F5F8FE] py-6 xl:py-30 ">
        <div className="container  max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-32.5 justify-between px-4 xl:px-8">
          <div className="flex flex-col gap-5 xl:gap-6">
            <div className="flex flex-col gap-2.5 xl:gap-6">
              <p className="text-2xl xl:text-5xl  font-semibold text-[#22252B] xl:leading-[100%] leading-[130%]">
                Frequently Asked Questions?
              </p>
              <p className="text-base xl:text-xl text-[#737780] xl:leading-[100%] leading-[130%]">
                Everything you need to know about our peptides and process.
              </p>
            </div>
            <FAQAccordion faqs={faqItems} />
          </div>
          <div className="bg-[#E2EAFC]  rounded-4xl">
            <Image
              src={images.landingpageimages.FaqsImage}
              alt={"faqs"}
              className="rounded-4xl w-full h-full"
            />
          </div>
        </div>
      </section>
  );
};

export default FAQSection;