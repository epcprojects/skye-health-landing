import React from "react";

const CheckCircleBlackIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_53276_11220)">
        <rect width="24" height="24" rx="12" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.3527 14.8132L6 11.4605L7.38673 10.0737L10.7394 13.4264L17.0309 7.2002L18.4176 8.58693L10.739 16.2002L9.35232 14.8135L9.3527 14.8132Z"
          fill="black"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_53276_11220"
          x="0"
          y="0"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.622596 0 0 0 0 0.622596 0 0 0 0 0.622596 0 0 0 0.68 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_53276_11220"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CheckCircleBlackIcon;
