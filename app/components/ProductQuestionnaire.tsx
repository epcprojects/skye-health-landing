"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "../images";
import {
  CheckBoxCheckedIcon,
  CheckBoxIcon,
  CheckIcon,
  ChevronIcon,
} from "@/public/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDeviceType } from "../hooks/useDeviceType";

/** -----------------------------
 * Types
 * ------------------------------*/
type Option = { id: string; label: string };

type Question =
  | {
      id: string;
      type: "single";
      title: string;
      options: Option[];
      required?: boolean;
    }
  | {
      id: string;
      type: "multi";
      title: string;
      options: Option[];
      required?: boolean;
      minSelected?: number;
      maxSelected?: number;
    };

type Product = {
  id: string;
  name: string;
  subtitle?: string;
  questions: Question[];
};

type AnswersState = {
  [productId: string]: {
    [questionId: string]: string | string[];
  };
};

type ProgressState = {
  [productId: string]: number;
};

/** -----------------------------
 * Dummy data
 * ------------------------------*/
const PRODUCTS: Product[] = [
  {
    id: "tesamorelin1",
    name: "2X Blend Tesamorelin (10mg) / Ipamorelin (2mg)",
    subtitle: "Weight loss & recovery",
    questions: [
      {
        id: "goal",
        type: "single",
        title: "What’s your weight loss goal?",
        required: true,
        options: [
          { id: "lose_1_15", label: "Losing 1–15 lbs" },
          { id: "lose_16_50", label: "Losing 16–50 lbs" },
          { id: "lose_51_plus", label: "Losing 51+ lbs" },
          { id: "not_sure", label: "Not sure, I just need to lose weight" },
        ],
      },
      {
        id: "timeline",
        type: "single",
        title: "When do you want to see results?",
        required: true,
        options: [
          { id: "2_4_weeks", label: "2–4 weeks" },
          { id: "1_3_months", label: "1–3 months" },
          { id: "3_6_months", label: "3–6 months" },
          { id: "no_rush", label: "No rush" },
        ],
      },
      {
        id: "habits",
        type: "multi",
        title: "Which areas do you want to improve?",
        required: true,
        minSelected: 1,
        maxSelected: 3,
        options: [
          { id: "sleep", label: "Sleep quality" },
          { id: "energy", label: "Energy levels" },
          { id: "appetite", label: "Appetite control" },
          { id: "workouts", label: "Workout performance" },
          { id: "stress", label: "Stress management" },
        ],
      },
    ],
  },
  {
    id: "tesamorelin2",
    name: "2X Blend Tesamorelin (10mg) / Ipamorelin (2mg)",
    subtitle: "Weight loss & recovery",
    questions: [
      {
        id: "goal",
        type: "single",
        title: "What’s your weight loss goal?",
        required: true,
        options: [
          { id: "lose_1_15", label: "Losing 1–15 lbs" },
          { id: "lose_16_50", label: "Losing 16–50 lbs" },
          { id: "lose_51_plus", label: "Losing 51+ lbs" },
          { id: "not_sure", label: "Not sure, I just need to lose weight" },
        ],
      },
      {
        id: "timeline",
        type: "single",
        title: "When do you want to see results?",
        required: true,
        options: [
          { id: "2_4_weeks", label: "2–4 weeks" },
          { id: "1_3_months", label: "1–3 months" },
          { id: "3_6_months", label: "3–6 months" },
          { id: "no_rush", label: "No rush" },
        ],
      },
      {
        id: "habits",
        type: "multi",
        title: "Which areas do you want to improve?",
        required: true,
        minSelected: 1,
        maxSelected: 3,
        options: [
          { id: "sleep", label: "Sleep quality" },
          { id: "energy", label: "Energy levels" },
          { id: "appetite", label: "Appetite control" },
          { id: "workouts", label: "Workout performance" },
          { id: "stress", label: "Stress management" },
        ],
      },
    ],
  },

  {
    id: "tesamorelin3",
    name: "2X Blend CJC-1295 No DAC (5mg) / Ipamorelin (5mg)",
    subtitle: "Weight loss & recovery",
    questions: [
      {
        id: "goal",
        type: "single",
        title: "What’s your weight loss goal?",
        required: true,
        options: [
          { id: "lose_1_15", label: "Losing 1–15 lbs" },
          { id: "lose_16_50", label: "Losing 16–50 lbs" },
          { id: "lose_51_plus", label: "Losing 51+ lbs" },
          { id: "not_sure", label: "Not sure, I just need to lose weight" },
        ],
      },
      {
        id: "timeline",
        type: "single",
        title: "When do you want to see results?",
        required: true,
        options: [
          { id: "2_4_weeks", label: "2–4 weeks" },
          { id: "1_3_months", label: "1–3 months" },
          { id: "3_6_months", label: "3–6 months" },
          { id: "no_rush", label: "No rush" },
        ],
      },
      {
        id: "habits",
        type: "multi",
        title: "Which areas do you want to improve?",
        required: true,
        minSelected: 1,
        maxSelected: 3,
        options: [
          { id: "sleep", label: "Sleep quality" },
          { id: "energy", label: "Energy levels" },
          { id: "appetite", label: "Appetite control" },
          { id: "workouts", label: "Workout performance" },
          { id: "stress", label: "Stress management" },
        ],
      },
    ],
  },
  {
    id: "cjc_ipam",
    name: "CJC-1295 / Ipamorelin",
    subtitle: "Metabolism & sleep",
    questions: [
      {
        id: "experience",
        type: "single",
        title: "Have you used peptide therapy before?",
        required: true,
        options: [
          { id: "first_time", label: "No, first time" },
          { id: "some", label: "Yes, a little" },
          { id: "experienced", label: "Yes, I’m experienced" },
        ],
      },
      {
        id: "concerns",
        type: "multi",
        title: "Any concerns we should know about?",
        required: false,
        maxSelected: 3,
        options: [
          { id: "bp", label: "Blood pressure" },
          { id: "thyroid", label: "Thyroid issues" },
          { id: "diabetes", label: "Diabetes / insulin resistance" },
          { id: "none", label: "No concerns" },
        ],
      },
      {
        id: "sleep_quality",
        type: "single",
        title: "How would you rate your sleep quality?",
        required: true,
        options: [
          { id: "poor", label: "Poor" },
          { id: "fair", label: "Fair" },
          { id: "good", label: "Good" },
          { id: "great", label: "Great" },
        ],
      },
    ],
  },
];

/** -----------------------------
 * Persistence
 * ------------------------------*/
function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState] as const;
}

/** -----------------------------
 * Helpers
 * ------------------------------*/
function isAnswered(q: Question, v: unknown) {
  if (q.type === "single") return typeof v === "string" && v.length > 0;
  if (q.type === "multi") return Array.isArray(v) && v.length > 0;
  return false;
}

function answeredCount(product: Product, answers: AnswersState) {
  const a = answers[product.id] ?? {};
  return product.questions.filter((q) => isAnswered(q, a[q.id])).length;
}

function isProductCompleted(product: Product, answers: AnswersState) {
  return answeredCount(product, answers) === product.questions.length;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function findNextProductId(
  products: Product[],
  currentId: string,
  answers: AnswersState,
) {
  const idx = products.findIndex((p) => p.id === currentId);

  // prefer next after current
  const after = products
    .slice(idx + 1)
    .find((p) => !isProductCompleted(p, answers));
  if (after) return after.id;

  // otherwise any other incomplete
  const any = products.find(
    (p) => p.id !== currentId && !isProductCompleted(p, answers),
  );
  return any?.id ?? null;
}

function firstUnansweredIndex(product: Product, answers: AnswersState) {
  const a = answers[product.id] ?? {};
  const idx = product.questions.findIndex((q) => !isAnswered(q, a[q.id]));
  return idx === -1 ? 0 : idx;
}

/** -----------------------------
 * Component
 * ------------------------------*/
export default function ProductQuestionnaireWizardAuto() {
  const router = useRouter();

  const [answers, setAnswers] = usePersistedState<AnswersState>(
    "pq_answers_v4",
    {},
  );
  const [progress, setProgress] = usePersistedState<ProgressState>(
    "pq_progress_v4",
    {},
  );
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0]?.id);

  const selectedProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedProductId) ?? PRODUCTS[0],
    [selectedProductId],
  );

  const totalQuestions = selectedProduct.questions.length;
  const currentIndex = clamp(
    progress[selectedProduct.id] ??
      firstUnansweredIndex(selectedProduct, answers),
    0,
    totalQuestions - 1,
  );
  const currentQuestion = selectedProduct.questions[currentIndex];

  const productAnswers = answers[selectedProduct.id] ?? {};
  const currentValue = productAnswers[currentQuestion.id];

  const multiCanContinue = useMemo(() => {
    if (currentQuestion.type !== "multi") return true;

    const arr = Array.isArray(currentValue) ? currentValue : [];
    if (!currentQuestion.required) return true;

    const min = currentQuestion.minSelected ?? 1;
    return arr.length >= min;
  }, [currentQuestion, currentValue]);

  function setProductProgress(productId: string, idx: number) {
    setProgress((prev) => ({ ...prev, [productId]: idx }));
  }

  /** Core advance: next question -> next product -> /dashboard */
  function advanceFlow(nextAnswersSnapshot: AnswersState) {
    const isLastQuestion = currentIndex === totalQuestions - 1;

    if (!isLastQuestion) {
      setProductProgress(selectedProduct.id, currentIndex + 1);
      return;
    }

    // finished product => go next product or dashboard
    const nextProductId = findNextProductId(
      PRODUCTS,
      selectedProduct.id,
      nextAnswersSnapshot,
    );

    if (nextProductId) {
      setSelectedProductId(nextProductId);
      const nextProduct = PRODUCTS.find((p) => p.id === nextProductId)!;
      setProductProgress(
        nextProductId,
        firstUnansweredIndex(nextProduct, nextAnswersSnapshot),
      );
      return;
    }

    router.push("/info-page");
  }

  /** SINGLE: select -> save -> auto advance */
  function setSingleAndAutoAdvance(optionId: string) {
    setAnswers((prev) => {
      const next: AnswersState = {
        ...prev,
        [selectedProduct.id]: {
          ...(prev[selectedProduct.id] ?? {}),
          [currentQuestion.id]: optionId,
        },
      };

      // auto-advance AFTER state is computed (using next snapshot)
      queueMicrotask(() => advanceFlow(next));
      return next;
    });
  }

  /** MULTI: toggle only, no auto advance */
  function toggleMulti(optionId: string) {
    if (currentQuestion.type !== "multi") return;

    setAnswers((prev) => {
      const p = prev[selectedProduct.id] ?? {};
      const current = (p[currentQuestion.id] as string[]) ?? [];
      const exists = current.includes(optionId);

      let nextArr = exists
        ? current.filter((x) => x !== optionId)
        : [...current, optionId];

      // optional "none" behavior
      if (optionId === "none" && !exists) nextArr = ["none"];
      if (optionId !== "none" && !exists)
        nextArr = nextArr.filter((x) => x !== "none");

      // enforce maxSelected
      if (
        !exists &&
        currentQuestion.maxSelected &&
        nextArr.length > currentQuestion.maxSelected
      ) {
        nextArr = current; // ignore add
      }

      return {
        ...prev,
        [selectedProduct.id]: {
          ...p,
          [currentQuestion.id]: nextArr,
        },
      };
    });
  }

  /** MULTI: Continue button -> advance */
  function continueFromMulti() {
    if (currentQuestion.type !== "multi") return;
    if (!multiCanContinue) return;
    advanceFlow(answers);
  }

  function goBack() {
    if (currentIndex > 0)
      setProductProgress(selectedProduct.id, currentIndex - 1);
  }

  function clearProduct(productId: string) {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
    setProgress((prev) => ({ ...prev, [productId]: 0 }));
  }
  const swiperRef = useRef<SwiperType | null>(null);
  const { isMobile } = useDeviceType();

  return (
    <div className="w-full space-y-4 sm:space-y-7.5 mx-auto">
      <div className="relative ">
        <div className="absolute lg:block hidden -left-20 top-1/2 z-10 -translate-y-1/2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-white rounded-full w-10 h-10   border border-neutral-200 flex items-center justify-center hover:drop-shadow"
          >
            <ChevronIcon />
          </button>
        </div>

        <div className="absolute  lg:block hidden -right-20 top-1/2 z-10 -translate-y-1/2">
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-white rounded-full rotate-180 w-10 h-10 border border-neutral-200 flex items-center justify-center hover:drop-shadow"
          >
            <ChevronIcon />
          </button>
        </div>
        <Swiper
          pagination={{ clickable: true }}
          autoplay={false}
          loop={true}
          slidesPerView={isMobile ? 1 : 3}
          spaceBetween={30}
          modules={[Autoplay]}
          className="relative reviewSlider "
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {PRODUCTS.map((p, index) => {
            const done = answeredCount(p, answers);
            const total = p.questions.length;
            const active = p.id === selectedProductId;
            return (
              <SwiperSlide key={index} className="max-w-sm! flex gap-4 px-0!">
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setSelectedProductId(p.id);
                    // optional: jump to first unanswered for that product
                    const idx = firstUnansweredIndex(p, answers);
                    setProductProgress(p.id, idx);
                  }}
                  className={[
                    "text-left rounded-lg relative border-2 cursor-pointer p-1.5 sm:p-3 gap-2  transition flex items-center",
                    active
                      ? "border-secondary bg-primary-light! "
                      : "border-gray-200 bg-white",
                    done === total && "bg-off-green! border-off-green",
                  ].join(" ")}
                >
                  {/* <span className="absolute -top-2 h-5 w-5 bg-green-600 rounded-full flex items-center justify-center -right-2">
                    <CheckIcon fill="white" />
                  </span> */}
                  <Image
                    alt=""
                    src={Images.landingPage.product}
                    className="w-17.5 h-17.5"
                    width={70}
                    height={70}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-base sm:text-lg line-clamp-3 text-gunmetal">
                        {p.name}
                      </div>
                    </div>
                  </div>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Question card */}
      <div className="space-y-5 sm:space-y-9">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {/* <div className="text-sm font-medium text-neutral-500">
              {selectedProduct.name} • Question {currentIndex + 1} of{" "}
              {totalQuestions}
            </div> */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-neutral-500">
                Question {currentIndex + 1} of {totalQuestions}
              </div>

              <div>
                <h3 className="text-xl sm:text-3xl font-bold text-neutral-900">
                  Welcome, let&apos;s get started.
                </h3>
                <h3 className="text-xl sm:text-3xl font-bold text-neutral-900">
                  {currentQuestion.title}
                </h3>
              </div>
            </div>
            {/* {currentQuestion.type === "multi" && currentQuestion.maxSelected ? (
              <p className="text-xs text-gray-600 mt-1">
                Select up to{" "}
                <span className="font-medium">
                  {currentQuestion.maxSelected}
                </span>
                {currentQuestion.minSelected ? (
                  <>
                    {" "}
                    (min{" "}
                    <span className="font-medium">
                      {currentQuestion.minSelected}
                    </span>
                    )
                  </>
                ) : null}
              </p>
            ) : null} */}
          </div>

          {/* <button
            type="button"
            onClick={() => clearProduct(selectedProduct.id)}
            className="text-sm px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
          >
            Clear
          </button> */}
        </div>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion.options.map((opt) => {
            if (currentQuestion.type === "single") {
              const selected = currentValue === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSingleAndAutoAdvance(opt.id)}
                  className={[
                    "w-full text-left rounded-xl sm:rounded-2xl border p-3 sm:p-4 transition flex items-center justify-between gap-3",
                    selected
                      ? "border-secondary border-2 bg-primary-light"
                      : "border-neutral-300 bg-white hover:bg-neutral-50",
                  ].join(" ")}
                >
                  <span className="text-neutral-900 text-sm sm:text-lg">
                    {opt.label}
                  </span>
                </button>
              );
            }

            // multi
            const multi = Array.isArray(currentValue) ? currentValue : [];
            const checked = multi.includes(opt.id);

            const maxReached = currentQuestion.maxSelected
              ? multi.length >= currentQuestion.maxSelected
              : false;
            const disabled = maxReached && !checked;

            return (
              <button
                key={opt.id}
                type="button"
                disabled={disabled}
                onClick={() => toggleMulti(opt.id)}
                className={[
                  "w-full  rounded-xl sm:rounded-2xl border-2 sm:p-4 p-3 transition flex items-center gap-3",
                  checked
                    ? "border-secondary "
                    : "border-neutral-200 bg-white hover:bg-gray-50",
                  disabled ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
              >
                {checked ? <CheckBoxCheckedIcon /> : <CheckBoxIcon />}

                <span className="text-neutral-900 text-sm sm:text-lg">
                  {opt.label}
                </span>
                {/* <span
                  className={[
                    "h-5 w-5 rounded-md border flex items-center justify-center",
                    checked
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 bg-white",
                  ].join(" ")}
                >
                  {checked ? (
                    <span className="h-2.5 w-2.5 bg-white rounded-sm" />
                  ) : null}
                </span> */}
              </button>
            );
          })}
        </div>

        {/* Footer:
            - Back button always (optional)
            - Continue button ONLY for multi questions
        */}
        <div className=" flex items-center justify-between gap-3">
          {/* <button
            type="button"
            onClick={goBack}
            disabled={currentIndex === 0}
            className={[
              "px-4 py-2 rounded-xl border transition",
              currentIndex === 0
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-200 hover:bg-gray-50",
            ].join(" ")}
          >
            Back
          </button> */}

          {currentQuestion.type === "multi" ? (
            <button
              type="button"
              onClick={continueFromMulti}
              disabled={!multiCanContinue}
              className={[
                "px-3.5 py-2.5 sm:py-4 w-full rounded-lg sm:rounded-xl transition cursor-pointer text-white font-semibold",
                multiCanContinue
                  ? "bg-secondary hover:bg-secondary-dark"
                  : "bg-gray-300 cursor-not-allowed",
              ].join(" ")}
            >
              Continue
            </button>
          ) : // <div className="text-xs text-gray-500">
          //   Select an option to continue
          // </div>
          null}
        </div>

        <div className="flex items-center gap-2 justify-center ">
          <h2 className="text-neutral-600 font-medium text-base">
            Already have an account?
          </h2>
          <a
            href=""
            className="text-secondary hover:underline underline-offset-2 hover:text-secondary-dark font-medium text-base"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
