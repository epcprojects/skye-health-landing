"use client";
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowIcon } from "@/public/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Images } from "@/app/images";
import { selectCartItems } from "@/app/Redux/slices/cart/cartSlice";
import { useAppSelector } from "@/app/Redux/store";

interface ConsultationPopupProps {
  title?: string;
  ctaLabel?: string;
  onCtaClick?: (currentParams: string) => void; // Pass params to the handler
  media?: React.ReactNode;
  // closeOnEsc?: boolean;
}

const ConsultationPopup = ({
  title,
  ctaLabel = "GET STARTED",
  onCtaClick,
  media,
  // closeOnEsc = false,
}: ConsultationPopupProps) => {
  // ?fn=Hamza&ln=Baker&phone=3103102323&email=daniel-alphabiomedlabs.com&promo=arnold26
  const items = useAppSelector(selectCartItems);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Extract all fields from query
  const firstName = searchParams.get("fn");
  const lastName = searchParams.get("ln");
  const phone = searchParams.get("ph");
  const email = searchParams.get("em");
  const promo = searchParams.get("promo");

  // Verify products page
  const isProductsPage = pathname === "/products";
  const isRegisterPage = pathname === "/register";
  const isAppointmentPage = pathname === "/appointment";
  const issurveysPage = pathname === "/surveys";
  const isHomePage = pathname === "/";

  // Logic to determine if popup should auto-open
  const hasRequiredParams = firstName && lastName && phone && email && promo;
  const [open, setOpen] = useState(!!hasRequiredParams);

  const [isIdleState, setIsIdleState] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 2. Idle Logic: 10 Seconds of inactivity
  // useEffect(() => {
  //   const handleActivity = () => {
  //     // If we are already showing the idle modal, don't reset
  //     if (
  //       (isIdleState && open) ||
  //       isRegisterPage ||
  //       isAppointmentPage ||
  //       issurveysPage
  //     )
  //       return;

  //     if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

  //     // Only start the idle timer if there are items in the cart
  //     if (items && items.length > 0) {
  //       idleTimerRef.current = setTimeout(() => {
  //         console.log("Triggered");
  //         setIsIdleState(true);
  //         setOpen(true);
  //       }, 40000); // 40 seconds
  //     }
  //   };

  //   // Event listeners for activity
  //   window.addEventListener("mousemove", handleActivity);
  //   window.addEventListener("keydown", handleActivity);
  //   window.addEventListener("click", handleActivity);

  //   return () => {
  //     if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  //     window.removeEventListener("mousemove", handleActivity);
  //     window.removeEventListener("keydown", handleActivity);
  //     window.removeEventListener("click", handleActivity);
  //   };
  // }, [items, firstName, promo, searchParams, open, isIdleState]);

  const handleAction = () => {
    if (isIdleState) {
      router.replace("/surveys", { scroll: false });
      setOpen(false);
    } else if (isHomePage) {
      router.push(`/products?${searchParams.toString()}`);
      setOpen(true);
    } else if (isProductsPage) {
      localStorage.setItem("registration_params", searchParams.toString());
      setOpen(false);
    } else {
      setOpen(false);
    }

    setIsIdleState(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 z-50 fixed inset-0 backdrop-blur-sm animate" />
        <Dialog.Content
          onEscapeKeyDown={(e) => {
            if (!isIdleState) {
              e.preventDefault();
            }
          }}
          className="fixed inset-0 z-60  flex items-center justify-center p-4 md:p-10 animate-content"
        >
          {/* The Card */}
          <div
            className="relative bg-radial from-white to-french-pass rounded-3xl w-full max-w-200 
                  max-h-[95dvh] overflow-y-auto flex flex-col  md:overflow-hidden shadow-2xl border border-white/20"
          >
            <div
              className={`flex flex-col items-center ${isProductsPage ? "" : "pt-8 md:pt-12"} pb-8 md:pb-12 text-center h-full`}
            >
              {/* 1. Header (Fixed Height) */}
              {!isProductsPage && !isIdleState && (
                <div className="shrink-0 mb-6 text-[#2353A1] font-bold text-xl flex items-center gap-1">
                  <Image src={Images.layout.logo} alt="Logo" />
                </div>
              )}

              {/* 2. Title (Fixed Height) */}
              {!isProductsPage && !isIdleState && (
                <Dialog.Title className="shrink-0 text-zinc-950 text-2xl md:text-3xl font-extrabold leading-tight px-6">
                  👋 {firstName || "Hi"}, Ready to Book Your FREE Consultation?
                </Dialog.Title>
              )}

              {/* 3. MEDIA (The "Shrinkable" Area) */}
              {/* min-h-0 is the CSS trick that allows flex children to shrink below their content size */}
              <div className="flex-1 min-h-0 w-full relative flex items-center justify-center">
                <div className="relative w-full h-full max-h-75  md:max-h-100 flex items-center justify-center">
                  {media}
                </div>
              </div>

              {/*  */}
              {isIdleState ? (
                <Dialog.Title className="shrink-0 text-zinc-950 text-2xl md:text-3xl font-extrabold leading-tight mb-6 px-6">
                  All Done?
                </Dialog.Title>
              ) : isProductsPage ? (
                <Dialog.Title className="shrink-0 text-zinc-950 text-xl md:text-3xl font-extrabold leading-tight mb-3 md:mb-6 px-6">
                  Begin by adding products to your cart, then schedule your FREE
                  consultation at checkout.
                </Dialog.Title>
              ) : null}

              {/* 4. Subtext & Button (Fixed Height) */}
              <div className="shrink-0 w-full space-y-2.5 px-6">
                {isIdleState ? (
                  <p className="text-lg md:text-xl text-zinc-700">
                    Click below to complete the process and receive your free
                    consultation.
                  </p>
                ) : isProductsPage ? (
                  <>
                    <p className="text-base md:text-xl text-zinc-700">
                      Your code <b>“{promo}”</b> will be automatically applied
                      at checkout.
                    </p>

                    <p className="text-base md:text-xl text-zinc-700">
                      Hurry! This offer ends{" "}
                      <b>March 15th, 2026 at 11:59pm PST.</b>
                    </p>
                  </>
                ) : null}

                <button
                  onClick={handleAction}
                  className="mt-4 rounded-full w-full cursor-pointer max-w-md mx-auto p-4 bg-primary text-white font-bold flex justify-center items-center gap-3 transition-transform active:scale-95"
                >
                  {isIdleState
                    ? "Get Your Free Consult"
                    : isProductsPage
                      ? "Shop Now"
                      : ctaLabel}
                  <span className="bg-white w-7 h-7 rounded-full flex items-center justify-center -rotate-45">
                    <ArrowIcon fill="blue" />
                  </span>
                </button>

                {/* Dialog close */}
                {isIdleState && (
                  <Dialog.Close asChild>
                    <button className="absolute top-5 right-5 z-50 cursor-pointer text-zinc-400 hover:text-zinc-900">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </Dialog.Close>
                )}
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConsultationPopup;
