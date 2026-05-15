"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MobileCard from "./MobileCardsComponent";
import { useDeviceType } from "../hooks/useDeviceType";
gsap.registerPlugin(ScrollTrigger);
type item = {
  num: string;
  title: string;
  description: string;
};
type CardProps = {
  items: item[];
};

export default function HowItWorksScrollCards({ items }: CardProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  
  const { isMobile,isTablet } = useDeviceType();

  console.log(isMobile , "from outside");
  useEffect(() => {
    console.log(isMobile);
    if(!isMobile || !isTablet){
      const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".hw-card"));
      if (!cards.length) return;

      // ------------------ TUNE HERE ------------------
      const maxTilt = 18; // right +, left -
      const arcDepth = 80; // side cards go down (wheel feel)
      const centerBoost = 0.1; // center scale boost
      const edgeFade = 0.18; // fade on edges
      const gap = 54; //increase spacing between cards
      const scrollPerStep = 950; // base scroll per step
      const tail = 700; // extra scroll padding at the end (for last card to settle)
      const tiltEasePow = 0.9; // straightness curve
      const hideBeyond = 1.12; //  hide cards too far offscreen (optional)
      // ------------------------------------------------

      const clampN1P1 = gsap.utils.clamp(-1, 1);

      // step distance between cards = card width + gap
      const first = cards[0].getBoundingClientRect();
      const step = first.width + gap;

      const totalSteps = cards.length - 1;

      const state = { baseShift: 0, moveX: 0 };

      const viewportRect = () => viewport.getBoundingClientRect();

      const applyTrackX = () => {
        gsap.set(track, { x: state.baseShift + state.moveX });
      };

      // ✅ Center card 01 initially
      const recenterFirstCard = () => {
        gsap.set(cards, { clearProps: "transform" });
        gsap.set(track, { x: 0 });

        const vr = viewportRect();
        const centerX = vr.left + vr.width / 2;

        const r0 = cards[0].getBoundingClientRect();
        const c0 = r0.left + r0.width / 2;

        state.baseShift = centerX - c0;
        state.moveX = 0;

        applyTrackX();
      };

      const updateCardTransforms = () => {
        const vr = viewportRect();
        const centerX = vr.left + vr.width / 2;
        const halfW = vr.width / 2;

        cards.forEach((card) => {
          const r = card.getBoundingClientRect();
          const cardCenter = r.left + r.width / 2;

          const tRaw = (cardCenter - centerX) / halfW; // can exceed [-1..1]
          const t = clampN1P1(tRaw);

          const eased = Math.sign(t) * Math.pow(Math.abs(t), tiltEasePow);

          // tilt like before (your requirement)
          const rot = eased * maxTilt;

          // arc drop (wheel/fan feel)
          const y = t * t * arcDepth;

          const scale = 1 + (1 - Math.abs(t)) * centerBoost;

          // fade edges + optionally hard-hide offscreen
          let opacity = 1 - Math.abs(t) * edgeFade;
          const shouldHide = Math.abs(tRaw) > hideBeyond;
          if (shouldHide) opacity = 0;

          gsap.set(card, {
            rotation: rot,
            y,
            scale,
            opacity,
            pointerEvents: shouldHide ? "none" : "auto",
            transformOrigin: "50% 60%",
          });
        });
      };

      requestAnimationFrame(() => {
        recenterFirstCard();
        updateCardTransforms();
      });

      // ✅ ScrollTrigger with tail so last card fully reaches center & becomes straight
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 10%",
        end: () => `+=${Math.max(1, totalSteps) * scrollPerStep + tail}`,
        pin: true,
        scrub: 1,
        snap:
          totalSteps > 0
            ? { snapTo: 1 / totalSteps, duration: 0.35, ease: "power3.out" }
            : 1,

        onRefreshInit: () => {
          recenterFirstCard();
        },

        onUpdate: (self) => {
          // ✅ Ignore tail for movement progress
          const usable = Math.max(1, totalSteps) * scrollPerStep;
          const raw = self.scroll() - self.start; // px scrolled inside trigger
          const p = gsap.utils.clamp(0, 1, raw / usable);

          state.moveX = -step * totalSteps * p; // full travel before tail ends
          applyTrackX();
          updateCardTransforms();
        },

        onRefresh: () => {
          recenterFirstCard();
          applyTrackX();
          updateCardTransforms();
        },
      });

      const onResize = () => st.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        st.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
    }
  }, [isMobile,isTablet]);


  return (
    <>
      <section className="block lg:hidden">
        <div className="text-center pt-16">
          <p className="text-base lg:text-xl text-neutral-800">
            Simple. Secure. Physician-Guided.
          </p>
          <h2 className="mt-2 text-4xl lg:text-9xl font-extrabold text-neutral-800">
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3 px-4 sm:px-6 mt-10">
          {items.map((it, index) => (
            <MobileCard
              key={it.num}
              num={it.num}
              title={it.title}
              description={it.description}
              index={index}
            />
          ))}
        </div>
      </section>
      <section
        ref={sectionRef}
        className="w-full bg-white pt-16 overflow-hidden hidden lg:block"
      >
        <div className="">
          <div className="text-center">
            <p className="text-xl text-neutral-800">
              Simple. Secure. Physician-Guided.
            </p>
            <h2 className="mt-2 text-6xl xl:text-9xl font-extrabold text-neutral-800">
              How It Works
            </h2>
          </div>

          <div ref={viewportRef} className="relative mt-10 h-135 w-full ">
            {/* cards */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div
                ref={trackRef}
                className="flex items-center gap-20 will-change-transform"
              >
                {items.map((it, index) => (
                  <div
                    key={it.num}
                    className={`hw-card relative p-10 min-w-90 flex justify-between flex-col  min-h-108 rounded-3xl bg-radial from-white ${index == 0 ? "to-[#D0F2F8]" : index === 1 ? "to-french-pass" : index === 2 ? "to-linen" : index === 3 ? "to-[#BBFFB2]" : "to-[#D0F2F8]"} to-95% backdrop-blur-xl
                             border border-black/5 
                             will-change-transform`}
                  >
                    <div className="noise absolute! inset-0 w-full" />
                    <div className="text-[88px] font-extralight text-black">
                      {it.num}
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl text-bold text-black">
                        {it.title}
                      </h2>
                      <p className="text-neutral-600 font-normal text-2xl">
                        {it.description}
                      </p>
                    </div>
                    {/* <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200/30 via-white/0 to-pink-200/30" /> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
