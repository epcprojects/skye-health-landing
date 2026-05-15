"use client";

import Image from "next/image";
import "react-phone-number-input/style.css";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ThemeButton, ThemeInput } from "../../components";
import { Images } from "@/app/images";

import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/app/Redux/store";
import { signupAndLoadMe } from "@/app/Redux/slices/auth/authThunks";
import { toastAlert } from "@/app/components/ToastAlert";
import {
  clearCart,
  selectCartProductIds,
} from "@/app/Redux/slices/cart/cartSlice";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  coupon: string;
  confirmPassword: string;
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .required("First name is required."),
  lastName: Yup.string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .required("Last name is required."),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address.")
    .required("Email is required."),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\(\d{3}\)\s\d{3}-\d{4}$/,
      "Phone number must be in format (000) 000-0000",
    ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match.")
    .required("Confirm password is required."),
  coupon: Yup.string().optional(),
});

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((s) => s.auth.status);
  const authError = useAppSelector((s) => s.auth.error);
  const productIds = useAppSelector(selectCartProductIds);
  const [error, setError] = useState();

  const cartEmpty = productIds.length === 0;

  const userId = useAppSelector((s) => s.auth.me?.user.id);

  const [initialData, setInitialData] = useState<Partial<FormValues>>({});

  const parseParams = (paramString: string) => {
    const params = new URLSearchParams(paramString);
    return {
      firstName: params.get("fn") || "",
      lastName: params.get("ln") || "",
      email: params.get("em") || "",
      phone: params.get("ph") || "",
      coupon: params.get("promo") || "",
    };
  };

  useEffect(() => {
    const rawParams = localStorage.getItem("registration_params");
    if (rawParams) {
      const parsed = parseParams(rawParams);

      // If your phone number in the URL is raw (1234567890),
      // let's format it so it passes your Yup regex check:
      if (parsed.phone) {
        parsed.phone = formatPhoneNumber(parsed.phone);
      }

      setInitialData(parsed);
    }
  }, []);

  // Use useMemo to ensure initialValues only changes when initialData is set
  const initialValues: FormValues = useMemo(
    () => ({
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      email: initialData.email ? initialData.email.replace("-", "@") : "",
      phone: initialData.phone || "",
      password: "",
      confirmPassword: "",
      coupon: initialData.coupon || "",
    }),
    [initialData],
  );

  console.log(authError, "auth error");
  console.log(authStatus, "auth status");

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, "").slice(0, 10);
    if (numbers.length === 0) return "";
    if (numbers.length <= 3) return `(${numbers}`;
    if (numbers.length <= 6)
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnMount={true}
      validateOnBlur
      validateOnChange
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          console.log(values);

          const res = await dispatch(
            signupAndLoadMe({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              phone: values.phone,
              password: values.password,
              coupon: values.coupon,
            }),
          ).unwrap();

          if (res.signup.json.appointments) {
            router.push("/appointments-products");
            dispatch(clearCart());
            localStorage.removeItem("registration_params");
            return;
          }

          toastAlert("Registered successfully", true);
          dispatch(clearCart());
          localStorage.removeItem("registration_params");
          router.push("/appointment");
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // console.error("Signup error:", error);
          setError(error);

          if (error === "Email exists") {
            setFieldError("email", "This email already registered");
            toastAlert("This email already registered", false);
          } else toastAlert(error, false);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="grid w-full h-max grid-cols-1 md:grid-cols-2 bg-[#F6F6F6]"
        >
          <div className="flex flex-col items-center justify-center p-4 space-y-8 md:py-16 md:px-24">
            <Image alt="" src={Images.layout.logo} />
            <div className="w-full max-w-xl space-y-3">
              <h1 className="text-sm text-center font-semibold text-black md:text-2xl">
                Create your account {userId}
              </h1>
              <p className="text-neutral-500 font-medium text-center">
                Sign up to start managing your personalized care and
                prescriptions.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start md:flex-row flex-col gap-4 md:gap-6">
                  <div className="w-full">
                    <ThemeInput
                      label="First Name"
                      required
                      type="text"
                      placeholder="Enter your first name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.firstName}
                      errorMessage={errors.firstName as string}
                    />
                  </div>

                  <div className="w-full">
                    <ThemeInput
                      label="Last Name"
                      required
                      type="text"
                      placeholder="Enter your last name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.lastName}
                      errorMessage={errors.lastName as string}
                    />
                  </div>
                </div>

                <ThemeInput
                  label="Email Address"
                  required
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.email}
                  errorMessage={errors.email as string}
                />

                <ThemeInput
                  label="Coupon Code"
                  // required
                  type="text"
                  placeholder="Enter your coupon code"
                  name="coupon"
                  value={values.coupon}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // error={!!(touched.email && errors.email)}
                  // errorMessage={touched.email ? (errors.email as string) : ""}
                />

                {/* Phone */}
                {/* <div className="flex flex-col gap-1 md:gap-1.5">
                  <span className="block text-sm font-normal text-black md:text-base text-start">
                    Phone Number <span className="text-red-500"> *</span>
                  </span>

                  <PhoneInput
                    defaultCountry="US"
                    international
                    withCountryCallingCode
                    value={values.phone}
                    onChange={(val) => {
                      setFieldValue("phone", val ?? "");
                    }}
                    onBlur={() => setFieldTouched("phone", true, true)}
                    className={`w-full px-3.5 py-3 h-11 border border-gray-200 bg-white focus-within:border focus-within:border-primary-green rounded-lg text-base font-normal text-slate-900 ${
                      touched.phone && errors.phone ? " border-red-500" : ""
                    }`}
                  />

                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.phone as string}
                    </p>
                  )}
                </div> */}

                <ThemeInput
                  required
                  label="Phone Number"
                  placeholder="(000) 000-0000"
                  value={values.phone}
                  // onChange={handleChange}
                  type="tel"
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setFieldValue("phone", formatted);
                  }}
                  error={!!errors.phone}
                  errorMessage={errors.phone as string}
                  id="phone"
                  name="phone"
                />

                <ThemeInput
                  label="Password"
                  required
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.password}
                  errorMessage={errors.password as string}
                />

                <ThemeInput
                  label="Confirm Password"
                  required
                  type="password"
                  placeholder="Re-enter your password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword as string}
                />

                <div className="space-y-4">
                  <ThemeButton
                    label={isSubmitting ? "Registering..." : "Register"}
                    variant="secondary"
                    disabled={isSubmitting || !isValid}
                    onClick={() => {
                      // Let form submit naturally
                      // ThemeButton seems to use onClick; we trigger submit:
                      (document.activeElement as HTMLElement | null)?.blur?.();
                      // submit via native form:
                      const form = document.querySelector("form");
                      form?.dispatchEvent(
                        new Event("submit", {
                          cancelable: true,
                          bubbles: true,
                        }),
                      );
                    }}
                  />
                  {/* <span className="text-red-500 w-full text-center block">
                    {error}
                  </span> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="hidden p-4 md:p-6 md:block">
            <div className=" bg-white p-4 sm:p-8 flex overflow-hidden rounded-3xl h-full w-full bg-cover bg-bottom bg-no-repeat">
              <div className=" p-4 sm:p-8 mb-auto flex items-center gap-10 flex-col mt-auto space-y-5 w-full ">
                <div className="space-y-4">
                  <h1 className="text-2xl text-center font-semibold text-black sm:text-[32px]">
                    Welcome to Paramount Health RX
                  </h1>
                  <p className="text-base font-medium text-center text-black ">
                    Access your treatments, appointments, prescriptions, and
                    complete health <br /> records securely — all in one
                    easy-to-manage platform.
                  </p>
                </div>

                <Image alt="" src={Images.layout.authMockup} />
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Page;
