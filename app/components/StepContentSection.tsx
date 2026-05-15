"use client";

import React from "react";
import { CheckCircleIcon } from "@/public/icons";

type ContentBlock =
  | { type: "paragraph"; text: React.ReactNode }
  | { type: "list"; items: string[] };

type StepContentSectionProps = {
  stepLabel: string;
  title: string;
  rightTitle?: string;
  content: ContentBlock[];
};

export const StepContentSection: React.FC<StepContentSectionProps> = ({
  stepLabel,
  title,
  rightTitle,
  content,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
      <div className="space-y-4">
        <span className="bg-secondary text-white block w-fit text-base md:text-xl py-2 px-4  md:py-2.5 md:px-5 rounded-full">
          {stepLabel}
        </span>
        <h2 className="font-extrabold text-3xl md:text-5xl">{title}</h2>
      </div>

      <div className="flex justify-end">
        <div className="max-w-115 w-full space-y-2 md:space-y-5">
          {rightTitle && (
            <h2 className="text-2xl font-bold text-gray-800">{rightTitle}</h2>
          )}

          <div className="text-base md:text-lg text-gray-800 font-normal space-y-4">
            {content.map((block, index) => {
              if (block.type === "paragraph") {
                return <p key={index}>{block.text}</p>;
              }

              if (block.type === "list") {
                return (
                  <ul key={index} className="space-y-2">
                    {block.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 items-center text-gray-800 text-lg"
                      >
                        <CheckCircleIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
