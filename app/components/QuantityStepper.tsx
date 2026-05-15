// "use client";

// import * as React from "react";
// import * as ToggleGroup from "@radix-ui/react-toggle-group";
// import { MinusIcon, PlusIcon } from "@/public/icons";

// type Props = {
//   label?: string;
//   value: number;
//   onChange: (next: number) => void;
//   min?: number;
//   max?: number;
//   step?: number;
//   className?: string;
// };

// export function QuantityStepper({
//   label = "Quantity:",
//   value,
//   onChange,
//   min = 1,
//   max = 999,
//   step = 1,
//   className = "",
// }: Props) {
//   const decDisabled = value <= min;
//   const incDisabled = value >= max;

//   const dec = () => onChange(Math.max(min, value - step));
//   const inc = () => onChange(Math.min(max, value + step));

//   return (
//     <div className={`inline-flex max-w-49 flex-col gap-2 ${className}`}>
//       <span className="text-base font-semibold text-gray-900">{label}</span>

//       <ToggleGroup.Root
//         type="single"
//         className="inline-flex overflow-hidden rounded-full border border-gray-200 bg-white"
//         aria-label="Quantity stepper"
//       >
//         {/* - */}
//         <ToggleGroup.Item
//           value="dec"
//           aria-label="Decrease quantity"
//           disabled={decDisabled}
//           onClick={dec}
//           className={[
//             "h-10 sm:h-13 px-6 grid place-items-center",
//             "text-gray-800 cursor-pointer",
//             "hover:bg-gray-50",
//             "disabled:opacity-40 disabled:cursor-not-allowed",
//             "focus:outline-none focus:ring-2 focus:ring-blue-200",
//           ].join(" ")}
//         >
//           <MinusIcon />
//         </ToggleGroup.Item>

//         {/* number */}
//         <div className="h-10 sm:h-13  px-8 min-w-20 select-none grid place-items-center text-sm font-semibold text-gray-700 border-x border-gray-200">
//           {value}
//         </div>

//         {/* + */}
//         <ToggleGroup.Item
//           value="inc"
//           aria-label="Increase quantity"
//           disabled={incDisabled}
//           onClick={inc}
//           className={[
//             "h-10 sm:h-13  px-6 grid place-items-center",
//             "bg-secondary cursor-pointer text-white",
//             "hover:bg-secondary/900",
//             "disabled:opacity-50 disabled:cursor-not-allowed",
//             "focus:outline-none focus:ring-2 focus:ring-sky-200",
//           ].join(" ")}
//         >
//           <PlusIcon />
//         </ToggleGroup.Item>
//       </ToggleGroup.Root>
//     </div>
//   );
// }
"use client";

import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { MinusIcon, PlusIcon } from "@/public/icons";

type SizeVariant = "sm" | "md" | "lg";

type Props = {
  label?: string;
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;

  /** ✅ new */
  variant?: SizeVariant;

  /** optional: hide label if you want */
  showLabel?: boolean;
};

const SIZE: Record<
  SizeVariant,
  {
    btnH: string;
    btnPX: string;
    numPX: string;
    numMinW: string;
    labelText?: string;
  }
> = {
  sm: {
    btnH: "h-8",
    btnPX: "px-3",
    numPX: "px-5",
    numMinW: "min-w-14",
  },
  md: {
    btnH: "h-10 sm:h-13",
    btnPX: "px-6",
    numPX: "px-8",
    numMinW: "min-w-20",
  },
  lg: {
    btnH: "h-12",
    btnPX: "px-7",
    numPX: "px-10",
    numMinW: "min-w-24",
  },
};

export function QuantityStepper({
  label = "Quantity:",
  value,
  onChange,
  min = 1,
  max = 999,
  step = 1,
  className = "",
  variant = "md",
  showLabel = true,
}: Props) {
  const decDisabled = value <= min;
  const incDisabled = value >= max;

  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));

  const s = SIZE[variant];

  return (
    <div className={`inline-flex max-w-49 flex-col gap-2 ${className}`}>
      {showLabel && (
        <span className="text-base font-semibold text-gray-900">{label}</span>
      )}

      <ToggleGroup.Root
        type="single"
        className="inline-flex overflow-hidden rounded-full border border-gray-200 bg-white"
        aria-label="Quantity stepper"
      >
        {/* - */}
        <ToggleGroup.Item
          value="dec"
          aria-label="Decrease quantity"
          disabled={decDisabled}
          onClick={dec}
          className={[
            s.btnH,
            s.btnPX,
            "grid place-items-center",
            "text-gray-800 cursor-pointer",
            "hover:bg-gray-50",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-blue-200",
          ].join(" ")}
        >
          <MinusIcon />
        </ToggleGroup.Item>

        {/* number */}
        <div
          className={[
            s.btnH,
            s.numPX,
            s.numMinW,
            "select-none grid place-items-center text-sm font-semibold text-gray-700",
            "border-x border-gray-200",
          ].join(" ")}
        >
          {value}
        </div>

        {/* + */}
        <ToggleGroup.Item
          value="inc"
          aria-label="Increase quantity"
          disabled={incDisabled}
          onClick={inc}
          className={[
            s.btnH,
            s.btnPX,
            "grid place-items-center",
            "bg-secondary cursor-pointer text-white",
            "hover:bg-secondary/900",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-sky-200",
          ].join(" ")}
        >
          <PlusIcon />
        </ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
  );
}
