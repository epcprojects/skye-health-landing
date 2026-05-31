"use client";

import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import Image from "next/image";
import { Images } from "@/app/images";

const ACCESS_CODE = "009955";
const SESSION_UNLOCK_KEY = "construction_gate_unlocked";

const ConstructionGateModal = () => {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return true;

    return sessionStorage.getItem(SESSION_UNLOCK_KEY) !== "true";
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const preventEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
    };

    window.addEventListener("keydown", preventEscape, true);

    return () => {
      window.removeEventListener("keydown", preventEscape, true);
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [open]);

  const scrollToPageTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    });
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);

    if (value === ACCESS_CODE) {
      setError("");
      sessionStorage.setItem(SESSION_UNLOCK_KEY, "true");
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      setOpen(false);
      scrollToPageTop();
      return;
    }

    if (value.length === ACCESS_CODE.length) {
      setError("Invalid code. Please try again.");
      return;
    }

    setError("");
  };

  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="construction-modal-title"
      aria-describedby="construction-modal-description"
      className="fixed inset-0 z-[1000] w-full flex items-center justify-center bg-zinc-950/70 p-4 backdrop-blur-md"
      onMouseDown={(event) => event.preventDefault()}
    >
      <div
        className="w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="bg-radial from-white to-[#D8EAFF] px-5 py-7 text-center sm:px-8 sm:py-9">
          <div className="mx-auto mb-6 flex justify-center">
            <Image
              src={Images.layout.logo}
              alt="Paramount HealthRx"
              className="h-auto w-60"
              priority
            />
          </div>

          <h2
            id="construction-modal-title"
            className="text-2xl font-extrabold leading-tight text-zinc-950 sm:text-3xl"
          >
            Under Construction
          </h2>

          <p
            id="construction-modal-description"
            className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-600 sm:text-base"
          >
            We are getting everything ready. Enter the 6-digit access code to
            preview the site.
          </p>
        </div>

        <div className="px-5 py-7 sm:px-8">
          <div className="space-y-4">
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              inputType="tel"
              containerStyle={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                gap: "12px",
                width: "100%",
              }}
              renderInput={(props) => (
                <input
                  {...props}
                  className="h-14 w-full! rounded-2xl border border-mercury bg-white text-center text-2xl font-bold text-zinc-950 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 sm:h-16 md:h-18"
                />
              )}
            />
            {error && (
              <p className="text-center text-sm font-semibold text-error-400">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionGateModal;
