/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ThemeButton } from "@/app/components";
import ThemeInput, { InputType } from "@/app/components/inputs/ThemeInput";
import AppModal from "@/app/components/modals/AppModal";
import { CartStepContent } from "@/app/components/serveys/CartStepContent";
import {
  buildVisibleQuestions,
  SurveyAnswers,
} from "@/app/components/serveys/SurveyQuestionnaire";
import { CREATE_OR_UPDATE_SURVEY_RESPONSE } from "@/app/graphql/mutations/survey";
import {
  FETCH_SURVEY_FOR_PRODUCTS,
  FetchSurveyVariables,
  FetchSurveyType,
  QuestionType,
  SurveyType,
} from "@/app/graphql/queries/survey";
import {
  IS_USER_EXIST,
  IsUserExistQueryResult,
  IsUserExistQueryVariables,
} from "@/app/graphql/queries/auth";
import {
  clearCart,
  selectCartItems,
  selectCartProductIds,
} from "@/app/Redux/slices/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Images } from "@/app/images";
import { AlertIcon2, ArrowIcon, CrossIcon } from "@/public/icons";
import Portal from "@/app/components/portal";
import {
  CREATE_CART,
  CreateCartMutationResult,
} from "@/app/graphql/mutations/cart";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CREATE_PRODUCT_EMAIL_RESPONSES,
  CreateProductEmailResponsesMutationResult,
  CreateProductEmailResponsesMutationVariables,
} from "@/app/graphql/mutations/product-email-response";
import { US_STATES } from "@/app/constants/constants";
import Dropdown from "@/app/components/buttons/Dropdown";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFER_OPTION_TEXT = "no consent - defer exam.";
const WEIGHT_LOSS_PROGRAM_STORAGE_KEY = "skye-weight-loss-program";
const WEIGHT_LOSS_PROGRAM_PREFILL_SOURCE_KEY =
  "skye-weight-loss-program-prefill-source";
const HORMONE_PROGRAM_STORAGE_KEY = "skye-hormone-program";
const HORMONE_PROGRAM_PREFILL_SOURCE_KEY =
  "skye-hormone-program-prefill-source";

type SavedProgramAnswer = {
  question: string;
  answer: string;
};

type SavedProgramPayload = {
  program?: string;
  answers?: SavedProgramAnswer[];
};

const normalizeText = (value?: string | null) =>
  value?.trim().toLowerCase() ?? "";

const findSavedAnswer = (answers: SavedProgramAnswer[], question: string) => {
  return answers.find(
    (entry) => normalizeText(entry.question) === normalizeText(question),
  )?.answer;
};

const findQuestionByBody = (survey: SurveyType, body: string) => {
  return survey.questions.find(
    (question) => normalizeText(question.body) === normalizeText(body),
  );
};

const findQuestionByBodyStartsWith = (survey: SurveyType, body: string) => {
  return survey.questions.find((question) =>
    normalizeText(question.body).startsWith(normalizeText(body)),
  );
};

const findOptionIdByAnswer = (
  question: QuestionType | undefined,
  answer?: string,
) => {
  if (!question || !answer) return undefined;

  const normalizedAnswer = normalizeText(answer);

  return question.questionOptions.find((option) => {
    const normalizedOptionText = normalizeText(option.optionText);
    const normalizedValue = normalizeText(option.value);

    return (
      normalizedOptionText === normalizedAnswer ||
      normalizedValue === normalizedAnswer ||
      normalizedOptionText.includes(normalizedAnswer) ||
      normalizedAnswer.includes(normalizedOptionText) ||
      (normalizedAnswer.startsWith("yes") && normalizedOptionText === "yes") ||
      (normalizedAnswer.startsWith("no") && normalizedOptionText === "no")
    );
  })?.id;
};

const buildWeightLossPrefillAnswers = (
  survey: SurveyType,
  savedAnswers: SavedProgramAnswer[],
): SurveyAnswers => {
  const nextAnswers: SurveyAnswers = {};

  const glp1Answer = findSavedAnswer(
    savedAnswers,
    "Are you currently taking a GLP-1 medication?",
  );
  const glp1Question = findQuestionByBody(
    survey,
    "Are you currently taking a GLP-1 medication?",
  );
  const glp1OptionId = findOptionIdByAnswer(glp1Question, glp1Answer);
  if (glp1Question && glp1OptionId) {
    nextAnswers[glp1Question.id] = {
      questionOptionIds: [glp1OptionId],
    };
  }

  const currentGlp1Answer = findSavedAnswer(
    savedAnswers,
    "Which GLP-1 are you taking?",
  );
  const currentGlp1Question = findQuestionByBody(
    survey,
    "Which GLP-1 are you taking?",
  );
  if (currentGlp1Question && currentGlp1Answer) {
    nextAnswers[currentGlp1Question.id] = {
      valueText: currentGlp1Answer,
    };
  }

  const doseKnownAnswer = findSavedAnswer(
    savedAnswers,
    "Do you know your current dose?",
  );
  const doseKnownQuestion = findQuestionByBody(
    survey,
    "Do you know your current dose?",
  );
  const doseKnownOptionId = findOptionIdByAnswer(
    doseKnownQuestion,
    doseKnownAnswer,
  );
  if (doseKnownQuestion && doseKnownOptionId) {
    nextAnswers[doseKnownQuestion.id] = {
      questionOptionIds: [doseKnownOptionId],
    };
  }

  const currentDoseAnswer = findSavedAnswer(
    savedAnswers,
    "Enter your current dose (mg/week)",
  );
  const currentDoseQuestion = findQuestionByBody(
    survey,
    "What is your current dose?",
  );
  if (currentDoseQuestion && currentDoseAnswer) {
    nextAnswers[currentDoseQuestion.id] = {
      valueText: currentDoseAnswer,
    };
  }

  const currentMedicationAnswer =
    currentGlp1Answer ||
    findSavedAnswer(savedAnswers, "Which medication are you taking?");
  const currentMedicationQuestion = findQuestionByBody(
    survey,
    "Which medication are you taking?",
  );
  const currentMedicationOptionId = findOptionIdByAnswer(
    currentMedicationQuestion,
    currentMedicationAnswer,
  );
  if (currentMedicationQuestion && currentMedicationOptionId) {
    nextAnswers[currentMedicationQuestion.id] = {
      questionOptionIds: [currentMedicationOptionId],
    };
  }

  const preferredMedicationAnswer = findSavedAnswer(
    savedAnswers,
    "Which medication would you like?",
  );
  const preferredMedicationQuestion = findQuestionByBodyStartsWith(
    survey,
    "Which medication would you like?",
  );
  const preferredMedicationOptionId = findOptionIdByAnswer(
    preferredMedicationQuestion,
    preferredMedicationAnswer,
  );
  if (preferredMedicationQuestion && preferredMedicationOptionId) {
    nextAnswers[preferredMedicationQuestion.id] = {
      questionOptionIds: [preferredMedicationOptionId],
    };
  }

  const isCurrentlyTakingGlp1 = normalizeText(glp1Answer).startsWith("yes");

  if (!isCurrentlyTakingGlp1) {
    if (currentGlp1Question && !nextAnswers[currentGlp1Question.id]) {
      nextAnswers[currentGlp1Question.id] = {
        valueText: "Not currently taking a GLP-1 medication",
      };
    }

    if (doseKnownQuestion && !nextAnswers[doseKnownQuestion.id]) {
      const noOptionId = findOptionIdByAnswer(doseKnownQuestion, "No");

      if (noOptionId) {
        nextAnswers[doseKnownQuestion.id] = {
          questionOptionIds: [noOptionId],
        };
      }
    }

    if (currentDoseQuestion && !nextAnswers[currentDoseQuestion.id]) {
      nextAnswers[currentDoseQuestion.id] = {
        valueText: "N/A",
      };
    }

    if (
      currentMedicationQuestion &&
      !nextAnswers[currentMedicationQuestion.id] &&
      preferredMedicationOptionId
    ) {
      nextAnswers[currentMedicationQuestion.id] = {
        questionOptionIds: [preferredMedicationOptionId],
      };
    }
  }

  return nextAnswers;
};

const splitSavedMultiAnswer = (value?: string) =>
  value
    ?.split("|")
    .map((entry) => entry.trim())
    .filter(Boolean) ?? [];

const buildHormonePrefillAnswers = (
  survey: SurveyType,
  savedAnswers: SavedProgramAnswer[],
): SurveyAnswers => {
  const nextAnswers: SurveyAnswers = {};

  const sexAnswer = findSavedAnswer(
    savedAnswers,
    "What sex were you assigned at birth?",
  );
  const sexQuestion = findQuestionByBody(
    survey,
    "What sex were you assigned at birth?",
  );
  const sexOptionId = findOptionIdByAnswer(sexQuestion, sexAnswer);
  if (sexQuestion && sexOptionId) {
    nextAnswers[sexQuestion.id] = {
      questionOptionIds: [sexOptionId],
    };
  }

  const reasonsAnswer = splitSavedMultiAnswer(
    findSavedAnswer(savedAnswers, "What brings you here today?"),
  );
  const reasonsQuestion = findQuestionByBody(
    survey,
    "What brings you here today?",
  );
  if (reasonsQuestion && reasonsAnswer.length > 0) {
    const optionIds = reasonsQuestion.questionOptions
      .filter((option) =>
        reasonsAnswer.some(
          (answer) =>
            findOptionIdByAnswer(reasonsQuestion, answer) === option.id,
        ),
      )
      .map((option) => option.id);

    if (optionIds.length > 0) {
      nextAnswers[reasonsQuestion.id] = {
        questionOptionIds: optionIds,
      };
    }
  }

  const therapyAnswer = findSavedAnswer(
    savedAnswers,
    "Are you currently taking hormone therapy?",
  );
  const therapyQuestion = findQuestionByBody(
    survey,
    "Are you currently taking hormone therapy?",
  );
  const therapyOptionId = findOptionIdByAnswer(therapyQuestion, therapyAnswer);
  if (therapyQuestion && therapyOptionId) {
    nextAnswers[therapyQuestion.id] = {
      questionOptionIds: [therapyOptionId],
    };
  }

  const therapyDetailsAnswer = findSavedAnswer(
    savedAnswers,
    "List medication, strength & duration of treatment",
  );
  const therapyDetailsQuestion = findQuestionByBodyStartsWith(
    survey,
    "List medication, strength",
  );
  if (therapyDetailsQuestion && therapyDetailsAnswer) {
    nextAnswers[therapyDetailsQuestion.id] = {
      valueText: therapyDetailsAnswer,
    };
  }

  const happyAnswer = findSavedAnswer(
    savedAnswers,
    "Are you happy with your current treatment?",
  );
  const happyQuestion = findQuestionByBody(
    survey,
    "Are you happy with your current treatment?",
  );
  const happyOptionId = findOptionIdByAnswer(happyQuestion, happyAnswer);
  if (happyQuestion && happyOptionId) {
    nextAnswers[happyQuestion.id] = {
      questionOptionIds: [happyOptionId],
    };
  }

  const goalsAnswer = splitSavedMultiAnswer(
    findSavedAnswer(savedAnswers, "What do you want to improve?"),
  );
  const goalsQuestion = findQuestionByBody(
    survey,
    "What do you want to improve?",
  );
  if (goalsQuestion && goalsAnswer.length > 0) {
    const optionIds = goalsQuestion.questionOptions
      .filter((option) =>
        goalsAnswer.some(
          (answer) => findOptionIdByAnswer(goalsQuestion, answer) === option.id,
        ),
      )
      .map((option) => option.id);

    if (optionIds.length > 0) {
      nextAnswers[goalsQuestion.id] = {
        questionOptionIds: optionIds,
      };
    }
  }

  return nextAnswers;
};

const parseFeetAndInches = (rawHeight?: string) => {
  const trimmed = rawHeight?.trim();
  if (!trimmed) {
    return { feet: 0, inches: 0 };
  }

  const formattedMatch = trimmed.match(/^(\d*)\s*ft\s*(\d*)\s*in$/i);
  if (formattedMatch) {
    return {
      feet: Number.parseFloat(formattedMatch[1] || "0"),
      inches: Number.parseFloat(formattedMatch[2] || "0"),
    };
  }

  const compactMatch = trimmed.match(/^(\d*)'\s*(\d*)"?$/);
  if (compactMatch) {
    return {
      feet: Number.parseFloat(compactMatch[1] || "0"),
      inches: Number.parseFloat(compactMatch[2] || "0"),
    };
  }

  const numericParts = trimmed.match(/\d+/g) ?? [];
  return {
    feet: Number.parseFloat(numericParts[0] || "0"),
    inches: Number.parseFloat(numericParts[1] || "0"),
  };
};

const parseWeightInKg = (rawWeight?: string) => {
  const trimmed = rawWeight?.trim().toLowerCase();
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
};

const calculateBmiValue = (heightText?: string, weightText?: string) => {
  const { feet, inches } = parseFeetAndInches(heightText);
  const weightKg = parseWeightInKg(weightText);

  if (!Number.isFinite(feet) || !Number.isFinite(inches) || feet <= 0) {
    return null;
  }

  if (!weightKg) return null;

  const totalInches = feet * 12 + inches;
  const heightMeters = totalInches * 0.0254;

  if (!Number.isFinite(heightMeters) || heightMeters <= 0) return null;

  const bmi = weightKg / (heightMeters * heightMeters);

  if (!Number.isFinite(bmi) || bmi <= 0) return null;

  return bmi.toFixed(1);
};

const GENDER_OPTIONS = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
] as const;

const sanitizeDatePart = (value: string, maxLength: number) =>
  value.replace(/\D/g, "").slice(0, maxLength);

const getDateOfBirthError = (month: string, day: string, year: string) => {
  if (!month && !day && !year) return "";
  if (month.length !== 2 || day.length !== 2 || year.length !== 4) {
    return "Please enter a valid date of birth.";
  }

  const monthNumber = Number.parseInt(month, 10);
  const dayNumber = Number.parseInt(day, 10);
  const yearNumber = Number.parseInt(year, 10);

  if (
    !Number.isFinite(monthNumber) ||
    !Number.isFinite(dayNumber) ||
    !Number.isFinite(yearNumber) ||
    monthNumber < 1 ||
    monthNumber > 12
  ) {
    return "Please enter a valid date of birth.";
  }

  const dob = new Date(yearNumber, monthNumber - 1, dayNumber);
  const isValidDate =
    dob.getFullYear() === yearNumber &&
    dob.getMonth() === monthNumber - 1 &&
    dob.getDate() === dayNumber;

  if (!isValidDate) {
    return "Please enter a valid date of birth.";
  }

  const today = new Date();
  let age = today.getFullYear() - yearNumber;
  const hasHadBirthdayThisYear =
    today.getMonth() > monthNumber - 1 ||
    (today.getMonth() === monthNumber - 1 && today.getDate() >= dayNumber);

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  if (age < 18) {
    return "You must be at least 18 years old.";
  }

  return "";
};

const buildDateOfBirthValue = (month: string, day: string, year: string) =>
  `${year}-${month}-${day}`;

const Page = () => {
  const productIds = useAppSelector(selectCartProductIds);
  const dispatch = useAppDispatch();
  const [fetchSurveyForProducts, { data: surveyData, loading }] = useLazyQuery<
    FetchSurveyType,
    FetchSurveyVariables
  >(FETCH_SURVEY_FOR_PRODUCTS, {
    fetchPolicy: "no-cache",
  });

  const fetchedSurvey = surveyData?.fetchSurveyForProducts;

  //surveys states
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>({});
  const [showInfoPage, setShowInfoPage] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailSubmissionError, setEmailSubmissionError] = useState("");
  const [dateOfBirthMonth, setDateOfBirthMonth] = useState("");
  const [dateOfBirthDay, setDateOfBirthDay] = useState("");
  const [dateOfBirthYear, setDateOfBirthYear] = useState("");
  const [dateOfBirthTouched, setDateOfBirthTouched] = useState(false);
  const [gender, setGender] = useState("");
  const [stateOfResidence, setStateOfResidence] = useState("");
  const [externalUserId, setExternalUserId] = useState("");
  const [hasCapturedEmail, setHasCapturedEmail] = useState(false);
  const [hasRequestedSurvey, setHasRequestedSurvey] = useState(false);
  const [hasAppliedSavedProgramAnswers, setHasAppliedSavedProgramAnswers] =
    useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [surveyFromState, setSurveyFromState] = useState<
    SurveyType | undefined
  >(undefined);
  const [deferConfirm, setDeferConfirm] = useState<{
    questionId: string;
    optionId: string;
    action: "single" | "multi";
    checked?: boolean;
  } | null>(null);
  const [softStopConfirm, setSoftStopConfirm] = useState<{
    questionId: string;
    optionId: string;
    action: "single" | "multi";
    checked?: boolean;
  } | null>(null);

  const surveyFromQuery: SurveyType | undefined = Array.isArray(fetchedSurvey)
    ? fetchedSurvey[0]
    : fetchedSurvey;

  useEffect(() => {
    if (!surveyFromQuery) return;
    queueMicrotask(() => setSurveyFromState(surveyFromQuery));
  }, [surveyFromQuery]);

  const survey = surveyFromState;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const surveyFlowKey = productIds.slice().sort().join("|");
  const questionCount = survey?.questions?.length ?? 0;
  const stepFromUrl = searchParams.get("step");
  const trimmedEmail = email.trim();
  const isEmailValid = EMAIL_REGEX.test(trimmedEmail);
  const shouldShowEmailError = emailTouched && !isEmailValid;
  const hasEmailError = shouldShowEmailError || !!emailSubmissionError;
  const emailErrorMessage =
    emailSubmissionError || "Please enter a valid email address.";
  const dateOfBirthError = getDateOfBirthError(
    dateOfBirthMonth,
    dateOfBirthDay,
    dateOfBirthYear,
  );
  const showDateOfBirthError = dateOfBirthTouched && !!dateOfBirthError;
  const isDateOfBirthValid =
    dateOfBirthMonth.length === 2 &&
    dateOfBirthDay.length === 2 &&
    dateOfBirthYear.length === 4 &&
    !dateOfBirthError;
  const isGenderValid = gender === "MALE" || gender === "FEMALE";
  const formattedDateOfBirth = buildDateOfBirthValue(
    dateOfBirthMonth,
    dateOfBirthDay,
    dateOfBirthYear,
  );

  //servey functions

  const setSingleSelect = (questionId: string, optionId: string) => {
    setSurveyAnswers((prev) => {
      const current = prev[questionId];
      return {
        ...prev,
        [questionId]: {
          questionOptionIds: [optionId],
          valueText: current?.valueText,
        },
      };
    });
  };
  const setMultiSelect = (
    questionId: string,
    optionId: string,
    checked: boolean,
  ) => {
    setSurveyAnswers((prev) => {
      const current = prev[questionId]?.questionOptionIds ?? [];
      const next = checked
        ? [...current, optionId]
        : current.filter((id) => id !== optionId);
      return {
        ...prev,
        [questionId]: {
          questionOptionIds: next,
          valueText: prev[questionId]?.valueText,
        },
      };
    });
  };

  const setTextAnswer = (questionId: string, valueText: string) => {
    setSurveyAnswers((prev) => {
      const current = prev[questionId];
      return {
        ...prev,
        [questionId]: {
          questionOptionIds: current?.questionOptionIds,
          valueText,
        },
      };
    });
  };

  const getOptionStoppingBehavior = useCallback(
    (questionId: string, optionId: string) => {
      const question = survey?.questions?.find((q) => q.id === questionId);
      const option = question?.questionOptions?.find((o) => o.id === optionId);
      if (!option) return "no_stop";

      const isTextMatch =
        option.optionText?.trim().toLowerCase() === DEFER_OPTION_TEXT;
      const stoppingCriteria = option.stoppingCriteria?.trim().toLowerCase();
      if (isTextMatch || stoppingCriteria === "hard") {
        return "hard";
      }
      if (stoppingCriteria === "soft") {
        return "soft";
      }

      return "no_stop";
    },
    [survey],
  );
  const handleSingleSelect = useCallback(
    (questionId: string, optionId: string) => {
      const stoppingBehavior = getOptionStoppingBehavior(questionId, optionId);

      if (stoppingBehavior === "hard") {
        setDeferConfirm({ questionId, optionId, action: "single" });
        return;
      }

      if (stoppingBehavior === "soft") {
        setSoftStopConfirm({ questionId, optionId, action: "single" });
        return;
      }

      setSingleSelect(questionId, optionId);
    },
    [getOptionStoppingBehavior],
  );

  const handleMultiSelect = useCallback(
    (questionId: string, optionId: string, checked: boolean) => {
      if (!checked) {
        setMultiSelect(questionId, optionId, checked);
        return;
      }

      const stoppingBehavior = getOptionStoppingBehavior(questionId, optionId);

      if (stoppingBehavior === "hard") {
        setDeferConfirm({
          questionId,
          optionId,
          action: "multi",
          checked: true,
        });
        return;
      }

      if (stoppingBehavior === "soft") {
        setSoftStopConfirm({
          questionId,
          optionId,
          action: "multi",
          checked: true,
        });
        return;
      }

      setMultiSelect(questionId, optionId, checked);
    },
    [getOptionStoppingBehavior],
  );

  const handleSoftStopConfirmAccept = useCallback(() => {
    if (!softStopConfirm) return;

    if (softStopConfirm.action === "single") {
      setSingleSelect(softStopConfirm.questionId, softStopConfirm.optionId);
    } else {
      setMultiSelect(
        softStopConfirm.questionId,
        softStopConfirm.optionId,
        !!softStopConfirm.checked,
      );
    }

    setSoftStopConfirm(null);
  }, [softStopConfirm]);

  const [createOrUpdateSurveyResponse] = useMutation(
    CREATE_OR_UPDATE_SURVEY_RESPONSE,
  );

  const [createCart] = useMutation<CreateCartMutationResult>(CREATE_CART);
  const [checkUserExists] = useLazyQuery<
    IsUserExistQueryResult,
    IsUserExistQueryVariables
  >(IS_USER_EXIST, {
    fetchPolicy: "no-cache",
  });
  const [createProductEmailResponses, { loading: isCreatingProductEmail }] =
    useMutation<
      CreateProductEmailResponsesMutationResult,
      CreateProductEmailResponsesMutationVariables
    >(CREATE_PRODUCT_EMAIL_RESPONSES);

  function buildSurveyAnswerInputs(
    survey: SurveyType,
    answers: SurveyAnswers,
  ): {
    questionId: string;
    questionOptionIds?: string[];
    valueText?: string | null;
  }[] {
    const questions =
      survey.questions
        ?.slice()
        .sort((first, second) => first.position - second.position) ?? [];
    return questions.map((question) => {
      const answer = answers[question.id];
      return {
        questionId: question.id,
        questionOptionIds: answer?.questionOptionIds ?? [],
        valueText: answer?.valueText?.trim() ?? null,
      };
    });
  }

  const cartItems = useAppSelector(selectCartItems);
  const emailProductIds = Array.from(
    new Set(cartItems.map((item) => item.productId)),
  );

  const SHIPPING_COST = 9.99;
  const TAX_RATE = 0.12;

  const subtotal = cartItems.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  const shipping = subtotal >= 100 ? 0 : SHIPPING_COST;
  const tax = (subtotal + shipping) * TAX_RATE;

  const cartItemInputs = cartItems.map((item) => ({
    productId: item.selectedPricingId || item.productId,
    quantity: item.qty,
    price: item.unitPrice,
  }));

  const handleDeferConfirmAccept = useCallback(async () => {
    if (!survey || !externalUserId) return;

    const confirm = deferConfirm;
    setIsRedirecting(true);

    try {
      const cartResult = await createCart({
        variables: {
          cartItems: cartItemInputs,
          // totalTax: tax,
          externalUserId,
        },
      });
      const cartId = cartResult.data?.createCart?.cart?.id;

      await createOrUpdateSurveyResponse({
        variables: {
          answers: buildSurveyAnswerInputs(survey, surveyAnswers),
          productIds,
          cartId,
          status: "submitted",
          externalUserId,
        },
      });

      dispatch(clearCart());
      if (confirm) {
        window.location.href = "/";
      } else {
        const { data } = await checkUserExists({
          variables: {
            email: trimmedEmail,
          },
        });
        const userExists = !!data?.isUserExist;

        if (userExists) {
          window.location.href = `${process.env.NEXT_PUBLIC_MAIN_APP_URL}/patient/login?externalUserId=${encodeURIComponent(
            externalUserId,
          )}&email=${encodeURIComponent(trimmedEmail)}&stateOfResidence=${encodeURIComponent(
            stateOfResidence,
          )}`;
        } else {
          window.location.href = `${process.env.NEXT_PUBLIC_MAIN_APP_URL}/patient/signup/?externalUserId=${encodeURIComponent(
            externalUserId,
          )}&email=${encodeURIComponent(trimmedEmail)}&dob=${encodeURIComponent(
            formattedDateOfBirth,
          )}&gender=${encodeURIComponent(gender)}&stateOfResidence=${encodeURIComponent(
            stateOfResidence,
          )}`;
        }
      }
      setSurveyAnswers({});
      setSurveyFromState(undefined);
      setDeferConfirm(null);
    } catch (error) {
      console.error("Survey submission failed:", error);
      setDeferConfirm(confirm);
      setIsRedirecting(false);
    }
  }, [
    deferConfirm,
    survey,
    productIds,
    surveyAnswers,
    createOrUpdateSurveyResponse,
    setSurveyAnswers,
    setSurveyFromState,
    dispatch,
    cartItemInputs,
    tax,
    createCart,
    externalUserId,
    formattedDateOfBirth,
    gender,
    stateOfResidence,
    checkUserExists,
    trimmedEmail,
  ]);

  useEffect(() => {
    if (!survey) {
      setCurrentQuestionIndex(0);
      return;
    }

    const parsedStep = Number.parseInt(stepFromUrl ?? "1", 10);
    const normalizedStep =
      Number.isFinite(parsedStep) && parsedStep > 0 ? parsedStep : 1;
    const nextIndex = Math.min(
      normalizedStep - 1,
      Math.max(questionCount - 1, 0),
    );

    setCurrentQuestionIndex(nextIndex);
  }, [questionCount, stepFromUrl, survey]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSurveyAnswers({});
    setSurveyFromState(undefined);
    setShowInfoPage(false);
    setIsRedirecting(false);
    setEmail("");
    setEmailTouched(false);
    setEmailSubmissionError("");
    setDateOfBirthMonth("");
    setDateOfBirthDay("");
    setDateOfBirthYear("");
    setDateOfBirthTouched(false);
    setGender("");
    setStateOfResidence("");
    setExternalUserId("");
    setHasCapturedEmail(false);
    setHasRequestedSurvey(false);
    setHasAppliedSavedProgramAnswers(false);
    setCurrentQuestionIndex(0);
    setIsEmailModalOpen(false);
    setDeferConfirm(null);
    setSoftStopConfirm(null);
  }, [surveyFlowKey]);

  useEffect(() => {
    if (
      loading ||
      showInfoPage ||
      hasCapturedEmail ||
      currentQuestionIndex !== 0 ||
      productIds.length === 0
    ) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsEmailModalOpen(true);
  }, [currentQuestionIndex, hasCapturedEmail, loading, productIds.length, showInfoPage]);

  const router = useRouter();

  const handleQuestionIndexChange = useCallback(
    (nextIndex: number) => {
      const normalizedIndex = Math.max(nextIndex, 0);
      const nextParams = new URLSearchParams(searchParams.toString());

      if (normalizedIndex === 0) {
        nextParams.delete("step");
      } else {
        nextParams.set("step", String(normalizedIndex + 1));
      }

      const nextQuery = nextParams.toString();
      const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

      router.push(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (
      loading ||
      !survey ||
      !hasCapturedEmail ||
      hasAppliedSavedProgramAnswers ||
      typeof window === "undefined"
    ) {
      return;
    }

    const prefillSource = window.localStorage.getItem(
      WEIGHT_LOSS_PROGRAM_PREFILL_SOURCE_KEY,
    );

    if (prefillSource !== "card-flow") {
      return;
    }

    if (
      normalizeText(survey.name) !== "weight loss program" &&
      normalizeText(survey.category) !== "weight loss program"
    ) {
      setHasAppliedSavedProgramAnswers(true);
      return;
    }

    const rawSavedProgram = window.localStorage.getItem(
      WEIGHT_LOSS_PROGRAM_STORAGE_KEY,
    );

    if (!rawSavedProgram) {
      setHasAppliedSavedProgramAnswers(true);
      return;
    }

    try {
      const parsedSavedProgram = JSON.parse(
        rawSavedProgram,
      ) as SavedProgramPayload;

      if (
        parsedSavedProgram.program !== "weight-loss" ||
        !parsedSavedProgram.answers?.length
      ) {
        window.localStorage.removeItem(WEIGHT_LOSS_PROGRAM_PREFILL_SOURCE_KEY);
        setHasAppliedSavedProgramAnswers(true);
        return;
      }

      const prefilledAnswers = buildWeightLossPrefillAnswers(
        survey,
        parsedSavedProgram.answers,
      );

      const prefilledQuestionIds = new Set(Object.keys(prefilledAnswers));

      if (prefilledQuestionIds.size === 0) {
        window.localStorage.removeItem(WEIGHT_LOSS_PROGRAM_PREFILL_SOURCE_KEY);
        setHasAppliedSavedProgramAnswers(true);
        return;
      }

      setSurveyAnswers((prev) => ({
        ...prefilledAnswers,
        ...prev,
      }));

      const sortedQuestions =
        survey.questions
          ?.slice()
          .sort((first, second) => first.position - second.position) ?? [];
      const firstUnansweredIndex = sortedQuestions.findIndex(
        (question) => !prefilledQuestionIds.has(question.id),
      );

      if (firstUnansweredIndex > 0) {
        handleQuestionIndexChange(firstUnansweredIndex);
      }

      window.localStorage.removeItem(WEIGHT_LOSS_PROGRAM_PREFILL_SOURCE_KEY);
      setHasAppliedSavedProgramAnswers(true);
    } catch (error) {
      console.error("Failed to apply saved weight-loss answers:", error);
      window.localStorage.removeItem(WEIGHT_LOSS_PROGRAM_PREFILL_SOURCE_KEY);
      setHasAppliedSavedProgramAnswers(true);
    }
  }, [
    handleQuestionIndexChange,
    hasAppliedSavedProgramAnswers,
    hasCapturedEmail,
    loading,
    survey,
  ]);

  useEffect(() => {
    if (
      loading ||
      !survey ||
      !hasCapturedEmail ||
      hasAppliedSavedProgramAnswers ||
      typeof window === "undefined"
    ) {
      return;
    }

    const prefillSource = window.localStorage.getItem(
      HORMONE_PROGRAM_PREFILL_SOURCE_KEY,
    );

    if (prefillSource !== "card-flow") {
      return;
    }

    if (
      normalizeText(survey.name) !== "hormone program" &&
      normalizeText(survey.category) !== "hormone program"
    ) {
      window.localStorage.removeItem(HORMONE_PROGRAM_PREFILL_SOURCE_KEY);
      return;
    }

    const rawSavedProgram = window.localStorage.getItem(
      HORMONE_PROGRAM_STORAGE_KEY,
    );

    if (!rawSavedProgram) {
      window.localStorage.removeItem(HORMONE_PROGRAM_PREFILL_SOURCE_KEY);
      setHasAppliedSavedProgramAnswers(true);
      return;
    }

    try {
      const parsedSavedProgram = JSON.parse(
        rawSavedProgram,
      ) as SavedProgramPayload;

      if (
        parsedSavedProgram.program !== "hormone" ||
        !parsedSavedProgram.answers?.length
      ) {
        window.localStorage.removeItem(HORMONE_PROGRAM_PREFILL_SOURCE_KEY);
        setHasAppliedSavedProgramAnswers(true);
        return;
      }

      const prefilledAnswers = buildHormonePrefillAnswers(
        survey,
        parsedSavedProgram.answers,
      );
      const prefilledQuestionIds = new Set(Object.keys(prefilledAnswers));

      if (prefilledQuestionIds.size === 0) {
        window.localStorage.removeItem(HORMONE_PROGRAM_PREFILL_SOURCE_KEY);
        setHasAppliedSavedProgramAnswers(true);
        return;
      }

      setSurveyAnswers((prev) => ({
        ...prefilledAnswers,
        ...prev,
      }));

      const sortedQuestions =
        survey.questions
          ?.slice()
          .sort((first, second) => first.position - second.position) ?? [];
      const firstUnansweredIndex = sortedQuestions.findIndex(
        (question) => !prefilledQuestionIds.has(question.id),
      );

      if (firstUnansweredIndex > 0) {
        handleQuestionIndexChange(firstUnansweredIndex);
      }

      window.localStorage.removeItem(HORMONE_PROGRAM_PREFILL_SOURCE_KEY);
      setHasAppliedSavedProgramAnswers(true);
    } catch (error) {
      console.error("Failed to apply saved hormone answers:", error);
      window.localStorage.removeItem(HORMONE_PROGRAM_PREFILL_SOURCE_KEY);
      setHasAppliedSavedProgramAnswers(true);
    }
  }, [
    handleQuestionIndexChange,
    hasAppliedSavedProgramAnswers,
    hasCapturedEmail,
    loading,
    survey,
  ]);

  useEffect(() => {
    if (!survey) return;

    const heightQuestion = findQuestionByBody(survey, "What is your height?");
    const weightQuestion = findQuestionByBody(survey, "What is your weight?");
    const bmiQuestion = findQuestionByBody(survey, "What is your BMI?");

    if (!heightQuestion || !weightQuestion || !bmiQuestion) {
      return;
    }

    const heightValue = surveyAnswers[heightQuestion.id]?.valueText;
    const weightValue = surveyAnswers[weightQuestion.id]?.valueText;
    const bmiValue = calculateBmiValue(heightValue, weightValue);

    setSurveyAnswers((prev) => {
      const currentBmiValue = prev[bmiQuestion.id]?.valueText?.trim() ?? "";

      if (!bmiValue && !currentBmiValue) {
        return prev;
      }

      if (!bmiValue && currentBmiValue) {
        return {
          ...prev,
          [bmiQuestion.id]: {
            ...prev[bmiQuestion.id],
            valueText: "",
          },
        };
      }

      if (bmiValue === currentBmiValue) {
        return prev;
      }

      return {
        ...prev,
        [bmiQuestion.id]: {
          ...prev[bmiQuestion.id],
          valueText: bmiValue ?? "",
        },
      };
    });
  }, [survey, surveyAnswers]);

  useEffect(() => {
    if (!survey) return;

    const bmiQuestion = findQuestionByBody(survey, "What is your BMI?");
    const visibleQuestionIds = new Set(
      buildVisibleQuestions(survey, surveyAnswers).map((question) => question.id),
    );
    const hiddenAnsweredQuestionIds = Object.keys(surveyAnswers).filter(
      (questionId) =>
        !visibleQuestionIds.has(questionId) && questionId !== bmiQuestion?.id,
    );

    if (hiddenAnsweredQuestionIds.length === 0) {
      return;
    }

    setSurveyAnswers((prev) => {
      const next = { ...prev };
      let hasChanged = false;

      hiddenAnsweredQuestionIds.forEach((questionId) => {
        if (questionId in next) {
          delete next[questionId];
          hasChanged = true;
        }
      });

      return hasChanged ? next : prev;
    });
  }, [survey, surveyAnswers]);

  const handleEmailConfirm = async () => {
    setEmailTouched(true);
    setEmailSubmissionError("");
    setDateOfBirthTouched(true);

    if (!isEmailValid) return;
    if (!isDateOfBirthValid || !isGenderValid || !stateOfResidence) return;

    if (emailProductIds.length === 0) {
      setEmailSubmissionError("No products were found for this questionnaire.");
      return;
    }

    try {
      const response = await createProductEmailResponses({
        variables: {
          input: {
            email: trimmedEmail,
            productIds: emailProductIds,
            dateOfBirth: buildDateOfBirthValue(
              dateOfBirthMonth,
              dateOfBirthDay,
              dateOfBirthYear,
            ),
            gender,
            stateOfResidence,
          },
        },
      });

      const nextExternalUserId =
        response.data?.createProductEmailResponses?.publicEmailResponse
          ?.externalUserId;

      if (!nextExternalUserId) {
        throw new Error("No external user ID was returned.");
      }

      setEmail(trimmedEmail);
      setExternalUserId(nextExternalUserId);
      setHasCapturedEmail(true);
      setIsEmailModalOpen(false);
      setHasRequestedSurvey(true);

      const surveyResponse = await fetchSurveyForProducts({
        variables: {
          productIds,
          cartId: null,
          externalUserId: nextExternalUserId,
        },
      });

      const fetchedSurveyResult = surveyResponse.data?.fetchSurveyForProducts;
      const nextSurvey = Array.isArray(fetchedSurveyResult)
        ? fetchedSurveyResult[0]
        : fetchedSurveyResult;

      if (!nextSurvey) {
        throw new Error("No survey was returned for these products.");
      }
    } catch (error) {
      setHasCapturedEmail(false);
      setHasRequestedSurvey(false);
      setIsEmailModalOpen(true);
      setEmailSubmissionError(
        error instanceof Error
          ? error.message
          : "We couldn't save your email right now. Please try again.",
      );
    }
  };

  useEffect(() => {
    if (loading || isRedirecting || !hasRequestedSurvey) return;

    if (!surveyFromQuery) {
      router.replace("/products");
    }
  }, [hasRequestedSurvey, loading, surveyFromQuery, isRedirecting, router]);

  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center h-dvh z-50 md:relative fixed">
        <div className="bg-linear-[245deg] relative max-w-4xl overflow-hidden rounded-2xl sm:rounded-4xl from-white  to-white">
          <div className="noise absolute! inset-0 w-full " />
          <div className="container  items-center gap-6 justify-center lg:gap-5 mx-auto grid grid-cols-1 sm:grid-cols-1 max-w-7xl px-4 xl:px-16 relative">
            <div className="relative">
              <Image
                alt=""
                src={Images.layout.logo}
                className="z-20 relative h-80"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className="flex items-center justify-center h-160">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-neutral-300 animate-spin fill-secondary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="mt-3 block font-semibold animate-pulse">
              Loading...
            </span>
          </div>
        </div>
      )}

      {!loading && !survey && (
        <div className="items-center flex flex-col justify-center h-160">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-neutral-300 animate-spin fill-secondary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <span className="mt-3 block font-semibold">No Servey found...</span>
        </div>
      )}

      {!showInfoPage && (
        <div className="container mx-auto max-w-7xl px-4 pt-16 md:pt-24 md:px-8 space-y-12">
          <AppModal
            isOpen={isEmailModalOpen}
            onClose={() => undefined}
            onConfirm={() => {
              void handleEmailConfirm();
            }}
            title="Please enter following."
            confirmLabel={isCreatingProductEmail ? "Continuing..." : "Continue"}
            confirmBtnVarient="primary"
            hideCancelBtn
            hideCrossButton
            disableCloseButton
            outSideClickClose={false}
            scrollNeeded={false}
            bodyPaddingClasses="p-4 md:p-6"
            confimBtnDisable={
              !isEmailValid ||
              !isDateOfBirthValid ||
              !isGenderValid ||
              !stateOfResidence ||
              isCreatingProductEmail
            }
          >
            <div className="space-y-6">
              <p className="text-sm leading-6 text-neutral-600 md:text-base">
                You&apos;ll create your account after answering a couple
                questions from the Doctor
              </p>
              <ThemeInput
                type={InputType.EMAIL}
                label="Email address"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailSubmissionError) {
                    setEmailSubmissionError("");
                  }
                }}
                onBlur={() => setEmailTouched(true)}
                error={hasEmailError}
                errorMessage={emailErrorMessage}
                autoComplete="email"
                disabled={isCreatingProductEmail}
              />

              <Dropdown
                label="State of Residence"
                placeholder="Select your state of residence"
                options={US_STATES}
                value={stateOfResidence}
                onChange={setStateOfResidence}
                disabled={isCreatingProductEmail}
                showSearch
                required
                searchPlaceholder="Search state..."
                maxMenuHeight={260}
              />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-normal text-black md:text-base">
                    Date of birth <span className="text-red-500">*</span>
                  </span>
                  <span className="text-sm text-neutral-500 md:text-base">
                    confirms eligibility
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <ThemeInput
                    type="text"
                    label=""
                    placeholder="MM"
                    value={dateOfBirthMonth}
                    onChange={(e) =>
                      setDateOfBirthMonth(sanitizeDatePart(e.target.value, 2))
                    }
                    onBlur={() => setDateOfBirthTouched(true)}
                    error={showDateOfBirthError}
                    className="rounded-2xl px-4 text-lg placeholder:text-[#98A2B3]"
                    maxLength={2}
                    disabled={isCreatingProductEmail}
                  />
                  <ThemeInput
                    type="text"
                    label=""
                    placeholder="DD"
                    value={dateOfBirthDay}
                    onChange={(e) =>
                      setDateOfBirthDay(sanitizeDatePart(e.target.value, 2))
                    }
                    onBlur={() => setDateOfBirthTouched(true)}
                    error={showDateOfBirthError}
                    className="rounded-2xl px-4 text-lg placeholder:text-[#98A2B3]"
                    maxLength={2}
                    disabled={isCreatingProductEmail}
                  />
                  <ThemeInput
                    type="text"
                    label=""
                    placeholder="YYYY"
                    value={dateOfBirthYear}
                    onChange={(e) =>
                      setDateOfBirthYear(sanitizeDatePart(e.target.value, 4))
                    }
                    onBlur={() => setDateOfBirthTouched(true)}
                    error={showDateOfBirthError}
                    className="rounded-2xl px-4 text-lg placeholder:text-[#98A2B3]"
                    maxLength={4}
                    disabled={isCreatingProductEmail}
                  />
                </div>

                {showDateOfBirthError && (
                  <p className="text-sm text-red-500">{dateOfBirthError}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="text-sm font-normal text-black md:text-base">
                  Biological sex <span className="text-red-500">*</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {GENDER_OPTIONS.map((option) => {
                    const isSelected = gender === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setGender(option.value)}
                        disabled={isCreatingProductEmail}
                        className={`h-12 rounded-xl border px-4 text-lg transition-colors ${
                          isSelected
                            ? "border-primary bg-[#ECF3FF] text-primary"
                            : "border-gray-200 bg-white text-[#121826] hover:border-primary/50"
                        } ${isCreatingProductEmail ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </AppModal>

          <CartStepContent
            survey={survey}
            surveyAnswers={surveyAnswers}
            currentQuestionIndex={currentQuestionIndex}
            onSingleSelect={handleSingleSelect}
            onMultiSelect={handleMultiSelect}
            onTextChange={setTextAnswer}
            onComplete={() => handleDeferConfirmAccept()}
            onQuestionIndexChange={handleQuestionIndexChange}
          />

          <div className="flex items-center gap-2 justify-center ">
            <h2 className="text-neutral-600 font-medium text-base">
              Already have an account?
            </h2>
            <a
              href={`${process.env.NEXT_PUBLIC_MAIN_APP_URL}/login`}
              className="text-secondary hover:underline underline-offset-2 hover:text-secondary-dark font-medium text-base"
            >
              Login
            </a>
          </div>

          <div className="p-4 md:p-5 mt-4 md:mt-8 rounded-xl bg-neutral-100 flex items-center justify-center">
            <a
              href="tel:+18888908143"
              className="text-neutral-800 w-fit text-center text-base md:text-lg group"
            >
              <span className="font-bold text-primary">Need Help?</span> Call ({" "}
              <span className="group-hover:underline underline-offset-4 pe-2">
                (888) 890-8143
              </span>
              for assistance)
            </a>
          </div>

          {/* <AppModal
            isOpen={!!deferConfirm}
            onClose={() => setDeferConfirm(null)}
            onConfirm={() => handleDeferConfirmAccept()}
            title="Defer exam?"
            cancelLabel="No"
            confirmLabel="Yes"
            confirmBtnVarient="primary"
            showFooter={true}
          >
            Selecting this option will defer your exam. Please note that all
            products associated with this question will be removed from your
            cart. Do you wish to proceed?
          </AppModal> */}

          {!!deferConfirm && (
            <Portal>
              <div className=" min-h-dvh top-0 items-end md:items-center justify-center fixed inset-0 z-100 bg-black/30 backdrop-blur-xs flex">
                <div className="sm:h-fit relative w-full sm:max-h-[90dvh]   md:m-auto container md:mx-4  sm:max-w-150  shadow-xl h-full flex flex-col">
                  <button
                    onClick={() => setDeferConfirm(null)}
                    className={`md:p-1 p-1 hover:bg-gray-200 rounded-md absolute cursor-pointer md:end-3 md:top-3 end-2 top-2`}
                  >
                    <CrossIcon />
                  </button>

                  <div
                    className={`flex-1 items-center justify-center flex flex-col gap-2 bg-white p-4 md:rounded-xl md:p-8`}
                  >
                    <AlertIcon2 />
                    <h2 className="font-semibold text-2xl mt-3 text-center text-neutral-900">
                      Confirm Cancellation
                    </h2>
                    <p className="font-normal text-base text-neutral-500 text-center">
                      Are you sure? Selecting this option will cancel your exam
                      and return you to the homepage.
                    </p>

                    <div className="w-full flex items-center gap-4 mt-4 md:flex-row flex-col">
                      <button
                        onClick={() => setDeferConfirm(null)}
                        className="text-neutral-900 w-full cursor-pointer font-semibold md:text-base border border-neutral-200 py-2 text-sm md:py-3  px-5 rounded-xl bg-white hover:bg-gray-100"
                      >
                        No, Go Back to Question
                      </button>
                      <button
                        onClick={() => handleDeferConfirmAccept()}
                        className="text-white font-semibold cursor-pointer w-full md:text-base border border-neutral-200 py-2 text-sm md:py-3 px-5 rounded-xl bg-red-500 hover:bg-red-600"
                      >
                        Yes, Cancel Exam
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Portal>
          )}
          {!!softStopConfirm && (
            <Portal>
              <div className=" min-h-dvh top-0 items-end md:items-center justify-center fixed inset-0 z-100 bg-black/30 backdrop-blur-xs flex">
                <div className="sm:h-fit relative w-full sm:max-h-[90dvh] md:m-auto container md:mx-4 sm:max-w-150 shadow-xl h-full flex flex-col">
                  {/* <button
                  onClick={() => setSoftStopConfirm(null)}
                  className="md:p-1 p-1 hover:bg-gray-200 rounded-md absolute cursor-pointer md:end-3 md:top-3 end-2 top-2"
                >
                  <CrossIcon />
                </button> */}

                  <div className="flex-1 items-center justify-center flex flex-col gap-2 bg-white  p-4 md:rounded-xl md:py-12 md:px-8">
                    {/* <AlertIcon2 />
                    <h2 className="font-semibold text-2xl mt-3 text-center text-neutral-900">
                      Caution
                    </h2> */}
                    <p className="font-normal text-lg mb-4 text-neutral-700 text-center">
                      This answer may require extra clinical review. Do you want
                      to continue with this selection?
                    </p>

                    <div className="w-full flex items-center gap-4 mt-4 md:flex-row flex-col">
                      <button
                        onClick={() => setSoftStopConfirm(null)}
                        className="text-neutral-900 w-full cursor-pointer font-semibold md:text-base border border-neutral-200 py-2 text-sm md:py-3 px-5 rounded-xl bg-white hover:bg-gray-100"
                      >
                        No, Go Back
                      </button>
                      <button
                        onClick={handleSoftStopConfirmAccept}
                        className="text-white font-semibold cursor-pointer w-full md:text-base border border-neutral-200 py-2 text-sm md:py-3 px-5 rounded-xl bg-primary hover:bg-primary/90"
                      >
                        Yes, Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Portal>
          )}
        </div>
      )}
      {showInfoPage && (
        <div className="bg-primary-light z-50 fixed w-full min-h-dvh flex sm:items-center sm:justify-center">
          <div className="p-4 xl:p-0 max-w-4xl w-full flex flex-col gap-9">
            <Link href={"/"} className="relative">
              <Image alt="" src={Images.layout.logo} />
            </Link>

            <div className="space-y-7.5 ">
              <div className="bg-linear-[245deg] relative overflow-hidden rounded-2xl sm:rounded-4xl from-[#86B7EF]  to-[#DCF0F7]">
                <div className="noise absolute! inset-0 w-full " />
                <div className="container  items-center gap-6 justify-center lg:gap-5 mx-auto grid grid-cols-1 sm:grid-cols-1 max-w-7xl px-4 xl:px-16 relative">
                  <div className="relative">
                    <Image
                      alt=""
                      src={Images.layout.logo}
                      className="z-20 relative h-80"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-end  justify-end">
                <div className="w-fit">
                  <ThemeButton
                    label="Get Started"
                    variant="secondary"
                    size="large"
                    iconDirection="end"
                    icon={
                      <span className="w-7.5 h-7.5 text-secondary -rotate-45 group-hover:rotate-0 transition-all duration-500 rounded-full bg-white flex items-center justify-center">
                        <ArrowIcon fill="currentColor" />
                      </span>
                    }
                    onClick={() => handleDeferConfirmAccept()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
