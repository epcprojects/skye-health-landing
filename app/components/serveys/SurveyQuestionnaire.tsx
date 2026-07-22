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
    startsWithNormalized(
      question.body,
      "Are you happy with your current treatment?",
    )
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

export function buildVisibleQuestions(
  survey: SurveyType,
  answers: SurveyAnswers,
) {
  const allQuestions =
    survey.questions
      ?.filter((question) => !isBmiQuestion(question))
      .slice()
      .sort((a, b) => a.position - b.position) ?? [];

  const selectedOptionIds = new Set(
    Object.values(answers).flatMap((answer) => answer.questionOptionIds ?? []),
  );

  let visibleQuestions = allQuestions.filter((question) => {
    const showOptionIds = question.showOptionIds ?? [];

    if (showOptionIds.length === 0) {
      return true;
    }

    return showOptionIds.some((optionId) => selectedOptionIds.has(optionId));
  });

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
  { min, max, maxDigits }: { min: number; max: number; maxDigits: number },
) {
  const digitsOnly = raw.replace(/\D/g, "").slice(0, maxDigits);
  if (!digitsOnly) return "";

  const numericValue = Number(digitsOnly);
  if (!Number.isFinite(numericValue)) return "";

  const clampedValue = Math.min(Math.max(numericValue, min), max);
  return String(clampedValue);
}

function sanitizeWeightValue(raw: string) {
  const digitsOnly = raw.replace(/\D/g, "").slice(0, 3);
  if (!digitsOnly) return "";

  const numericValue = Number(digitsOnly);
  if (!Number.isFinite(numericValue)) return "";

  const clampedValue = Math.min(Math.max(numericValue, 1), 700);
  return String(clampedValue);
}

function sanitizeNumberValue(raw: string) {
  const cleaned = raw.replace(/[^\d.-]/g, "");
  const isNegative = cleaned.startsWith("-");
  const unsignedValue = cleaned.replace(/-/g, "");
  const [integerPart = "", ...decimalParts] = unsignedValue.split(".");
  const decimalPart = decimalParts.join("");
  const normalizedNumber = `${isNegative ? "-" : ""}${integerPart}${
    decimalParts.length > 0 ? `.${decimalPart}` : ""
  }`;

  return normalizedNumber;
}

function isValidNumberAnswer(value?: string) {
  const trimmedValue = value?.trim() ?? "";
  if (!trimmedValue) return false;

  return /^-?\d+(\.\d+)?$/.test(trimmedValue);
}

function isValidDateAnswer(value?: string) {
  const trimmedValue = value?.trim() ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) return false;

  const parsedDate = new Date(`${trimmedValue}T00:00:00`);
  return !Number.isNaN(parsedDate.getTime());
}

function isValidDatetimeAnswer(value?: string) {
  const trimmedValue = value?.trim() ?? "";
  if (!trimmedValue) return false;

  return !Number.isNaN(new Date(trimmedValue).getTime());
}

function toDateTimeLocalValue(value?: string) {
  const trimmedValue = value?.trim() ?? "";
  if (!trimmedValue) return "";
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(trimmedValue)) {
    return trimmedValue;
  }

  const parsedDate = new Date(trimmedValue);
  if (Number.isNaN(parsedDate.getTime())) return trimmedValue;

  const pad = (input: number) => String(input).padStart(2, "0");
  return `${parsedDate.getFullYear()}-${pad(parsedDate.getMonth() + 1)}-${pad(
    parsedDate.getDate(),
  )}T${pad(parsedDate.getHours())}:${pad(parsedDate.getMinutes())}`;
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

  // let category = "Obesity";
  // if (bmi < 18.5) category = "Underweight";
  // else if (bmi < 25) category = "Normal weight";
  // else if (bmi < 30) category = "Overweight";

  return {
    value: bmi.toFixed(1),
    // category,
  };
}

const DEFER_OPTION_TEXT = "no consent - defer exam.";

function isDeferOption(question: QuestionType, optionId: string) {
  const option = question.questionOptions?.find((opt) => opt.id === optionId);
  if (!option) return false;

  const isTextMatch =
    option.optionText?.trim().toLowerCase() === DEFER_OPTION_TEXT;
  const stoppingCriteria = option.stoppingCriteria?.trim().toLowerCase();
  const isConfiguredDefer = stoppingCriteria === "hard";

  return isTextMatch || isConfiguredDefer;
}

function isSpecialStoppingOption(question: QuestionType, optionId: string) {
  const option = question.questionOptions?.find((opt) => opt.id === optionId);
  if (!option) return false;

  const isTextMatch =
    option.optionText?.trim().toLowerCase() === DEFER_OPTION_TEXT;
  const stoppingCriteria = option.stoppingCriteria?.trim().toLowerCase();

  return (
    isTextMatch || stoppingCriteria === "hard" || stoppingCriteria === "soft"
  );
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
  const maxSelections =
    question.questionType === "multi_select" ||
    question.questionType === "multi_select_with_text"
      ? (question.maxSelections ?? null)
      : null;
  const hasReachedMaxSelections =
    typeof maxSelections === "number" &&
    maxSelections > 0 &&
    optionIds.length >= maxSelections;
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
  const isNumberField = question.questionType === "number";
  const isDateField = question.questionType === "date";
  const isDateTimeField = question.questionType === "datetime";
  const heightValue = useMemo(() => parseHeightValue(valueText), [valueText]);
  const dateTimeLocalValue = useMemo(
    () => toDateTimeLocalValue(valueText),
    [valueText],
  );
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
              .map((opt) => {
                const isChecked = optionIds.includes(opt.id);
                const isDisabled = !isChecked && hasReachedMaxSelections;

                return (
                  <div
                    key={opt.id}
                    className={[
                      "w-full rounded-xl border transition flex items-center justify-between gap-3",
                      isChecked
                        ? "border-primary/30 border-2 bg-lightblue"
                        : "border-neutral-300 bg-white hover:bg-neutral-50",
                      isDisabled ? "opacity-60" : "",
                    ].join(" ")}
                  >
                    <CustomCheckbox
                      id={`${question.id}-${opt.id}`}
                      label={opt.optionText}
                      direction="flex-row-reverse"
                      checked={isChecked}
                      disabled={isDisabled}
                      width={`w-full`}
                      fullWidth="w-full p-3 md:p-4"
                      onChange={(e) => onMultiSelect(opt.id, e)}
                    />
                  </div>
                );
              })}
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
                .map((opt) => {
                  const isChecked = optionIds.includes(opt.id);
                  const isDisabled = !isChecked && hasReachedMaxSelections;

                  return (
                    <div
                      key={opt.id}
                      className={[
                        "w-full rounded-xl border transition flex items-center justify-between gap-3",
                        isChecked
                          ? "border-primary/30 border-2 bg-lightblue"
                          : "border-neutral-300 bg-white hover:bg-neutral-50",
                        isDisabled ? "opacity-60" : "",
                      ].join(" ")}
                    >
                      <CustomCheckbox
                        id={`${question.id}-${opt.id}`}
                        label={opt.optionText}
                        direction="flex-row-reverse"
                        checked={isChecked}
                        disabled={isDisabled}
                        width="w-full"
                        fullWidth="w-full p-3 md:p-4"
                        onChange={(e) => onMultiSelect(opt.id, e)}
                      />
                    </div>
                  );
                })}
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
                type="text"
                inputMode="numeric"
                value={heightValue.feet}
                onChange={(e) =>
                  onTextChange(
                    buildHeightValue(
                      sanitizeHeightPart(e.target.value, {
                        min: 1,
                        max: 8,
                        maxDigits: 1,
                      }),
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
                type="text"
                inputMode="numeric"
                value={heightValue.inches}
                onChange={(e) =>
                  onTextChange(
                    buildHeightValue(
                      heightValue.feet,
                      sanitizeHeightPart(e.target.value, {
                        min: 0,
                        max: 11,
                        maxDigits: 2,
                      }),
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
                type="text"
                inputMode={isWeightField ? "numeric" : undefined}
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
                maxLength={isWeightField ? 3 : undefined}
                className="w-full rounded-xl! p-3 text-sm! md:px-4! md:py-7! mt-8  md:text-lg!"
              />

              {isWeightField && bmiData && (
                <div className="rounded-xl border border-neutral-300 bg-white px-5 py-4 md:px-4 md:py-3">
                  <span className="text-2xl font-semibold text-neutral-900 md:text-2xl">
                    BMI = {bmiData.value}
                  </span>{" "}
                  {/* <span className="text-lg text-neutral-400 md:text-xl">
                    ({bmiData.category})
                  </span> */}
                </div>
              )}
            </div>
          ))}

        {isNumberField && (
          <ThemeInput
            label=""
            type="text"
            inputMode="decimal"
            value={valueText}
            onChange={(e) => onTextChange(sanitizeNumberValue(e.target.value))}
            placeholder="Enter a number"
            className="w-full rounded-xl! p-3 text-sm! md:px-4! md:py-7! mt-8 md:text-lg!"
          />
        )}

        {isDateField && (
          <ThemeInput
            label=""
            type="date"
            value={valueText}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full rounded-xl! p-3 text-sm! md:px-4! md:py-7! mt-8 md:text-lg!"
          />
        )}

        {isDateTimeField && (
          <ThemeInput
            label=""
            type="datetime-local"
            value={dateTimeLocalValue}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full rounded-xl! p-3 text-sm! md:px-4! md:py-7! mt-8 md:text-lg!"
          />
        )}
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
    () => buildVisibleQuestions(survey, answers),
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

      case "number":
        return isValidNumberAnswer(answer.valueText);

      case "date":
        return isValidDateAnswer(answer.valueText);

      case "datetime":
        return isValidDatetimeAnswer(answer.valueText);

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
      const stoppingCriteria = option.stoppingCriteria?.trim().toLowerCase();
      const isConfiguredDefer = stoppingCriteria === "hard";

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
                    !isSpecialStoppingOption(currentQuestion, optionId)
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
