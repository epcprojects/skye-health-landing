"use client";
import { ThemeButton } from "@/app/components";
import ThemeInput, { InputType } from "@/app/components/inputs/ThemeInput";
import AppModal from "@/app/components/modals/AppModal";
import { CartStepContent } from "@/app/components/serveys/CartStepContent";
import { SurveyAnswers } from "@/app/components/serveys/SurveyQuestionnaire";
import { CREATE_OR_UPDATE_SURVEY_RESPONSE } from "@/app/graphql/mutations/survey";
import {
  FETCH_SURVEY_FOR_PRODUCTS,
  FetchSurveyType,
  SurveyType,
} from "@/app/graphql/queries/survey";
import {
  clearCart,
  selectCartItems,
  selectCartProductIds,
} from "@/app/Redux/slices/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import { useMutation, useQuery } from "@apollo/client/react";
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFER_OPTION_TEXT = "no consent - defer exam.";

const Page = () => {
  const productIds = useAppSelector(selectCartProductIds);
  const dispatch = useAppDispatch();
  const { data: surveyData, loading } = useQuery<FetchSurveyType>(
    FETCH_SURVEY_FOR_PRODUCTS,
    {
      variables: {
        productIds: productIds,
        cartId: null,
      },
    },
  );

  const fetchedSurvey = surveyData?.fetchSurveyForProducts;

  //surveys states
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>({});
  const [showInfoPage, setShowInfoPage] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailSubmissionError, setEmailSubmissionError] = useState("");
  const [externalUserId, setExternalUserId] = useState("");
  const [hasCapturedEmail, setHasCapturedEmail] = useState(false);
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
  const questionCount = survey?.questions?.length ?? 0;
  const stepFromUrl = searchParams.get("step");
  const trimmedEmail = email.trim();
  const isEmailValid = EMAIL_REGEX.test(trimmedEmail);
  const shouldShowEmailError = emailTouched && !isEmailValid;
  const hasEmailError = shouldShowEmailError || !!emailSubmissionError;
  const emailErrorMessage =
    emailSubmissionError || "Please enter a valid email address.";

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
  const handleSingleSelect = useCallback(
    (questionId: string, optionId: string) => {
      if (isDeferOption(questionId, optionId)) {
        setDeferConfirm({ questionId, optionId, action: "single" });
      } else {
        setSingleSelect(questionId, optionId);
      }
    },
    [isDeferOption],
  );

  const handleMultiSelect = useCallback(
    (questionId: string, optionId: string, checked: boolean) => {
      if (checked && isDeferOption(questionId, optionId)) {
        setDeferConfirm({
          questionId,
          optionId,
          action: "multi",
          checked: true,
        });
      } else {
        setMultiSelect(questionId, optionId, checked);
      }
    },
    [isDeferOption],
  );

  const [createOrUpdateSurveyResponse] = useMutation(
    CREATE_OR_UPDATE_SURVEY_RESPONSE,
  );

  const [createCart] = useMutation<CreateCartMutationResult>(CREATE_CART);
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
        window.location.href = `${process.env.NEXT_PUBLIC_MAIN_APP_URL}/patient/signup/?externalUserId=${encodeURIComponent(
          externalUserId,
        )}`;
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
  ]);

  useEffect(() => {
    if (!surveyFromQuery) return;
    queueMicrotask(() => setSurveyFromState(surveyFromQuery));
  }, [surveyFromQuery]);

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
    setEmail("");
    setEmailTouched(false);
    setEmailSubmissionError("");
    setExternalUserId("");
    setHasCapturedEmail(false);
    setCurrentQuestionIndex(0);
    setIsEmailModalOpen(false);
  }, [survey?.id]);

  useEffect(() => {
    if (
      loading ||
      !survey ||
      showInfoPage ||
      hasCapturedEmail ||
      currentQuestionIndex !== 0
    ) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsEmailModalOpen(true);
  }, [currentQuestionIndex, hasCapturedEmail, loading, showInfoPage, survey]);

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

  const handleEmailConfirm = async () => {
    setEmailTouched(true);
    setEmailSubmissionError("");

    if (!isEmailValid) return;

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
    } catch (error) {
      setEmailSubmissionError(
        error instanceof Error
          ? error.message
          : "We couldn't save your email right now. Please try again.",
      );
    }
  };

  useEffect(() => {
    if (loading || isRedirecting) return;

    if (!surveyFromQuery) {
      // setIsRedirecting(true);
      router.replace("/products");
    }
  }, [loading, surveyFromQuery, isRedirecting, router]);

  if (isRedirecting) {
    return (
      <div className="flex items-center justify-center h-dvh z-50 md:relative fixed">
        <div className="bg-linear-[245deg] relative max-w-4xl overflow-hidden rounded-2xl sm:rounded-4xl from-[#86B7EF]  to-[#DCF0F7]">
          <div className="noise absolute! inset-0 w-full " />
          <div className="container  items-center gap-6 lg:gap-5 mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-7xl px-4 xl:px-16 relative">
            <div className="space-y-6">
              <div className="space-y-4 flex flex-col lg:flex-none items-center lg:items-start">
                <div className="space-y-2">
                  <h1 className="text-neutral-900 text-4xl  lg:text-start text-center  leading-[130%] tracking-tighter font-extrabold">
                    Modern Medicine. Personalized. Delivered.
                  </h1>
                  <h2 className=" text-lg lg:text-2xl   lg:text-start text-center  text-neutral-800">
                    Peak performance isn&apos;t accidental. It&apos;s
                    engineered.
                  </h2>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                alt=""
                src={Images.landingPage.heroMockup}
                className="z-20 relative"
              />
              <Image
                alt=""
                src={Images.landingPage.heroBg}
                className="absolute bottom-0 right-0 z-10 animate-spin-dead-slow opacity-40"
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
            title="Please enter your email to continue."
            confirmLabel={isCreatingProductEmail ? "Continuing..." : "Continue"}
            confirmBtnVarient="primary"
            hideCancelBtn
            hideCrossButton
            disableCloseButton
            outSideClickClose={false}
            scrollNeeded={false}
            bodyPaddingClasses="p-4 md:p-6"
            confimBtnDisable={!isEmailValid || isCreatingProductEmail}
          >
            <div className="space-y-4">
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
              <span className="group-hover:underline underline-offset-4">
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
                <div className="container  items-center gap-6 lg:gap-5 mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-7xl px-4 xl:px-16 relative">
                  <div className="space-y-6">
                    <div className="space-y-4 flex flex-col lg:flex-none items-center lg:items-start">
                      <div className="space-y-2">
                        <h1 className="text-neutral-900 text-4xl  lg:text-start text-center  leading-[130%] tracking-tighter font-extrabold">
                          Modern Medicine. Personalized. Delivered.
                        </h1>
                        <h2 className=" text-lg lg:text-2xl   lg:text-start text-center  text-neutral-800">
                          Peak performance isn&apos;t accidental. It&apos;s
                          engineered.
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <Image
                      alt=""
                      src={Images.landingPage.heroMockup}
                      className="z-20 relative"
                    />
                    <Image
                      alt=""
                      src={Images.landingPage.heroBg}
                      className="absolute bottom-0 right-0 z-10 animate-spin-dead-slow opacity-40"
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
