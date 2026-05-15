"use client";
import CustomCheckbox from "@/app/components/CustomCheckBox";
import Dropdown from "@/app/components/ThemeDropDown";
import { Images } from "@/app/images";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [v, setV] = useState(false);
  const stateOptions = [
    { label: "Alabama", value: "alabama" },
    { label: "Alaska", value: "alaska" },
    { label: "Arizona", value: "arizona" },
    { label: "Arkansas", value: "arkansas" },
    { label: "California", value: "california" },
    { label: "Colorado", value: "colorado" },
    { label: "Connecticut", value: "connecticut" },
    { label: "Delaware", value: "delaware" },
    { label: "Florida", value: "florida" },
    { label: "Georgia", value: "georgia" },
    { label: "Hawaii", value: "hawaii" },
    { label: "Idaho", value: "idaho" },
    { label: "Illinois", value: "illinois" },
    { label: "Indiana", value: "indiana" },
    { label: "Iowa", value: "iowa" },
    { label: "Kansas", value: "kansas" },
    { label: "Kentucky", value: "kentucky" },
    { label: "Louisiana", value: "louisiana" },
    { label: "Maine", value: "maine" },
    { label: "Maryland", value: "maryland" },
    { label: "Massachusetts", value: "massachusetts" },
    { label: "Michigan", value: "michigan" },
    { label: "Minnesota", value: "minnesota" },
    { label: "Mississippi", value: "mississippi" },
    { label: "Missouri", value: "missouri" },
    { label: "Montana", value: "montana" },
    { label: "Nebraska", value: "nebraska" },
    { label: "Nevada", value: "nevada" },
    { label: "New Hampshire", value: "new-hampshire" },
    { label: "New Jersey", value: "new-jersey" },
    { label: "New Mexico", value: "new-mexico" },
    { label: "New York", value: "new-york" },
    { label: "North Carolina", value: "north-carolina" },
    { label: "North Dakota", value: "north-dakota" },
    { label: "Ohio", value: "ohio" },
    { label: "Oklahoma", value: "oklahoma" },
    { label: "Oregon", value: "oregon" },
    { label: "Pennsylvania", value: "pennsylvania" },
    { label: "Rhode Island", value: "rhode-island" },
    { label: "South Carolina", value: "south-carolina" },
    { label: "South Dakota", value: "south-dakota" },
    { label: "Tennessee", value: "tennessee" },
    { label: "Texas", value: "texas" },
    { label: "Utah", value: "utah" },
    { label: "Vermont", value: "vermont" },
    { label: "Virginia", value: "virginia" },
    { label: "Washington", value: "washington" },
    { label: "West Virginia", value: "west-virginia" },
    { label: "Wisconsin", value: "wisconsin" },
    { label: "Wyoming", value: "wyoming" },
  ];

  const [state, setState] = useState<string | undefined>();
  return (
    <div className="pt-4 sm:pt-8 space-y-4 sm:space-y-9 flex flex-col min-h-dvh pb-8 px-4 lg:px-0 sm:pb-16 container mx-auto max-w-4xl">
      <div className="flex items-center justify-between">
        <Link href={"/"} className="relative order-1 xl:order-0">
          <Image alt="" src={Images.layout.logo} />
        </Link>
      </div>

      <div className="space-y-4 sm:space-y-9">
        <h2 className="text-neutral-900 font-bold text-xl sm:text-3xl">
          Which state do you currently live in?
        </h2>

        <div className="space-y-5">
          <Dropdown
            options={stateOptions}
            value={state}
            placeholder="Choose State"
            onChange={setState}
            // label={"I am signing up as:"}
          />

          {/* <CustomCheckbox
            label='By clicking "Continue," I agree to the Terms and Conditions and acknowledge the Privacy Policy.'
            direction="flex-row-reverse"
            checked={v}
            width="w-full"
            onChange={setV}
          /> */}

          <div className="sm:mt-12">
            <Link
              href={"/loading-page"}
              type="button"
              onClick={() => {}}
              // disabled={true}
              className={[
                "px-3.5 py-2.5 sm:py-4 mt-8 w-full rounded-xl transition cursor-pointer text-white font-semibold",
                true
                  ? "bg-secondary hover:bg-secondary-dark"
                  : "bg-gray-300 cursor-not-allowed",
              ].join(" ")}
            >
              Continue
            </Link>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 w-full mt-auto mb-0 rounded-lg bg-neutral-100 space-y-1 sm:space-y-3">
        <h2 className="text-primary font-bold text-base sm:text-xl">
          Why we ask
        </h2>
        <p className="text-neutral-800 text-sm sm:text-base">
          The most common factor influencing weight gain is genetics. If close
          family members struggle with weight, you may be more likely to
          experience the same challenge.
        </p>

        <a
          href=""
          className="text-secondary hover:text-secondary-dark font-semibold text-sm sm:text-base hover:underline underline-offset-2 "
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default Page;
