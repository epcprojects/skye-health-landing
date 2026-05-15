"use client";

import React, { useId } from "react";
import clsx from "clsx";
import { CheckBoxCheckedIcon, CheckBoxIcon } from "@/public/icons";

interface Props {
  label: string;
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
  width?: string;
  fullWidth?: string;
  direction?: "flex-row" | "flex-row-reverse"; // keep it strict
}

export default function CustomCheckbox({
  label,
  id,
  checked,
  onChange,
  disabled = false,
  className = "",
  width = "w-32",
  fullWidth = "w-fit",
  direction = "flex-row",
}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const customid = id ? id : useId();

  return (
    <label
      htmlFor={customid}
      className={clsx(
        "flex sm:items-center gap-2 select-none",
        fullWidth,
        direction,
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className,
      )}
    >
      {/* Real checkbox (accessible) */}
      <input
        id={customid}
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />

      <span
        className={clsx(
          "text-sm sm:text-base inline-block font-medium ",
          width,
        )}
      >
        {label}
      </span>

      <span aria-hidden="true" className="shrink-0">
        {checked ? <CheckBoxCheckedIcon /> : <CheckBoxIcon />}
      </span>
    </label>
  );
}
