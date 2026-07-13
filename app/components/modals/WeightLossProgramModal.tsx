"use client";

import { useEffect, useMemo, useState } from "react";
import AppModal from "./AppModal";
import ThemeButton from "../Button/ThemeButton";
import ThemeInput from "../inputs/ThemeInput";
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

type DoseAnswer = "known" | "unknown" | null;
type ModalStep = "intro" | "currentGlp1" | "dose" | "summary";

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
  const [currentGlp1Name, setCurrentGlp1Name] = useState("");
  const [doseAnswer, setDoseAnswer] = useState<DoseAnswer>(null);
  const [doseValue, setDoseValue] = useState("");
  const [selectedMonths, setSelectedMonths] =
    useState<(typeof pricingOptions)[number]["months"]>(1);

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep("intro");
      setCurrentGlp1Name("");
      setDoseAnswer(null);
      setDoseValue("");
      setSelectedMonths(1);
    }
  }, [isOpen]);

  const selectedPricing = useMemo(
    () =>
      pricingOptions.find((option) => option.months === selectedMonths) ??
      pricingOptions[0],
    [selectedMonths],
  );

  const currentQuestionNumber = useMemo(() => {
    switch (step) {
      case "currentGlp1":
        return 1;
      case "dose":
        return 2;
      default:
        return 0;
    }
  }, [step]);

  const totalQuestions = 2;

  const questionnaireAnswers = useMemo(() => {
    const answers: Array<{ question: string; answer: string }> = [
      {
        question: "How many months?",
        answer: `${selectedMonths} month${selectedMonths > 1 ? "s" : ""}`,
      },
    ];

    if (currentGlp1Name.trim()) {
      answers.push({
        question: "Which GLP-1 are you taking?",
        answer: currentGlp1Name.trim(),
      });
    }

    if (doseAnswer !== null) {
      answers.push({
        question: "Do you know your current dose?",
        answer: doseAnswer === "known" ? "Yes, I know it" : "No, not sure",
      });
    }

    if (doseAnswer === "known" && doseValue.trim()) {
      answers.push({
        question: "Enter your current dose (mg/week)",
        answer: doseValue.trim(),
      });
    }

    return answers;
  }, [currentGlp1Name, doseAnswer, doseValue, selectedMonths]);

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

  const canMoveNext = useMemo(() => {
    switch (step) {
      case "currentGlp1":
        return currentGlp1Name.trim().length > 0;
      case "dose":
        if (doseAnswer === "known") {
          return doseValue.trim().length > 0;
        }
        return doseAnswer !== null;
      default:
        return true;
    }
  }, [currentGlp1Name, doseAnswer, doseValue, step]);

  const handleNext = () => {
    if (!canMoveNext) return;

    if (step === "intro") {
      setStep("currentGlp1");
      return;
    }

    if (step === "currentGlp1") {
      setStep("dose");
      return;
    }

    if (step === "dose") {
      setStep("summary");
    }
  };

  const handleBack = () => {
    if (step === "currentGlp1") {
      setStep("intro");
      return;
    }

    if (step === "dose") {
      setStep("currentGlp1");
      return;
    }

    if (step === "summary") {
      setStep("dose");
    }
  };

  const renderQuestionFooter = () => (
    <div className="mt-4 border-t border-[#E7EAF0] pt-6">
      <div className="flex items-center justify-between gap-4">
        <div className="text-lg text-[#98A2B3]">
          {step === "currentGlp1" || step === "dose"
            ? `Question ${currentQuestionNumber} of ${totalQuestions}`
            : ""}
        </div>
        <div className="flex items-center gap-3">
          {(step === "currentGlp1" || step === "dose") && (
            <ThemeButton
              label="Back"
              onClick={handleBack}
              variant="outlined"
              size="sm"
              className="py-2.5!"
            />
          )}
          <ThemeButton
            label="Next"
            onClick={handleNext}
            disabled={!canMoveNext}
            variant="primaryFilled"
            size="sm"
            iconPosition="end"
            className="py-2.5! border border-primary"
          />
        </div>
      </div>
    </div>
  );

  const renderIntro = () => (
    <div className="">
      <div className="mx-auto px-4 py-2 md:px-8 md:py-6">
        <div className="">
          <h3 className="text-xl font-semibold text-[#121826] md:text-2xl">
            Weight loss
          </h3>
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
          <div className="flex items-center gap-3">
            <PhoneFilledIcon />
            <span>
              One-time online doctor visit â€”{" "}
              <span className="font-bold text-primary">$50</span>
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
            label={`Get started â€” $${selectedPricing.total}`}
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

  const renderCurrentGlp1Question = () => (
    <div className="px-4 py-3 md:px-8 md:py-6">
      <div className="">
        <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
          Which GLP-1 are you taking?
        </h2>
        <p className="mt-1 text-base text-gray-500">
          Enter the name of your current medication.
        </p>
      </div>

      <div className="mt-6">
        <ThemeInput
          label="GLP-1 medication name"
          placeholder="e.g. Ozempic, Wegovy, Mounjaro"
          value={currentGlp1Name}
          onChange={(event) => setCurrentGlp1Name(event.target.value)}
          className="h-14 rounded-2xl border-[#D8DDE5] px-4 text-lg placeholder:text-[#98A2B3]"
        />
      </div>

      {renderQuestionFooter()}
    </div>
  );

  const renderDoseQuestion = () => (
    <div className="px-4 py-3 md:px-8 md:py-6">
      <div className="">
        <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
          Do you know your current dose?
        </h2>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ThemeButton
          label="Yes, I know it"
          className="rounded-xl!"
          onClick={() => setDoseAnswer("known")}
          variant={doseAnswer === "known" ? "primaryFilled" : "outlinedBluish"}
        />
        <ThemeButton
          label="No, not sure"
          onClick={() => {
            setDoseAnswer("unknown");
            setDoseValue("");
          }}
          className="rounded-xl!"
          variant={
            doseAnswer === "unknown" ? "primaryFilled" : "outlinedBluish"
          }
        />
      </div>

      {doseAnswer === "known" && (
        <div className="mt-6">
          <ThemeInput
            label="Enter your current dose (mg/week)"
            placeholder="e.g. 0.5 mg"
            value={doseValue}
            onChange={(event) => setDoseValue(event.target.value)}
            className="h-14 rounded-2xl border-[#D8DDE5] px-4 text-lg placeholder:text-[#98A2B3]"
          />
        </div>
      )}

      {renderQuestionFooter()}
    </div>
  );

  const renderSummary = () => (
    <div className="px-4 py-3 md:px-8 md:py-6">
      <div className="">
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

      <div className="mt-3 flex items-center gap-2 pt-3 md:flex-row md:flex-row flex-col-reverse">
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
      {step === "currentGlp1" && renderCurrentGlp1Question()}
      {step === "dose" && renderDoseQuestion()}
      {step === "summary" && renderSummary()}
    </AppModal>
  );
};

export default WeightLossProgramModal;
