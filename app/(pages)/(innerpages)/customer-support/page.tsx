"use client";

import { ThemeInput } from "@/app/components";
import ThemeButton from "@/app/components/Button/ThemeButton";
import HeroSection from "@/app/components/cards/HeroSection";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { images } from "@/app/ui";
import {
  DocumentationCheckIcon,
  OrderQueriesIcon,
  SecurityCheckIcon,
} from "@/public/icons";

const Page = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      message: Yup.string().max(1024, "Message cannot exceed 1024 characters"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <HeroSection
        title="Verification & Customer Support"
        description="Access lab verification records, request product documentation, and receive assistance with order-related inquiries from the SKYE Research support team."
        onShopNowClick={() => {
          console.log("Shop Now clicked");
        }}
        onExploreScienceClick={() => {
          console.log("Explore Science clicked");
        }}
      />
      <section className="py-8 lg:py-24  bg-[url('/images/SupportBgImage.png')] bg-cover bg-no-repeat">
        <div className="container max-w-360 mx-auto px-4 lg:px-8 flex flex-col  gap-8 lg:gap-18.5">
          <div className="flex flex-col items-center gap-2">
            <p className="text-3xl lg:text-[64px] font-semibold leading-[120%] tracking-[-2%] text-black">
              Documentation <span className="text-[#009FFF]">& Support.</span>
            </p>
            <p className="text-xl lg:text-2xl text-gray-800 leading-[150%] ">
              Get help with lab verification, documentation requests, and order
              inquiries.
            </p>
          </div>
          <div className="py-6 lg:py-16 flex flex-col gap-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-8 lg:gap-16 bg-white">
              <div className="lg:py-7.5 px-4 py-4 lg:px-10">
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-12"
                >
                  <p className="text-4xl font-semibold leading-[120%] tracking-[-2%]">
                    Our support team assists with.
                  </p>

                  <div className="flex flex-col gap-6">
                    <ThemeInput
                      label="First name"
                      required
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(
                        formik.touched.firstName && formik.errors.firstName,
                      )}
                      errorMessage={
                        formik.touched.firstName && formik.errors.firstName
                          ? formik.errors.firstName
                          : ""
                      }
                    />

                    <ThemeInput
                      label="Last name"
                      required
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(
                        formik.touched.lastName && formik.errors.lastName,
                      )}
                      errorMessage={
                        formik.touched.lastName && formik.errors.lastName
                          ? formik.errors.lastName
                          : ""
                      }
                    />

                    <ThemeInput
                      label="Email"
                      required
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(
                        formik.touched.email && formik.errors.email,
                      )}
                      errorMessage={
                        formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : ""
                      }
                    />

                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-neutral-900">
                        Message
                      </span>

                      <textarea
                        name="message"
                        maxLength={1024}
                        rows={3}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Type the message here"
                        className={`resize-none py-2.5 px-3.5 rounded-lg border bg-white text-base text-neutral-900 outline-none placeholder:text-neutral-400 ${
                          formik.touched.message && formik.errors.message
                            ? "border-red-500"
                            : "border-[#D5D7DA]"
                        }`}
                      />

                      <span className="self-end text-sm text-[#535862]">
                        {formik.values.message.length}/1024
                      </span>

                      {formik.touched.message && formik.errors.message && (
                        <p className="text-sm text-red-500">
                          {formik.errors.message}
                        </p>
                      )}
                    </label>

                    <ThemeButton
                      onClick={() => formik.handleSubmit()}
                      variant="primaryFilled"
                      label="Submit"
                    />
                  </div>
                </form>
              </div>
              
                <Image
                  src={images.innerImages.CustomerSupportImage}
                  alt={"customer support"}
                  className="w-full"
                />
              
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="bg-[#E6F6FF] rounded-[30px] p-6 items-center  flex flex-row gap-4.5">
                <div className="w-15 h-15 rounded-[20px] flex items-center justify-center bg-white shadow-[0_9.69px_21.64px_0_rgba(0,0,0,0.08)]">
                  <SecurityCheckIcon />
                </div>
                <p className="text-[22px] text-neutral-900">
                  Lab verification access
                </p>
              </div>
              <div className="bg-[#E6F6FF] rounded-[30px] p-6 items-center  flex flex-row gap-4.5">
                <div className="w-15 h-15 rounded-[20px] flex items-center justify-center bg-white shadow-[0_9.69px_21.64px_0_rgba(0,0,0,0.08)]">
                  <DocumentationCheckIcon />
                </div>
                <p className="text-[22px] text-neutral-900">
                  Documentation requests
                </p>
              </div>
              <div className="bg-[#E6F6FF] rounded-[30px] p-6 items-center  flex flex-row gap-4.5">
                <div className="w-15 h-15 rounded-[20px] flex items-center justify-center bg-white shadow-[0_9.69px_21.64px_0_rgba(0,0,0,0.08)]">
                  <OrderQueriesIcon />
                </div>
                <p className="text-[22px] text-neutral-900">
                  Order-related inquiries
                </p>
              </div>
            </div>
            <p className="text-lg text-neutral-800 text-center leading-[120%]">We maintain a documentation-forward approach — most inquiries relate to verification, and we are structured to provide that information efficiently.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
