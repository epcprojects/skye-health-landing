import { useMemo, useCallback, useEffect } from "react";
import { QuestionType, SurveyType } from "@/app/graphql/queries/survey";
import ThemeInput from "../inputs/ThemeInput";
import CustomCheckbox from "../CustomCheckBox";

export interface SurveyAnswerEntry {
  questionOptionIds?: string[];
  valueText?: string;
}

export interface SurveyAnswers {
  [questionId: string]: SurveyAnswerEntry;
}

interface SurveyQuestionnaireProps {
  survey: SurveyType;
  answers: SurveyAnswers;
  currentQuestionIndex: number;
  onSingleSelect: (questionId: string, optionId: string) => void;
  onMultiSelect: (
    questionId: string,
    optionId: string,
    checked: boolean,
  ) => void;
  onTextChange: (questionId: string, value: string) => void;
  onComplete: () => void;
  onQuestionIndexChange: (index: number) => void;
}

interface SurveyQuestionProps {
  survey: SurveyType;
  allAnswers: SurveyAnswers;
  question: QuestionType;
  answers: SurveyAnswerEntry | undefined;
  onSingleSelect: (optionId: string) => void;
  onMultiSelect: (optionId: string, checked: boolean) => void;
  onTextChange: (value: string) => void;
}

function endsWithColon(text?: string) {
  return /:\s*$/.test(text ?? "");
}

function normalizeText(text?: string | null) {
  return text?.trim().toLowerCase().replace(/\s+/g, " ") ?? "";
}

function isHeightQuestion(question: QuestionType) {
  const normalizedQuestion = normalizeText(question.body);

  return (
    normalizedQuestion === "height:" ||
    normalizedQuestion === "what is your height?"
  );
}

function isWeightQuestion(question: QuestionType) {
  const normalizedQuestion = normalizeText(question.body);

  return (
    normalizedQuestion === "weight:" ||
    normalizedQuestion === "what is your weight?"
  );
}

function isBmiQuestion(question: QuestionType) {
  return normalizeText(question.body) === "what is your bmi?";
}

function findQuestionByBody(survey: SurveyType, body: string) {
  return survey.questions?.find(
    (question) => normalizeText(question.body) === normalizeText(body),
  );
}

function getSingleSelectAnswerValue(
  survey: SurveyType,
  answers: SurveyAnswers,
  body: string,
) {
  const question = findQuestionByBody(survey, body);
  if (!question) return undefined;

  const selectedOptionId = answers[question.id]?.questionOptionIds?.[0];
  if (!selectedOptionId) return undefined;

  const selectedOption = question.questionOptions?.find(
    (option) => option.id === selectedOptionId,
  );

  return normalizeText(
    selectedOption?.value || selectedOption?.optionText || undefined,
  );
}

function startsWithNormalized(text?: string | null, prefix?: string) {
  return normalizeText(text).startsWith(normalizeText(prefix));
}

function isWeightLossSurvey(survey: SurveyType) {
  return (
    normalizeText(survey.name) === "weight loss program" ||
    normalizeText(survey.category) === "weight loss program"
  );
}

function isHormoneSurvey(survey: SurveyType) {
  return (
    normalizeText(survey.name) === "hormone program" ||
    normalizeText(survey.category) === "hormone program"
  );
}

function isHormoneTherapyFollowupQuestion(question: QuestionType) {
  return (
    startsWithNormalized(question.body, "List medication, strength") ||
    startsWithNormalized(question.body, "Are you happy with your current treatment?")
  );
}

function isFemaleHormoneQuestion(question: QuestionType) {
  return (
    startsWithNormalized(question.body, "Pregnancy") ||
    startsWithNormalized(question.body, "Menstrual") ||
    startsWithNormalized(question.body, "Uterus") ||
    startsWithNormalized(question.body, "Cervical screening") ||
    startsWithNormalized(question.body, "Breast screening")
  );
}

function isMaleHormoneQuestion(question: QuestionType) {
  return (
    startsWithNormalized(question.body, "Fertility intent") ||
    startsWithNormalized(question.body, "PSA")
  );
}

function parseHeightValue(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { feet: "", inches: "" };
  }

  const formattedMatch = trimmed.match(/^(\d*)\s*ft\s*(\d*)\s*in$/i);
  if (formattedMatch) {
    return {
      feet: formattedMatch[1] ?? "",
      inches: formattedMatch[2] ?? "",
    };
  }

  const compactMatch = trimmed.match(/^(\d*)'\s*(\d*)"?$/);
  if (compactMatch) {
    return {
      feet: compactMatch[1] ?? "",
      inches: compactMatch[2] ?? "",
    };
  }

  const numericParts = trimmed.match(/\d+/g) ?? [];
  return {
    feet: numericParts[0] ?? "",
    inches: numericParts[1] ?? "",
  };
}

function buildHeightValue(feet: string, inches: string) {
  const normalizedFeet = feet.trim();
  const normalizedInches = inches.trim();

  if (!normalizedFeet && !normalizedInches) return "";
  return `${normalizedFeet}'${normalizedInches}"`;
}

function sanitizeHeightPart(
  raw: string,
  { min, max }: { min: number; max: number },
) {
  const digitsOnly = raw.replace(/\D/g, "");
  if (!digitsOnly) return "";

  const numericValue = Number(digitsOnly);
  if (!Number.isFinite(numericValue)) return "";

  const clampedValue = Math.min(Math.max(numericValue, min), max);
  return String(clampedValue);
}

function sanitizeWeightValue(raw: string) {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const segments = cleaned.split(".");

  if (segments.length <= 1) {
    if (!cleaned) return "";

    const numericValue = Number.parseFloat(cleaned);
    if (!Number.isFinite(numericValue)) return "";

    const clampedValue = Math.min(Math.max(numericValue, 1), 700);
    return String(clampedValue);
  }

  const normalized = `${segments[0]}.${segments.slice(1).join("")}`;
  if (!normalized) return "";

  const numericValue = Number.parseFloat(normalized);
  if (!Number.isFinite(numericValue)) return "";

  const clampedValue = Math.min(Math.max(numericValue, 1), 700);
  return String(clampedValue);
}

function findAnswerValueByQuestion(
  survey: SurveyType,
  answers: SurveyAnswers,
  body: string,
) {
  const matchingQuestion = survey.questions?.find(
    (question) => normalizeText(question.body) === normalizeText(body),
  );

  return matchingQuestion
    ? (answers[matchingQuestion.id]?.valueText ?? "")
    : "";
}

function parseWeightValue(raw: string) {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) return null;

  const numericValue = Number.parseFloat(trimmed.replace(/,/g, ""));
  if (!Number.isFinite(numericValue) || numericValue <= 0) return null;

  if (
    trimmed.includes("kg") ||
    trimmed.includes("kilogram") ||
    trimmed.includes("kilograms")
  ) {
    return numericValue;
  }

  return numericValue * 0.45359237;
}

function getBmiData(heightRaw: string, weightRaw: string) {
  const { feet, inches } = parseHeightValue(heightRaw);
  const feetValue = Number.parseFloat(feet || "0");
  const inchesValue = Number.parseFloat(inches || "0");
  const weightKg = parseWeightValue(weightRaw);

  if (
    !Number.isFinite(feetValue) ||
    !Number.isFinite(inchesValue) ||
    feetValue <= 0 ||
    !weightKg
  ) {
    return null;
  }

  const totalInches = feetValue * 12 + inchesValue;
  const heightMeters = totalInches * 0.0254;

  if (!Number.isFinite(heightMeters) || heightMeters <= 0) return null;

  const bmi = weightKg / (heightMeters * heightMeters);

  if (!Number.isFinite(bmi) || bmi <= 0) return null;

  let category = "Obesity";
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";

  return {
    value: bmi.toFixed(1),
    category,
  };
}

const DEFER_OPTION_TEXT = "no consent - defer exam.";

function isDeferOption(question: QuestionType, optionId: string) {
  const option = question.questionOptions?.find((opt) => opt.id === optionId);
  if (!option) return false;

  const isTextMatch =
    option.optionText?.trim().toLowerCase() === DEFER_OPTION_TEXT;
  const isConfiguredDefer = !!question.deferOptionIds?.includes(
    option.qualiphyRecordId,
  );

  return isTextMatch || isConfiguredDefer;
}

function parseInlineTextMap(question: QuestionType, raw: string) {
  const result: Record<string, string> = {};
  const options =
    question.questionOptions
      ?.slice()
      .sort((a, b) => a.position - b.position)
      .filter((opt) => endsWithColon(opt.optionText)) ?? [];

  if (!raw?.trim() || options.length === 0) return result;
  const lines = raw.split(/\r?\n/);
  const labelToId = new Map(
    options.map((opt) => [opt.optionText.trim().toLowerCase(), opt.id]),
  );

  let matchedAnyLine = false;
  for (const line of lines) {
    const normalizedLine = line.trimStart();
    for (const [label, id] of labelToId.entries()) {
      if (!normalizedLine.toLowerCase().startsWith(label)) continue;
      const rawValue = normalizedLine.slice(label.length);
      const value = rawValue.startsWith(" ") ? rawValue.slice(1) : rawValue;
      result[id] = value;
      matchedAnyLine = true;
      break;
    }
  }

  // If prior saved valueText is old/plain format, do not prefill inline fields.
  if (!matchedAnyLine) return {};

  for (const opt of options) {
    if (!(opt.id in result)) result[opt.id] = "";
  }
  return result;
}

function buildInlineTextValue(
  question: QuestionType,
  textMap: Record<string, string>,
) {
  const options =
    question.questionOptions
      ?.slice()
      .sort((a, b) => a.position - b.position)
      .filter((opt) => endsWithColon(opt.optionText)) ?? [];

  return options
    .map((opt) => `${opt.optionText.trim()} ${textMap[opt.id] ?? ""}`)
    .join("\n");
}

function SurveyQuestion({
  survey,
  allAnswers,
  question,
  answers,
  onSingleSelect,
  onMultiSelect,
  onTextChange,
}: SurveyQuestionProps) {
  const optionIds = answers?.questionOptionIds ?? [];
  const valueText = answers?.valueText ?? "";
  const optionTextMap = useMemo(
    () => parseInlineTextMap(question, valueText),
    [question, valueText],
  );
  const colonOptions =
    question.questionOptions
      ?.slice()
      .sort((a, b) => a.position - b.position)
      .filter((opt) => endsWithColon(opt.optionText)) ?? [];
  const inlineInputOptions = colonOptions.filter(
    (opt) => !isDeferOption(question, opt.id),
  );
  const isHeightField =
    question.questionType === "text" && isHeightQuestion(question);
  const isWeightField =
    question.questionType === "text" && isWeightQuestion(question);
  const heightValue = useMemo(() => parseHeightValue(valueText), [valueText]);
  const bmiData = useMemo(() => {
    if (!isWeightField) return null;

    const savedHeight = findAnswerValueByQuestion(
      survey,
      allAnswers,
      "What is your height?",
    );

    return getBmiData(savedHeight, valueText);
  }, [allAnswers, isWeightField, survey, valueText]);

  return (
    <div className="overflow-hidden">
      <span className="flex-1 min-w-0 text-left text-base font-medium text-neutral-900 md:text-xl">
        {question.body}
      </span>

      <div className="pt-4 space-y-3">
        {question.questionType === "single_select" && (
          <div
            className="flex flex-col gap-2 md:gap-5"
            role="radiogroup"
            aria-label={question.body}
          >
            {question.questionOptions
              ?.slice()
              .sort((a, b) => a.position - b.position)
              .map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSingleSelect(opt.id)}
                  className={[
                    "w-full rounded-xl border p-3 text-left cursor-pointer transition sm:p-4 flex items-center justify-between gap-3",
                    optionIds.includes(opt.id)
                      ? "border-primary/30 border-2 bg-lightblue"
                      : "border-neutral-300 bg-white hover:bg-neutral-50",
                  ].join(" ")}
                >
                  <span className="text-sm text-neutral-900 sm:text-lg">
                    {opt.optionText}
                  </span>
                </button>
              ))}
          </div>
        )}

        {question.questionType === "multi_select" && (
          <div className="flex flex-col justify-start gap-2 md:gap-5">
            {question.questionOptions
              ?.slice()
              .sort((a, b) => a.position - b.position)
              .map((opt) => (
                <div
                  key={opt.id}
                  className={[
                    "w-full rounded-xl border transition flex items-center justify-between gap-3",
                    optionIds.includes(opt.id)
                      ? "border-primary/30 border-2 bg-lightblue"
                      : "border-neutral-300 bg-white hover:bg-neutral-50",
                  ].join(" ")}
                >
                  <CustomCheckbox
                    id={`${question.id}-${opt.id}`}
                    label={opt.optionText}
                    direction="flex-row-reverse"
                    checked={optionIds.includes(opt.id)}
                    width={`w-full`}
                    fullWidth="w-full p-3 md:p-4"
                    onChange={(e) => onMultiSelect(opt.id, e)}
                  />
                </div>
              ))}
          </div>
        )}

        {question.questionType === "single_select_with_text" && (
          <div className="flex flex-col gap-3">
            <div
              className="flex flex-col gap-2 md:gap-5"
              role="radiogroup"
              aria-label={question.body}
            >
              {question.questionOptions
                ?.slice()
                .sort((a, b) => a.position - b.position)
                .map((opt) => {
                  const hasInlineInput =
                    endsWithColon(opt.optionText) &&
                    !isDeferOption(question, opt.id);
                  return (
                    <div
                      key={opt.id}
                      className={[
                        "w-full rounded-xl border p-3 text-left transition sm:p-4",
                        optionIds.includes(opt.id)
                          ? "border-primary-light/80 border-2 bg-blue-50"
                          : "border-neutral-300 bg-white hover:bg-neutral-50",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        onClick={() => onSingleSelect(opt.id)}
                        className="w-full cursor-pointer text-left flex items-center justify-between gap-3"
                      >
                        <span className="text-sm text-neutral-900 sm:text-lg">
                          {opt.optionText}
                        </span>
                      </button>

                      {hasInlineInput && (
                        <ThemeInput
                          label=""
                          value={optionTextMap[opt.id] ?? ""}
                          onFocus={() => {
                            if (!optionIds.includes(opt.id)) {
                              onSingleSelect(opt.id);
                            }
                          }}
                          onChange={(e) => {
                            if (!optionIds.includes(opt.id)) {
                              onSingleSelect(opt.id);
                            }
                            const nextMap = {
                              ...optionTextMap,
                              [opt.id]: e.target.value,
                            };
                            onTextChange(
                              buildInlineTextValue(question, nextMap),
                            );
                          }}
                          placeholder="Add more details (optional)"
                          className="w-full rounded-lg! px-3 py-2! text-base! md:px-4! mt-2 md:mt-3 md:py-5! md:text-lg!"
                        />
                      )}
                    </div>
                  );
                })}
            </div>

            {inlineInputOptions.length === 0 && (
              <ThemeInput
                label=""
                value={valueText}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder="Add more details (optional)"
                className="w-full rounded-xl! p-3 text-sm! md:px-4! mt-8 md:py-7! md:text-lg!"
              />
            )}
          </div>
        )}

        {question.questionType === "multi_select_with_text" && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 md:gap-5">
              {question.questionOptions
                ?.slice()
                .sort((a, b) => a.position - b.position)
                .map((opt) => (
                  <div
                    key={opt.id}
                    className={[
                      "w-full rounded-xl border transition flex items-center justify-between gap-3",
                      optionIds.includes(opt.id)
                        ? "border-primary/30 border-2 bg-lightblue"
                        : "border-neutral-300 bg-white hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    <CustomCheckbox
                      id={`${question.id}-${opt.id}`}
                      label={opt.optionText}
                      direction="flex-row-reverse"
                      checked={optionIds.includes(opt.id)}
                      width="w-full"
                      fullWidth="w-full p-3 md:p-4"
                      onChange={(e) => onMultiSelect(opt.id, e)}
                    />
                  </div>
                ))}
            </div>

            <ThemeInput
              label=""
              value={valueText}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Add more details (optional)"
              className="w-full rounded-xl! p-3 text-sm! md:px-4! md:py-7! mt-8  md:text-lg!"
            />
          </div>
        )}

        {question.questionType === "text" &&
          (isHeightField ? (
            <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
              <ThemeInput
                label="Feet"
                type="number"
                value={heightValue.feet}
                onChange={(e) =>
                  onTextChange(
                    buildHeightValue(
                      sanitizeHeightPart(e.target.value, { min: 1, max: 8 }),
                      heightValue.inches,
                    ),
                  )
                }
                placeholder="Enter feet"
                maxLength={1}
                className="w-full rounded-xl! p-3 text-sm! md:px-4! md:py-7! md:text-lg!"
              />
              <ThemeInput
                label="Inches"
                type="number"
                value={heightValue.inches}
                onChange={(e) =>
                  onTextChange(
                    buildHeightValue(
                      heightValue.feet,
                      sanitizeHeightPart(e.target.value, { min: 0, max: 11 }),
                    ),
                  )
                }
                placeholder="Enter inches"
                maxLength={2}
                className="w-full rounded-xl! p-3 text-sm! md:px-4! md:py-7! md:text-lg!"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <ThemeInput
                label=""
                type={isWeightField ? "number" : "text"}
                value={valueText}
                onChange={(e) =>
                  onTextChange(
                    isWeightField
                      ? sanitizeWeightValue(e.target.value)
                      : e.target.value,
                  )
                }
                placeholder={
                  isWeightField
                    ? "Enter your weight in pounds (lbs)"
                    : "Enter your answer"
                }
                className="w-full rounded-xl! p-3 text-sm! md:px-4! md:py-7! mt-8  md:text-lg!"
              />

              {isWeightField && bmiData && (
                <div className="rounded-xl border border-neutral-300 bg-white px-5 py-4 md:px-4 md:py-3">
                  <span className="text-2xl font-semibold text-neutral-900 md:text-2xl">
                    BMI = {bmiData.value}
                  </span>{" "}
                  <span className="text-lg text-neutral-400 md:text-xl">
                    ({bmiData.category})
                  </span>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export function SurveyQuestionnaire({
  survey,
  answers,
  currentQuestionIndex,
  onSingleSelect,
  onMultiSelect,
  onTextChange,
  onComplete,
  onQuestionIndexChange,
}: SurveyQuestionnaireProps) {
  const sortedQuestions = useMemo(
    () => {
      const allQuestions =
        survey.questions
          ?.filter((question) => !isBmiQuestion(question))
          .slice()
          .sort((a, b) => a.position - b.position) ?? [];

      let visibleQuestions = allQuestions;

      if (isWeightLossSurvey(survey)) {
        const glp1Answer = getSingleSelectAnswerValue(
          survey,
          answers,
          "Are you currently taking a GLP-1 medication?",
        );
        const doseKnownAnswer = getSingleSelectAnswerValue(
          survey,
          answers,
          "Do you know your current dose?",
        );

        visibleQuestions = visibleQuestions.filter((question) => {
          const normalizedBody = normalizeText(question.body);

          if (normalizedBody === "which glp-1 are you taking?") {
            return glp1Answer !== "no";
          }

          if (normalizedBody === "do you know your current dose?") {
            return glp1Answer !== "no";
          }

          if (normalizedBody === "what is your current dose?") {
            return glp1Answer !== "no" && doseKnownAnswer !== "no";
          }

          if (normalizedBody === "which medication are you taking?") {
            return glp1Answer !== "no";
          }

          return true;
        });
      }

      if (isHormoneSurvey(survey)) {
        const sexAtBirthAnswer = getSingleSelectAnswerValue(
          survey,
          answers,
          "What sex were you assigned at birth?",
        );
        const onHormoneTherapyAnswer = getSingleSelectAnswerValue(
          survey,
          answers,
          "Are you currently taking hormone therapy?",
        );

        visibleQuestions = visibleQuestions.filter((question) => {
          if (isHormoneTherapyFollowupQuestion(question)) {
            return onHormoneTherapyAnswer === "yes";
          }

          if (isFemaleHormoneQuestion(question)) {
            return sexAtBirthAnswer === "female";
          }

          if (isMaleHormoneQuestion(question)) {
            return sexAtBirthAnswer === "male";
          }

          return true;
        });
      }

      return visibleQuestions;
    },
    [answers, survey],
  );

  function isQuestionAnswered(
    question: QuestionType,
    answer: SurveyAnswerEntry | undefined,
  ) {
    if (!answer) return false;

    const hasOptions = (answer.questionOptionIds?.length ?? 0) > 0;
    const hasText = (answer.valueText?.trim() ?? "").length > 0;

    switch (question.questionType) {
      case "single_select":
        return hasOptions;

      case "multi_select":
        return hasOptions;

      case "text":
        if (isHeightQuestion(question)) {
          const { feet, inches } = parseHeightValue(answer.valueText ?? "");
          return feet.trim().length > 0 && inches.trim().length > 0;
        }
        return hasText;

      case "single_select_with_text":
        return hasOptions;

      case "multi_select_with_text":
        return hasOptions;

      default:
        return false;
    }
  }

  const totalQuestions = sortedQuestions.length;
  const currentQuestion = sortedQuestions[currentQuestionIndex];

  const answeredCount = useMemo(() => {
    return sortedQuestions.filter((q) => isQuestionAnswered(q, answers[q.id]))
      .length;
  }, [sortedQuestions, answers]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      onQuestionIndexChange(currentQuestionIndex + 1);
    } else {
      onComplete();
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      onQuestionIndexChange(currentQuestionIndex - 1);
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [currentQuestionIndex]);

  const isCurrentAnswered = currentQuestion
    ? isQuestionAnswered(currentQuestion, answers[currentQuestion.id])
    : false;

  const progressPercent =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const isDeferOption = useCallback(
    (questionId: string, optionId: string) => {
      const question = survey?.questions?.find((q) => q.id === questionId);
      const option = question?.questionOptions?.find((o) => o.id === optionId);
      if (!option) return false;

      const isTextMatch =
        option.optionText?.trim().toLowerCase() === DEFER_OPTION_TEXT;
      const isConfiguredDefer = !!question?.deferOptionIds?.includes(
        option.qualiphyRecordId,
      );

      return isTextMatch || isConfiguredDefer;
    },
    [survey],
  );

  if (sortedQuestions.length === 0) return null;

  return (
    <div className="container max-w-7xl mx-auto">
      <div className="">
        <div className="flex items-center gap-3 pt-4 md:py-4">
          <span className="font-extrabold text-xl md:text-3xl text-primary">
            {survey.name ?? "Questionnaire"}
          </span>
        </div>
        {/* progress bar */}
        <div className="mb-4 md:mb-8 ">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="mt-3 text-xs text-neutral-500 md:text-sm">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
            <span className="text-sm font-semibold text-secondary md:text-base">
              {progressPercent}%
            </span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="">
          {currentQuestion && (
            <div className="space-y-6">
              <SurveyQuestion
                survey={survey}
                allAnswers={answers}
                question={currentQuestion}
                answers={answers[currentQuestion.id]}
                onSingleSelect={(optionId) => {
                  onSingleSelect(currentQuestion.id, optionId);

                  if (
                    currentQuestion.questionType === "single_select" &&
                    !isDeferOption(currentQuestion.id, optionId)
                  ) {
                    setTimeout(() => {
                      if (currentQuestionIndex < totalQuestions - 1) {
                        onQuestionIndexChange(currentQuestionIndex + 1);
                      }
                    }, 150);
                  }
                }}
                onMultiSelect={(optionId, checked) =>
                  onMultiSelect(currentQuestion.id, optionId, checked)
                }
                onTextChange={(value) =>
                  onTextChange(currentQuestion.id, value)
                }
              />

              <div className="flex items-center justify-between gap-3 pt-4">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={currentQuestionIndex === 0}
                  className="rounded-xl border border-neutral-300 px-5 py-2.5 md:py-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={!isCurrentAnswered}
                  className={[
                    "px-3.5 py-2.5 sm:py-4 w-full rounded-lg sm:rounded-xl transition cursor-pointer text-white font-semibold",
                    !isCurrentAnswered
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-primary hover:bg-secondary-dark",
                  ].join(" ")}
                >
                  {currentQuestionIndex === totalQuestions - 1
                    ? "Completed"
                    : "Continue"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
