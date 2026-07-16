"use client";

import { useEffect, useMemo, useState } from "react";
import AppModal from "./AppModal";
import ThemeButton from "../Button/ThemeButton";
import {
  ArrowRightIcon,
  CrossIcon,
  HeartIcon,
  PhoneFilledIcon,
  WaveIcon,
} from "@/public/icons";

type WeightLossProgramModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onStartQuestionnaire: () => void;
};

type ModalStep = "intro" | "summary";

const WEIGHT_LOSS_PROGRAM_STORAGE_KEY = "skye-weight-loss-program";

const summarySections = [
  "Medical history & current conditions",
  "Current medications",
  "Height, weight & BMI",
  "Weight loss goals",
  "Diet & lifestyle",
];

const pricingOptions = [
  { months: 1, total: 199 },
  { months: 2, total: 398 },
] as const;

const WeightLossProgramModal = ({
  isOpen,
  onClose,
  onStartQuestionnaire,
}: WeightLossProgramModalProps) => {
  const [step, setStep] = useState<ModalStep>("intro");
  const [selectedMonths, setSelectedMonths] =
    useState<(typeof pricingOptions)[number]["months"]>(1);

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep("intro");
      setSelectedMonths(1);
    }
  }, [isOpen]);

  const selectedPricing = useMemo(
    () =>
      pricingOptions.find((option) => option.months === selectedMonths) ??
      pricingOptions[0],
    [selectedMonths],
  );

  const questionnaireAnswers = useMemo(
    () => [
      {
        question: "How many months?",
        answer: `${selectedMonths} month${selectedMonths > 1 ? "s" : ""}`,
      },
    ],
    [selectedMonths],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isOpen) return;

    window.localStorage.setItem(
      WEIGHT_LOSS_PROGRAM_STORAGE_KEY,
      JSON.stringify({
        program: "weight-loss",
        updatedAt: new Date().toISOString(),
        answers: questionnaireAnswers,
      }),
    );
  }, [isOpen, questionnaireAnswers]);

  const handleNext = () => {
    if (step === "intro") {
      setStep("summary");
    }
  };

  const handleBack = () => {
    if (step === "summary") {
      setStep("intro");
    }
  };

  const renderIntro = () => (
    <div>
      <div className="mx-auto px-4 py-2 md:px-8 md:py-6">
        <div>
          <h3 className="text-xl font-semibold text-[#121826] md:text-2xl">
            Weight Loss Personalized Treatment Plan
          </h3>
          <span>
            (includes medication, ongoing care, refill reviews, and support)
          </span>
          <div className="mt-2 flex items-end gap-2 text-primary">
            <span className="text-[52px] font-bold leading-none">$199</span>
            <span className="pb-1 text-[20px]">/month</span>
          </div>
          <p className="mt-2 text-[18px] text-gray-600">
            No subscription or commitment needed
          </p>
        </div>

        <div className="mt-8 space-y-4 text-[20px] text-[#5B667A]">
          <div className="flex items-center gap-3">
            <HeartIcon />
            <span>GLP-1 medication management</span>
          </div>
          <div className="flex items-center gap-3">
            <WaveIcon />
            <span>Ongoing progress check-ins</span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <PhoneFilledIcon />
              <span>
                One Time Physician Review —
                <span className="font-bold text-primary">$30</span>
              </span>
            </div>
            <span className="block text-base mt-2">
              Licensed physician review of your health profile and treatment
              eligibility.
            </span>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-[20px] text-[#5B667A]">How many months?</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {pricingOptions.map((option) => {
              const isSelected = selectedMonths === option.months;

              return (
                <button
                  key={option.months}
                  type="button"
                  onClick={() => setSelectedMonths(option.months)}
                  className={`cursor-pointer rounded-xl border-2 px-5 py-4 text-center transition-colors duration-200 ${
                    isSelected
                      ? "border-[#121826] bg-white text-[#121826]"
                      : "border-gray-200 bg-white text-[#121826] hover:border-primary/50"
                  }`}
                >
                  <div className="text-[18px] font-medium">
                    {option.months} month{option.months > 1 ? "s" : ""}
                  </div>
                  <div className="mt-1 text-xl font-medium text-primary">
                    ${option.total}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <ThemeButton
            label={`Get started — $${selectedPricing.total}`}
            onClick={handleNext}
            variant="primaryFilled"
            size="md"
            icon={<ArrowRightIcon />}
            iconPosition="end"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="px-4 py-3 md:px-8 md:py-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
          Almost there
        </h2>
        <p className="mt-1 text-base text-gray-500">
          Complete your health questionnaire to finish enrollment.
        </p>
      </div>

      <div className="mt-3 space-y-1">
        {summarySections.map((section) => (
          <div
            key={section}
            className="flex items-center gap-2 border-b border-[#E7EAF0] py-2 text-sm text-gray-600"
          >
            <span>{section}</span>
          </div>
        ))}
      </div>

      <p className="mt-2 text-sm text-gray-600">+ 10 more questions</p>

      <div className="mt-3 flex items-center gap-2 pt-3 md:flex-row flex-col-reverse">
        <ThemeButton
          label="Back"
          onClick={handleBack}
          variant="outlinedBluish"
          className="w-full rounded-full! py-2.5! md:w-auto"
        />
        <ThemeButton
          label="Start questionnaire"
          onClick={onStartQuestionnaire}
          variant="primaryFilled"
          icon={<ArrowRightIcon />}
          iconPosition="end"
          className="w-full"
        />
      </div>
    </div>
  );

  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      showFooter={false}
      title="Start your weight
loss journey"
      size="large"
      bodyPaddingClasses="p-0"
      scrollNeeded
    >
      {step === "intro" && renderIntro()}
      {step === "summary" && renderSummary()}
    </AppModal>
  );
};

export default WeightLossProgramModal;
