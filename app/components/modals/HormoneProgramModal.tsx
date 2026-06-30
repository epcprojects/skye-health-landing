"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import AppModal from "./AppModal";
import ThemeButton from "../Button/ThemeButton";
import ThemeInput from "../inputs/ThemeInput";
import {
  ArrowRightIcon,
  CheckIcon,
  PhoneFilledIcon,
  WaveIcon,
} from "@/public/icons";

type HormoneProgramModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onStartQuestionnaire: () => void;
};

type SexAnswer = "male" | "female" | null;
type TherapyAnswer = "yes" | "no" | null;
type HappyAnswer = "yes" | "no" | null;
type ModalStep = "intro" | "sex" | "reasons" | "therapy" | "goals" | "summary";

const HORMONE_PROGRAM_STORAGE_KEY = "skye-hormone-program";

const maleReasons = [
  "Low energy or fatigue",
  "Weight gain",
  "Low libido",
  "Erectile dysfunction",
  "Loss of muscle or strength",
  "Brain fog",
  "Mood changes",
  "Poor sleep",
  "Healthy aging",
  "Hormone optimization",
  "I don't know yet / Other",
] as const;

const femaleReasons = [
  "Perimenopause or Menopause",
  "Weight gain",
  "Fatigue",
  "Brain fog",
  "Proactive aging support",
  "I don't know yet / Other",
] as const;

const maleGoals = [
  "More energy",
  "Better focus and mental clarity",
  "Lose weight / body fat",
  "Build muscle and strength",
  "Improve exercise performance and recovery",
  "Increase libido / sexual performance",
  "Improve mood",
  "Better sleep",
  "Optimize hormones",
  "Healthy aging and longevity",
] as const;

const femaleGoals = [
  "Improve sleep quality",
  "Lose weight",
  "Increase libido",
  "Decreased brain fog",
  "Eliminate hot flashes",
  "Vaginal lubrication",
  "Stop thinning hair",
  "Reduce anxiety",
  "Treat PCOS",
] as const;

const summarySections = [
  "Symptoms and treatment priorities",
  "Current hormone therapy details",
  "Health history and medication review",
  "Hormone optimization goals",
  "Next-step provider recommendations",
];

const HormoneProgramModal = ({
  isOpen,
  onClose,
  onStartQuestionnaire,
}: HormoneProgramModalProps) => {
  const [step, setStep] = useState<ModalStep>("intro");
  const [sexAnswer, setSexAnswer] = useState<SexAnswer>(null);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [therapyAnswer, setTherapyAnswer] = useState<TherapyAnswer>(null);
  const [therapyDetails, setTherapyDetails] = useState("");
  const [happyWithTreatment, setHappyWithTreatment] =
    useState<HappyAnswer>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep("intro");
      setSexAnswer(null);
      setSelectedReasons([]);
      setTherapyAnswer(null);
      setTherapyDetails("");
      setHappyWithTreatment(null);
      setSelectedGoals([]);
    }
  }, [isOpen]);

  const reasonsOptions = useMemo(
    () => (sexAnswer === "female" ? femaleReasons : maleReasons),
    [sexAnswer],
  );

  const goalsOptions = useMemo(
    () => (sexAnswer === "female" ? femaleGoals : maleGoals),
    [sexAnswer],
  );

  const currentQuestionNumber = useMemo(() => {
    switch (step) {
      case "sex":
        return 1;
      case "reasons":
        return 2;
      case "therapy":
        return 3;
      case "goals":
        return 4;
      default:
        return 0;
    }
  }, [step]);

  const totalQuestions = 4;

  const canMoveNext = useMemo(() => {
    switch (step) {
      case "sex":
        return sexAnswer !== null;
      case "reasons":
        return selectedReasons.length > 0;
      case "therapy":
        if (therapyAnswer === "yes") {
          return (
            therapyDetails.trim().length > 0 && happyWithTreatment !== null
          );
        }
        return therapyAnswer === "no";
      case "goals":
        return selectedGoals.length > 0;
      default:
        return true;
    }
  }, [
    happyWithTreatment,
    selectedGoals.length,
    selectedReasons.length,
    sexAnswer,
    step,
    therapyAnswer,
    therapyDetails,
  ]);

  const questionnaireAnswers = useMemo(() => {
    const answers: Array<{ question: string; answer: string }> = [];

    if (sexAnswer !== null) {
      answers.push({
        question: "What sex were you assigned at birth?",
        answer: sexAnswer === "male" ? "Male" : "Female",
      });
    }

    if (selectedReasons.length > 0) {
      answers.push({
        question: "What brings you here today?",
        answer: selectedReasons.join(" | "),
      });
    }

    if (therapyAnswer !== null) {
      answers.push({
        question: "Are you currently taking hormone therapy?",
        answer: therapyAnswer === "yes" ? "Yes" : "No",
      });
    }

    if (therapyAnswer === "yes" && therapyDetails.trim()) {
      answers.push({
        question: "List medication, strength & duration of treatment",
        answer: therapyDetails.trim(),
      });
    }

    if (therapyAnswer === "yes" && happyWithTreatment !== null) {
      answers.push({
        question: "Are you happy with your current treatment?",
        answer: happyWithTreatment === "yes" ? "Yes" : "No",
      });
    }

    if (selectedGoals.length > 0) {
      answers.push({
        question: "What do you want to improve?",
        answer: selectedGoals.join(" | "),
      });
    }

    return answers;
  }, [
    happyWithTreatment,
    selectedGoals,
    selectedReasons,
    sexAnswer,
    therapyAnswer,
    therapyDetails,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isOpen) return;

    window.localStorage.setItem(
      HORMONE_PROGRAM_STORAGE_KEY,
      JSON.stringify({
        program: "hormone",
        updatedAt: new Date().toISOString(),
        answers: questionnaireAnswers,
      }),
    );
  }, [isOpen, questionnaireAnswers]);

  const progressWidth = useMemo(() => {
    if (step === "summary") return "100%";
    if (step === "intro") return "0%";
    return `${(currentQuestionNumber / totalQuestions) * 100}%`;
  }, [currentQuestionNumber, step]);

  const optionBaseClasses =
    "flex min-h-16 items-center justify-center rounded-2xl border-2 px-4 py-4 text-lg transition-colors duration-200";

  const getOptionClasses = (selected: boolean) =>
    `${optionBaseClasses} ${
      selected
        ? "border-primary bg-[#ECF3FF] text-primary"
        : "border-gray-200 bg-white text-[#121826] hover:border-primary/50"
    }`;

  const toggleSelection = (
    value: string,
    setSelectedValues: Dispatch<SetStateAction<string[]>>,
  ) => {
    setSelectedValues((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const handleNext = () => {
    if (!canMoveNext) return;

    if (step === "sex") {
      setStep("reasons");
      return;
    }

    if (step === "reasons") {
      setStep("therapy");
      return;
    }

    if (step === "therapy") {
      setStep("goals");
      return;
    }

    if (step === "goals") {
      setStep("summary");
    }
  };

  const handleBack = () => {
    if (step === "sex") {
      setStep("intro");
      return;
    }

    if (step === "reasons") {
      setStep("sex");
      return;
    }

    if (step === "therapy") {
      setStep("reasons");
      return;
    }

    if (step === "goals") {
      setStep("therapy");
      return;
    }

    if (step === "summary") {
      setStep("goals");
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
          {step === "sex"
            ? `Question ${currentQuestionNumber} of ${totalQuestions}`
            : ""}
        </div>
        <div className="flex items-center gap-3">
          {step !== "sex" && (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex min-w-28 items-center justify-center gap-2 rounded-2xl border border-[#D8DDE5] px-5 py-3 text-lg text-[#5B667A] transition-colors hover:bg-gray-50"
            >
              <span aria-hidden="true">←</span>
              Back
            </button>
          )}
          <ThemeButton
            label="Next"
            onClick={handleNext}
            disabled={!canMoveNext}
            variant="primaryFilled"
            size="sm"
            icon={<ArrowRightIcon />}
            iconPosition="end"
            className="min-w-28 rounded-xl!"
          />
        </div>
      </div>
    </div>
  );

  const renderIntro = () => (
    <div>
      <div className="mx-auto px-4 py-2 md:px-8 md:py-6">
        <div>
          <h3 className="text-xl font-semibold text-[#121826] md:text-2xl">
            Hormone Therapy
          </h3>
          <div className="mt-2 flex items-end gap-2 text-primary">
            <span className="text-[52px] font-bold leading-none">$50</span>
            <span className="pb-1 text-[20px]">doctor consult</span>
          </div>
          <p className="mt-2 text-[18px] text-gray-600">
            Final price depends on the treatment your provider approves.
          </p>
        </div>

        <div className="mt-8 space-y-4 text-[20px] text-[#5B667A]">
          <div className="flex items-center gap-3">
            <WaveIcon />
            <span>Personalized hormone therapy review</span>
          </div>

          <div className="flex items-center gap-3">
            <PhoneFilledIcon />
            <span>Doctor consult and treatment planning</span>
          </div>
        </div>

        <div className="mt-6">
          <ThemeButton
            label="Get started"
            onClick={() => setStep("sex")}
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

  const renderSexQuestion = () => (
    <div className="px-4 py-3 md:px-8 md:py-6">
      {renderProgress()}

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
          What sex were you assigned at birth?
        </h2>
        <p className="mt-1 text-base text-gray-500">
          This helps us provide clinically accurate recommendations and lab
          reference ranges.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ThemeButton
          label="Male"
          className="rounded-xl!"
          onClick={() => {
            setSexAnswer("male");
            setSelectedReasons([]);
            setSelectedGoals([]);
          }}
          variant={sexAnswer === "male" ? "primaryFilled" : "outlinedBluish"}
        />
        <ThemeButton
          label="Female"
          className="rounded-xl!"
          onClick={() => {
            setSexAnswer("female");
            setSelectedReasons([]);
            setSelectedGoals([]);
          }}
          variant={sexAnswer === "female" ? "primaryFilled" : "outlinedBluish"}
        />
      </div>

      {renderQuestionFooter()}
    </div>
  );

  const renderReasonsQuestion = () => (
    <div className="px-4 py-3 md:px-8 md:py-6">
      {renderProgress()}

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
          What brings you here today?
        </h2>
        <p className="mt-1 text-base text-gray-500">Check all that apply.</p>
      </div>

      <div className="mt-8 grid gap-3">
        {reasonsOptions.map((reason) => {
          const selected = selectedReasons.includes(reason);

          return (
            <button
              key={reason}
              type="button"
              onClick={() => toggleSelection(reason, setSelectedReasons)}
              className={`${getOptionClasses(selected)} min-h-14 justify-start text-left text-base font-medium`}
            >
              <span>{reason}</span>
            </button>
          );
        })}
      </div>

      {renderQuestionFooter()}
    </div>
  );

  const renderTherapyQuestion = () => (
    <div className="px-4 py-3 md:px-8 md:py-6">
      {renderProgress()}

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
          Are you currently taking hormone therapy?
        </h2>
        <p className="mt-1 text-base text-gray-500">
          {sexAnswer === "female"
            ? "Examples: estrogen, progesterone, testosterone."
            : "Examples: testosterone, enclomiphene, clomifene, HCG."}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ThemeButton
          label="Yes"
          className="rounded-xl!"
          onClick={() => setTherapyAnswer("yes")}
          variant={therapyAnswer === "yes" ? "primaryFilled" : "outlinedBluish"}
        />
        <ThemeButton
          label="No"
          className="rounded-xl!"
          onClick={() => {
            setTherapyAnswer("no");
            setTherapyDetails("");
            setHappyWithTreatment(null);
          }}
          variant={therapyAnswer === "no" ? "primaryFilled" : "outlinedBluish"}
        />
      </div>

      {therapyAnswer === "yes" && (
        <div className="mt-6 space-y-6">
          <ThemeInput
            label="List medication, strength & duration of treatment"
            placeholder="e.g. Testosterone cypionate 100mg weekly, 8 months"
            value={therapyDetails}
            onChange={(event) => setTherapyDetails(event.target.value)}
            className="h-14 rounded-2xl border-[#D8DDE5] px-4 text-lg placeholder:text-[#98A2B3]"
          />

          <div>
            <p className="text-base font-semibold text-[#121826]">
              Are you happy with your current treatment?
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <ThemeButton
                label="Yes"
                className="rounded-xl!"
                onClick={() => setHappyWithTreatment("yes")}
                variant={
                  happyWithTreatment === "yes"
                    ? "primaryFilled"
                    : "outlinedBluish"
                }
              />
              <ThemeButton
                label="No"
                className="rounded-xl!"
                onClick={() => setHappyWithTreatment("no")}
                variant={
                  happyWithTreatment === "no"
                    ? "primaryFilled"
                    : "outlinedBluish"
                }
              />
            </div>
          </div>
        </div>
      )}

      {renderQuestionFooter()}
    </div>
  );

  const renderGoalsQuestion = () => (
    <div className="px-4 py-3 md:px-8 md:py-6">
      {renderProgress()}

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
          What do you want to improve?
        </h2>
        <p className="mt-1 text-base text-gray-500">Check all that apply.</p>
      </div>

      <div className="mt-8 grid gap-3">
        {goalsOptions.map((goal) => {
          const selected = selectedGoals.includes(goal);

          return (
            <button
              key={goal}
              type="button"
              onClick={() => toggleSelection(goal, setSelectedGoals)}
              className={`${getOptionClasses(selected)} min-h-14 justify-start text-left text-base font-medium`}
            >
              <span>{goal}</span>
            </button>
          );
        })}
      </div>

      {renderQuestionFooter()}
    </div>
  );

  const renderSummary = () => (
    <div className="px-4 py-3 md:px-8 md:py-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
          Almost there
        </h2>
        <p className="mt-1 text-base text-gray-500">
          Complete your hormone questionnaire to continue enrollment.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-xl bg-[#ECF3FF] px-4 py-3 text-gray-600">
          <div className="flex items-center gap-3 text-lg font-medium">
            <CheckIcon />
            <span>
              Sex assigned at birth:{" "}
              <span className="font-semibold text-primary">
                {sexAnswer === "female" ? "Female" : "Male"}
              </span>
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-[#ECF3FF] px-4 py-3 text-gray-600">
          <div className="flex items-center gap-3 text-lg font-medium">
            <CheckIcon />
            <span>
              Current hormone therapy:{" "}
              <span className="font-semibold text-primary">
                {therapyAnswer === "yes" ? "Yes" : "No"}
              </span>
            </span>
          </div>
        </div>
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

      <p className="mt-2 text-sm text-gray-600">
        + provider review and next-step planning
      </p>

      <div className="mt-3 flex md:flex-row flex-col-reverse items-center gap-2 pt-3">
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
      title="Start your hormone
therapy journey"
      size="large"
      bodyPaddingClasses="p-0"
      scrollNeeded
    >
      {step === "intro" && renderIntro()}
      {step === "sex" && renderSexQuestion()}
      {step === "reasons" && renderReasonsQuestion()}
      {step === "therapy" && renderTherapyQuestion()}
      {step === "goals" && renderGoalsQuestion()}
      {step === "summary" && renderSummary()}
    </AppModal>
  );
};

export default HormoneProgramModal;
