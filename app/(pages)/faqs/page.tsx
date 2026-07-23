import FAQAccordion, { FAQItem } from '@/app/components/FaqAccordion';
import React from 'react'
const faqItems: FAQItem[] = [
  {
    question: "How does Skye Health work?",
    answer:
      "Getting started is simple. First, choose the treatment that's right for you, whether you're interested in weight loss, hormone optimization, peptide therapy, or optimizing it all. Next, complete a secure online health assessment that helps us understand your medical history, symptoms, and goals. Depending on your treatment, you may also complete laboratory testing. A licensed U.S. physician will review your information and, when appropriate, create a personalized treatment plan. If treatment is approved, your prescription is sent to one of our licensed U.S. pharmacy partners and delivered directly to your door. Your physician will continue monitoring your progress and adjusting your treatment as needed.",
  },
  {
    question: "Where is Skye Health available?",
    answer:
      "Skye Health currently provides care to patients in all 50 states, although some treatments may not be available everywhere. Because healthcare regulations vary by state, certain therapies may require a live physician visit or may not yet be offered where you live. If that's the case, we'll let you know before you begin treatment. Our goal is simple: provide the same personalized, physician-guided care wherever you call home.",
  },
  {
    question: "Is lab testing available in my state?",
    answer:
      "For most patients, yes. Skye Health currently offers at-home blood collection kits for eligible lab testing. If your physician orders labs that can be completed at home, we'll ship everything you need directly to your door, along with simple collection instructions.",
  },
  {
    question: "What if my labs can't be collected at home?",
    answer:
      "Some laboratory tests require a traditional blood draw. As we continue expanding our services, Skye Health will be adding nationwide laboratory collection options for these tests. If your treatment requires a lab that isn't currently available through our at-home collection program, our Care Team will let you know before your order is placed and discuss the next steps with you.",
  },
  {
    question: "Is every state supported?",
    answer:
      "Availability depends on your state's regulations and the specific laboratory tests your physician orders. While most patients can use our at-home collection kits, there may be a few exceptions based on where you live or the type of testing required. If we aren't able to offer your required labs in your state, we'll let you know before you begin care.",
  },
  {
    question: "How will I know if I need labs?",
    answer:
      "Not every treatment requires laboratory testing. If labs are recommended, your physician will explain which tests are needed and whether they can be completed with an at-home collection kit. If you have questions about lab availability, our Support Team is happy to help through your secure patient portal.",
  },
  {
    question:
      "Do I have to purchase a membership to start a weight loss program?",
    answer:
      "No. Unlike many telehealth weight loss programs, Skye Health does not require a membership or long-term commitment to begin treatment. Getting started includes a $30 one-time physician review to determine if you're a candidate. If approved, your care is $199 per month, plus medication and shipping. Your monthly care includes physician oversight, medication management, personalized dosing recommendations, and ongoing support tailored to your goals. There are no annual contracts, enrollment fees, or required long-term commitments.",
  },
  {
    question: "What does the monthly fee include?",
    answer:
      "Your monthly care fee includes physician oversight, a personalized treatment plan, medication management and dose adjustments when appropriate, ongoing clinical support, and follow-up assessments to monitor your progress. Medication and shipping are billed separately.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Yes. Because there are no long-term contracts or required memberships, you're free to discontinue treatment whenever you and your physician decide it's appropriate. Our goal is to provide physician-guided care that fits your life, not lock you into a subscription.",
  },
  {
    question: "Do I need a prescription?",
    answer:
      "It depends on the treatment. Many therapies available through Skye Health, including weight loss medications, hormone therapy, and certain peptide therapies, require a prescription from a licensed physician. You'll complete an online health assessment, and a licensed U.S. physician will review your medical history and goals. If medically appropriate, your physician will create a personalized treatment plan and prescribe medication when indicated. Not everyone is a candidate for prescription treatment.",
  },
  {
    question: "What if I don't need a prescription?",
    answer:
      "Some wellness recommendations, supplements, and educational resources do not require a prescription and may be recommended as part of your personalized care plan.",
  },
  {
    question: "Can I request a specific medication?",
    answer:
      "You're welcome to share your goals and preferences with your physician. However, treatment decisions are based on your medical history, current health, and clinical judgment. If a medication isn't appropriate for you, your physician will discuss alternative options. Every prescription is issued only after an independent medical evaluation by a licensed physician.",
  },
   {
    question: "How do I log into my account? ",
    answer:
      "",
  },
   {
    question: "How do I reset my password? ",
    answer:
      "",
  },
  {
    question: "How does shipping work?",
    answer:
      "Once your physician approves your treatment plan, your prescription is sent to one of our licensed U.S. pharmacy partners for fulfillment. After your order ships, you'll receive a tracking email so you can follow your package every step of the way.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Most orders are processed and shipped within a few business days after your prescription is approved. Delivery times vary based on your location, the medication prescribed, and your selected shipping method. If there are any unexpected delays, our Care Team will keep you informed.",
  },
  {
    question: "How much does shipping cost?",
    answer:
      "Shipping costs are displayed during checkout before you complete your order. The cost may vary depending on your medication and shipping requirements.",
  },
  {
    question: "Will my medication stay cold during shipping?",
    answer:
      "Yes. Medications that require refrigeration are shipped in temperature-controlled packaging designed to help maintain the appropriate temperature during transit. We recommend bringing your package inside as soon as possible after delivery and following the storage instructions included with your medication.",
  },
  {
    question: "Can you ship to a P.O. Box?",
    answer:
      "Some medications may be shipped to a P.O. Box, while others, particularly temperature-sensitive injectable medications, require delivery to a physical address. If your treatment has special shipping requirements, we'll let you know before your order is processed.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes. As soon as your order ships, you'll receive an email with tracking information so you can monitor its delivery. If you have questions about your shipment, our Care Team is available through your secure patient portal.",
  },
  {
    question: "Why do I need to complete a refill questionnaire?",
    answer:
      "Every prescription refill is reviewed by a licensed physician. Before your next refill, we'll ask you to complete a brief follow-up questionnaire about your progress. It usually takes less than two minutes and covers your current weight, appetite, side effects, missed doses, and whether you'd like to discuss a dose adjustment. Your responses help us personalize your care and avoid delays with your next shipment.",
  },
  {
    question: "Why can't my refill be approved automatically?",
    answer:
      "Unlike automatic subscription services, Skye Health believes every refill deserves a clinical review. Before approving your next prescription, your physician reviews your weight loss, side effects, appetite, medication tolerance, and overall response to treatment. Your physician may continue your current dose, increase it, keep you at the same dose longer, or schedule additional follow-up before prescribing more medication.",
  },
  {
    question: "Will my dose increase every month?",
    answer:
      "Not necessarily. GLP-1 medications aren't meant to be increased on a fixed schedule. Your physician will recommend the dose that's right for you based on your weight loss progress, appetite control, side effects, missed doses, treatment tolerance, and overall health goals. The goal isn't to get you to the highest dose; it's to find the lowest effective dose that helps you achieve sustainable results.",
  },
  {
    question: "Where is my order?",
    answer:
      "Once your prescription has been approved by your physician and filled by one of our licensed U.S. pharmacy partners, you'll receive an email with tracking information. You can also view your order status at any time by logging into your Skye Health account.",
  },
  {
    question: "My order says it's processing. What does that mean?",
    answer:
      "\"Processing\" means your prescription is being prepared by the pharmacy for shipment. This includes reviewing your order, preparing your medication, and packaging it for delivery. Once your order ships, you'll receive a tracking email with the latest delivery updates.",
  },
  {
    question: "My tracking hasn't updated. Should I be concerned?",
    answer:
      "Shipping carriers occasionally experience delays due to weather, holidays, or other factors. If your tracking hasn't updated for a short period, your package is often still moving through the carrier's network. If it hasn't updated for several days or the estimated delivery date has passed, please contact our Care Team.",
  },
  {
    question: "What if my order is delayed?",
    answer:
      "While most orders arrive within the expected delivery window, occasional delays can happen after a package is with the shipping carrier. If your medication is delayed or you're concerned you may run out before it arrives, contact us through your secure patient portal as soon as possible. We'll work with our pharmacy partner to determine the best next steps.",
  },
  {
    question:
      "What if my package says \"Delivered,\" but I can't find it?",
    answer:
      "We recommend checking around your delivery location, with other members of your household, or with your building's front desk or mailroom. If you're still unable to locate your package, contact our Care Team so we can review the shipment and determine the appropriate next steps.",
  },
];
const page = () => {
  return (
    <section className='container max-w-7xl mx-auto pt-8  xl:pt-50.75 pb-8 xl:pb-24 xl:px-8 px-4 flex flex-col gap-4 xl:gap-12'>
        <h2 className='text-2xl xl:text-5xl font-semibold text-[#22252B] text-center'>Frequently Asked Questions?</h2>
        <FAQAccordion faqs={faqItems} />
    </section>
  )
}

export default page
