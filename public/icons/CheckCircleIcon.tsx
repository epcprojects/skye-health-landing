import React from "react";

const CheckCircleIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_53276_10805)">
        <rect width="24" height="24" rx="12" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.3527 14.813L6 11.4603L7.38673 10.0735L10.7394 13.4262L17.0309 7.20001L18.4176 8.58674L10.739 16.2L9.35232 14.8133L9.3527 14.813Z"
          fill="#70A4DE"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_53276_10805"
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
            values="0 0 0 0 0.439216 0 0 0 0 0.643137 0 0 0 0 0.870588 0 0 0 0.69 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_53276_10805"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default CheckCircleIcon;
