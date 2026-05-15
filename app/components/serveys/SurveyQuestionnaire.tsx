import { useState, useMemo, useCallback } from "react";
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
  onSingleSelect: (questionId: string, optionId: string) => void;
  onMultiSelect: (
    questionId: string,
    optionId: string,
    checked: boolean,
  ) => void;
  onTextChange: (questionId: string, value: string) => void;
  onComplete: () => void;
}

interface SurveyQuestionProps {
  question: QuestionType;
  answers: SurveyAnswerEntry | undefined;
  onSingleSelect: (optionId: string) => void;
  onMultiSelect: (optionId: string, checked: boolean) => void;
  onTextChange: (value: string) => void;
}

function SurveyQuestion({
  question,
  answers,
  onSingleSelect,
  onMultiSelect,
  onTextChange,
}: SurveyQuestionProps) {
  const optionIds = answers?.questionOptionIds ?? [];
  const valueText = answers?.valueText ?? "";

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
                      ? "border-secondary border-2 bg-primary-light"
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
                      ? "border-secondary border-2 bg-primary-light"
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
                .map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSingleSelect(opt.id)}
                    className={[
                      "w-full rounded-xl border p-3 text-left transition sm:p-4 flex items-center justify-between gap-3",
                      optionIds.includes(opt.id)
                        ? "border-secondary border-2 bg-primary-light"
                        : "border-neutral-300 bg-white hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    <span className="text-sm text-neutral-900 sm:text-lg">
                      {opt.optionText}
                    </span>
                  </button>
                ))}
            </div>

            <ThemeInput
              label=""
              value={valueText}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Enter your answer"
              className="w-full rounded-xl! p-3 text-sm! md:px-4! mt-8 md:py-7! md:text-lg!"
            />
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
                        ? "border-secondary border-2 bg-primary-light"
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
              placeholder="Enter your answer"
              className="w-full rounded-xl! p-3 text-sm! md:px-4! md:py-7! mt-8  md:text-lg!"
            />
          </div>
        )}

        {question.questionType === "text" && (
          <ThemeInput
            label=""
            value={valueText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Enter your answer"
            className="w-full rounded-xl! p-3 text-sm! md:px-4! md:py-7! mt-8  md:text-lg!"
          />
        )}
      </div>
    </div>
  );
}

export function SurveyQuestionnaire({
  survey,
  answers,
  onSingleSelect,
  onMultiSelect,
  onTextChange,
  onComplete,
}: SurveyQuestionnaireProps) {
  const sortedQuestions = useMemo(
    () =>
      survey.questions?.slice().sort((a, b) => a.position - b.position) ?? [],
    [survey.questions],
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
      setCurrentQuestionIndex((prev) => {
        const nextIndex = prev + 1;

        requestAnimationFrame(() => {
          scrollToTop();
        });

        return nextIndex;
      });
    } else {
      onComplete();
    }
  };

  // const goBack = () => {
  //   if (currentQuestionIndex > 0) {
  //     setCurrentQuestionIndex((prev) => prev - 1);
  //   }
  // };

  const isCurrentAnswered = currentQuestion
    ? isQuestionAnswered(currentQuestion, answers[currentQuestion.id])
    : false;

  const progressPercent =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const isDeferOption = useCallback(
    (questionId: string, optionId: string) => {
      const question = survey?.questions?.find((q) => q.id === questionId);
      if (!question?.deferOptionIds?.length) return false;
      const option = question.questionOptions?.find((o) => o.id === optionId);
      return option
        ? question.deferOptionIds.includes(option.qualiphyRecordId)
        : false;
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
              className="h-full rounded-full bg-secondary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="">
          {currentQuestion && (
            <div className="space-y-6">
              <SurveyQuestion
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
                        setCurrentQuestionIndex((prev) => {
                          const nextIndex = prev + 1;

                          requestAnimationFrame(() => {
                            scrollToTop();
                          });

                          return nextIndex;
                        });
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
                {/* <button
                  type="button"
                  onClick={goBack}
                  disabled={currentQuestionIndex === 0}
                  className="rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Back
                </button> */}

                {/* {currentQuestion.questionType !== "single_select" && ( */}
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!isCurrentAnswered}
                  className={[
                    "px-3.5 py-2.5 sm:py-4 w-full rounded-lg sm:rounded-xl transition cursor-pointer text-white font-semibold",
                    !isCurrentAnswered
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-secondary hover:bg-secondary-dark",
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
