"use client";

import { useEffect, useMemo, useState } from "react";
import AppModal from "./AppModal";
import ThemeButton from "../Button/ThemeButton";
import ThemeInput from "../inputs/ThemeInput";
import {
  ArrowRightIcon,
  CheckIcon,
  CrossIcon,
  HeartIcon,
  PhoneFilledIcon,
  PhoneIcon,
  WaveIcon,
} from "@/public/icons";

type WeightLossProgramModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onStartQuestionnaire: () => void;
};

type Glp1Answer = "yes" | "no" | null;
type DoseAnswer = "known" | "unknown" | null;
type MedicationAnswer = "semaglutide" | "tirzepatide" | "help" | null;
type ModalStep =
  | "intro"
  | "glp1"
  | "currentGlp1"
  | "dose"
  | "medication"
  | "summary";

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
  // { months: 3, total: 597 },
] as const;

const WeightLossProgramModal = ({
  isOpen,
  onClose,
  onStartQuestionnaire,
}: WeightLossProgramModalProps) => {
  const [step, setStep] = useState<ModalStep>("intro");
  const [glp1Answer, setGlp1Answer] = useState<Glp1Answer>(null);
  const [currentGlp1Name, setCurrentGlp1Name] = useState("");
  const [doseAnswer, setDoseAnswer] = useState<DoseAnswer>(null);
  const [doseValue, setDoseValue] = useState("");
  const [medicationAnswer, setMedicationAnswer] =
    useState<MedicationAnswer>(null);
  const [selectedMonths, setSelectedMonths] =
    useState<(typeof pricingOptions)[number]["months"]>(1);

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep("intro");
      setGlp1Answer(null);
      setCurrentGlp1Name("");
      setDoseAnswer(null);
      setDoseValue("");
      setMedicationAnswer(null);
      setSelectedMonths(1);
    }
  }, [isOpen]);

  const selectedPricing = useMemo(
    () =>
      pricingOptions.find((option) => option.months === selectedMonths) ??
      pricingOptions[1],
    [selectedMonths],
  );

  const currentQuestionNumber = useMemo(() => {
    switch (step) {
      case "glp1":
        return 1;
      case "currentGlp1":
        return 2;
      case "dose":
        return 3;
      case "medication":
        return glp1Answer === "yes" ? 4 : 2;
      default:
        return 0;
    }
  }, [glp1Answer, step]);

  const totalQuestions = glp1Answer === "yes" ? 4 : 2;

  const progressWidth = useMemo(() => {
    if (step === "summary") return "100%";
    if (step === "intro") return "0%";
    return `${(currentQuestionNumber / totalQuestions) * 100}%`;
  }, [currentQuestionNumber, step, totalQuestions]);

  const selectedMedicationLabel = useMemo(() => {
    switch (medicationAnswer) {
      case "semaglutide":
        return "Semaglutide";
      case "tirzepatide":
        return "Tirzepatide";
      case "help":
        return "Help me choose";
      default:
        return "Tirzepatide";
    }
  }, [medicationAnswer]);

  const questionnaireAnswers = useMemo(() => {
    const answers: Array<{ question: string; answer: string }> = [
      {
        question: "How many months?",
        answer: `${selectedMonths} month${selectedMonths > 1 ? "s" : ""}`,
      },
    ];

    if (glp1Answer !== null) {
      answers.push({
        question: "Are you currently taking a GLP-1 medication?",
        answer: glp1Answer === "yes" ? "Yes" : "No",
      });
    }

    if (glp1Answer === "yes" && currentGlp1Name.trim()) {
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

    if (medicationAnswer !== null) {
      answers.push({
        question: "Which medication would you like?",
        answer: selectedMedicationLabel,
      });
    }

    return answers;
  }, [
    currentGlp1Name,
    doseAnswer,
    doseValue,
    glp1Answer,
    medicationAnswer,
    selectedMedicationLabel,
    selectedMonths,
  ]);

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
  }, [questionnaireAnswers]);

  const canMoveNext = useMemo(() => {
    switch (step) {
      case "glp1":
        return glp1Answer !== null;
      case "currentGlp1":
        return currentGlp1Name.trim().length > 0;
      case "dose":
        if (doseAnswer === "known") {
          return doseValue.trim().length > 0;
        }
        return doseAnswer !== null;
      case "medication":
        return medicationAnswer !== null;
      default:
        return true;
    }
  }, [
    currentGlp1Name,
    doseAnswer,
    doseValue,
    glp1Answer,
    medicationAnswer,
    step,
  ]);

  const optionBaseClasses =
    "flex min-h-16 items-center justify-center rounded-2xl border-2 px-4 py-4 text-lg transition-colors duration-200";

  const getOptionClasses = (selected: boolean) =>
    `${optionBaseClasses} ${
      selected
        ? "border-primary bg-[#ECF3FF] text-primary"
        : "border-gray-200 bg-white text-[#121826] hover:border-primary/50"
    }`;

  const handleNext = () => {
    if (!canMoveNext) return;

    if (step === "glp1") {
      if (glp1Answer === "yes") {
        setStep("currentGlp1");
      } else {
        setStep("medication");
      }
      return;
    }

    if (step === "currentGlp1") {
      setStep("dose");
      return;
    }

    if (step === "dose") {
      setStep("medication");
      return;
    }

    if (step === "medication") {
      setStep("summary");
    }
  };

  const handleBack = () => {
    if (step === "glp1") {
      setStep("intro");
      return;
    }

    if (step === "currentGlp1") {
      setStep("glp1");
      return;
    }

    if (step === "dose") {
      setStep(glp1Answer === "yes" ? "currentGlp1" : "glp1");
      return;
    }

    if (step === "medication") {
      setStep(glp1Answer === "yes" ? "dose" : "glp1");
      return;
    }

    if (step === "summary") {
      setStep("medication");
    }
  };

  const renderProgress = () => (
    <div className="h-1.5 w-full rounded-full bg-[#E7EAF0]">
      <div
        className="h-full rounded-full bg-primary transition-all duration-300"
        style={{ width: progressWidth }}
      />
    </div>
  );

  const renderQuestionFooter = () => (
    <div className="mt-4 border-t border-[#E7EAF0] pt-6">
      <div className="flex items-center justify-between gap-4">
        <div className="text-lg text-[#98A2B3]">
          {step === "glp1"
            ? `Question ${currentQuestionNumber} of ${totalQuestions}`
            : ""}
        </div>
        <div className="flex items-center gap-3">
          {step !== "glp1" && (
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
      <div className="mx-auto  px-4 md:px-8 py-2 md:py-6  ">
        <div className="">
          <h3 className="text-xl md:text-2xl font-semibold text-[#121826]">
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
              One-time online doctor visit —{" "}
              <span className="text-primary font-bold">$50</span>
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
                  className={`rounded-xl border-2 px-5 py-4 text-center cursor-pointer transition-colors duration-200 ${
                    isSelected
                      ? "border-[#121826] bg-white text-[#121826]"
                      : "border-gray-200 bg-white text-[#121826] hover:border-primary/50"
                  }`}
                >
                  <div className="text-[18px] font-medium">
                    {option.months} month{option.months > 1 ? "s" : ""}
                  </div>
                  <div className="mt-1 text-xl text-primary font-medium">
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
            onClick={() => setStep("glp1")}
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

  const renderGlpQuestion = () => (
    <div className="px-4 md:px-8 py-3 md:py-6">
      {/* <div className="mt-7">{renderProgress()}</div> */}

      <div className="">
        <h2 className="text-xl text-gray-900 font-semibold md:text-2xl">
          Are you currently taking a GLP-1 medication?
        </h2>
        <p className="mt-1 text-base text-gray-500">
          This helps us personalize your treatment plan.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ThemeButton
          label="Yes"
          className="rounded-xl!"
          onClick={() => setGlp1Answer("yes")}
          variant={glp1Answer === "yes" ? "primaryFilled" : "outlinedBluish"}
        ></ThemeButton>
        <ThemeButton
          label="No"
          onClick={() => setGlp1Answer("no")}
          className="rounded-xl!"
          variant={glp1Answer === "no" ? "primaryFilled" : "outlinedBluish"}
        ></ThemeButton>
      </div>

      {renderQuestionFooter()}
    </div>
  );

  const renderDoseQuestion = () => (
    <div className="px-4 md:px-8 py-3 md:py-6">
      {/* <div className="mt-7">{renderProgress()}</div> */}

      <div className="">
        <h2 className="text-xl text-gray-900 font-semibold md:text-2xl">
          Do you know your current dose?
        </h2>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ThemeButton
          label="Yes, I know it"
          className="rounded-xl!"
          onClick={() => setDoseAnswer("known")}
          variant={doseAnswer === "known" ? "primaryFilled" : "outlinedBluish"}
        ></ThemeButton>
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
        ></ThemeButton>
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

  const renderCurrentGlp1Question = () => (
    <div className="px-4 md:px-8 py-3 md:py-6">
      <div className="">
        <h2 className="text-xl text-gray-900 font-semibold md:text-2xl">
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

  const renderMedicationQuestion = () => (
    <div className="px-4 md:px-8 py-3 md:py-6">
      {/* <div className="mt-7">{renderProgress()}</div> */}

      <div className="">
        <h2 className="text-xl text-gray-900 font-semibold md:text-2xl">
          Which medication would you like?
        </h2>
        <p className="mt-1 text-base text-gray-500">
          Your provider will confirm the best fit during your consult.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {/* <button
          type="button"
          onClick={() => setMedicationAnswer("semaglutide")}
          className={getOptionClasses(medicationAnswer === "semaglutide")}
        >
          Semaglutide
        </button> */}
        <ThemeButton
          label="Semaglutide"
          className="rounded-xl!"
          onClick={() => setMedicationAnswer("semaglutide")}
          variant={
            medicationAnswer === "semaglutide"
              ? "primaryFilled"
              : "outlinedBluish"
          }
        ></ThemeButton>
        <ThemeButton
          label="Tirzepatide"
          className="rounded-xl!"
          onClick={() => setMedicationAnswer("tirzepatide")}
          variant={
            medicationAnswer === "tirzepatide"
              ? "primaryFilled"
              : "outlinedBluish"
          }
        ></ThemeButton>

        <button
          type="button"
          onClick={() => setMedicationAnswer("help")}
          className={`${getOptionClasses(medicationAnswer === "help")} border-dashed`}
        >
          <PhoneIcon />
          <span className="ml-2">Help me choose</span>
        </button>
      </div>

      {renderQuestionFooter()}
    </div>
  );

  const renderSummary = () => (
    <div className="px-4 md:px-8 py-3 md:py-6">
      {/* <div className="mt-7">{renderProgress()}</div> */}

      <div className="">
        <h2 className="text-xl text-gray-900 font-semibold md:text-2xl">
          Almost there
        </h2>
        <p className="mt-1 text-base text-gray-500">
          Complete your health questionnaire to finish enrollment.
        </p>
      </div>

      <div className="mt-4 rounded-xl bg-[#ECF3FF] px-4 py-3 text-gray-600">
        <div className="flex items-center gap-3 text-lg font-medium">
          <CheckIcon />
          <span>
            Prefers:{" "}
            <span className="font-semibold text-primary">
              {selectedMedicationLabel}
            </span>
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        {summarySections.map((section) => (
          <div
            key={section}
            className="flex items-center gap-2 border-b border-[#E7EAF0] py-2 text-sm text-gray-600"
          >
            {/* <PlusIcon /> */}
            <span>{section}</span>
          </div>
        ))}
      </div>

      <p className="mt-2 text-sm text-gray-600">+ 10 more questions</p>

      <div className="mt-3 pt-3 gap-2 flex md:flex-row flex-col-reverse items-center">
        <ThemeButton
          label="Back"
          onClick={handleBack}
          variant="outlinedBluish"
          className="rounded-full! w-full md:w-auto py-2.5!"
        />
        <ThemeButton
          label="Start questionnaire"
          onClick={onStartQuestionnaire}
          variant="primaryFilled"
          // size="xl"
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
      // subtitle="Select a program to begin"
      size="large"
      bodyPaddingClasses="p-0"
      scrollNeeded
    >
      {step === "intro" && renderIntro()}
      {step === "glp1" && renderGlpQuestion()}
      {step === "currentGlp1" && renderCurrentGlp1Question()}
      {step === "dose" && renderDoseQuestion()}
      {step === "medication" && renderMedicationQuestion()}
      {step === "summary" && renderSummary()}
    </AppModal>
  );
};

export default WeightLossProgramModal;
