"use client";

import ThemeInput from "@/app/components/inputs/ThemeInput";
import FAQSection from "@/app/components/sections/FAQSection";
import { images } from "@/app/ui";
import Image from "next/image";
import React, { useState } from "react";
import { faqItems } from "../page";

const formatUSPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (!digits) return "";
  if (digits.length < 4) return `US  +1(${digits}`;
  if (digits.length < 7) {
    return `US  +1(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `US  +1(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const extractUSPhoneDigits = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const withoutCountryCode = digits.startsWith("1") ? digits.slice(1) : digits;

  return withoutCountryCode.slice(0, 10);
};

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberTouched, setPhoneNumberTouched] = useState(false);
  const [message, setMessage] = useState("");
  const isValidUSPhoneNumber = phoneNumber.length === 10;
  const showPhoneNumberError =
    phoneNumberTouched && phoneNumber.length > 0 && !isValidUSPhoneNumber;

  return (
    <div className="bg-[#F5F8FE] md:pt-28">
      <section className="bg-[#003171] px-4 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-semibold md:text-5xl">Get In Touch</h1>
          <p className="mt-4 text-base font-light text-white md:text-xl">
            We’d love to hear from you. Please fill out this form.
          </p>
        </div>
      </section>

      <section className="p-4 md:px-8 md:py-14">
        <div className="mx-auto max-w-7xl overflow-hidden shadow-sm md:shadow-none rounded-xl md:rounded-[32px] bg-[#B9CDEA]">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <div className="p-0 md:p-5 lg:p-8">
              <div className="rounded-xl md:rounded-[28px] bg-white p-5 shadow-sm md:p-8">
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ThemeInput
                      label="First name"
                      placeholder="First name"
                      value={firstName}
                      required={true}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="rounded-xl"
                    />
                    <ThemeInput
                      label="Last name"
                      placeholder="Last name"
                      value={lastName}
                      required={true}
                      onChange={(e) => setLastName(e.target.value)}
                      className="rounded-xl"
                    />
                  </div>

                  <ThemeInput
                    label="Email"
                    placeholder="you@company.com"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl"
                  />

                  <ThemeInput
                    label="Phone number"
                    placeholder="US  +1 (555) 000-0000"
                    value={formatUSPhoneNumber(phoneNumber)}
                    required={true}
                    onChange={(e) =>
                      setPhoneNumber(extractUSPhoneDigits(e.target.value))
                    }
                    onBlur={() => setPhoneNumberTouched(true)}
                    inputMode="numeric"
                    error={showPhoneNumberError}
                    errorMessage="Please enter a valid phone number."
                    className="rounded-xl"
                  />

                  <label className="block">
                    <span className="mb-1 block text-sm font-normal text-black md:text-base">
                      Message
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Leave us a message..."
                      rows={5}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-gray-900 outline-none placeholder:text-gray-400 focus:ring focus:ring-gray-200 md:px-4 md:py-3"
                    />
                  </label>

                  <button
                    type="button"
                    className="w-full rounded-full bg-[#3D74E9] px-6 py-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-900 md:text-base"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            <div className="md:block hidden relative min-h-[320px] overflow-hidden lg:min-h-[640px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.08)_35%,transparent_36%)]" />
              <Image
                src={images.landingpageimages.LossWeightCardImage}
                alt="Skye Health contact"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
      <FAQSection faqItems={faqItems} />
    </div>
  );
};

export default Page;
