/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";

type CharRollProps = {
  text: string;
  as?: "button" | "a" | "span" | "div";
  href?: string;
  className?: string;
  charClassName?: string;
  staggerMs?: number;
  durationMs?: number;
  easing?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export default function CharRollText({
  text,
  as = "button",
  href,
  className = "",
  charClassName = "",
  staggerMs = 35,
  durationMs = 200,
  easing = "cubic-bezier(0.4, 0, 0.2, 1)",
  onClick,
}: CharRollProps) {
  const chars = useMemo(() => Array.from(text), [text]);
  const Tag = as as any;

  return (
    <>
      <Tag
        href={as === "a" ? href : undefined}
        onClick={onClick}
        className={`crt-root ${as === "button" ? "crt-btn" : ""} ${className}`}
        aria-label={text}
        type={as === "button" ? "button" : undefined}
      >
        <span className="crt-wrap" aria-hidden="true">
          {chars.map((ch, i) => {
            const safeChar = ch === " " ? "\u00A0" : ch;
            return (
              <span
                key={`${ch}-${i}`}
                className={`crt-cell ${charClassName}`}
                style={{ ["--i" as any]: i }}
              >
                <span className="crt-stack">
                  <span className="crt-glyph">{safeChar}</span>
                  <span className="crt-glyph">{safeChar}</span>
                </span>
              </span>
            );
          })}
        </span>
      </Tag>

      <style jsx>{`
        .crt-stack {
          display: block;
          transform: translateY(0);
          transition-property: transform;
          transition-duration: ${durationMs}ms;
          transition-timing-function: ${easing};
          transition-delay: calc(var(--i) * ${staggerMs}ms);
          will-change: transform;
        }
      `}</style>
    </>
  );
}
